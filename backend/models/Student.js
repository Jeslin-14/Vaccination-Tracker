const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String, // or Date if you want strict date handling
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  vaccinationRecords: {
    type: Array,
    default: [],
  }
}, { timestamps: true });

// Create indexes for faster searching
studentSchema.index({ studentId: 1 });
studentSchema.index({ firstName: 'text' });
studentSchema.index({ lastName: 'text' });
studentSchema.index({ grade: 1 });
studentSchema.index({ section: 1 });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student; 