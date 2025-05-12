import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { VaccinationRecord, VaccinationRecordFormData } from '../types';
import { Vaccine } from '../types';
import { VaccinationDrive } from '../types';
import { getVaccines, getVaccinationDrives } from '../services/api';

interface VaccinationRecordFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: VaccinationRecordFormData) => Promise<void>;
  initialData?: VaccinationRecord;
  studentId: string;
}

export const VaccinationRecordForm: React.FC<VaccinationRecordFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  studentId,
}) => {
  const [formData, setFormData] = useState<VaccinationRecordFormData>({
    studentId,
    vaccineId: 0,
    driveId: 0,
    dateAdministered: new Date().toISOString().split('T')[0],
    batchNumber: '',
  });
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [drives, setDrives] = useState<VaccinationDrive[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      loadFormData();
      if (initialData) {
        setFormData({
          studentId,
          vaccineId: initialData.id,
          driveId: 0,
          dateAdministered: new Date(initialData.dateAdministered).toISOString().split('T')[0],
          batchNumber: '',
        });
      }
    }
  }, [open, initialData, studentId]);

  const loadFormData = async () => {
    try {
      setLoading(true);
      const [vaccinesData, drivesData] = await Promise.all([
        getVaccines(),
        getVaccinationDrives(),
      ]);
      setVaccines(vaccinesData);
      setDrives(drivesData);
      setError(null);
    } catch (err) {
      setError('Failed to load form data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof VaccinationRecordFormData) => (
    event: SelectChangeEvent<string | number> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setFormData((prev: VaccinationRecordFormData) => ({
      ...prev,
      [field]: field === 'vaccineId' || field === 'driveId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError('Failed to save vaccination record');
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {initialData ? 'Edit Vaccination Record' : 'Add Vaccination Record'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Vaccine</InputLabel>
            <Select<number>
              value={formData.vaccineId}
              onChange={handleChange('vaccineId') as (event: SelectChangeEvent<number>) => void}
              required
            >
              {vaccines.map((vaccine) => (
                <MenuItem key={vaccine.vaccineId} value={vaccine.vaccineId}>
                  {vaccine.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Vaccination Drive</InputLabel>
            <Select
              labelId="drive-select-label"
              id="drive-select"
              value={formData.driveId}
              onChange={handleChange('driveId') as (event: SelectChangeEvent<number>) => void}
              required
            >
              {drives.map((drive) => (
                <MenuItem key={drive.id} value={drive.id}>
                  {drive.vaccineName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            type="date"
            label="Date Administered"
            value={formData.dateAdministered}
            onChange={handleChange('dateAdministered')}
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Batch Number"
            value={formData.batchNumber}
            onChange={handleChange('batchNumber')}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 