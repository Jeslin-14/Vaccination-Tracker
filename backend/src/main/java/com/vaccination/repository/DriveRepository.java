package com.vaccination.repository;

import com.vaccination.model.VaccinationDrive;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriveRepository extends MongoRepository<VaccinationDrive, String> {
    List<VaccinationDrive> findByDriveDateGreaterThanEqual(String date);
} 