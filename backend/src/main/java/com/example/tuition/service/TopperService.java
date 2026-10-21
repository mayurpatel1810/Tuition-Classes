package com.example.tuition.service;

import com.example.tuition.dto.request.TopperRequestDTO;
import com.example.tuition.dto.response.TopperResponseDTO;

import java.util.List;

public interface TopperService {
    List<TopperResponseDTO> getAll();
    TopperResponseDTO getById(Long id);
    TopperResponseDTO create(TopperRequestDTO dto);
    TopperResponseDTO update(Long id, TopperRequestDTO dto);
    void delete(Long id);
}
