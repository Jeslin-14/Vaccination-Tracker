package com.example.vaccination.repository;

import com.example.vaccination.model.Student;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

	Optional<Student> findById(String studentId);
    // You can add custom query methods here if needed

	List<Student> findAll();

	Student save(Student student);

	void deleteById(String studentId);
	
	
}
