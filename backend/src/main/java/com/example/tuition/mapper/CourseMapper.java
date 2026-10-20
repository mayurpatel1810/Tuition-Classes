package com.example.tuition.mapper;

import com.example.tuition.dto.request.CourseRequestDTO;
import com.example.tuition.dto.response.CourseResponseDTO;
import com.example.tuition.entity.Course;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {

    public Course toEntity(CourseRequestDTO dto) {
        return Course.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .className(dto.getClassName())
                .subjects(dto.getSubjects())
                .duration(dto.getDuration())
                .fees(dto.getFees())
                .imageUrl(dto.getImageUrl())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
    }

    public void updateEntity(Course course, CourseRequestDTO dto) {
        course.setName(dto.getName());
        course.setDescription(dto.getDescription());
        course.setClassName(dto.getClassName());
        course.setSubjects(dto.getSubjects());
        course.setDuration(dto.getDuration());
        course.setFees(dto.getFees());
        course.setImageUrl(dto.getImageUrl());
        if (dto.getActive() != null) {
            course.setActive(dto.getActive());
        }
    }

    public CourseResponseDTO toResponseDTO(Course course) {
        return CourseResponseDTO.builder()
                .id(course.getId())
                .name(course.getName())
                .description(course.getDescription())
                .className(course.getClassName())
                .subjects(course.getSubjects())
                .duration(course.getDuration())
                .fees(course.getFees())
                .imageUrl(course.getImageUrl())
                .active(course.getActive())
                .build();
    }
}
