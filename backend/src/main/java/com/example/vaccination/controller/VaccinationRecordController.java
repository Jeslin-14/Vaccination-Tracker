package com.example.vaccination.controller;

import com.example.vaccination.model.VaccinationRecord;
import com.example.vaccination.service.VaccinationRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vaccination-records")
public class VaccinationRecordController {

    @Autowired
    private VaccinationRecordService vaccinationRecordService;

    @GetMapping
    public ResponseEntity<List<VaccinationRecord>> getAllVaccinationRecords() {
        return new ResponseEntity<>(vaccinationRecordService.getAllVaccinationRecords(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccinationRecord> getVaccinationRecordById(@PathVariable Long id) {
        Optional<VaccinationRecord> record = vaccinationRecordService.getVaccinationRecordById(id);
        return record.map(r -> new ResponseEntity<>(r, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<VaccinationRecord> createVaccinationRecord(@RequestBody VaccinationRecord vaccinationRecord) {
        VaccinationRecord savedRecord = vaccinationRecordService.saveVaccinationRecord(vaccinationRecord);
        return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VaccinationRecord> updateVaccinationRecord(@PathVariable Long id, @RequestBody VaccinationRecord vaccinationRecord) {
        Optional<VaccinationRecord> existingRecord = vaccinationRecordService.getVaccinationRecordById(id);
        if (existingRecord.isPresent()) {
            vaccinationRecord.setRecordId(id); // Ensure ID is set if needed
            VaccinationRecord updatedRecord = vaccinationRecordService.saveVaccinationRecord(vaccinationRecord);
            return new ResponseEntity<>(updatedRecord, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVaccinationRecord(@PathVariable Long id) {
        vaccinationRecordService.deleteVaccinationRecord(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}