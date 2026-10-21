package com.example.tuition.service.impl;

import com.example.tuition.dto.request.GalleryRequestDTO;
import com.example.tuition.dto.response.GalleryResponseDTO;
import com.example.tuition.entity.Gallery;
import com.example.tuition.exception.ResourceNotFoundException;
import com.example.tuition.mapper.GalleryMapper;
import com.example.tuition.repository.GalleryRepository;
import com.example.tuition.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {

    private final GalleryRepository galleryRepository;
    private final GalleryMapper galleryMapper;

    @Override
    @Transactional(readOnly = true)
    public List<GalleryResponseDTO> getAll(String category) {
        List<Gallery> items = (category != null && !category.isBlank())
                ? galleryRepository.findByCategory(category)
                : galleryRepository.findAll();
        return items.stream().map(galleryMapper::toResponseDTO).toList();
    }

    @Override
    @Transactional
    public GalleryResponseDTO create(GalleryRequestDTO dto) {
        Gallery saved = galleryRepository.save(galleryMapper.toEntity(dto));
        return galleryMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public GalleryResponseDTO update(Long id, GalleryRequestDTO dto) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));
        galleryMapper.updateEntity(gallery, dto);
        return galleryMapper.toResponseDTO(galleryRepository.save(gallery));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!galleryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Gallery item not found with id: " + id);
        }
        galleryRepository.deleteById(id);
    }
}
