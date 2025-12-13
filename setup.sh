#!/bin/bash
set -e

PROJECT_NAME="ai-maintenance-predictor-dashboard"

echo "🚀 Setting up $PROJECT_NAME..."

# Create root folder
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# ---------------------------
# Frontend Setup (Next.js)
# ---------------------------
echo "🌐 Setting up frontend..."
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias "@/*"

# ---------------------------
# Backend Setup (FastAPI)
# ---------------------------
echo "⚙️ Setting up backend..."
mkdir backend
cd backend

python3 -m venv venv
source venv/bin/activate

mkdir -p app/api app/ml app/llm app/utils

cat <<EOF > app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Maintenance Predictor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}
EOF

cat <<EOF > requirements.txt
fastapi
uvicorn
pandas
numpy
scikit-learn
python-multipart
openai
EOF

deactivate
cd ..

# ---------------------------
# Root .gitignore
# ---------------------------
echo "🧹 Creating .gitignore..."
cat <<EOF > .gitignore
# Node
frontend/node_modules
frontend/.next
frontend/.env*

# Python
backend/venv
backend/__pycache__
backend/*.pkl
backend/.env

# OS
.DS_Store
EOF

# ---------------------------
# Root README
# ---------------------------
echo "📄 Creating README.md..."
cat <<EOF > README.md
# AI Maintenance Predictor Dashboard

Full-stack AI application for predictive maintenance in Oil & Gas.

## Stack
- Frontend: Next.js + TailwindCSS
- Backend: FastAPI
- ML: Scikit-learn
- AI: LLM-based recommendations

## Run Locally

### Backend
\`\`\`bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm run dev
\`\`\`
EOF

echo "✅ Setup complete!"
echo "➡️ Next steps:"
echo "   cd $PROJECT_NAME"
echo "   git init && git add . && git commit -m 'Initial setup'"
