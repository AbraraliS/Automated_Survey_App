from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Data file path
DATA_FILE = '../data/responses.csv'

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Survey API is running'})

@app.route('/api/survey/submit', methods=['POST'])
def submit_survey():
    """Submit survey responses"""
    try:
        data = request.get_json()
        
        # Add timestamp
        data['timestamp'] = datetime.now().isoformat()
        
        # Save to CSV
        save_response(data)
        
        return jsonify({'status': 'success', 'message': 'Survey response saved'})
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/survey/responses', methods=['GET'])
def get_responses():
    """Get all survey responses"""
    try:
        responses = load_responses()
        return jsonify({'status': 'success', 'data': responses})
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

def save_response(response_data):
    """Save response to CSV file"""
    file_exists = os.path.isfile(DATA_FILE)
    
    with open(DATA_FILE, 'a', newline='', encoding='utf-8') as csvfile:
        fieldnames = response_data.keys()
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        # Write header if file is new
        if not file_exists:
            writer.writeheader()
        
        writer.writerow(response_data)

def load_responses():
    """Load all responses from CSV file"""
    responses = []
    
    if os.path.isfile(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            responses = list(reader)
    
    return responses

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
