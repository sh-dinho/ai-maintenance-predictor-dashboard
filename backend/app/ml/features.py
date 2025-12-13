"""
File: app/ml/features.py
Purpose: Feature engineering logic to transform raw CSV data into model-ready inputs
Version: 1.0
"""

def extract_features(row: dict):
    prob = float(row.get("failure_probability", 0))
    return {
        "equipment_id": row.get("equipment_id"),
        "failure_probability": prob,
        "lastMaintenanceDate": row.get("lastMaintenanceDate"),
        "sensorLocation": row.get("sensorLocation"),
    }