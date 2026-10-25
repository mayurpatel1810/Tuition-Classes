package com.example.tuition.service.impl;

import com.example.tuition.dto.request.FacultyRequestDTO;
import com.example.tuition.dto.response.FacultyResponseDTO;
import com.example.tuition.entity.Faculty;
import com.example.tuition.exception.ResourceNotFoundException;
import com.example.tuition.mapper.FacultyMapper;
import com.example.tuition.repository.FacultyRepository;
import com.example.tuition.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacultyServiceImpl implements FacultyService {

    private final FacultyRepository facultyRepository;
    private final FacultyMapper facultyMapper;

    @Override
    @Transactional(readOnly = true)
    public List<FacultyResponseDTO> getAll() {
        return facultyRepository.findAll().stream().map(facultyMapper::toResponseDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public FacultyResponseDTO getById(Long id) {
        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found with id: " + id));
        return facultyMapper.toResponseDTO(faculty);
    }

    @Override
    @Transactional
    public FacultyResponseDTO create(FacultyRequestDTO dto) {
        Faculty saved = facultyRepository.save(facultyMapper.toEntity(dto));
        return facultyMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public FacultyResponseDTO update(Long id, FacultyRequestDTO dto) {
        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found with id: " + id));
        facultyMapper.updateEntity(faculty, dto);
        return facultyMapper.toResponseDTO(facultyRepository.save(faculty));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!facultyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Faculty not found with id: " + id);
        }
        facultyRepository.deleteById(id);
    }
}
