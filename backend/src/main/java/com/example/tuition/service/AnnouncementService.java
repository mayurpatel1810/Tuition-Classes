package com.example.tuition.service;

import com.example.tuition.dto.request.AnnouncementRequestDTO;
import com.example.tuition.dto.response.AnnouncementResponseDTO;

import java.util.List;

public interface AnnouncementService {
    List<AnnouncementResponseDTO> getActive();
    AnnouncementResponseDTO create(AnnouncementRequestDTO dto);
    AnnouncementResponseDTO update(Long id, AnnouncementRequestDTO dto);
    void delete(Long id);
}
