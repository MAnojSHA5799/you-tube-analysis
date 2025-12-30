export function extractHashtags(videos) {
    const map = {};
  
    videos.forEach(v => {
      const text = `${v.title} ${v.description || ""}`;
      const tags = text.match(/#\w+/g);
  
      if (tags) {
        tags.forEach(tag => {
          const key = tag.toLowerCase();
          map[key] = (map[key] || 0) + 1;
        });
      }
    });
  
    return Object.entries(map)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }
  