package com.example.tuition.service.impl;

import com.example.tuition.dto.request.EnquiryRequestDTO;
import com.example.tuition.dto.response.EnquiryResponseDTO;
import com.example.tuition.entity.Enquiry;
import com.example.tuition.exception.ResourceNotFoundException;
import com.example.tuition.mapper.EnquiryMapper;
import com.example.tuition.repository.EnquiryRepository;
import com.example.tuition.service.EnquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnquiryServiceImpl implements EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final EnquiryMapper enquiryMapper;

    @Override
    @Transactional(readOnly = true)
    public List<EnquiryResponseDTO> getAll() {
        // Newest enquiries first so the admin sees fresh leads at the top
        return enquiryRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream().map(enquiryMapper::toResponseDTO).toList();
    }

    @Override
    @Transactional
    public EnquiryResponseDTO create(EnquiryRequestDTO dto) {
        Enquiry saved = enquiryRepository.save(enquiryMapper.toEntity(dto));
        return enquiryMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public EnquiryResponseDTO updateStatus(Long id, String status) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));
        enquiry.setStatus(status);
        return enquiryMapper.toResponseDTO(enquiryRepository.save(enquiry));
    }
}
