# File: app/api/routes.py
# Purpose: REST API endpoints for CSV upload, prediction, and recommendations
# Version: 2.0

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import joblib
import csv
from io import StringIO

from app.llm.recommend import generate_recommendations

router = APIRouter(prefix="/api", tags=["API"])

# Load the trained RandomForest model once
model_path = "app/ml/model.pkl"
model = joblib.load(model_path)

# Feature columns expected by the model
FEATURE_COLS = ["temperature", "vibration", "pressure", "runtime"]

# CSV parser
async def parse_csv(file: UploadFile):
    content = await file.read()
    decoded = content.decode("utf-8")
    reader = csv.DictReader(StringIO(decoded))
    rows = []
    for row in reader:
        try:
            features = [float(row[col]) for col in FEATURE_COLS]
            rows.append({
                "equipment_id": row.get("equipment_id", "Unknown"),
                "features": features,
                "lastMaintenanceDate": row.get("lastMaintenanceDate"),
                "sensorLocation": row.get("sensorLocation")
            })
        except Exception:
            continue  # skip invalid rows
    if not rows:
        raise HTTPException(status_code=400, detail="No valid rows found in CSV")
    return rows


# Helper to map numeric prediction to risk level
RISK_MAP = {0: "Low", 1: "Medium", 2: "High"}


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    rows = await parse_csv(file)
    return JSONResponse(
        content={"rows_count": len(rows), "rows": rows},
        headers={"X-Endpoint": "upload"}
    )


@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")


    rows = await parse_csv(file)
    X = [r["features"] for r in rows]
    preds = model.predict(X)

    # Map predictions to risk_level
    for r, p in zip(rows, preds):
        r["risk_level"] = RISK_MAP.get(p, "Low")

    return JSONResponse(
        content={"rows_count": len(rows), "predictions": rows},
        headers={"X-Endpoint": "predict"}
    )


@router.post("/recommend")
async def recommend(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")


    rows = await parse_csv(file)
    X = [r["features"] for r in rows]
    preds = model.predict(X)

    # Map predictions to risk_level
    for r, p in zip(rows, preds):
        r["risk_level"] = RISK_MAP.get(p, "Low")

    recs = generate_recommendations(rows)

    return JSONResponse(
        content={"rows_count": len(rows), "recommendations": recs},
        headers={"X-Endpoint": "recommend"}
    )
