package com.example.tuition.mapper;

import com.example.tuition.dto.request.TopperRequestDTO;
import com.example.tuition.dto.response.TopperResponseDTO;
import com.example.tuition.entity.Topper;
import org.springframework.stereotype.Component;

@Component
public class TopperMapper {

    public Topper toEntity(TopperRequestDTO dto) {
        return Topper.builder()
                .studentName(dto.getStudentName())
                .className(dto.getClassName())
                .percentage(dto.getPercentage())
                .rank(dto.getRank())
                .exam(dto.getExam())
                .year(dto.getYear())
                .achievement(dto.getAchievement())
                .photoUrl(dto.getPhotoUrl())
                .build();
    }

    public void updateEntity(Topper topper, TopperRequestDTO dto) {
        topper.setStudentName(dto.getStudentName());
        topper.setClassName(dto.getClassName());
        topper.setPercentage(dto.getPercentage());
        topper.setRank(dto.getRank());
        topper.setExam(dto.getExam());
        topper.setYear(dto.getYear());
        topper.setAchievement(dto.getAchievement());
        topper.setPhotoUrl(dto.getPhotoUrl());
    }

    public TopperResponseDTO toResponseDTO(Topper topper) {
        return TopperResponseDTO.builder()
                .id(topper.getId())
                .studentName(topper.getStudentName())
                .className(topper.getClassName())
                .percentage(topper.getPercentage())
                .rank(topper.getRank())
                .exam(topper.getExam())
                .year(topper.getYear())
                .achievement(topper.getAchievement())
                .photoUrl(topper.getPhotoUrl())
                .createdAt(topper.getCreatedAt())
                .build();
    }
}
