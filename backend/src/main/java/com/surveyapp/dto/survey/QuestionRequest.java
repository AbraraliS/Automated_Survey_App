package com.surveyapp.dto.survey;

import com.surveyapp.entity.Question;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class QuestionRequest {
    
    @NotBlank(message = "Question text is required")
    private String questionText;
    
    @NotNull(message = "Question type is required")
    private Question.QuestionType questionType;
    
    private List<String> options;
    
    private Boolean isRequired = true;
    
    private Integer orderIndex;
}