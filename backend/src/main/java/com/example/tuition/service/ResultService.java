package com.example.tuition.service;

import com.example.tuition.dto.request.ResultRequestDTO;
import com.example.tuition.dto.response.ResultResponseDTO;

import java.util.List;

public interface ResultService {
    List<ResultResponseDTO> getFiltered(Integer year, String className, String exam);
    ResultResponseDTO getById(Long id);
    ResultResponseDTO create(ResultRequestDTO dto);
    ResultResponseDTO update(Long id, ResultRequestDTO dto);
    void delete(Long id);
}
