import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VaccinationRecord } from '../types';
import { getVaccinationRecords, deleteVaccinationRecord } from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

interface VaccinationRecordListProps {
  studentId: string;
  onEdit: (record: VaccinationRecord) => void;
  onAdd: () => void;
}

export const VaccinationRecordList: React.FC<VaccinationRecordListProps> = ({
  studentId,
  onEdit,
  onAdd,
}) => {
  const [records, setRecords] = useState<VaccinationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadVaccinationRecords();
  }, [studentId]);

  const loadVaccinationRecords = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/students/${studentId}/vaccinations`);
      setRecords(response.data);
      setError(null);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError('Student not found. Please add the student first.');
      } else {
        setError('Failed to load vaccination records');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (recordId: number) => {
    if (window.confirm('Are you sure you want to delete this vaccination record?')) {
      try {
        await deleteVaccinationRecord(recordId);
        await loadVaccinationRecords();
      } catch (err) {
        setError('Failed to delete vaccination record');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <Typography>Loading vaccination records...</Typography>;
  }

  if (error === 'Student not found. Please add the student first.') {
    return (
      <div>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Typography variant="h6">Vaccination Records</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAdd}
        >
          Add Record
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vaccine</TableCell>
              <TableCell>Date Administered</TableCell>
              <TableCell>Administered By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No vaccination records found
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.vaccineName}</TableCell>
                  <TableCell>{new Date(record.dateAdministered).toLocaleDateString()}</TableCell>
                  <TableCell>{record.administeredBy}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(record)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(record.id)} size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}; 