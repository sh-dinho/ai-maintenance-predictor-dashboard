"""
File: app/api/routes.py
Purpose: Defines REST API endpoints for CSV upload, prediction, and recommendations
Version: 1.1
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

    try:
        rows = await parse_csv(file)
        return JSONResponse(
            content={"rows_count": len(rows), "rows": rows},
            headers={"X-Endpoint": "upload"}
        )
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"error": str(e)}
        )

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    try:
        rows = await parse_csv(file)
        predictions = predict_risks(rows)
        recommendations = generate_recommendations(predictions)
        return JSONResponse(
            content={
                "predictions": predictions,
                "recommendations": recommendations
            },
            headers={"X-Endpoint": "predict"}
        )
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"error": str(e)}
        )

@router.post("/recommend")
async def recommend(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")

    try:
        rows = await parse_csv(file)
        predictions = predict_risks(rows)
        recs = generate_recommendations(predictions)
        return JSONResponse(
            content={"rows_count": len(recs), "recommendations": recs},
            headers={"X-Endpoint": "recommend"}
        )
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"error": str(e)}
        )
