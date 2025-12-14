"""
File: app/api/routes.py
Purpose: Defines REST API endpoints for CSV upload, prediction, and recommendations
Version: 1.0
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

from app.ml.predict import predict_risks
from app.llm.recommend import generate_recommendations
from app.utils.csv_loader import parse_csv

router = APIRouter(prefix="/api", tags=["API"])

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
    predictions = predict_risks(rows)
    return JSONResponse(
        content={"rows_count": len(rows), "predictions": predictions},
        headers={"X-Endpoint": "predict"}
    )

@router.post("/recommend")
async def recommend(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    rows = await parse_csv(file)
    predictions = predict_risks(rows)
    recs = generate_recommendations(predictions)
    return JSONResponse(
        content={"rows_count": len(recs), "recommendations": recs},
        headers={"X-Endpoint": "recommend"}
    )
