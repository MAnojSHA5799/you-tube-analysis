import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function TrendChart({ trends }) {
  if (!trends || trends.length === 0) {
    return <p>No trend data available</p>;
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Keyword Search Trend (Last 12 Months)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ff0000"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
