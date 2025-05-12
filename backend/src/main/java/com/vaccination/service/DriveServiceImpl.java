package com.vaccination.service;

import com.vaccination.model.VaccinationDrive;
import com.vaccination.repository.DriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DriveServiceImpl implements DriveService {

    @Autowired
    private DriveRepository driveRepository;

    @Override
    public List<VaccinationDrive> getAllDrives() {
        return driveRepository.findAll();
    }

    @Override
    public VaccinationDrive getDriveById(String id) {
        return driveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drive not found with id: " + id));
    }

    @Override
    public VaccinationDrive createDrive(VaccinationDrive drive) {
        return driveRepository.save(drive);
    }

    @Override
    public VaccinationDrive updateDrive(String id, VaccinationDrive drive) {
        VaccinationDrive existingDrive = getDriveById(id);
        // Update fields
        existingDrive.setVaccineName(drive.getVaccineName());
        existingDrive.setDriveDate(drive.getDriveDate());
        existingDrive.setAvailableDoses(drive.getAvailableDoses());
        existingDrive.setApplicableGrades(drive.getApplicableGrades());
        existingDrive.setLocation(drive.getLocation());
        existingDrive.setStatus(drive.getStatus());
        return driveRepository.save(existingDrive);
    }

    @Override
    public void deleteDrive(String id) {
        driveRepository.deleteById(id);
    }

    @Override
    public List<VaccinationDrive> getUpcomingDrives() {
        String today = LocalDate.now().toString();
        return driveRepository.findByDriveDateGreaterThanEqual(today);
    }
} 