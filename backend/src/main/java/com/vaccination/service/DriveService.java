package com.vaccination.service;

import com.vaccination.model.VaccinationDrive;
import java.util.List;

public interface DriveService {
    List<VaccinationDrive> getAllDrives();
    VaccinationDrive getDriveById(String id);
    VaccinationDrive createDrive(VaccinationDrive drive);
    VaccinationDrive updateDrive(String id, VaccinationDrive drive);
    void deleteDrive(String id);
    List<VaccinationDrive> getUpcomingDrives();
} 