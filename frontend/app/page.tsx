'use client';

import Upload from "@/components/Upload"; // renamed import
import { useState } from "react";

export default function HomePage() {
  const [data, setData] = useState<any[]>([]);

  const handleUploadClick = async () => {
    if (data.length === 0) {
      console.warn("No data selected yet!");
      return;
    }

    console.log("Manual upload triggered:", data);

    await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-1.5">AI Maintenance Predictor Dashboard</h1>
      <p className="text-gray-600 mb-5">
        Making prediction for equipment failure from sensor data.
      </p>

      {/* Upload component just updates state */}
      <Upload onUploadComplete={setData} />

       
    </main>
  );
}
