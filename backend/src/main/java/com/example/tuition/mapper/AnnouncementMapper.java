package com.example.tuition.mapper;

import com.example.tuition.dto.request.AnnouncementRequestDTO;
import com.example.tuition.dto.response.AnnouncementResponseDTO;
import com.example.tuition.entity.Announcement;
import org.springframework.stereotype.Component;

@Component
public class AnnouncementMapper {

    public Announcement toEntity(AnnouncementRequestDTO dto) {
        return Announcement.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .announcementDate(dto.getAnnouncementDate())
                .important(dto.getImportant() != null ? dto.getImportant() : false)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
    }

    public void updateEntity(Announcement announcement, AnnouncementRequestDTO dto) {
        announcement.setTitle(dto.getTitle());
        announcement.setDescription(dto.getDescription());
        announcement.setAnnouncementDate(dto.getAnnouncementDate());
        if (dto.getImportant() != null) announcement.setImportant(dto.getImportant());
        if (dto.getActive() != null) announcement.setActive(dto.getActive());
    }

    public AnnouncementResponseDTO toResponseDTO(Announcement announcement) {
        return AnnouncementResponseDTO.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .description(announcement.getDescription())
                .announcementDate(announcement.getAnnouncementDate())
                .important(announcement.getImportant())
                .active(announcement.getActive())
                .build();
    }
}
