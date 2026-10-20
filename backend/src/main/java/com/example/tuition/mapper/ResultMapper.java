package com.example.tuition.mapper;

import com.example.tuition.dto.request.ResultRequestDTO;
import com.example.tuition.dto.response.ResultResponseDTO;
import com.example.tuition.entity.Result;
import org.springframework.stereotype.Component;

@Component
public class ResultMapper {

    public Result toEntity(ResultRequestDTO dto) {
        return Result.builder()
                .studentName(dto.getStudentName())
                .className(dto.getClassName())
                .exam(dto.getExam())
                .percentage(dto.getPercentage())
                .rank(dto.getRank())
                .year(dto.getYear())
                .achievement(dto.getAchievement())
                .build();
    }

    public void updateEntity(Result result, ResultRequestDTO dto) {
        result.setStudentName(dto.getStudentName());
        result.setClassName(dto.getClassName());
        result.setExam(dto.getExam());
        result.setPercentage(dto.getPercentage());
        result.setRank(dto.getRank());
        result.setYear(dto.getYear());
        result.setAchievement(dto.getAchievement());
    }

    public ResultResponseDTO toResponseDTO(Result result) {
        return ResultResponseDTO.builder()
                .id(result.getId())
                .studentName(result.getStudentName())
                .className(result.getClassName())
                .exam(result.getExam())
                .percentage(result.getPercentage())
                .rank(result.getRank())
                .year(result.getYear())
                .achievement(result.getAchievement())
                .build();
    }
}
