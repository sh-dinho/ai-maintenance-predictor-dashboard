# File: backend/create_dummy_model.py
import os
import joblib
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

# Load dataset
x, y = load_iris(return_X_y=True)

# Train simple model
clf = RandomForestClassifier(n_estimators=10, random_state=42)
clf.fit(x, y)

# Build path safely
model_dir = os.path.join("backend", "app", "ml")
os.makedirs(model_dir, exist_ok=True)   # create folder if missing
model_path = os.path.join(model_dir, "model.pkl")

# Save model
joblib.dump(clf, model_path)
print(f"Dummy model saved to {model_path}")