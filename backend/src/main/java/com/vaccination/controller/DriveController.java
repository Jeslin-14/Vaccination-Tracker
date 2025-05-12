package com.vaccination.controller;

import com.vaccination.model.VaccinationDrive;
import com.vaccination.service.DriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drives")
@CrossOrigin(origins = "*")
public class DriveController {

    @Autowired
    private DriveService driveService;

    @GetMapping
    public ResponseEntity<List<VaccinationDrive>> getAllDrives() {
        return ResponseEntity.ok(driveService.getAllDrives());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VaccinationDrive> getDriveById(@PathVariable String id) {
        return ResponseEntity.ok(driveService.getDriveById(id));
    }

    @PostMapping
    public ResponseEntity<VaccinationDrive> createDrive(@RequestBody VaccinationDrive drive) {
        return ResponseEntity.ok(driveService.createDrive(drive));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VaccinationDrive> updateDrive(@PathVariable String id, @RequestBody VaccinationDrive drive) {
        return ResponseEntity.ok(driveService.updateDrive(id, drive));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDrive(@PathVariable String id) {
        driveService.deleteDrive(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<VaccinationDrive>> getUpcomingDrives() {
        return ResponseEntity.ok(driveService.getUpcomingDrives());
    }
} 