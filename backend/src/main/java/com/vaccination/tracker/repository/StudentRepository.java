package com.vaccination.tracker.repository;

import com.vaccination.tracker.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {
    List<Student> findByGradeAndSection(String grade, String section);
    List<Student> findByFirstNameContainingOrLastNameContaining(String firstName, String lastName);
    List<Student> findByStudentId(String studentId);
    List<Student> findByVaccinationRecords_VaccineName(String vaccineName);
} 