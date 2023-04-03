import {type Node} from "reactflow";
import {
  ModifierWidget,
  type ModifierWidgetData,
} from "./widgets/ModifierWidget";
import { PromptWidget, type PromptWidgetData } from "./widgets/PromptWidget";
import { ResultWidget, type ResultWidgetData } from "./widgets/ResultWidget";

export const widgetTypes = {
  prompt: PromptWidget,
  modifier: ModifierWidget,
  result: ResultWidget,
} as const;

export type WidgetType = keyof typeof widgetTypes;

export type WidgetData =
  | PromptWidgetData
  | ModifierWidgetData
  | ResultWidgetData;

export type WidgetNode = Node<WidgetData, WidgetType>
