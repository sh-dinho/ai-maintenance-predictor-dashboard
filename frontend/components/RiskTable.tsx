type RiskRow = {
  equipment_id: string;
  failure_probability: number;
  risk_level: "High" | "Medium" | "Low";
};

export default function RiskTable({ data }: { data: RiskRow[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">No data uploaded yet.</p>
      </div>
    );
  }

  const riskColors: Record<RiskRow["risk_level"], string> = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-4">Equipment Risk Overview</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th scope="col" className="text-left py-2">Equipment</th>
            <th scope="col" className="text-left py-2">Risk %</th>
            <th scope="col" className="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.equipment_id} className="border-b last:border-0">
              <td className="py-2">{row.equipment_id}</td>
              <td className="py-2">
                {(row.failure_probability * 100).toFixed(1)}%
              </td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${riskColors[row.risk_level]}`}
                >
                  {row.risk_level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
