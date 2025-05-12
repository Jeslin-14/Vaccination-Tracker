const Student = require('../models/Student');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    console.log('Received student data:', req.body);
    const student = new Student(req.body);
    await student.save();
    console.log('Student saved:', student);
    res.status(201).json(student);
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all students with filtering and pagination
exports.getStudents = async (req, res) => {
  console.log('Fetching all students');
  try {
    const { page = 1, limit = 10, search, class: studentClass, vaccinationStatus } = req.query;
    
    // Build query
    const query = {};
    
    // Search by name or student ID
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by class
    if (studentClass) {
      query.class = studentClass;
    }
    
    // Filter by vaccination status
    if (vaccinationStatus) {
      if (vaccinationStatus === 'vaccinated') {
        query['vaccinations.status'] = 'completed';
      } else if (vaccinationStatus === 'not_vaccinated') {
        query.$or = [
          { vaccinations: { $size: 0 } },
          { 'vaccinations.status': { $ne: 'completed' } }
        ];
      }
    }

    const students = await Student.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Student.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalStudents: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single student by MongoDB _id
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    Object.assign(student, req.body);
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    await student.remove();
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add vaccination record
exports.addVaccination = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if student is already vaccinated in this drive
    const existingVaccination = student.vaccinations.find(
      v => v.driveId.toString() === req.body.driveId
    );

    if (existingVaccination) {
      return res.status(400).json({ 
        message: 'Student is already registered for this vaccination drive' 
      });
    }

    student.vaccinations.push(req.body);
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update vaccination status
exports.updateVaccinationStatus = async (req, res) => {
  try {
    const { id, vaccinationId } = req.params;
    const { status } = req.body;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const vaccination = student.vaccinations.id(vaccinationId);
    if (!vaccination) {
      return res.status(404).json({ message: 'Vaccination record not found' });
    }

    vaccination.status = status;
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 