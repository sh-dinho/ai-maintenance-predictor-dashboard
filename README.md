# AI Maintenance Predictor Dashboard

Full-stack AI application for predictive maintenance in Oil & Gas.

## Stack
- Frontend: Next.js + TailwindCSS
- Backend: FastAPI
- ML: Scikit-learn
- AI: LLM-based recommendations

## Features
- CSV sensor data upload
- Failure risk prediction
- Interactive dashboard
- AI-generated maintenance recommendations

## Run Locally

### Backend
```bash
cd backend
uvicorn app.main:app --reload


# ai-maintenance-predictor-dashboard
Predict failures from sensor CSVs → Risk dashboard → Recommendations

Architecture
[Next.js + Tailwind]
   ├── CSV Upload
   ├── Dashboard UI
   ├── Charts & Tables
   ↓ REST API
[FastAPI Backend]
   ├── /upload
   ├── /predict
   ├── /recommend
   ├── Feature Engineering
   ├── ML Model Inference
   └── LLM Recommendation Engine

# Frontend 
 /app
  /page.tsx            → Dashboard
/components
  UploadCard.tsx
  KPICards.tsx
  RiskTable.tsx
  RiskChart.tsx
  RecommendationPanel.tsx
/styles
  globals.css

# Backend
/app
  main.py
  api/
    routes.py
  ml/
    model.pkl
    features.py
    predict.py
  llm/
    recommend.py
  utils/
    csv_loader.py
