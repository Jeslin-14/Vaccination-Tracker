package com.example.vaccination.service;

import com.example.vaccination.model.Vaccine;
import com.example.vaccination.repository.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VaccineService {

    @Autowired
    private VaccineRepository vaccineRepository;

    public List<Vaccine> getAllVaccines() {
        return vaccineRepository.findAll();
    }

    public Optional<Vaccine> getVaccineById(Long vaccineId) {
        return vaccineRepository.findById(vaccineId);
    }

    public Vaccine saveVaccine(Vaccine vaccine) {
        return vaccineRepository.save(vaccine);
    }

    public void deleteVaccine(Long vaccineId) {
        vaccineRepository.deleteById(vaccineId);
    }
}