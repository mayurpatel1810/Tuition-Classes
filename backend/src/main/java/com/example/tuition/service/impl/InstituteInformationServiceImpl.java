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
    // NOTE: must NOT be readOnly — on first call this inserts the default row.
    // A read-only transaction made PostgreSQL reject the INSERT, which broke the
    // admin "Institute Info" page and the public header/footer details.
    @Transactional
    public InstituteInformationResponseDTO get() {
        InstituteInformation info = repository.findAll().stream().findFirst()
                .orElseGet(() -> repository.save(
                        InstituteInformation.builder()
                                .instituteName("Bright Future Institute")
                                .tagline("Excellence in Education, Since 2010")
                                .address("204, Second Floor, Shreeji Complex, Near Vijay Cross Roads, Navrangpura, Ahmedabad, Gujarat 380009")
                                .phone("+91 98765 43210")
                                .email("info@brightfuture.edu")
                                .about("Bright Future Institute has been shaping academic success stories for over a decade, "
                                        + "helping students unlock their full potential through expert mentorship and proven teaching methods.")
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
