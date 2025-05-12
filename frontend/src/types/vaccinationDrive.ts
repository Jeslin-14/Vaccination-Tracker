export interface VaccinationDrive {
    id: string | number;
    vaccineName: string;
    driveDate: string;
    availableDoses: number;
    applicableGrades: string[];
    location: string;
    status?: "SCHEDULED" | "COMPLETED" | "CANCELLED";
}

export interface VaccinationDriveFormData {
    name: string;
    date: string;
    location: string;
    coordinatorId: string;
    notes?: string;
}

export interface DashboardStats {
    totalStudents: number;
    vaccinatedStudents: number;
    vaccinationRate: number;
    upcomingDrives: VaccinationDrive[];
} 