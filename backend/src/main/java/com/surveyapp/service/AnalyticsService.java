package com.surveyapp.service;

import com.surveyapp.entity.SurveyResponse;
import com.surveyapp.repository.SurveyResponseRepository;
import com.surveyapp.dto.analytics.AnalyticsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private SurveyResponseRepository surveyResponseRepository;

    public AnalyticsResponse getSurveyAnalytics(Long surveyId) {
        List<SurveyResponse> responses = surveyResponseRepository.findBySurveyId(surveyId);
        
        // Process responses to generate analytics
        Map<String, Long> answerCounts = responses.stream()
            .flatMap(response -> response.getAnswers().stream())
            .collect(Collectors.groupingBy(answer -> answer.getQuestion().getText(), Collectors.counting()));

        return new AnalyticsResponse(surveyId, answerCounts);
    }
}