# backend/routes/insight_routes.py
from flask import Blueprint, jsonify
from services.insight_service import calculate_insight_data

insight_bp = Blueprint('insight', __name__)

@insight_bp.route('/insight-data', methods=['GET'])
def get_insight():
    try:
        data = calculate_insight_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500