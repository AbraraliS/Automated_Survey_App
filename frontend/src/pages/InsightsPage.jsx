import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { surveyAPI } from '../services/api';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { ArrowLeft, Users, TrendingUp, Star, MessageSquare } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const InsightsPage = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [surveyData, insightsData] = await Promise.all([
        surveyAPI.getSurvey(id),
        surveyAPI.getInsights(id)
      ]);
      setSurvey(surveyData);
      setInsights(insightsData);
    } catch (error) {
      setError('Failed to load insights data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading insights..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Insights</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{survey?.title}</h1>
            <p className="mt-2 text-gray-600">Survey Analytics & Insights</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{insights?.totalResponses || 0}</div>
                <div className="text-sm text-gray-500">Total Responses</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((insights?.sentimentData?.find(d => d.name === 'Positive')?.value || 0) / 
                    (insights?.sentimentData?.reduce((acc, d) => acc + d.value, 0) || 1) * 100)}%
                </div>
                <div className="text-sm text-gray-500">Positive Sentiment</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {(() => {
                    const ratings = insights?.ratingData || [];
                    const totalRatings = ratings.reduce((acc, r) => acc + r.count, 0);
                    const weightedSum = ratings.reduce((acc, r, index) => acc + ((index + 1) * r.count), 0);
                    return totalRatings > 0 ? (weightedSum / totalRatings).toFixed(1) : '0.0';
                  })()}
                </div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {survey?.questions?.length || 0}
                </div>
                <div className="text-sm text-gray-500">Questions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Response Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Response Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={insights?.responseData || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {(insights?.responseData || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sentiment Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={insights?.sentimentData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={insights?.ratingData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Survey Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Survey Questions</h3>
        <div className="space-y-4">
          {survey?.questions?.map((question, index) => (
            <div key={question.id} className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-gray-900 mr-2">
                  Question {index + 1}:
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {question.type}
                </span>
              </div>
              <p className="text-gray-700">{question.text}</p>
              {question.options && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {question.options.map((option, optIndex) => (
                    <span
                      key={optIndex}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-50 text-blue-700"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;