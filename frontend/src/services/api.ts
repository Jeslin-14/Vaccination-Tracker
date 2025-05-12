import axios from 'axios';
import {
  LoginCredentials,
  Student,
  StudentFormData,
  VaccinationDrive,
  VaccinationDriveFormData,
  VaccinationRecord,
  VaccinationRecordFormData,
  Vaccine,
} from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/api/auth/login', credentials);
        return response.data;
    },
};

export const studentService = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/api/students`);
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }
        return response.json();
    },
    getById: async (id: string) => {
        const response = await fetch(`${API_URL}/api/students/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch student');
        }
        return response.json();
    },
    create: async (data: StudentFormData) => {
        const response = await api.post<Student>('/api/students', data);
        return response.data;
    },
    update: async (id: string, data: StudentFormData) => {
        const response = await api.put<Student>(`/api/students/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/api/students/${id}`);
    },
    bulkImport: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post('/api/students/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    getVaccinationRecords: async (studentId: string) => {
        const response = await api.get<VaccinationRecord[]>(`/api/students/${studentId}/vaccinations`);
        return response.data;
    },
    addVaccinationRecord: async (studentId: string, data: VaccinationRecordFormData) => {
        const response = await api.post<VaccinationRecord>(`/api/students/${studentId}/vaccinations`, data);
        return response.data;
    },
    updateVaccinationRecord: async (studentId: string, recordId: string, data: VaccinationRecordFormData) => {
        const response = await api.put<VaccinationRecord>(`/api/students/${studentId}/vaccinations/${recordId}`, data);
        return response.data;
    },
    deleteVaccinationRecord: async (studentId: string, recordId: string) => {
        await api.delete(`/api/students/${studentId}/vaccinations/${recordId}`);
    }
};

export const driveService = {
    getAll: async () => {
        const response = await api.get<VaccinationDrive[]>('/api/drives');
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get<VaccinationDrive>(`/api/drives/${id}`);
        return response.data;
    },
    create: async (data: Omit<VaccinationDrive, '_id' | 'status'>) => {
        const response = await api.post<VaccinationDrive>('/api/drives', data);
        return response.data;
    },
    update: async (id: string, data: Partial<VaccinationDrive>) => {
        const response = await api.put<VaccinationDrive>(`/api/drives/${id}`, data);
        return response.data;
    },
    delete: async (id: string) => {
        await api.delete(`/api/drives/${id}`);
    },
    getUpcoming: async () => {
        const response = await api.get<VaccinationDrive[]>('/api/drives/upcoming');
        return response.data;
    },
};

export const dashboardService = {
    getStats: async () => {
        const response = await api.get('/api/dashboard/stats');
        return response.data;
    }
};

// Mock data for development
const mockData = {
    stats: {
        totalStudents: 150,
        vaccinatedStudents: 95,
        vaccinationRate: 63.3
    },
    upcomingDrives: [
        {
            id: 1,
            vaccineName: "DPT Vaccine",
            driveDate: "2024-06-10",
            availableDoses: 100,
            applicableGrades: ["9", "10", "11", "12"],
            status: "SCHEDULED" as const,
            coordinatorId: "coord123",
            location: "School Auditorium",
            notes: "Bring vaccination cards",
            vaccinatedStudentIds: []
        }
    ]
};

// Vaccination Record APIs
export const getVaccinationRecords = async (studentId: string): Promise<VaccinationRecord[]> => {
    const response = await fetch(`${API_URL}/api/vaccination-records?studentId=${studentId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch vaccination records');
    }
    return response.json();
};

export const getVaccinationRecordById = async (recordId: number): Promise<VaccinationRecord> => {
    const response = await fetch(`${API_URL}/api/vaccination-records/${recordId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch vaccination record');
    }
    return response.json();
};

export const createVaccinationRecord = async (record: Partial<VaccinationRecord>): Promise<VaccinationRecord> => {
    const response = await fetch(`${API_URL}/api/vaccination-records`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
    });
    if (!response.ok) {
        throw new Error('Failed to create vaccination record');
    }
    return response.json();
};

export const updateVaccinationRecord = async (recordId: number, record: Partial<VaccinationRecord>): Promise<VaccinationRecord> => {
    const response = await fetch(`${API_URL}/api/vaccination-records/${recordId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
    });
    if (!response.ok) {
        throw new Error('Failed to update vaccination record');
    }
    return response.json();
};

export const deleteVaccinationRecord = async (recordId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/api/vaccination-records/${recordId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete vaccination record');
    }
};

// Vaccine APIs
export const getVaccines = async (): Promise<Vaccine[]> => {
    const response = await api.get('/api/vaccines');
    return response.data;
};

// Vaccination Drive APIs
export const getVaccinationDrives = async (): Promise<VaccinationDrive[]> => {
    const response = await api.get('/api/drives');
    return response.data;
}; 