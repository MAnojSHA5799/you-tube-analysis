import { useState } from "react";
import { analyzeKeyword } from "./api";
import SummaryCards from "./components/SummaryCards";
import KeywordTable from "./components/KeywordTable";
import HashtagChart from "./components/HashtagChart";
import VideosTable from "./components/VideosTable";

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await analyzeKeyword(query);
    setData(res);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>📊 YouTube Keyword Analyzer</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="skin care"
      />
      <button onClick={handleSearch}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {data && (
        <>
          <SummaryCards data={data} />
          <KeywordTable keywords={data.keywords} />
          <HashtagChart hashtags={data.hashtags} />
          <VideosTable videos={data.videos} />
        </>
      )}
    </div>
  );
}
