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
