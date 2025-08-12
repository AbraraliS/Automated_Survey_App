package com.surveyapp.service;

import com.surveyapp.dto.survey.SurveyRequest;
import com.surveyapp.dto.survey.SurveyResponse;
import com.surveyapp.entity.Survey;
import com.surveyapp.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    public SurveyResponse createSurvey(SurveyRequest surveyRequest) {
        Survey survey = new Survey();
        survey.setTitle(surveyRequest.getTitle());
        // Set other survey properties from surveyRequest
        Survey savedSurvey = surveyRepository.save(survey);
        return new SurveyResponse(savedSurvey.getId(), savedSurvey.getTitle());
    }

    public Optional<SurveyResponse> getSurveyById(Long id) {
        return surveyRepository.findById(id)
                .map(survey -> new SurveyResponse(survey.getId(), survey.getTitle()));
    }

    public List<SurveyResponse> getAllSurveys() {
        return surveyRepository.findAll().stream()
                .map(survey -> new SurveyResponse(survey.getId(), survey.getTitle()))
                .toList();
    }

    public void deleteSurvey(Long id) {
        surveyRepository.deleteById(id);
    }

    // Additional methods for survey management can be added here
}