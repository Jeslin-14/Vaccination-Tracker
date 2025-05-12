import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { VaccinationRecordList } from '../components/VaccinationRecordList';
import { VaccinationRecordForm } from '../components/VaccinationRecordForm';
import { VaccinationRecord, VaccinationRecordFormData, Student } from '../types';
import { studentService, createVaccinationRecord, updateVaccinationRecord } from '../services/api';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

interface AddVaccinationRecordFormProps {
  studentId: string;
  onRecordAdded: () => void;
}

const AddVaccinationRecordForm: React.FC<AddVaccinationRecordFormProps> = ({ studentId, onRecordAdded }) => {
  const [vaccineName, setVaccineName] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [administeredBy, setAdministeredBy] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/api/students/${studentId}/vaccinations`, {
      vaccineName,
      dateAdministered,
      administeredBy,
    });
    setVaccineName('');
    setDateAdministered('');
    setAdministeredBy('');
    onRecordAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Vaccine Name"
        value={vaccineName}
        onChange={e => setVaccineName(e.target.value)}
        required
      />
      <input
        type="date"
        value={dateAdministered}
        onChange={e => setDateAdministered(e.target.value)}
        required
      />
      <input
        placeholder="Administered By"
        value={administeredBy}
        onChange={e => setAdministeredBy(e.target.value)}
        required
      />
      <button type="submit">Add Vaccination Record</button>
    </form>
  );
};

const StudentVaccinationRecords: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<VaccinationRecord | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<VaccinationRecord[]>([]);

  useEffect(() => {
    if (studentId) {
      loadStudent();
    }
  }, [studentId]);

  const loadStudent = async () => {
    try {
      const data = await studentService.getById(studentId as string);
      setStudent(data);
      setRecords(data.vaccinationRecords || []);
      setError(null);
    } catch (err) {
      setError('Failed to load student data');
      console.error(err);
    }
  };

  const fetchVaccinationRecords = async () => {
    try {
      const response = await axios.get(`/api/students/${studentId}/vaccinations`);
      setRecords(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load vaccination records');
    }
  };

  const handleAdd = () => {
    setSelectedRecord(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (record: VaccinationRecord) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const handleSubmit = async (record: VaccinationRecordFormData) => {
    if (!studentId) return;

    try {
      if (selectedRecord) {
        await updateVaccinationRecord(selectedRecord.id, record);
      } else {
        await createVaccinationRecord(record);
      }
      setIsFormOpen(false);
      loadStudent();
    } catch (err) {
      setError('Failed to save vaccination record');
      console.error(err);
    }
  };

  const handleRecordAdded = () => {
    loadStudent();
  };

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!student || !studentId) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Paper sx={{ p: 3, mt: 3 }}>
        <div style={{ marginBottom: '2rem' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/students')}
            sx={{ mb: 2 }}
          >
            Back to Students
          </Button>
          <Typography variant="h4" gutterBottom>
            Vaccination Records for {student.firstName} {student.lastName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Student ID: {student.studentId}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Grade: {student.grade} | Section: {student.section}
          </Typography>
        </div>

        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Vaccine Name</b></TableCell>
                <TableCell><b>Date Administered</b></TableCell>
                <TableCell><b>Administered By</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No vaccination records found
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.vaccineName}</TableCell>
                    <TableCell>{record.dateAdministered}</TableCell>
                    <TableCell>{record.administeredBy}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <VaccinationRecordForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedRecord}
          studentId={studentId as string}
        />

        {/* <AddVaccinationRecordForm studentId={studentId} onRecordAdded={handleRecordAdded} /> */}
      </Paper>
    </Container>
  );
};

export default StudentVaccinationRecords; 