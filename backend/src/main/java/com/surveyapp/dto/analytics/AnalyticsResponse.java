package com.surveyapp.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalyticsResponse {
    private Long surveyId;
    private String surveyTitle;
    private Integer totalResponses;
    private Integer positiveFeedback;
    private Integer negativeFeedback;
    private Integer neutral;
    private List<String> commonWords;
    private Map<String, Integer> responseDistribution;
    private List<QuestionAnalytics> questionAnalytics;
    
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuestionAnalytics {
        private Long questionId;
        private String questionText;
        private String questionType;
        private Map<String, Integer> answerDistribution;
        private Double averageRating;
        private Integer totalAnswers;
    }
}