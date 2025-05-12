package com.example.vaccination.controller;

import com.example.vaccination.model.User; // You might still want the User entity
import com.example.vaccination.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private static final String HARDCODED_USERNAME = "admin";
    private static final String HARDCODED_PASSWORD = "password";
    private static boolean isLoggedIn = false; // Simple flag for demonstration

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        if (HARDCODED_USERNAME.equals(loginRequest.getUsername()) &&
            HARDCODED_PASSWORD.equals(loginRequest.getPasswordHash())) {
            isLoggedIn = true;
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    // You might add a simple endpoint to check if the user is logged in for demonstration
    @GetMapping("/status")
    public ResponseEntity<Boolean> getLoginStatus() {
        return new ResponseEntity<>(isLoggedIn, HttpStatus.OK);
    }

    // In a real app, you'd handle logout, but for this simple case, you might skip it
}