/**
 * File: src/components/RecommendationPanel.tsx
 * Purpose: Displays AI-generated maintenance recommendations based on risk levels
 * Version: 1.1
 */

type RecommendationPanelProps = {
  recommendations: string[];
};

export default function RecommendationPanel({
  recommendations,
}: RecommendationPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow h-full">
      <h2 className="font-semibold text-lg mb-4">
        AI Maintenance Recommendations
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-sm text-gray-600">
          Upload sensor CSVs to generate preventive maintenance insights.
        </p>
      ) : (
        <ul className="space-y-3 max-h-64 overflow-y-auto text-sm text-gray-700">
          {recommendations.map((rec, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 leading-snug"
            >
              <span className="mt-0.5 text-blue-600">•</span>
              <span className="break-words">{rec}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
