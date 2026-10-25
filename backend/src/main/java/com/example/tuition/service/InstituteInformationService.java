package com.example.tuition.service;

import com.example.tuition.dto.request.InstituteInformationRequestDTO;
import com.example.tuition.dto.response.InstituteInformationResponseDTO;

public interface InstituteInformationService {
    InstituteInformationResponseDTO get();
    InstituteInformationResponseDTO update(InstituteInformationRequestDTO dto);
}
