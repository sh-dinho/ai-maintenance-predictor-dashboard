/**
 * File: src/components/Upload.tsx
 * Purpose: Handles CSV upload, validation, and communicates with backend for predictions and recommendations
 * Version: 1.0
 */

'use client';

import { useState } from 'react';
import { RiskRow, ValidationIssue } from "../../types";

type UploadProps = {
  onUploadComplete: (results: { predictions: RiskRow[], recommendations: string[] }) => void;
};

export default function Upload({ onUploadComplete }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorReport, setErrorReport] = useState<ValidationIssue[]>([]);

  const handleFile = (f: File) => {
    if (f.type !== 'text/csv') {
      setErrorReport([{ reason: 'Only CSV files are allowed.' }]);
      return;
    }
    setFile(f);
    setErrorReport([]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict`, {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || 'Upload failed');

      const recsRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recommend`, {
        method: 'POST',
        body: formData,
      });
      const recsJson = await recsRes.json();
      if (!recsRes.ok) throw new Error(recsJson.detail || 'Recommendation failed');

      onUploadComplete({ predictions: json.predictions, recommendations: recsJson.recommendations });
    } catch (err: any) {
      setErrorReport([{ reason: err.message || 'Failed to upload CSV' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-3">Upload Sensor CSV</h2>
      <input type="file" accept=".csv" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Upload & Predict'}
      </button>

      {errorReport.length > 0 && (
        <div className="mt-4 text-sm text-red-600">
          ⚠️ {errorReport.length} issue(s) found:
          <ul className="list-disc ml-5 mt-2">
            {errorReport.map((i, idx) => (
              <li key={idx}>{i.equipment_id || "Unknown"} → {i.reason}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
