"""
File: app/llm/recommend.py
Purpose: Generates AI/LLM-based maintenance recommendations from predictions
Version: 1.0
"""

def generate_recommendations(predictions):
    recs = []
    for row in predictions:
        if row["risk_level"] == "High":
            recs.append(f"⚠️ Immediate maintenance required for {row['equipment_id']} (High risk).")
        elif row["risk_level"] == "Medium":
            recs.append(f"🔍 Monitor {row['equipment_id']} closely and schedule a routine check (Medium risk).")
        else:
            recs.append(f"✅ Routine inspection recommended for {row['equipment_id']} (Low risk).")
    return recs