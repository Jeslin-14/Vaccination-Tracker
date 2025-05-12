package com.vaccination.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableMongoAuditing
@ComponentScan("com.vaccination")
public class VaccinationTrackerApplication {
    public static void main(String[] args) {
        SpringApplication.run(VaccinationTrackerApplication.class, args);
    }
} 