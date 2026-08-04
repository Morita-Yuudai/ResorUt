/**
 * Stub provider matching mockProvider's interface. Not wired up or called
 * anywhere yet — swap this in for mockImageAgentProvider inside useAgentRun
 * once app/api/ai-agent/{analyze,generate,review}/route.js exist server-side
 * with OPENAI_API_KEY (never call OpenAI directly from the client).
 */
export const openaiImageAgentProvider = {
  async analyze(prompt) {
    const res = await fetch("/api/ai-agent/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) throw new Error("解析に失敗しました");
    return res.json();
  },
  async generateImage(prompt, reasoning) {
    const res = await fetch("/api/ai-agent/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, reasoning }),
    });
    if (!res.ok) throw new Error("画像生成に失敗しました");
    return res.json();
  },
  async review(imageUrl) {
    const res = await fetch("/api/ai-agent/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
    if (!res.ok) throw new Error("レビューに失敗しました");
    return res.json();
  },
};
