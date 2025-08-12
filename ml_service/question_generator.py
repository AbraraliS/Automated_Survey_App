import openai
import random
from typing import List, Dict
import json

class QuestionGenerator:
    """AI-powered question generator for automated surveys"""
    
    def __init__(self, api_key: str = None):
        """Initialize the question generator"""
        if api_key:
            openai.api_key = api_key
        
        # Predefined question templates for offline mode
        self.question_templates = {
            'satisfaction': [
                "How satisfied are you with {topic}?",
                "Rate your experience with {topic}",
                "How would you rate {topic}?"
            ],
            'preference': [
                "What is your preferred {category}?",
                "Which {category} do you like most?",
                "What type of {category} interests you?"
            ],
            'frequency': [
                "How often do you {activity}?",
                "How frequently do you use {service}?",
                "How regularly do you {action}?"
            ],
            'opinion': [
                "What do you think about {topic}?",
                "How do you feel about {subject}?",
                "What's your opinion on {matter}?"
            ]
        }
        
        self.answer_options = {
            'satisfaction': ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
            'rating': ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
            'frequency': ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
            'agreement': ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
        }
    
    def generate_questions(self, topic: str, num_questions: int = 5) -> List[Dict]:
        """Generate survey questions based on topic"""
        try:
            # Try AI generation first (if API key is available)
            if hasattr(openai, 'api_key') and openai.api_key:
                return self._generate_ai_questions(topic, num_questions)
            else:
                return self._generate_template_questions(topic, num_questions)
        
        except Exception as e:
            print(f"AI generation failed: {e}")
            return self._generate_template_questions(topic, num_questions)
    
    def _generate_ai_questions(self, topic: str, num_questions: int) -> List[Dict]:
        """Generate questions using AI (OpenAI GPT)"""
        prompt = f"""
        Generate {num_questions} survey questions about {topic}.
        Return a JSON array where each question has:
        - "question": the question text
        - "type": one of "multiple_choice", "rating", "text", "yes_no"
        - "options": array of options (for multiple_choice and rating types)
        
        Make questions engaging and relevant to {topic}.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        
        questions = json.loads(response.choices[0].message.content)
        return questions
    
    def _generate_template_questions(self, topic: str, num_questions: int) -> List[Dict]:
        """Generate questions using predefined templates"""
        questions = []
        question_types = list(self.question_templates.keys())
        
        for i in range(num_questions):
            # Select random question type
            q_type = random.choice(question_types)
            template = random.choice(self.question_templates[q_type])
            
            # Format the question with the topic
            question_text = template.format(
                topic=topic,
                category=topic,
                activity=f"use {topic}",
                service=topic,
                action=f"interact with {topic}",
                subject=topic,
                matter=topic
            )
            
            # Determine question format and options
            if q_type == 'satisfaction':
                question_format = 'rating'
                options = self.answer_options['satisfaction']
            elif q_type in ['preference', 'opinion']:
                question_format = 'text'
                options = []
            else:
                question_format = 'multiple_choice'
                options = self.answer_options['frequency']
            
            questions.append({
                'id': i + 1,
                'question': question_text,
                'type': question_format,
                'options': options
            })
        
        return questions
    
    def generate_adaptive_followup(self, previous_answer: str, context: str) -> Dict:
        """Generate follow-up questions based on previous answers"""
        followup_templates = [
            f"You mentioned {previous_answer}. Can you elaborate on why?",
            f"Based on your response about {previous_answer}, what would improve your experience?",
            f"What factors influenced your choice of {previous_answer}?"
        ]
        
        question = random.choice(followup_templates)
        
        return {
            'question': question,
            'type': 'text',
            'options': []
        }

# Example usage
if __name__ == "__main__":
    generator = QuestionGenerator()
    
    # Generate questions about a mobile app
    questions = generator.generate_questions("mobile app user experience", 5)
    
    print("Generated Survey Questions:")
    print(json.dumps(questions, indent=2))
