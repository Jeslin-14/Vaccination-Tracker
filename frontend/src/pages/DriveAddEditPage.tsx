import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { driveService } from '../services/api';
import { VaccinationDrive } from '../types/vaccinationDrive';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  Box
} from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material';

const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const statusOptions = [
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' }
];

const DriveAddEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { driveId } = useParams();
  const [formData, setFormData] = useState<Partial<VaccinationDrive>>({
    vaccineName: '',
    driveDate: '',
    availableDoses: 0,
    applicableGrades: [],
    location: '',
    status: 'SCHEDULED'
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (driveId) {
      driveService.getById(driveId).then((drive) => {
        setFormData({
          vaccineName: drive.vaccineName,
          driveDate: drive.driveDate,
          availableDoses: drive.availableDoses,
          applicableGrades: drive.applicableGrades,
          location: drive.location,
          status: drive.status || 'SCHEDULED'
        });
      });
    }
  }, [driveId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleGradesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      applicableGrades: typeof value === 'string' ? value.split(',') : value
    }));
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      status: event.target.value as "SCHEDULED" | "COMPLETED" | "CANCELLED"
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (id) {
        await driveService.update(id, formData);
      } else {
        await driveService.create(formData as any);
      }
      navigate('/drives');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save drive');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} style={{ padding: 32, minWidth: 400 }}>
        <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
          {id ? 'Edit Drive' : 'Add New Drive'}
        </Typography>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Vaccine Name"
            value={formData.vaccineName}
            onChange={e => setFormData({ ...formData, vaccineName: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date of Drive"
            type="date"
            value={formData.driveDate ? formData.driveDate.toString().slice(0, 10) : ''}
            onChange={e => setFormData({ ...formData, driveDate: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
            disabled={!!id && new Date(formData.driveDate as string) < new Date()}
          />
          <TextField
            label="Available Doses"
            type="number"
            value={formData.availableDoses}
            onChange={e => setFormData({ ...formData, availableDoses: Number(e.target.value) })}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="grades-label">Applicable Grades</InputLabel>
            <Select
              labelId="grades-label"
              multiple
              value={formData.applicableGrades}
              onChange={handleGradesChange}
              renderValue={selected => (selected as string[]).join(', ')}
            >
              {grades.map(grade => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Location"
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={formData.status}
              label="Status"
              onChange={handleStatusChange}
              required
            >
              {statusOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginLeft: 8 }}
              disabled={!!id && new Date(formData.driveDate as string) < new Date()}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default DriveAddEditPage;
