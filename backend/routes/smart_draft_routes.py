import os
from flask import Blueprint, request, jsonify
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

smart_draft_bp = Blueprint('smart_draft', __name__)

@smart_draft_bp.route('/api/generate-draft', methods=['POST'])
def generate_draft():
    try:
        data = request.get_json()
        action_type = data.get('action_type', 'Email')
        context = data.get('context', 'Professional message')

        #Prompt
        prompt = f"""
        You are an expert business communicator. 
        Draft a professional {action_type} for this situation: "{context}".
        
        Requirements:
        1. NATURAL TONE: Write like a real person, not a robotic AI.
        2. NO PREAMBLE: Output ONLY the message content itself.
        3. NO FILLERS: Keep it concise and authoritative.
        """

        print(f"Generating {action_type} ---")

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt
        )

        return jsonify({
            "status": "success", 
            "draft": response.text
        }), 200

    except Exception as e:
        print(f"Gemini Error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500