type RecommendationPanelProps = {
  recommendations: string[];
};

export default function RecommendationPanel({ recommendations }: RecommendationPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-4">
        AI Maintenance Recommendations
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-sm text-gray-600">
          Upload sensor CSVs to generate preventive maintenance insights.
        </p>
      ) : (
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
          {recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
