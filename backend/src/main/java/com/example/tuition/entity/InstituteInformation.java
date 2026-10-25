package com.example.tuition.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "institute_information")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstituteInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "institute_name", nullable = false)
    private String instituteName;

    private String tagline;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String phone;

    private String email;

    @Column(columnDefinition = "TEXT")
    private String about;

    @Column(name = "logo_url")
    private String logoUrl;
}
