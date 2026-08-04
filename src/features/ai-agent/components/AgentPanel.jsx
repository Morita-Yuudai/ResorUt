"use client";

import { useState } from "react";
import { AGENT_STATE } from "../constants/states";
import { useAgentRun } from "../hooks/useAgentRun";
import { StateTimeline } from "./StateTimeline";

/**
 * Composition root for the ai-agent mock: prompt input + state timeline +
 * result. Uses the local mock provider by default (see useAgentRun) — no
 * real API key or network call involved.
 */
export function AgentPanel() {
  const agent = useAgentRun();
  const [prompt, setPrompt] = useState("");

  const isBusy =
    agent.status === AGENT_STATE.ANALYZING ||
    agent.status === AGENT_STATE.GENERATING ||
    agent.status === AGENT_STATE.REVIEWING;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!prompt.trim() || isBusy) return;
    agent.run(prompt.trim());
  };

  return (
    <section className="mx-auto max-w-2xl px-6 py-16 text-white">
      <h2 className="text-xl font-semibold">AIエージェントでオリジナル画像をつくる（プレビュー）</h2>
      <p className="mt-1 text-sm text-white/70">
        状態遷移（解析→生成→レビュー→完成）のモックです。現在はローカルの疑似処理のみで、外部APIは呼び出していません。
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          disabled={isBusy}
          placeholder="例: 夜のパレードをイメージした花火のイラスト"
          className="flex-1 rounded-md border border-white/20 bg-black/60 p-2 text-sm text-white placeholder:text-white/40"
        />
        <button
          type="submit"
          disabled={isBusy || !prompt.trim()}
          className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isBusy ? "実行中..." : "エージェントを実行"}
        </button>
      </form>

      <div className="mt-5">
        <StateTimeline status={agent.status} />
      </div>

      {agent.reasoning && (
        <p className="mt-4 text-sm text-white/70">{agent.reasoning}</p>
      )}

      {agent.status === AGENT_STATE.ERROR && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {agent.error}
        </p>
      )}

      {agent.imageUrl && (
        <div className="mt-5">
          <img
            src={agent.imageUrl}
            alt="AIエージェントが生成した画像（モック）"
            className="w-full max-w-xs rounded-lg border border-white/10"
          />
          {agent.status === AGENT_STATE.DONE && (
            <button
              type="button"
              onClick={agent.reset}
              className="mt-3 text-xs text-white/60 underline hover:text-white"
            >
              もう一度試す
            </button>
          )}
        </div>
      )}
    </section>
  );
}
