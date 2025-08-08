# Automated Survey Web App Project Guide

## 🧠 Team Division (3 members)
| Role              | Tasks                                               |
|-------------------|----------------------------------------------------|
| ML Engineer       | AI question generation, Data pre-processing         |
| Backend Developer | API, DB integration, storing survey/responses       |
| Frontend Developer| UI/UX, forms, display questions, results           |

---

## 🗓 5-Day Plan (Sprint Breakdown)

**Day 1: Planning + Setup**
- Finalize tech stack
- Define input parameters (survey type, audience, question type)
- Design mock UI wireframes
- Setup GitHub repo and project boards
- Setup backend + frontend skeleton

**Day 2: AI Question Generation (ML Engineer)**
- Use OpenAI API or local LLM (Llama 3, GPT-2 fine-tuned)
- Input prompt: "Generate 5 multiple-choice questions for a customer satisfaction survey for college students about food quality."
- Output: Array of questions + options (JSON)
- Store sample generated data for training

**Day 3: Frontend + Survey UI**
- Survey input form: Select audience, survey type
- Display AI-generated questions
- Collect answers (radio/select inputs)
- Submit survey responses
- Simple UI with React / HTML+JS

**Day 4: Backend Integration**
- Store questions + responses in database (MongoDB or Firebase)
- APIs: POST /generate-questions, GET /survey, POST /submit-response
- Save responses in structured format:
```json
{
  "surveyType": "Feedback",
  "audience": "College Students",
  "responses": [
    { "question": "...", "answer": "..." }
  ]
}
```

**Day 5: ML Training Demo (Optional for MVP)**
- Prepare CSV from collected data
- Train simple model (classify feedback as Positive/Negative)
- OR: Show data pipeline for future training
- Final testing + documentation

---

## ⚙ Tech Stack (MVP)
| Component   | Tool                          |
|-------------|------------------------------|
| Frontend    | React.js / HTML-CSS-JS       |
| Backend     | Node.js / Spring Boot / Flask|
| AI/ML       | OpenAI API / GPT-2 / LLM     |
| Database    | MongoDB / Firebase / PostgreSQL|
| ML Framework| Python + Pandas + Scikit-learn|

---

## 📂 Folder Structure (Example)
```
automated-survey-app/
├── frontend/
│   └── react-app/
├── backend/
│   └── app.py (Flask) or controller.java (Spring Boot)
├── ai/
│   └── question_generator.py
├── data/
│   └── responses.csv
└── README.md
```

---

## 📈 Advancements for Future Version
| Feature            | Description                                      |
|--------------------|--------------------------------------------------|
| AI Model Training  | Use survey data to train sentiment classifier     |
| Data Analytics     | Charts and insights on survey responses           |
| User Accounts      | Log in and track surveys                         |
| Chatbot Interface  | Answer questions via chat                        |
| Admin Panel        | Manage survey types, question formats            |
| Scheduler          | Auto-send surveys to target audience             |

---

## 📌 Tips for MVP Success
- Use hardcoded mock data if needed to simulate AI/ML
- Keep UI clean and functional, not fancy
- Focus more on flow than complexity
- Document your dataset structure for future ML
- Always test form inputs and database saving properly

---
---

## 📝 Research & Implementation Procedure (Based on Assignment 2)

### 1. Identify a Problem & Solution Using AI/ML/DL
- Find the problem (e.g., sentiment analysis on survey responses)
- Review literature (Google Scholar, IEEE Xplore, recent papers)
- Note limitations in existing work (e.g., limited question diversity)
- Solve limitations with your app (AI-generated questions, real survey data)

### 2. Data Collection
- Collect text data (survey responses, comments)
- Extend to images, audio, video in future versions
- Example data table:
  | Title | Objective/Methodology | Dataset | Evaluation Metric | Result | Limitation |
  |-------|----------------------|---------|------------------|--------|------------|
  | Sentiment Analysis | NLP, LLM | Survey data | F1-score, Accuracy | 85% | Limited question diversity |

### 3. Implementation Steps
- Day 1–2: Define problem, review literature, set up project
- Day 3–4: Implement AI question generation, collect/store responses
- Day 5+: Prepare data for ML, analyze results, document improvements

### 4. Advancing the Project
- Use collected data to train ML models (sentiment classifier, etc.)
- Analyze results, compare with literature benchmarks
- Address limitations (add question types, improve accuracy)

### 5. Documentation
- Document process, dataset structure, and results
- Compare solution with existing work, highlight improvements

---

## 📦 Submission Checklist

1. **Literature Papers**
   - Collect and reference recent research papers related to your problem (e.g., sentiment analysis, survey automation).

2. **Excel Sheet Summary**
   - Prepare an Excel file summarizing your literature review.
   - Include columns like: Title, Objective/Methodology, Dataset, Evaluation Metric, Result, Limitation.

3. **Code**
   - Submit all source code (frontend, backend, AI scripts).
   - Organize as per your folder structure.

4. **Dataset**
   - Include the collected survey responses (e.g., `data/responses.csv`).
   - Document the format and sample data.

5. **Final Report**
   - Write a report covering problem statement, literature review, methodology, results, limitations, and future work.
   - Reference your code and dataset.
