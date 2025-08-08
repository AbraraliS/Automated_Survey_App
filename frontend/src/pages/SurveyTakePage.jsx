import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { surveyAPI } from '../services/api';
import { CheckCircle, AlertCircle, Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const SurveyTakePage = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSurvey();
  }, [id]);

  const fetchSurvey = async () => {
    try {
      const surveyData = await surveyAPI.getSurvey(id);
      setSurvey(surveyData);
    } catch (error) {
      setError('Survey not found or has been removed.');
      console.error('Error fetching survey:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validate all questions are answered
    const unansweredQuestions = survey.questions.filter(
      question => !responses[question.id]
    );

    if (unansweredQuestions.length > 0) {
      alert('Please answer all questions before submitting.');
      setSubmitting(false);
      return;
    }

    try {
      await surveyAPI.submitResponse(id, responses);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'Multiple-choice':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'Rating':
        return (
          <div className="flex space-x-2">
            {question.options.map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleResponseChange(question.id, rating)}
                className={`flex items-center justify-center w-12 h-12 border-2 rounded-lg transition-colors ${
                  responses[question.id] === rating
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                }`}
              >
                <div className="text-center">
                  <Star className={`h-5 w-5 mx-auto mb-1 ${
                    responses[question.id] === rating ? 'fill-current' : ''
                  }`} />
                  <span className="text-xs">{rating}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'Yes/No':
        return (
          <div className="flex space-x-6">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading survey..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Survey Not Found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-4">
            Your responses have been submitted successfully. We appreciate your time and feedback.
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              Your contribution helps us improve and provide better services.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Survey Header */}
        <div className="bg-white shadow-sm rounded-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{survey.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {survey.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800">
              Target: {survey.audienceType}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
              {survey.questions.length} Questions
            </span>
          </div>
        </div>

        {/* Survey Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {survey.questions.map((question, index) => (
            <div key={question.id} className="bg-white shadow-sm rounded-lg p-6">
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {question.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 ml-9">
                      {question.text}
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="ml-9">
                {renderQuestion(question)}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Submit Survey
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyTakePage;