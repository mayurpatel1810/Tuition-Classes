package com.example.tuition.mapper;

import com.example.tuition.dto.request.InstituteInformationRequestDTO;
import com.example.tuition.dto.response.InstituteInformationResponseDTO;
import com.example.tuition.entity.InstituteInformation;
import org.springframework.stereotype.Component;

@Component
public class InstituteInformationMapper {

    public void updateEntity(InstituteInformation info, InstituteInformationRequestDTO dto) {
        info.setInstituteName(dto.getInstituteName());
        info.setTagline(dto.getTagline());
        info.setAddress(dto.getAddress());
        info.setPhone(dto.getPhone());
        info.setEmail(dto.getEmail());
        info.setAbout(dto.getAbout());
        info.setLogoUrl(dto.getLogoUrl());
    }

    public InstituteInformationResponseDTO toResponseDTO(InstituteInformation info) {
        return InstituteInformationResponseDTO.builder()
                .id(info.getId())
                .instituteName(info.getInstituteName())
                .tagline(info.getTagline())
                .address(info.getAddress())
                .phone(info.getPhone())
                .email(info.getEmail())
                .about(info.getAbout())
                .logoUrl(info.getLogoUrl())
                .build();
    }
}
