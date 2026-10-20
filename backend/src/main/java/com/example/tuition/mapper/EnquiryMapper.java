package com.example.tuition.mapper;

import com.example.tuition.dto.request.EnquiryRequestDTO;
import com.example.tuition.dto.response.EnquiryResponseDTO;
import com.example.tuition.entity.Enquiry;
import org.springframework.stereotype.Component;

@Component
public class EnquiryMapper {

    public Enquiry toEntity(EnquiryRequestDTO dto) {
        return Enquiry.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .message(dto.getMessage())
                .build();
    }

    public EnquiryResponseDTO toResponseDTO(Enquiry enquiry) {
        return EnquiryResponseDTO.builder()
                .id(enquiry.getId())
                .name(enquiry.getName())
                .email(enquiry.getEmail())
                .phone(enquiry.getPhone())
                .message(enquiry.getMessage())
                .status(enquiry.getStatus())
                .createdAt(enquiry.getCreatedAt())
                .build();
    }
}
