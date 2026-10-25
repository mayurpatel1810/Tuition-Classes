package com.example.tuition.service.impl;

import com.example.tuition.dto.request.TopperRequestDTO;
import com.example.tuition.dto.response.TopperResponseDTO;
import com.example.tuition.entity.Topper;
import com.example.tuition.exception.ResourceNotFoundException;
import com.example.tuition.mapper.TopperMapper;
import com.example.tuition.repository.TopperRepository;
import com.example.tuition.service.TopperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopperServiceImpl implements TopperService {

    private final TopperRepository topperRepository;
    private final TopperMapper topperMapper;

    @Override
    @Transactional(readOnly = true)
    public List<TopperResponseDTO> getAll() {
        return topperRepository.findAll().stream().map(topperMapper::toResponseDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TopperResponseDTO getById(Long id) {
        Topper topper = topperRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topper not found with id: " + id));
        return topperMapper.toResponseDTO(topper);
    }

    @Override
    @Transactional
    public TopperResponseDTO create(TopperRequestDTO dto) {
        Topper topper = topperMapper.toEntity(dto);
        Topper saved = topperRepository.save(topper);
        return topperMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public TopperResponseDTO update(Long id, TopperRequestDTO dto) {
        Topper topper = topperRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Topper not found with id: " + id));
        topperMapper.updateEntity(topper, dto);
        Topper updated = topperRepository.save(topper);
        return topperMapper.toResponseDTO(updated);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!topperRepository.existsById(id)) {
            throw new ResourceNotFoundException("Topper not found with id: " + id);
        }
        topperRepository.deleteById(id);
    }
}
