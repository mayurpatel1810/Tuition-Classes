package com.example.tuition.service.impl;

import com.example.tuition.dto.request.ResultRequestDTO;
import com.example.tuition.dto.response.ResultResponseDTO;
import com.example.tuition.entity.Result;
import com.example.tuition.exception.ResourceNotFoundException;
import com.example.tuition.mapper.ResultMapper;
import com.example.tuition.repository.ResultRepository;
import com.example.tuition.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;
    private final ResultMapper resultMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ResultResponseDTO> getFiltered(Integer year, String className, String exam) {
        // Any combination of filters works (e.g. year + class without exam).
        // Text filters are case-insensitive "contains" matches so "class 10" finds "Class 10".
        String classFilter = normalize(className);
        String examFilter = normalize(exam);

        return resultRepository.findAll().stream()
                .filter(r -> year == null || year.equals(r.getYear()))
                .filter(r -> classFilter == null || contains(r.getClassName(), classFilter))
                .filter(r -> examFilter == null || contains(r.getExam(), examFilter))
                .sorted(Comparator.comparing(Result::getYear, Comparator.nullsLast(Comparator.reverseOrder()))
                        .thenComparing(Result::getPercentage, Comparator.nullsLast(Comparator.reverseOrder())))
                .map(resultMapper::toResponseDTO)
                .toList();
    }

    private static String normalize(String value) {
        return (value == null || value.isBlank()) ? null : value.trim().toLowerCase();
    }

    private static boolean contains(String fieldValue, String filter) {
        return fieldValue != null && fieldValue.toLowerCase().contains(filter);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultResponseDTO getById(Long id) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found with id: " + id));
        return resultMapper.toResponseDTO(result);
    }

    @Override
    @Transactional
    public ResultResponseDTO create(ResultRequestDTO dto) {
        Result saved = resultRepository.save(resultMapper.toEntity(dto));
        return resultMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public ResultResponseDTO update(Long id, ResultRequestDTO dto) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found with id: " + id));
        resultMapper.updateEntity(result, dto);
        return resultMapper.toResponseDTO(resultRepository.save(result));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!resultRepository.existsById(id)) {
            throw new ResourceNotFoundException("Result not found with id: " + id);
        }
        resultRepository.deleteById(id);
    }
}
