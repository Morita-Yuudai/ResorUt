/**
 * Fully local mock provider — no network calls. Stands in for a real
 * image-generation provider (e.g. openaiProvider.js) behind the exact same
 * analyze/generateImage/review interface, so useAgentRun doesn't change
 * when a real provider is swapped in later.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&apos;";
    }
  });
}

function buildPlaceholderImage(prompt) {
  const label = escapeXml((prompt || "AI Art").slice(0, 40));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="1024">
    <rect width="100%" height="100%" fill="#0b1220"/>
    <rect x="24" y="24" width="720" height="976" fill="none" stroke="#9be8a3" stroke-width="2" stroke-dasharray="8 8"/>
    <text x="50%" y="50%" fill="#9be8a3" font-size="28" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const mockImageAgentProvider = {
  async analyze(prompt) {
    await delay(900);
    return {
      reasoning: `「${prompt}」というリクエストを解析し、テーマパークの世界観に合う構図・配色を検討しました。`,
    };
  },
  async generateImage(prompt) {
    await delay(1400);
    return { imageUrl: buildPlaceholderImage(prompt) };
  },
  async review() {
    await delay(600);
    return { approved: true };
  },
};
