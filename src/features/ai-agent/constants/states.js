/**
 * Explicit state machine for the image-generation AI agent mock.
 * Each state is one step of the agent's run; a provider (mock or real)
 * is what actually performs the work behind ANALYZING/GENERATING/REVIEWING —
 * swapping providers never changes this state shape.
 */

export const AGENT_STATE = {
  IDLE: "idle",
  ANALYZING: "analyzing",
  GENERATING: "generating",
  REVIEWING: "reviewing",
  DONE: "done",
  ERROR: "error",
};

export const AGENT_STATE_SEQUENCE = [
  AGENT_STATE.IDLE,
  AGENT_STATE.ANALYZING,
  AGENT_STATE.GENERATING,
  AGENT_STATE.REVIEWING,
  AGENT_STATE.DONE,
];

export const AGENT_STATE_LABEL = {
  [AGENT_STATE.IDLE]: "待機中",
  [AGENT_STATE.ANALYZING]: "リクエストを解析中",
  [AGENT_STATE.GENERATING]: "画像を生成中",
  [AGENT_STATE.REVIEWING]: "生成結果をレビュー中",
  [AGENT_STATE.DONE]: "完成",
  [AGENT_STATE.ERROR]: "エラー",
};
