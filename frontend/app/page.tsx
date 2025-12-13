'use client';

import Upload from "@/components/Upload";
import RiskTable from "@/components/RiskTable";
import RecommendationPanel from "@/components/RecommendationPanel";
import RiskSummary from "@/components/RiskSummary";
import { useState } from "react";
import { RiskRow } from "@/types";

export default function HomePage() {
  const [data, setData] = useState<RiskRow[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleUploadComplete = (results: RiskRow[]) => {
    setData(results);

    const recs = results.map((r) => {
      if (r.risk_level === "High") {
        return `⚠️ Immediate maintenance required for ${r.equipment_id} (High risk).`;
      } else if (r.risk_level === "Medium") {
        return `🔍 Monitor ${r.equipment_id} closely and schedule a routine check (Medium risk).`;
      } else {
        return `✅ Routine inspection recommended for ${r.equipment_id} (Low risk).`;
      }
    });

    setRecommendations(recs);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-1.5">AI Maintenance Predictor Dashboard</h1>
      <p className="text-gray-600 mb-5">Predicting equipment failure from sensor data.</p>

      <Upload onUploadComplete={handleUploadComplete} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <RiskSummary data={data} />
          <RiskTable data={data} />
        </div>
        <RecommendationPanel recommendations={recommendations} />
      </div>
    </main>
  );
}