import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

import { fetchYouTubeData } from "./youtube.js";
import { extractKeywords } from "./keywordExtractor.js";
import { extractHashtags } from "./hashtagExtractor.js"; // ✅ NEW
import { extractHooks } from "./hookExtractor.js";       // ✅ NEW

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/analyze", async (req, res) => {
  const { query } = req.query;
  console.log("Received query:", query);

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // 1️⃣ YouTube Data
    const videos = await fetchYouTubeData(query);

    // 2️⃣ Keywords
    const keywords = extractKeywords(videos);

    // 3️⃣ Hashtags ✅
    const hashtags = extractHashtags(videos);

    // 4️⃣ Hooks ✅
    const hooks = extractHooks(videos);

    // 5️⃣ Python Trends (optional / unstable)
    const pythonPath = "python3";
    const scriptPath = path.join(__dirname, "trends.py");

    const py = spawn(pythonPath, [scriptPath, query]);
    let pyData = "";

    py.stdout.on("data", (data) => {
      pyData += data.toString();
    });

    py.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
    });

    py.on("close", () => {
      let trends = [];
      let cities = [];

      try {
        const result = JSON.parse(pyData);
        trends = result.timeTrend || [];
        cities = result.topCities || [];
      } catch (e) {
        console.warn("Trends not available, returning YouTube data only");
      }

      return res.json({
        query,
        keywords,
        hashtags,   // ✅ ADDED
        hooks,      // ✅ ADDED
        trends,
        cities,
        videos
      });
    });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
