import axios from "axios";

export async function fetchYouTubeData(query) {
  const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
    params: {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 20,
      key: process.env.YOUTUBE_API_KEY
    }
  });

  return res.data.items.map(item => ({
    title: item.snippet.title,
    description: item.snippet.description,
    channel: item.snippet.channelTitle
  }));
}