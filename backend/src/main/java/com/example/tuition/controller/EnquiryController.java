package com.example.tuition.controller;

import com.example.tuition.dto.request.EnquiryRequestDTO;
import com.example.tuition.dto.response.ApiResponse;
import com.example.tuition.dto.response.EnquiryResponseDTO;
import com.example.tuition.service.EnquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
public class EnquiryController {

    private final EnquiryService enquiryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<EnquiryResponseDTO> create(@Valid @RequestBody EnquiryRequestDTO dto) {
        return ApiResponse.success("Enquiry submitted successfully. We'll get back to you soon.", enquiryService.create(dto));
    }

    @GetMapping
    public ApiResponse<List<EnquiryResponseDTO>> getAll() {
        return ApiResponse.success("Enquiries fetched successfully", enquiryService.getAll());
    }

    @PatchMapping("/{id}/status")
    public ApiResponse<EnquiryResponseDTO> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ApiResponse.success("Enquiry status updated successfully", enquiryService.updateStatus(id, body.get("status")));
    }
}
