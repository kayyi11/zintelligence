# backend/services/insight_service.py
from datetime import datetime, timedelta
from services.firestore_client import db

def calculate_insight_data():
    # 1. Fetch Orders
    orders_ref = db.collection('orders').stream()
    daily_revenue = {}

    for doc in orders_ref:
        order = doc.to_dict()
        # Convert timestamp to string key (e.g., "21 Apr")
        date_str = order['order_date'].strftime('%d %b') 
        rev = float(order.get('unit_price', 0)) * int(order.get('quantity', 0))
        daily_revenue[date_str] = daily_revenue.get(date_str, 0) + rev

    # 2. Sort data for the chart
    sorted_keys = sorted(daily_revenue.keys())
    chart_data = [{"date": k, "actual": daily_revenue[k]} for k in sorted_keys]

    # 3. Simple Prediction (Next 3 days)
    if chart_data:
        last_val = chart_data[-1]['actual']
        for i in range(1, 4):
            future_date = (datetime.now() + timedelta(days=i)).strftime('%d %b')
            chart_data.append({
                "date": future_date,
                "forecast": round(last_val * (1 + (i * 0.03)), 2)
            })

    # 4. Optimization & Simulation Mock (Calculated from real revenue)
    total_rev = sum(daily_revenue.values())
    
    return {
        "todayDate": datetime.now().strftime('%d %b'),
        "chartData": chart_data,
        "aiExplanation": "Growth is driven by high volume in the 'Protein' category during month-end spikes.",
        "optimization": {
            "title": "Increase chicken rice price",
            "adjustment": "by RM0.50",
            "profitGrowth": "+8%",
            "confidence": "High (90%)",
            "reasoning": "Elasticity analysis suggests users will accept a small hike to offset rising poultry costs."
        },
        "simulationMetrics": [
            {"label": "Total Revenue", "current": round(total_rev, 2), "projected": round(total_rev * 1.08, 2), "change": 8.0},
            {"label": "Total Cost", "current": round(total_rev * 0.6, 2), "projected": round(total_rev * 0.62, 2), "change": 4.0},
            {"label": "Gross Profit", "current": round(total_rev * 0.4, 2), "projected": round(total_rev * 0.46, 2), "change": 14.0}
        ]
    }