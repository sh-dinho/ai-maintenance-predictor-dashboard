"""
File: app/api/routes.py
Purpose: Defines REST API endpoints for CSV upload, prediction, and recommendations
Version: 1.0
"""

from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from ml.predict import predict_risks
from llm.recommend import generate_recommendations
from utils.csv_loader import parse_csv

router = APIRouter()

@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    rows = await parse_csv(file)
    return JSONResponse(content={"rows": rows}, headers={"X-Endpoint": "upload"})

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    rows = await parse_csv(file)
    predictions = predict_risks(rows)
    return JSONResponse(content={"predictions": predictions}, headers={"X-Endpoint": "predict"})

@router.post("/recommend")
async def recommend(file: UploadFile = File(...)):
    rows = await parse_csv(file)
    predictions = predict_risks(rows)
    recs = generate_recommendations(predictions)
    return JSONResponse(content={"recommendations": recs}, headers={"X-Endpoint": "recommend"})