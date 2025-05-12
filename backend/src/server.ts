import express, { Request, Response } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import multer from 'multer';
import { parse } from 'csv-parse';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 8080;

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

interface Student {
    id: number;
    studentId: string;
    firstName: string;
    lastName: string;
    grade: string;
    section: string;
    dateOfBirth: string;
    parentName: string;
    contactNumber: string;
    vaccinationRecords: any[];
}

let students: Student[] = [];
let studentIdCounter = 1;

// ... your other routes ...

// Bulk import students from CSV
app.post('/api/students/bulk-import', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const results: Student[] = [];
    const errors: Array<{ row: any; error: string }> = [];

    fs.createReadStream(req.file.path)
        .pipe(parse({
            columns: true,
            skip_empty_lines: true,
            trim: true
        }))
        .on('data', (row: any) => {
            try {
                // Validate required fields
                const requiredFields = ['studentId', 'firstName', 'lastName', 'grade', 'section', 'dateOfBirth', 'parentName', 'contactNumber'];
                const missingFields = requiredFields.filter(field => !row[field]);
                if (missingFields.length > 0) {
                    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
                }
                // Check for duplicate studentId
                if (students.some(s => s.studentId === row.studentId)) {
                    throw new Error(`Duplicate studentId: ${row.studentId}`);
                }
                const student: Student = {
                    id: studentIdCounter++,
                    studentId: row.studentId,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    grade: row.grade,
                    section: row.section,
                    dateOfBirth: row.dateOfBirth,
                    parentName: row.parentName,
                    contactNumber: row.contactNumber,
                    vaccinationRecords: []
                };
                students.push(student);
                results.push(student);
            } catch (error: any) {
                errors.push({ row, error: error.message });
            }
        })
        .on('end', () => {
            fs.unlinkSync(req.file!.path);
            res.json({
                message: 'Bulk import completed',
                imported: results.length,
                errors: errors.length,
                errorDetails: errors
            });
        })
        .on('error', (error: Error) => {
            res.status(500).json({
                message: 'Error processing CSV file',
                error: error.message
            });
        });
});

// Dashboard stats mock endpoint
app.get('/api/dashboard/stats', (req: Request, res: Response) => {
    res.json({
        totalStudents: students.length,
        vaccinatedStudents: students.filter(s => s.vaccinationRecords.length > 0).length,
        vaccinationRate: students.length === 0 ? 0 : Math.round((students.filter(s => s.vaccinationRecords.length > 0).length / students.length) * 100)
    });
});

// Drives upcoming mock endpoint
app.get('/api/drives/upcoming', (req: Request, res: Response) => {
    // You can replace this with your real drives array if you have one
    res.json([]);
});

// ... your other routes and app.listen ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // ...
});