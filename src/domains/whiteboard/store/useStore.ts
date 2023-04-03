import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  type Connection,
  type EdgeChange,
  type NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Edge,
} from "reactflow";

import * as initialData from "./initialData";
import type { AppState } from "./types";
import { type WidgetNode } from "../widgetTypes";
import { compact, type Dictionary, groupBy } from "lodash";
import { type ResultWidgetNode } from "../widgets/ResultWidget";

export const useStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialData,
        onNodesChange: (changes: NodeChange[]) => {
          set((state) => {
            state.nodes = applyNodeChanges(
              changes,
              state.nodes
            ) as WidgetNode[];
          });
        },
        onEdgesChange: (changes: EdgeChange[]) => {
          set({
            edges: applyEdgeChanges(changes, get().edges),
          });
        },
        onConnect: (connection: Connection) => {
          set({
            edges: addEdge(connection, get().edges),
          });
        },
        addNode: (node) => {
          set((state) => {
            state.nodes.push(node);
          });
        },
        addEdge: (source, target) => {
          set((state) => {
            state.edges.push({ id: "e${source}-${target}", source, target });
          });
        },
        updateNodeData: (id, data) => {
          set((state) => {
            const index = state.nodes.findIndex((node) => node.id === id);

            if (state.nodes[index] !== undefined) {
              state.nodes[index]!.data = {
                ...state.nodes[index],
                ...data,
              }
            }
          });
        },
        updateNodeContent: (id, content) => {
          set((state) => {
            const index = state.nodes.findIndex((node) => node.id === id);
            if (
              state.nodes[index] !== undefined &&
              state.nodes[index]?.type === "result"
            ) {
              (state.nodes[index]! as ResultWidgetNode).data.result = content;
            }
          });
        },
        hasParent: (nodeId) =>
          get().edges.some(({ target }) => target === nodeId),
        generateFullPrompt: (resultId) => {
          const nodes = get().nodes;
          const edges = get().edges;
          const parts = getNodeParents(nodes, edges)(resultId);
          const text = buildFullPrompt(parts);

          return text;
        },
      })),
      { name: "flow-storage" }
    )
  )
);

const getNodeParents =
  (nodes: WidgetNode[], edges: Edge[]) => (nodeId: string) => {
    const getSources = (targetId: string): string[] => {
      const sources = edges
        .filter((edge) => edge.target === targetId)
        .map((edge) => edge.source);

      return [...sources, ...sources.flatMap((source) => getSources(source))];
    };

    const sources = compact(
      [...new Set(getSources(nodeId))].map((source) =>
        nodes.find((node) => node.id === source)
      )
    ).reverse();

    return groupBy(sources, "type");
  };

const buildFullPrompt = (data: Dictionary<WidgetNode[]>) => {
  const prompt = data.prompt?.map(({ data }) => data.title).join(". ");
  const modifiers = data.modifier?.map(({ data }) => data.title).join(". ");

  return compact([prompt, modifiers]).join("\n");
};
