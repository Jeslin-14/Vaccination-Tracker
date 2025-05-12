package com.vaccination.tracker.repository;

import com.vaccination.tracker.model.VaccinationDrive;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VaccinationDriveRepository extends MongoRepository<VaccinationDrive, String> {
    List<VaccinationDrive> findByDriveDateBetween(LocalDate startDate, LocalDate endDate);
    List<VaccinationDrive> findByApplicableGradesContaining(String grade);
    List<VaccinationDrive> findByStatus(String status);
    List<VaccinationDrive> findByVaccineName(String vaccineName);
} 