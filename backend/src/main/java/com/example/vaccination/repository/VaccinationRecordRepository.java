package com.example.vaccination.repository;

import com.example.vaccination.model.VaccinationRecord;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccinationRecordRepository extends JpaRepository<VaccinationRecord, Long> {

	List<VaccinationRecord> findAll();
    // You can add custom query methods here if needed

	Optional<VaccinationRecord> findById(Long recordId);

	VaccinationRecord save(VaccinationRecord vaccinationRecord);

	void deleteById(Long recordId);
}