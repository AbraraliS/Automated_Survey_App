# AI-Powered Automated Survey Web App

## Overview
The AI-Powered Automated Survey Web App is a Spring Boot application designed to facilitate the creation, distribution, and analysis of surveys. Leveraging AI technology, the application can generate survey questions dynamically, enhancing user engagement and data collection efficiency.

## Core Features
- **User Authentication**: Secure registration and login functionality using JWT.
- **Survey Management**: Create, update, and delete surveys with dynamic question generation.
- **Response Handling**: Collect and store user responses to surveys.
- **Analytics**: Provide insights and analytics based on survey responses.
- **AI Integration**: Utilize a mock AI service to generate survey questions.

## Technical Details
- **Framework**: Spring Boot
- **Database**: Relational database (e.g., MySQL, PostgreSQL)
- **Security**: Spring Security with JWT for authentication
- **Build Tool**: Maven
- **Containerization**: Docker

## Project Structure
```
automated-survey-backend
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── surveyapp
│   │   │           ├── SurveyApplication.java
│   │   │           ├── config
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   ├── WebConfig.java
│   │   │           │   └── OpenAIConfig.java
│   │   │           ├── controller
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── SurveyController.java
│   │   │           │   ├── ResponseController.java
│   │   │           │   └── AnalyticsController.java
│   │   │           ├── dto
│   │   │           │   ├── auth
│   │   │           │   │   ├── LoginRequest.java
│   │   │           │   │   ├── RegisterRequest.java
│   │   │           │   │   └── AuthResponse.java
│   │   │           │   ├── survey
│   │   │           │   │   ├── SurveyRequest.java
│   │   │           │   │   ├── SurveyResponse.java
│   │   │           │   │   └── QuestionRequest.java
│   │   │           │   └── analytics
│   │   │           │       └── AnalyticsResponse.java
│   │   │           ├── entity
│   │   │           │   ├── User.java
│   │   │           │   ├── Survey.java
│   │   │           │   ├── Question.java
│   │   │           │   ├── SurveyResponse.java
│   │   │           │   └── Answer.java
│   │   │           ├── repository
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── SurveyRepository.java
│   │   │           │   ├── QuestionRepository.java
│   │   │           │   └── SurveyResponseRepository.java
│   │   │           ├── service
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── SurveyService.java
│   │   │           │   ├── ResponseService.java
│   │   │           │   ├── AnalyticsService.java
│   │   │           │   └── OpenAIService.java
│   │   │           ├── security
│   │   │           │   ├── JwtAuthenticationEntryPoint.java
│   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │           │   └── JwtTokenProvider.java
│   │   │           └── exception
│   │   │               ├── GlobalExceptionHandler.java
│   │   │               └── CustomExceptions.java
│   │   └── resources
│   │       ├── application.yml
│   │       ├── application-prod.yml
│   │       └── db
│   │           └── migration
│   │               └── V1__Initial_schema.sql
│   └── test
│       └── java
│           └── com
│               └── surveyapp
│                   ├── SurveyApplicationTests.java
│                   ├── controller
│                   │   └── SurveyControllerTest.java
│                   └── service
│                       └── SurveyServiceTest.java
├── pom.xml
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## API Examples
### User Authentication
- **Login**
  - **Endpoint**: POST /api/auth/login
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**: 
    ```json
    {
      "token": "jwt-token-here"
    }
    ```

- **Register**
  - **Endpoint**: POST /api/auth/register
  - **Request Body**: 
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "User registered successfully"
    }
    ```

### Survey Management
- **Create Survey**
  - **Endpoint**: POST /api/surveys
  - **Request Body**: 
    ```json
    {
      "title": "Customer Feedback",
      "questions": [
        {
          "text": "How satisfied are you with our service?",
          "type": "rating"
        }
      ]
    }
    ```
  - **Response**: 
    ```json
    {
      "id": 1,
      "title": "Customer Feedback",
      "questions": [...]
    }
    ```

### Response Submission
- **Submit Response**
  - **Endpoint**: POST /api/surveys/{surveyId}/responses
  - **Request Body**: 
    ```json
    {
      "answers": [
        {
          "questionId": 1,
          "answer": "5"
        }
      ]
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "Response submitted successfully"
    }
    ```

## Getting Started
1. Clone the repository.
2. Configure the database settings in `application.yml`.
3. Build the project using Maven: `mvn clean install`.
4. Run the application: `mvn spring-boot:run`.
5. Access the API at `http://localhost:8080/api`.

## License
This project is licensed under the MIT License.