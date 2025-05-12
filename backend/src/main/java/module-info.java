module com.example.vaccinationtracker {
    opens com.example.vaccination to spring.core;
    opens com.example.vaccination.controller to spring.core;
    opens com.example.vaccination.model to org.hibernate.orm.core; // Corrected line
    opens com.example.vaccination.repository to spring.core;
    opens com.example.vaccination.service to spring.core;

    requires jakarta.persistence;
    requires java.xml;
    requires spring.web;
    requires spring.boot;
    requires spring.boot.autoconfigure;
    requires spring.context;
    requires spring.beans;
    requires spring.core;
    requires spring.data.jpa;
    requires org.hibernate.orm.core; // Added line
}
