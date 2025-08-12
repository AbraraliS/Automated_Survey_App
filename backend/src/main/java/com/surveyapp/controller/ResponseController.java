package com.surveyapp.controller;

import com.surveyapp.dto.survey.SurveyResponse;
import com.surveyapp.service.ResponseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {

    private final ResponseService responseService;

    public ResponseController(ResponseService responseService) {
        this.responseService = responseService;
    }

    @PostMapping
    public ResponseEntity<SurveyResponse> submitResponse(@RequestBody SurveyResponse surveyResponse) {
        SurveyResponse savedResponse = responseService.saveResponse(surveyResponse);
        return ResponseEntity.ok(savedResponse);
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<SurveyResponse> getResponse(@PathVariable Long surveyId) {
        SurveyResponse response = responseService.getResponseBySurveyId(surveyId);
        return ResponseEntity.ok(response);
    }
}