import { Vaccine } from './vaccine';
import { VaccinationDrive } from './vaccinationDrive';

export interface VaccinationRecord {
    id: number;
    vaccineName: string;
    dateAdministered: string;
    administeredBy: string;
    // Add other fields if needed
}

export interface VaccinationRecordFormData {
    studentId: string;
    vaccineId: number;
    driveId: number;
    dateAdministered: string;
    batchNumber: string;
}