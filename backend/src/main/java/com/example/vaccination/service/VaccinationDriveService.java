package com.example.vaccination.service;

import com.example.vaccination.model.VaccinationDrive;
import com.example.vaccination.repository.VaccinationDriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VaccinationDriveService {

    @Autowired
    private VaccinationDriveRepository vaccinationDriveRepository;

    public List<VaccinationDrive> getAllVaccinationDrives() {
        return vaccinationDriveRepository.findAll();
    }

    public Optional<VaccinationDrive> getVaccinationDriveById(Long driveId) {
        return vaccinationDriveRepository.findById(driveId);
    }

    public VaccinationDrive saveVaccinationDrive(VaccinationDrive vaccinationDrive) {
        return vaccinationDriveRepository.save(vaccinationDrive);
    }

    public void deleteVaccinationDrive(Long driveId) {
        vaccinationDriveRepository.deleteById(driveId);
    }

    // You'll likely add methods here to handle enrolling students in drives
    // and managing the vaccines offered in each drive.
}