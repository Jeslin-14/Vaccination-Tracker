package com.example.vaccination.repository;

import com.example.vaccination.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom query methods here, for example, to find a user by username
    User findByUsername(String username);

	Optional<User> findById(Long userId);

	User save(User user);

	void deleteById(Long userId);
}