package com.example.tuition.mapper;

import com.example.tuition.dto.request.FacultyRequestDTO;
import com.example.tuition.dto.response.FacultyResponseDTO;
import com.example.tuition.entity.Faculty;
import org.springframework.stereotype.Component;

@Component
public class FacultyMapper {

    public Faculty toEntity(FacultyRequestDTO dto) {
        return Faculty.builder()
                .name(dto.getName())
                .subject(dto.getSubject())
                .qualification(dto.getQualification())
                .experience(dto.getExperience())
                .description(dto.getDescription())
                .photoUrl(dto.getPhotoUrl())
                .build();
    }

    public void updateEntity(Faculty faculty, FacultyRequestDTO dto) {
        faculty.setName(dto.getName());
        faculty.setSubject(dto.getSubject());
        faculty.setQualification(dto.getQualification());
        faculty.setExperience(dto.getExperience());
        faculty.setDescription(dto.getDescription());
        faculty.setPhotoUrl(dto.getPhotoUrl());
    }

    public FacultyResponseDTO toResponseDTO(Faculty faculty) {
        return FacultyResponseDTO.builder()
                .id(faculty.getId())
                .name(faculty.getName())
                .subject(faculty.getSubject())
                .qualification(faculty.getQualification())
                .experience(faculty.getExperience())
                .description(faculty.getDescription())
                .photoUrl(faculty.getPhotoUrl())
                .build();
    }
}
