import { nanoid } from "nanoid";
import { useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  type DefaultEdgeOptions,
  type FitViewOptions,
  MiniMap,
  useReactFlow,
  Panel,
  MarkerType,
  BackgroundVariant,
} from "reactflow";
import { type WidgetType, widgetTypes } from "./widgetTypes";
import { useWhiteboard } from "./store";
import { WhiteboardToolbar } from "./WhiteboardToolbar";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};

export const Whiteboard = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useWhiteboard();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const handleCreate = (type: WidgetType) => {
    addNode({
      id: nanoid(),
      type,
      position: project({ x: 150, y: 20 }),
      data: { title: type },
    });
  };

  return (
    <div ref={wrapperRef} className="h-screen w-screen">
      <ReactFlow
        fitView
        fitViewOptions={fitViewOptions}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={widgetTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        minZoom={0.25}
      >
        <Panel position="top-left">
          <WhiteboardToolbar onClickAdd={handleCreate} />
        </Panel>
        <Controls />
        <MiniMap pannable zoomable />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
