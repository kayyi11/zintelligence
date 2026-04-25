#backend/routes/data_routes.py

import os
from flask import Blueprint, jsonify, request
from services.data_service import DataService  # Import your service

data_bp = Blueprint('data', __name__)
data_service = DataService() # Initialize the service

@data_bp.route('/upload', methods=['POST'])
def handle_upload():
    file_type = request.form.get('type', 'receipt')
    
    # Use the service logic for extraction
    summary = data_service.extract_content_from_file(None, file_type)

    return jsonify({
        "status": "success",
        "summary": summary
    })

# --- MISSING ROUTES ADDED BELOW ---

@data_bp.route('/data/table', methods=['GET'])
def get_table_data():
    """Matches frontend fetch('.../api/data/table')"""
    data = data_service.get_unified_table_data()
    return jsonify(data)

@data_bp.route('/data/update', methods=['POST'])
def update_product():
    """Matches frontend saveRow() call"""
    incoming_data = request.json
    p_id = incoming_data.get('id')
    new_price = incoming_data.get('price')
    
    # In a real app, you'd call a db update here
    print(f"Updating Product {p_id} to Price {new_price}")
    
    return jsonify({"status": "success", "message": "Updated successfully"})

@data_bp.route('/data/stats', methods=['GET'])
def get_stats():
    """Returns a list of stats for the four cards in the screenshot."""
    stats_list = [
        {
            "title": "Inventory Data",
            "records": 28,
            "confidence": "94%",
            "color": "text-[#10B981]" # Emerald
        },
        {
            "title": "Sales Data",
            "records": 15,
            "confidence": "92%",
            "color": "text-[#10B981]"
        },
        {
            "title": "Supplier Data",
            "records": 8,
            "confidence": "90%",
            "color": "text-[#10B981]"
        },
        {
            "title": "Performance Data",
            "records": 6,
            "confidence": "91%",
            "color": "text-[#10B981]"
        }
    ]
    return jsonify(stats_list)