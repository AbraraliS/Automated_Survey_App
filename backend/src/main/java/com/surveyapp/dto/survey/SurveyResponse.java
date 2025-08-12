package com.surveyapp.dto.survey;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SurveyResponse {
    private Long id;
    private String title;
    private String description;
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<QuestionResponse> questions;
    private Integer totalResponses;
    
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionResponse {
        private Long id;
        private String questionText;
        private String questionType;
        private List<String> options;
        private Boolean isRequired;
        private Integer orderIndex;
    }
}