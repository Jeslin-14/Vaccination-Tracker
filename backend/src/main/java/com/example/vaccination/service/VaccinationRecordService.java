package com.example.vaccination.service;

import com.example.vaccination.model.VaccinationRecord;
import com.example.vaccination.repository.VaccinationRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VaccinationRecordService {

    @Autowired
    private VaccinationRecordRepository vaccinationRecordRepository;

    public List<VaccinationRecord> getAllVaccinationRecords() {
        return vaccinationRecordRepository.findAll();
    }

    public Optional<VaccinationRecord> getVaccinationRecordById(Long recordId) {
        return vaccinationRecordRepository.findById(recordId);
    }

    public VaccinationRecord saveVaccinationRecord(VaccinationRecord vaccinationRecord) {
        return vaccinationRecordRepository.save(vaccinationRecord);
    }

    public void deleteVaccinationRecord(Long recordId) {
        vaccinationRecordRepository.deleteById(recordId);
    }

    // You'll add logic here to ensure data integrity when recording vaccinations
}