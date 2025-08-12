package com.surveyapp.service;

import com.surveyapp.entity.Survey;
import com.surveyapp.repository.SurveyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SurveyServiceTest {

    @InjectMocks
    private SurveyService surveyService;

    @Mock
    private SurveyRepository surveyRepository;

    private Survey survey;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        survey = new Survey();
        survey.setId(1L);
        survey.setTitle("Sample Survey");
    }

    @Test
    void testCreateSurvey() {
        when(surveyRepository.save(any(Survey.class))).thenReturn(survey);

        Survey createdSurvey = surveyService.createSurvey(survey);

        assertNotNull(createdSurvey);
        assertEquals("Sample Survey", createdSurvey.getTitle());
        verify(surveyRepository, times(1)).save(survey);
    }

    @Test
    void testGetSurveyById() {
        when(surveyRepository.findById(1L)).thenReturn(Optional.of(survey));

        Survey foundSurvey = surveyService.getSurveyById(1L);

        assertNotNull(foundSurvey);
        assertEquals("Sample Survey", foundSurvey.getTitle());
        verify(surveyRepository, times(1)).findById(1L);
    }

    @Test
    void testGetSurveyById_NotFound() {
        when(surveyRepository.findById(1L)).thenReturn(Optional.empty());

        Survey foundSurvey = surveyService.getSurveyById(1L);

        assertNull(foundSurvey);
        verify(surveyRepository, times(1)).findById(1L);
    }
}