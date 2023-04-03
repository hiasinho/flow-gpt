import { type StickyData } from "@d/stickies/Sticky";
import {
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "reactflow";
import {
  type WidgetNode,
  type WidgetData,
  type WidgetType,
} from "../widgetTypes";

export interface AppState {
  nodes: WidgetNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: WidgetNode) => void;
  addEdge: (source: string, target: string) => void;
  updateNodeData: <T extends WidgetData>(nodeId: string, data: T) => void;
  updateNodeContent: (nodeId: string, content: string) => void;
  hasParent: (nodeId: string) => boolean;
  generateFullPrompt: (id: string) => string;
}
