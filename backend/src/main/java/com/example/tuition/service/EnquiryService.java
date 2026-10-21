package com.example.tuition.service;

import com.example.tuition.dto.request.EnquiryRequestDTO;
import com.example.tuition.dto.response.EnquiryResponseDTO;

import java.util.List;

public interface EnquiryService {
    List<EnquiryResponseDTO> getAll();
    EnquiryResponseDTO create(EnquiryRequestDTO dto);
    EnquiryResponseDTO updateStatus(Long id, String status);
}
