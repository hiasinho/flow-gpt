import { shallow } from "zustand/shallow";
import { type AppState } from "./types";
import { useStore } from "./useStore";

const stateAndActionsSelector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
});

export const useWhiteboard = () => useStore(stateAndActionsSelector, shallow);
