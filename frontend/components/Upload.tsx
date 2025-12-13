'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { RiskRow } from "@/types";

type UploadProps = {
  onUploadComplete: (data: RiskRow[]) => void;
};

export default function Upload({ onUploadComplete }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<RiskRow[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (f: File) => {
    if (f.type !== "text/csv") {
      setError("Only CSV files are allowed.");
      return;
    }
    setFile(f);
    setError(null);
    setPreview([]);
  };

  const handlePreview = () => {
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data as RiskRow[];
        setPreview(parsed);
      },
      error: (err) => {
        setError(`Failed to parse CSV: ${err.message}`);
      },
    });
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/upload',
        { method: 'POST', body: formData }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Upload failed');
      onUploadComplete(json.results as RiskRow[]);
    } catch (err: any) {
      setError(err.message || 'Failed to upload CSV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-3">Upload Sensor CSV</h2>

      <div
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        <input
          type="file"
          accept=".csv"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="block text-sm text-gray-600">
          {file ? <span className="font-medium text-gray-800">{file.name}</span> : "Drag & drop your CSV here, or click to browse"}
        </label>
      </div>

      <div className="flex space-x-3 mt-4">
        <button onClick={handlePreview} disabled={!file} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50">Preview</button>
        <button onClick={handleUpload} disabled={!file || loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

      {preview.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Preview (first 5 rows)</h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Equipment</th>
                <th className="text-left py-1">Failure Probability</th>
                <th className="text-left py-1">Risk Level</th>
                <th className="text-left py-1">Last Maintenance</th>
                <th className="text-left py-1">Location</th>
              </tr>
            </thead>
            <tbody>
              {preview.slice(0, 5).map((row, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-1">{row.equipment_id}</td>
                  <td className="py-1">{row.failure_probability}</td>
                  <td className="py-1">{row.risk_level}</td>
                  <td className="py-1">{row.lastMaintenanceDate || "-"}</td>
                  <td className="py-1">{row.sensorLocation || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}