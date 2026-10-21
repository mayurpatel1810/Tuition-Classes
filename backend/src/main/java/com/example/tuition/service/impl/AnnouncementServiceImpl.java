package com.example.tuition.service.impl;

import com.example.tuition.dto.request.AnnouncementRequestDTO;
import com.example.tuition.dto.response.AnnouncementResponseDTO;
import com.example.tuition.entity.Announcement;
import com.example.tuition.exception.ResourceNotFoundException;
import com.example.tuition.mapper.AnnouncementMapper;
import com.example.tuition.repository.AnnouncementRepository;
import com.example.tuition.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;

    @Override
    @Transactional(readOnly = true)
    public List<AnnouncementResponseDTO> getActive() {
        return announcementRepository.findByActiveTrueOrderByAnnouncementDateDesc()
                .stream().map(announcementMapper::toResponseDTO).toList();
    }

    @Override
    @Transactional
    public AnnouncementResponseDTO create(AnnouncementRequestDTO dto) {
        Announcement saved = announcementRepository.save(announcementMapper.toEntity(dto));
        return announcementMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public AnnouncementResponseDTO update(Long id, AnnouncementRequestDTO dto) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Announcement not found with id: " + id));
        announcementMapper.updateEntity(announcement, dto);
        return announcementMapper.toResponseDTO(announcementRepository.save(announcement));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!announcementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Announcement not found with id: " + id);
        }
        announcementRepository.deleteById(id);
    }
}
