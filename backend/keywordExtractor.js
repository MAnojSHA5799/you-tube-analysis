export function extractKeywords(videos) {
  const text = videos.map(v => v.title + " " + v.description).join(" ").toLowerCase();
  const stopWords = ["the","and","for","with","this","that"];
  const words = text.match(/\b[a-z]{4,}\b/g) || [];
  const freq = {};

  words.forEach(w => {
    if (!stopWords.includes(w)) {
      freq[w] = (freq[w] || 0) + 1;
    }
  });

  return Object.entries(freq)
    .sort((a,b) => b[1]-a[1])
    .slice(0,15)
    .map(([word,count]) => ({ word, count }));
}