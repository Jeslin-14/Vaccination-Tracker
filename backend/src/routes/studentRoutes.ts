import { Router, Request, Response } from 'express';
import { students } from '../server'; // Adjust the path as needed

const router = Router();

// In-memory storage for drives
let drives: any[] = [];
let driveIdCounter = 1;

// In-memory storage for students (reuse if already declared in this file)
let studentIdCounter = 1;

// POST /api/drives - Create a new vaccination drive
router.post('/drives', (req: Request, res: Response) => {
  try {
    const drive = {
      id: driveIdCounter++,
      ...req.body,
    };
    drives.push(drive);
    res.status(201).json(drive);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create drive', error });
  }
});

// (Optional) GET /api/drives - List all drives
router.get('/drives', (req: Request, res: Response) => {
  res.json(drives);
});

// Example route to verify setup
router.get('/test', (req: Request, res: Response) => {
  res.send('Student routes are working!');
});

// Minimal report: List all students and their vaccination status
router.get('/report', (req: Request, res: Response) => {
  const report = students.map(student => {
    const vaccinesReceived = student.vaccinationRecords?.map((v: any) => v.vaccineName) || [];
    const isVaccinated = vaccinesReceived.length > 0;
    let status = "Not started";
    if (isVaccinated) {
      // If you have due dates, you can add overdue logic here
      status = "Up-to-date";
    }
    return {
      studentId: student.studentId,
      name: `${student.firstName} ${student.lastName}`,
      grade: student.grade,
      section: student.section,
      vaccinated: isVaccinated ? "Yes" : "No",
      vaccinesReceived,
      status
    };
  });
  res.json(report);
});

export default router;