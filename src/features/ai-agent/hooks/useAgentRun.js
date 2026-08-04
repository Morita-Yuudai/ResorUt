"use client";

import { useCallback } from "react";
import { mockImageAgentProvider } from "../providers/mockProvider";
import { useAgentStateMachine } from "./useAgentStateMachine";

/**
 * Container hook: drives the agent state machine by calling a provider
 * (defaults to the local mock). Each provider call maps to exactly one
 * state transition, so pointing `provider` at openaiImageAgentProvider
 * later changes nothing here — only which function performs the work.
 */
export function useAgentRun(provider = mockImageAgentProvider) {
  const [state, dispatch] = useAgentStateMachine();

  const run = useCallback(
    async (prompt) => {
      dispatch({ type: "START", prompt });
      try {
        const { reasoning } = await provider.analyze(prompt);
        dispatch({ type: "ANALYZED", reasoning });

        const { imageUrl } = await provider.generateImage(prompt, reasoning);
        dispatch({ type: "GENERATED", imageUrl });

        await provider.review(imageUrl);
        dispatch({ type: "REVIEWED" });
      } catch (error) {
        dispatch({ type: "FAILED", error: error instanceof Error ? error.message : String(error) });
      }
    },
    [provider, dispatch]
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), [dispatch]);

  return { ...state, run, reset };
}
