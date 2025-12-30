import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function HashtagChart({ hashtags }) {
  return (
    <>
      <h3>#️⃣ Hashtag Popularity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={hashtags}>
          <XAxis dataKey="tag" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
