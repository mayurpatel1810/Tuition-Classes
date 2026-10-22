package com.example.tuition.service;

import com.example.tuition.dto.request.AnnouncementRequestDTO;
import com.example.tuition.dto.response.AnnouncementResponseDTO;

import java.util.List;

public interface AnnouncementService {
    /** Public website: only active announcements. */
    List<AnnouncementResponseDTO> getActive();

    /** Admin panel: every announcement, including inactive ones. */
    List<AnnouncementResponseDTO> getAll();

    AnnouncementResponseDTO create(AnnouncementRequestDTO dto);
    AnnouncementResponseDTO update(Long id, AnnouncementRequestDTO dto);
    void delete(Long id);
}
