# Automated Survey App

A modern, AI-powered survey application that automatically generates relevant questions and collects user responses.

## 🏗️ Project Structure

```
automated-survey-app/
├── frontend/
│   └── react-app/           # React frontend application
├── backend/
│   └── app.py              # Flask backend API
├── ai/
│   └── question_generator.py # AI-powered question generation
├── data/
│   └── responses.csv       # Survey response storage
└── README.md
```

## 🚀 Features

- **AI-Powered Question Generation**: Automatically creates relevant survey questions based on topics
- **Adaptive Surveys**: Follow-up questions based on user responses
- **Real-time Data Collection**: Instant response storage and retrieval
- **Modern UI**: React-based frontend with responsive design
- **RESTful API**: Clean backend architecture with Flask
- **CSV Data Storage**: Simple and reliable data persistence

## 🛠️ Technology Stack

### Frontend
- **React** - Modern JavaScript library for building user interfaces
- **Axios** - HTTP client for API communication
- **CSS3/Tailwind** - Styling and responsive design

### Backend
- **Flask** - Lightweight Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **CSV** - Data storage format

### AI/ML
- **OpenAI GPT** - Question generation (optional)
- **Python** - AI logic and data processing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install flask flask-cors openai
   ```

3. (Optional) Set up OpenAI API key for AI features:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/react-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```
OPENAI_API_KEY=your-openai-api-key
FLASK_ENV=development
CORS_ORIGINS=http://localhost:3000
```

### API Endpoints

- `GET /api/health` - Health check
- `POST /api/survey/submit` - Submit survey response
- `GET /api/survey/responses` - Retrieve all responses
- `POST /api/survey/generate` - Generate new questions (AI)

## 🎯 Usage

### Creating a Survey
1. Use the question generator to create questions:
   ```python
   from ai.question_generator import QuestionGenerator
   
   generator = QuestionGenerator()
   questions = generator.generate_questions("customer satisfaction", 5)
   ```

### Submitting Responses
Send a POST request to `/api/survey/submit` with response data:
```json
{
  "user_id": "user123",
  "question_1": "Very Satisfied",
  "question_2": "Often",
  "question_3": "Mobile payments"
}
```

### Retrieving Data
Access stored responses via `/api/survey/responses` endpoint.

## 📊 Data Format

Responses are stored in CSV format with the following structure:
- `timestamp` - Response submission time
- `user_id` - Unique user identifier
- `question_1`, `question_2`, etc. - Survey responses

## 🤖 AI Features

### Question Generation
The AI module can generate contextually relevant questions:
- **Topic-based**: Questions tailored to specific subjects
- **Adaptive**: Follow-up questions based on previous responses
- **Multiple formats**: Rating scales, multiple choice, open-ended

### Fallback Mode
If AI services are unavailable, the system uses predefined templates to ensure continuous operation.

## 🔄 Development Workflow

1. **Backend Development**: Modify `backend/app.py` for API changes
2. **Frontend Development**: Work in `frontend/react-app/` for UI updates
3. **AI Enhancement**: Update `ai/question_generator.py` for question logic
4. **Data Analysis**: Process `data/responses.csv` for insights

## 🚀 Deployment

### Production Setup
1. Set environment variables for production
2. Use a production WSGI server (e.g., Gunicorn)
3. Configure a reverse proxy (e.g., Nginx)
4. Set up SSL certificates
5. Use a proper database (PostgreSQL, MongoDB)

### Docker Deployment
```dockerfile
# Example Dockerfile for backend
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions and support:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Real-time notifications
- [ ] Survey templates library
- [ ] Advanced AI question optimization
- [ ] Mobile app development
- [ ] Integration with popular survey platforms

---

Built with ❤️ for better survey experiences
