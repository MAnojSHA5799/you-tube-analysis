export default function SummaryCards({ data }) {
    return (
      <div style={{ display: "flex", gap: 20, margin: "20px 0" }}>
        <Card title="Keywords" value={data.keywords.length} />
        <Card title="Hashtags" value={data.hashtags.length} />
        <Card title="Videos" value={data.videos.length} />
      </div>
    );
  }
  
  function Card({ title, value }) {
    return (
      <div style={{
        background: "#f4f6f8",
        padding: 20,
        borderRadius: 10,
        width: 160
      }}>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
    );
  }
  