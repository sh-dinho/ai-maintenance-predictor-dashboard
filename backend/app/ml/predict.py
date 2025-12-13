"""
File: app/ml/predict.py
Purpose: Loads ML model and performs inference to assign risk levels
Version: 1.0
"""

import joblib
from .features import extract_features

# Load model once at startup
model = joblib.load("app/ml/model.pkl")

def predict_risks(rows):
    features = [extract_features(r) for r in rows]
    X = [[f["failure_probability"]] for f in features]
    preds = model.predict(X)

    results = []
    for f, pred in zip(features, preds):
        results.append({
            "equipment_id": f["equipment_id"],
            "failure_probability": f["failure_probability"],
            "risk_level": pred,
            "lastMaintenanceDate": f["lastMaintenanceDate"],
            "sensorLocation": f["sensorLocation"],
        })
    return results