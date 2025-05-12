package com.vaccination.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "vaccinationDrives")
public class VaccinationDrive {
    @Id
    private String id;
    private String vaccineName;
    private String driveDate;
    private int availableDoses;
    private List<String> applicableGrades;
    private String location;
    private String status;

    // Constructors
    public VaccinationDrive() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVaccineName() {
        return vaccineName;
    }

    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }

    public String getDriveDate() {
        return driveDate;
    }

    public void setDriveDate(String driveDate) {
        this.driveDate = driveDate;
    }

    public int getAvailableDoses() {
        return availableDoses;
    }

    public void setAvailableDoses(int availableDoses) {
        this.availableDoses = availableDoses;
    }

    public List<String> getApplicableGrades() {
        return applicableGrades;
    }

    public void setApplicableGrades(List<String> applicableGrades) {
        this.applicableGrades = applicableGrades;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
} 