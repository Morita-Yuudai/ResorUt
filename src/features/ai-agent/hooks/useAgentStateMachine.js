"use client";

import { useReducer } from "react";
import { AGENT_STATE } from "../constants/states";

const initialState = {
  status: AGENT_STATE.IDLE,
  prompt: "",
  reasoning: null,
  imageUrl: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...initialState, status: AGENT_STATE.ANALYZING, prompt: action.prompt };
    case "ANALYZED":
      return { ...state, status: AGENT_STATE.GENERATING, reasoning: action.reasoning };
    case "GENERATED":
      return { ...state, status: AGENT_STATE.REVIEWING, imageUrl: action.imageUrl };
    case "REVIEWED":
      return { ...state, status: AGENT_STATE.DONE };
    case "FAILED":
      return { ...state, status: AGENT_STATE.ERROR, error: action.error };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

/** Pure state container — no I/O. useAgentRun drives it via dispatch. */
export function useAgentStateMachine() {
  return useReducer(reducer, initialState);
}
