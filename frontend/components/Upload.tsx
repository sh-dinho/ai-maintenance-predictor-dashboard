'use client';

import { useState } from 'react';

type UploadProps = {
  onUploadComplete: (data: any[]) => void;
};

export default function Upload({ onUploadComplete }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const json = await res.json();
      onUploadComplete(json.results);
    } catch (err) {
      setError('Failed to upload CSV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-3">
        Upload Sensor CSV
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-600 mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {error && (
        <p className="text-sm text-red-500 mt-3">{error}</p>
      )}
    </div>
  );
}
