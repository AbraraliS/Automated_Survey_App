package com.surveyapp.dto.survey;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class SurveyRequest {
    
    @NotBlank(message = "Survey title is required")
    private String title;
    
    private String description;
    
    @NotEmpty(message = "At least one question is required")
    private List<QuestionRequest> questions;
    
    private Boolean isPublished = false;
}