import { type Node, type Edge } from "reactflow";
import { type WidgetData, type WidgetType } from "../widgetTypes";

export const nodes: Node<WidgetData, WidgetType>[] = [
  {
    id: "1",
    type: "prompt",
    data: { title: "Generate text about a kid playing with a ball." },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "modifier",
    data: { title: "Make it the lyrics of a rap" },
    position: { x: 150, y: 150 },
  },
  {
    id: "3",
    type: "modifier",
    data: { title: "Make it a story appropriate for kids" },
    position: { x: -150, y: 150 },
  },
  {
    id: "4",
    type: "modifier",
    data: { title: "The kid is 8 years old" },
    position: { x: -150, y: 300 },
  },
  {
    id: "5",
    type: "result",
    data: { title: "Result #1" },
    position: { x: -150, y: 450 },
  },
];

export const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
];
