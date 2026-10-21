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

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;
    private final ResultMapper resultMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ResultResponseDTO> getFiltered(Integer year, String className, String exam) {
        List<Result> results;

        if (year != null && className != null && exam != null) {
            results = resultRepository.findByYearAndClassNameAndExam(year, className, exam);
        } else if (year != null) {
            results = resultRepository.findByYear(year);
        } else if (className != null) {
            results = resultRepository.findByClassName(className);
        } else if (exam != null) {
            results = resultRepository.findByExam(exam);
        } else {
            results = resultRepository.findAll();
        }

        return results.stream().map(resultMapper::toResponseDTO).toList();
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
