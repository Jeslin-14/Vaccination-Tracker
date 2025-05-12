package com.example.vaccination.repository;

import com.example.vaccination.model.VaccinationDrive;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccinationDriveRepository extends JpaRepository<VaccinationDrive, Long> {

	List<VaccinationDrive> findAll();
    // You can add custom query methods here if needed

	Optional<VaccinationDrive> findById(Long driveId);

	VaccinationDrive save(VaccinationDrive vaccinationDrive);

	void deleteById(Long driveId);
}