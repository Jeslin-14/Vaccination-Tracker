package com.example.vaccination.controller;

import com.example.vaccination.model.Vaccine;
import com.example.vaccination.service.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vaccines")
public class VaccineController {

    @Autowired
    private VaccineService vaccineService;

    @GetMapping
    public ResponseEntity<List<Vaccine>> getAllVaccines() {
        return new ResponseEntity<>(vaccineService.getAllVaccines(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vaccine> getVaccineById(@PathVariable Long id) {
        Optional<Vaccine> vaccine = vaccineService.getVaccineById(id);
        return vaccine.map(v -> new ResponseEntity<>(v, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Vaccine> createVaccine(@RequestBody Vaccine vaccine) {
        Vaccine savedVaccine = vaccineService.saveVaccine(vaccine);
        return new ResponseEntity<>(savedVaccine, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vaccine> updateVaccine(@PathVariable Long id, @RequestBody Vaccine vaccine) {
        Optional<Vaccine> existingVaccine = vaccineService.getVaccineById(id);
        if (existingVaccine.isPresent()) {
            vaccine.setVaccineId(id);
            Vaccine updatedVaccine = vaccineService.saveVaccine(vaccine);
            return new ResponseEntity<>(updatedVaccine, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVaccine(@PathVariable Long id) {
        vaccineService.deleteVaccine(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}