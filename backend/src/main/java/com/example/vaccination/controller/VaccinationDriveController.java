package com.example.vaccination.controller;

import com.example.vaccination.model.VaccinationDrive;
import com.example.vaccination.service.VaccinationDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vaccination-drives")
public class VaccinationDriveController {

    @Autowired
    private VaccinationDriveService vaccinationDriveService;

    @GetMapping
    public ResponseEntity<List<VaccinationDrive>> getAllVaccinationDrives() {
        return new ResponseEntity<>(vaccinationDriveService.getAllVaccinationDrives(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccinationDrive> getVaccinationDriveById(@PathVariable Long id) {
        Optional<VaccinationDrive> drive = vaccinationDriveService.getVaccinationDriveById(id);
        return drive.map(d -> new ResponseEntity<>(d, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<VaccinationDrive> createVaccinationDrive(@RequestBody VaccinationDrive vaccinationDrive) {
        VaccinationDrive savedDrive = vaccinationDriveService.saveVaccinationDrive(vaccinationDrive);
        return new ResponseEntity<>(savedDrive, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VaccinationDrive> updateVaccinationDrive(@PathVariable Long id, @RequestBody VaccinationDrive vaccinationDrive) {
        Optional<VaccinationDrive> existingDrive = vaccinationDriveService.getVaccinationDriveById(id);
        if (existingDrive.isPresent()) {
            vaccinationDrive.setDriveId(id);
            VaccinationDrive updatedDrive = vaccinationDriveService.saveVaccinationDrive(vaccinationDrive);
            return new ResponseEntity<>(updatedDrive, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVaccinationDrive(@PathVariable Long id) {
        vaccinationDriveService.deleteVaccinationDrive(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // You'll add more endpoints here for enrolling students and managing vaccines in a drive
}