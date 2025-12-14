/**
 * File: app/page.tsx
 * Purpose: Main dashboard page combining Upload, RiskSummary, RiskTable, and RecommendationPanel
 * Version: 1.1
 */

'use client';

import Upload from "@/components/Upload";
import RiskTable from "@/components/RiskTable";
import RecommendationPanel from "@/components/RecommendationPanel";
import RiskSummary from "@/components/RiskSummary";
import { useState } from "react";
import { RiskRow } from "../../types";

export default function HomePage() {
  const [data, setData] = useState<RiskRow[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Called after backend returns predictions & recommendations
  const handleUploadComplete = (results: {
    predictions: RiskRow[];
    recommendations: string[];
  }) => {
    setData(results.predictions);
    setRecommendations(results.recommendations);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-1.5">AI Maintenance Predictor Dashboard</h1>
      <p className="text-gray-600 mb-5">Predicting equipment failure from sensor data.</p>

      {/* Upload CSV & trigger backend predictions */}
      <Upload onUploadComplete={handleUploadComplete} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left column: summary & table */}
        <div className="lg:col-span-2 space-y-6">
          <RiskSummary data={data} />
          <RiskTable data={data} />
        </div>

        {/* Right column: AI-generated recommendations */}
        <RecommendationPanel recommendations={recommendations} />
      </div>
    </main>
  );
}
