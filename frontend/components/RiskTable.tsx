import { RiskRow } from "@/types";

export default function RiskTable({ data }: { data: RiskRow[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">No data uploaded yet.</p>
      </div>
    );
  }

  const riskBadgeColors: Record<RiskRow["risk_level"], string> = {
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-400 text-black",
    Low: "bg-green-500 text-white",
  };

  const rowBgColors: Record<RiskRow["risk_level"], string> = {
    High: "bg-red-50",
    Medium: "bg-yellow-50",
    Low: "bg-green-50",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-4">Equipment Risk Overview</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Equipment</th>
            <th className="text-left py-2">Risk %</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Last Maintenance</th>
            <th className="text-left py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.equipment_id} className={`border-b last:border-0 hover:bg-gray-100 transition ${rowBgColors[row.risk_level]}`}>
              <td className="py-2 px-2">{row.equipment_id}</td>
              <td className="py-2 px-2">{(row.failure_probability * 100).toFixed(1)}%</td>
              <td className="py-2 px-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${riskBadgeColors[row.risk_level]}`}>
                  {row.risk_level}
                </span>
              </td>
              <td className="py-2 px-2">{row.lastMaintenanceDate || "-"}</td>
              <td className="py-2 px-2">{row.sensorLocation || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}