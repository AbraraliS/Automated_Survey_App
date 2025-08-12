package com.surveyapp.service;

import com.surveyapp.entity.SurveyResponse;
import com.surveyapp.repository.SurveyResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponseService {

    private final SurveyResponseRepository surveyResponseRepository;

    @Autowired
    public ResponseService(SurveyResponseRepository surveyResponseRepository) {
        this.surveyResponseRepository = surveyResponseRepository;
    }

    public SurveyResponse submitResponse(SurveyResponse surveyResponse) {
        return surveyResponseRepository.save(surveyResponse);
    }

    public List<SurveyResponse> getAllResponses() {
        return surveyResponseRepository.findAll();
    }

    public List<SurveyResponse> getResponsesBySurveyId(Long surveyId) {
        return surveyResponseRepository.findBySurveyId(surveyId);
    }
}