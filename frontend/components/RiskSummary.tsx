/**
 * File: src/components/RiskSummary.tsx
 * Purpose: Visualizes counts of High/Medium/Low risk equipment using a bar chart
 * Version: 1.1
 */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { RiskRow } from "../types";

type RiskSummaryProps = { data: RiskRow[] };

export default function RiskSummary({ data }: RiskSummaryProps) {
  const counts = data.reduce(
    (acc, row) => {
      // Ensure risk_level is one of High/Medium/Low
      if (row.risk_level in acc) acc[row.risk_level as keyof typeof acc]++;
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
    High: "#DC2626",
    Medium: "#FACC15",
    Low: "#22C55E",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-4">Risk Summary</h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-600">
          Upload CSVs to see summary of equipment risk.
        </p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
            >
              <XAxis dataKey="risk" />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value: number, _: any, props: any) =>
                  props?.payload
                    ? [`${value}`, `${props.payload.risk} Risk`]
                    : [`${value}`, "Risk"]
                }
              />
              <Bar
                dataKey="count"
                label={{ position: "top", fill: "#374151", fontSize: 12 }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.risk]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <p className="mt-4 text-gray-700">
            Total equipment analyzed:{" "}
            <span className="font-semibold">{data.length}</span>
          </p>
        </>
      )}
    </div>
  );
}
