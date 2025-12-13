import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

type RiskRow = {
  equipment_id: string;
  failure_probability: number;
  risk_level: "High" | "Medium" | "Low";
};

type RiskSummaryProps = {
  data: RiskRow[];
};

export default function RiskSummary({ data }: RiskSummaryProps) {
  const counts = data.reduce(
    (acc, row) => {
      acc[row.risk_level]++;
      return acc;
    },
    { High: 0, Medium: 0, Low: 0 }
  );

  const chartData = [
    { risk: "High", count: counts.High },
    { risk: "Medium", count: counts.Medium },
    { risk: "Low", count: counts.Low },
  ];

  const colors: Record<string, string> = {
    High: "#DC2626",   // red
    Medium: "#FACC15", // yellow
    Low: "#22C55E",    // green
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-4">Risk Summary</h2>
      {data.length === 0 ? (
        <p className="text-sm text-gray-600">
          Upload CSVs to see summary of equipment risk.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <XAxis dataKey="risk" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" label={{ position: "top" }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.risk]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
