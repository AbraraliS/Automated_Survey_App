package com.surveyapp.controller;

import com.surveyapp.dto.analytics.AnalyticsResponse;
import com.surveyapp.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @Autowired
    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<AnalyticsResponse> getSurveyAnalytics(@PathVariable Long surveyId) {
        AnalyticsResponse analyticsResponse = analyticsService.getAnalyticsForSurvey(surveyId);
        return ResponseEntity.ok(analyticsResponse);
    }
}