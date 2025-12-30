const HOOK_WORDS = [
    "how", "why", "stop", "secret", "mistake",
    "best", "never", "hack", "truth", "before", "after"
  ];
  
  export function extractHooks(videos) {
    const hooks = [];
  
    videos.forEach(v => {
      const title = v.title.toLowerCase();
      const words = title.split(" ");
  
      const isShort = words.length <= 10;
      const hasHookWord = HOOK_WORDS.some(w => title.includes(w));
  
      if (isShort && hasHookWord) {
        hooks.push(v.title);
      }
    });
  
    return [...new Set(hooks)].slice(0, 10);
  }
  