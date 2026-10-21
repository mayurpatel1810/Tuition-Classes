package com.example.tuition.service.impl;

import com.example.tuition.dto.request.CourseRequestDTO;
import com.example.tuition.dto.response.CourseResponseDTO;
import com.example.tuition.entity.Course;
import com.example.tuition.exception.ResourceNotFoundException;
import com.example.tuition.mapper.CourseMapper;
import com.example.tuition.repository.CourseRepository;
import com.example.tuition.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    @Override
    @Transactional(readOnly = true)
    public List<CourseResponseDTO> getAll() {
        return courseRepository.findAll().stream().map(courseMapper::toResponseDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CourseResponseDTO getById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return courseMapper.toResponseDTO(course);
    }

    @Override
    @Transactional
    public CourseResponseDTO create(CourseRequestDTO dto) {
        Course saved = courseRepository.save(courseMapper.toEntity(dto));
        return courseMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public CourseResponseDTO update(Long id, CourseRequestDTO dto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        courseMapper.updateEntity(course, dto);
        return courseMapper.toResponseDTO(courseRepository.save(course));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }
}
