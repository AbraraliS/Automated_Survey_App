import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:3001/api'; // Change this to your backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - replace with actual API response
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          email: credentials.email,
          name: credentials.email.split('@')[0]
        }
      };
      
      return mockResponse;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  register: async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: Date.now(),
          email: userData.email,
          name: userData.name
        }
      };
      
      return mockResponse;
    } catch (error) {
      throw new Error('Registration failed');
    }
  }
};

// Survey API calls
export const surveyAPI = {
  generateQuestions: async (surveyData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI-generated questions based on survey type
      const mockQuestions = [
        {
          id: 1,
          text: `What is your experience with ${surveyData.category.toLowerCase()}?`,
          type: surveyData.questionType,
          options: surveyData.questionType === 'Multiple-choice' 
            ? ['Excellent', 'Good', 'Fair', 'Poor'] 
            : surveyData.questionType === 'Rating'
            ? ['1', '2', '3', '4', '5']
            : ['Yes', 'No']
        },
        {
          id: 2,
          text: `How likely are you to recommend our ${surveyData.category.toLowerCase()} to others?`,
          type: 'Rating',
          options: ['1', '2', '3', '4', '5']
        },
        {
          id: 3,
          text: `Would you use our ${surveyData.category.toLowerCase()} services again?`,
          type: 'Yes/No',
          options: ['Yes', 'No']
        }
      ];
      
      return mockQuestions;
    } catch (error) {
      throw new Error('Failed to generate questions');
    }
  },

  saveSurvey: async (surveyData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSurvey = {
        id: Date.now(),
        title: surveyData.title,
        audienceType: surveyData.audienceType,
        category: surveyData.category,
        questions: surveyData.questions,
        createdAt: new Date().toISOString(),
        shareableLink: `${window.location.origin}/survey/${Date.now()}`
      };
      
      // Store in localStorage for demo
      const existingSurveys = JSON.parse(localStorage.getItem('surveys') || '[]');
      existingSurveys.push(mockSurvey);
      localStorage.setItem('surveys', JSON.stringify(existingSurveys));
      
      return mockSurvey;
    } catch (error) {
      throw new Error('Failed to save survey');
    }
  },

  getSurveys: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return JSON.parse(localStorage.getItem('surveys') || '[]');
    } catch (error) {
      throw new Error('Failed to fetch surveys');
    }
  },

  getSurvey: async (id) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
      const survey = surveys.find(s => s.id.toString() === id.toString());
      if (!survey) throw new Error('Survey not found');
      return survey;
    } catch (error) {
      throw new Error('Failed to fetch survey');
    }
  },

  submitResponse: async (surveyId, responses) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store response in localStorage for demo
      const existingResponses = JSON.parse(localStorage.getItem('responses') || '[]');
      const response = {
        id: Date.now(),
        surveyId: parseInt(surveyId),
        responses,
        submittedAt: new Date().toISOString()
      };
      existingResponses.push(response);
      localStorage.setItem('responses', JSON.stringify(existingResponses));
      
      return { success: true };
    } catch (error) {
      throw new Error('Failed to submit response');
    }
  },

  getInsights: async (surveyId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const responses = JSON.parse(localStorage.getItem('responses') || '[]');
      const surveyResponses = responses.filter(r => r.surveyId.toString() === surveyId.toString());
      
      // Mock insights generation
      const mockInsights = {
        totalResponses: surveyResponses.length,
        responseData: [
          { name: 'Excellent', value: Math.floor(Math.random() * 20) + 10 },
          { name: 'Good', value: Math.floor(Math.random() * 25) + 15 },
          { name: 'Fair', value: Math.floor(Math.random() * 15) + 5 },
          { name: 'Poor', value: Math.floor(Math.random() * 10) + 2 }
        ],
        sentimentData: [
          { name: 'Positive', value: Math.floor(Math.random() * 40) + 30 },
          { name: 'Neutral', value: Math.floor(Math.random() * 20) + 15 },
          { name: 'Negative', value: Math.floor(Math.random() * 15) + 5 }
        ],
        ratingData: [
          { rating: '1 Star', count: Math.floor(Math.random() * 5) + 1 },
          { rating: '2 Star', count: Math.floor(Math.random() * 8) + 3 },
          { rating: '3 Star', count: Math.floor(Math.random() * 12) + 8 },
          { rating: '4 Star', count: Math.floor(Math.random() * 20) + 15 },
          { rating: '5 Star', count: Math.floor(Math.random() * 25) + 20 }
        ]
      };
      
      return mockInsights;
    } catch (error) {
      throw new Error('Failed to fetch insights');
    }
  }
};

export default api;