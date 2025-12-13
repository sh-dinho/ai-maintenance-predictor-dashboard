"""
File: app/ml/predict.py
Purpose: Loads ML model and performs inference to assign risk levels
Version: 1.0
"""

import joblib
from .features import extract_features
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

# Load model once at startup
model = joblib.load(MODEL_PATH)

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