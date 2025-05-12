package com.vaccination.tracker.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "vaccination_drives")
public class VaccinationDrive {
    @Id
    private String id;
    private String vaccineName;
    private LocalDate driveDate;
    private int availableDoses;
    private List<String> applicableGrades;
    private String status; // SCHEDULED, COMPLETED, CANCELLED
    private String coordinatorId;
    private String location;
    private String notes;
    private List<String> vaccinatedStudentIds;
    
    public boolean isEditable() {
        return driveDate.isAfter(LocalDate.now().plusDays(1));
    }
} 