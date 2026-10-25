package com.example.tuition.controller;

import com.example.tuition.dto.request.InstituteInformationRequestDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.dto.response.InstituteInformationResponseDTO;
import com.example.tuition.service.InstituteInformationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/institute-info")
@RequiredArgsConstructor
public class InstituteInformationController {

    private final InstituteInformationService service;

    @GetMapping
    public ApiResponse<InstituteInformationResponseDTO> get() {
        return ApiResponse.success("Institute information fetched successfully", service.get());
    }

    @PutMapping
    public ApiResponse<InstituteInformationResponseDTO> update(@Valid @RequestBody InstituteInformationRequestDTO dto) {
        return ApiResponse.success("Institute information updated successfully", service.update(dto));
    }
}
