import { VaccinationRecord } from '.';

export interface Student {
    id: string; // MongoDB ObjectId
    studentId: string;
    firstName: string;
    lastName: string;
    grade: string;
    section: string;
    dateOfBirth: string;
    parentName: string;
    contactNumber: string;
    vaccinationRecords: VaccinationRecord[];
}

export interface StudentFormData {
    studentId: string;
    firstName: string;
    lastName: string;
    grade: string;
    section: string;
    dateOfBirth: string;
    parentName: string;
    contactNumber: string;
} 