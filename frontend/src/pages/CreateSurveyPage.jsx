import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { surveyAPI } from '../services/api';
import { Sparkles, Save, ArrowLeft, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateSurveyPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Form, 2: Generated Questions
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    audienceType: '',
    category: '',
    questionType: 'Multiple-choice'
  });
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const audienceOptions = [
    'Customers',
    'Employees',
    'Students',
    'General Public',
    'Business Partners',
    'Event Attendees'
  ];

  const categoryOptions = [
    'Product Feedback',
    'Customer Satisfaction',
    'Market Research',
    'Employee Engagement',
    'Event Feedback',
    'Educational Assessment',
    'Healthcare',
    'Technology'
  ];

  const questionTypes = [
    'Multiple-choice',
    'Rating',
    'Yes/No'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateQuestions = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const questions = await surveyAPI.generateQuestions(formData);
      setGeneratedQuestions(questions);
      setStep(2);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSurvey = async () => {
    setSaving(true);

    try {
      const surveyData = {
        ...formData,
        questions: generatedQuestions
      };
      
      await surveyAPI.saveSurvey(surveyData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving survey:', error);
      alert('Failed to save survey. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderQuestionPreview = (question) => {
    switch (question.type) {
      case 'Multiple-choice':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="radio" name={`question-${question.id}`} className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-700">{option}</span>
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
                className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                {rating}
              </button>
            ))}
          </div>
        );
      case 'Yes/No':
        return (
          <div className="flex space-x-4">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="radio" name={`question-${question.id}`} className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => step === 1 ? navigate('/dashboard') : setStep(1)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {step === 1 ? 'Back to Dashboard' : 'Back to Form'}
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {step === 1 ? 'Create New Survey' : 'Review Generated Questions'}
        </h1>
        <p className="mt-2 text-gray-600">
          {step === 1 
            ? 'Provide details about your survey and we\'ll generate AI-powered questions for you'
            : 'Review the AI-generated questions and save your survey'
          }
        </p>
      </div>

      {step === 1 ? (
        /* Survey Details Form */
        <div className="max-w-2xl">
          <form onSubmit={handleGenerateQuestions} className="bg-white shadow-sm rounded-lg p-6 space-y-6">
            {/* Survey Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Survey Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Customer Satisfaction Survey"
              />
            </div>

            {/* Audience Type */}
            <div>
              <label htmlFor="audienceType" className="block text-sm font-medium text-gray-700">
                Target Audience *
              </label>
              <select
                id="audienceType"
                name="audienceType"
                required
                value={formData.audienceType}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select audience type</option>
                {audienceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Survey Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Survey Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select category</option>
                {categoryOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Question Type */}
            <div>
              <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">
                Primary Question Type *
              </label>
              <select
                id="questionType"
                name="questionType"
                required
                value={formData.questionType}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {questionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Generating Questions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Survey Questions
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Generated Questions Preview */
        <div className="max-w-4xl">
          <div className="bg-white shadow-sm rounded-lg p-6">
            {/* Survey Info */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">{formData.title}</h3>
              <div className="text-sm text-blue-700">
                <span className="inline-block mr-4">
                  <strong>Audience:</strong> {formData.audienceType}
                </span>
                <span className="inline-block">
                  <strong>Category:</strong> {formData.category}
                </span>
              </div>
            </div>

            {/* Generated Questions */}
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-900 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                AI-Generated Questions
              </h4>
              
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-3">
                    <span className="text-sm text-gray-500">Question {index + 1}</span>
                    <h5 className="text-base font-medium text-gray-900">
                      {question.text}
                    </h5>
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {question.type}
                    </span>
                  </div>
                  <div className="ml-4">
                    {renderQuestionPreview(question)}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Modify Details
              </button>
              
              <button
                onClick={handleSaveSurvey}
                disabled={saving}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Survey
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSurveyPage;