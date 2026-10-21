package com.example.tuition.service.impl;

import com.example.tuition.dto.request.InstituteInformationRequestDTO;
import com.example.tuition.dto.response.InstituteInformationResponseDTO;
import com.example.tuition.entity.InstituteInformation;
import com.example.tuition.mapper.InstituteInformationMapper;
import com.example.tuition.repository.InstituteInformationRepository;
import com.example.tuition.service.InstituteInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InstituteInformationServiceImpl implements InstituteInformationService {

    private final InstituteInformationRepository repository;
    private final InstituteInformationMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public InstituteInformationResponseDTO get() {
        InstituteInformation info = repository.findAll().stream().findFirst()
                .orElseGet(() -> repository.save(
                        InstituteInformation.builder()
                                .instituteName("Your Institute Name")
                                .tagline("Excellence in Education")
                                .build()
                ));
        return mapper.toResponseDTO(info);
    }

    @Override
    @Transactional
    public InstituteInformationResponseDTO update(InstituteInformationRequestDTO dto) {
        InstituteInformation info = repository.findAll().stream().findFirst()
                .orElseGet(InstituteInformation::new);
        mapper.updateEntity(info, dto);
        return mapper.toResponseDTO(repository.save(info));
    }
}
