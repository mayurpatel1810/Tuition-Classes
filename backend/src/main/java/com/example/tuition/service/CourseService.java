package com.example.tuition.service;

import com.example.tuition.dto.request.CourseRequestDTO;
import com.example.tuition.dto.response.CourseResponseDTO;

import java.util.List;

public interface CourseService {
    List<CourseResponseDTO> getAll();
    CourseResponseDTO getById(Long id);
    CourseResponseDTO create(CourseRequestDTO dto);
    CourseResponseDTO update(Long id, CourseRequestDTO dto);
    void delete(Long id);
}
