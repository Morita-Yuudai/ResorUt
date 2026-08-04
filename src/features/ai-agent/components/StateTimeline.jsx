"use client";

import { AGENT_STATE, AGENT_STATE_LABEL, AGENT_STATE_SEQUENCE } from "../constants/states";

/** Presentational only: renders the agent's progress through AGENT_STATE_SEQUENCE. */
export function StateTimeline({ status }) {
  const currentIndex =
    status === AGENT_STATE.ERROR
      ? -1
      : AGENT_STATE_SEQUENCE.indexOf(status === AGENT_STATE.IDLE ? AGENT_STATE.IDLE : status);

  return (
    <ol className="flex flex-wrap gap-2">
      {AGENT_STATE_SEQUENCE.map((step, index) => {
        const isComplete = currentIndex > index || status === AGENT_STATE.DONE;
        const isActive = currentIndex === index && status !== AGENT_STATE.DONE;
        return (
          <li
            key={step}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              isActive
                ? "border-emerald-400 bg-emerald-400/10 text-emerald-300"
                : isComplete
                  ? "border-white/30 bg-white/10 text-white/80"
                  : "border-white/10 text-white/40"
            }`}
          >
            {AGENT_STATE_LABEL[step]}
          </li>
        );
      })}
      {status === AGENT_STATE.ERROR && (
        <li className="rounded-full border border-red-400 bg-red-400/10 px-3 py-1 text-xs text-red-300">
          {AGENT_STATE_LABEL[AGENT_STATE.ERROR]}
        </li>
      )}
    </ol>
  );
}
