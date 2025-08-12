package com.surveyapp.exception;

public class CustomExceptions {

    public static class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    public static class SurveyNotFoundException extends RuntimeException {
        public SurveyNotFoundException(String message) {
            super(message);
        }
    }

    public static class QuestionNotFoundException extends RuntimeException {
        public QuestionNotFoundException(String message) {
            super(message);
        }
    }

    public static class SurveyResponseNotFoundException extends RuntimeException {
        public SurveyResponseNotFoundException(String message) {
            super(message);
        }
    }

    public static class InvalidInputException extends RuntimeException {
        public InvalidInputException(String message) {
            super(message);
        }
    }
}