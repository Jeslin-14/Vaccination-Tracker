package com.example.vaccination.repository;

import com.example.vaccination.model.Vaccine;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccineRepository extends JpaRepository<Vaccine, Long> {

	List<Vaccine> findAll();
    // You can add custom query methods here if needed

	Optional<Vaccine> findById(Long vaccineId);

	Vaccine save(Vaccine vaccine);

	void deleteById(Long vaccineId);
}