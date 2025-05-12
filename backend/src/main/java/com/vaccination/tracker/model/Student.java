package com.vaccination.tracker.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "students")
public class Student {
    @Id
    private String id;
    private String studentId;
    private String firstName;
    private String lastName;
    private String grade;
    private String section;
    private LocalDate dateOfBirth;
    private String parentName;
    private String contactNumber;
    private List<VaccinationRecord> vaccinationRecords;
    
    @Data
    public static class VaccinationRecord {
        private String vaccineName;
        private LocalDate vaccinationDate;
        private String driveId;
        private String administeredBy;
    }
} 