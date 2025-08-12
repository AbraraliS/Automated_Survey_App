package com.surveyapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OpenAIService {

    private final RestTemplate restTemplate;
    private final String openAiApiUrl;

    @Autowired
    public OpenAIService(RestTemplate restTemplate, String openAiApiUrl) {
        this.restTemplate = restTemplate;
        this.openAiApiUrl = openAiApiUrl;
    }

    public String generateSurveyQuestions(String prompt) {
        // Logic to call OpenAI API and generate survey questions based on the prompt
        // This is a mock implementation for demonstration purposes
        String response = restTemplate.postForObject(openAiApiUrl, prompt, String.class);
        return response;
    }
}