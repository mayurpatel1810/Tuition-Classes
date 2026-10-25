package com.example.tuition.service;

import com.example.tuition.dto.request.FacultyRequestDTO;
import com.example.tuition.dto.response.FacultyResponseDTO;

import java.util.List;

public interface FacultyService {
    List<FacultyResponseDTO> getAll();
    FacultyResponseDTO getById(Long id);
    FacultyResponseDTO create(FacultyRequestDTO dto);
    FacultyResponseDTO update(Long id, FacultyRequestDTO dto);
    void delete(Long id);
}
