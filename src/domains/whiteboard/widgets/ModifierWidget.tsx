import { Editable } from "@p/Editable";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Handle, type Node, type NodeProps, Position } from "reactflow";
import { BaseWidget } from "./BaseWidget";
import { useConnectionValidator } from "./useConnectionValidator";
import { useUpdateableWidget } from "./useUpdateableWidget";

export const ModifierIcon = MagicWandIcon;

export type ModifierWidgetData = {
  title: string;
};

export type ModifierWidgetNode = Node<ModifierWidgetData>;
type ModifierWidgetProps = NodeProps<ModifierWidgetData>;

export const ModifierWidget = ({ id, data, selected }: ModifierWidgetProps) => {
  const isValidConnection = useConnectionValidator();
  const { isEditable, setEditable, onChange } = useUpdateableWidget(id);

  return (
    <BaseWidget
      id={id}
      title="Modifier"
      icon={ModifierIcon}
      selected={selected}
      variant="blue"
      noDrag={isEditable}
      handles={
        <>
          <Handle
            type="target"
            position={Position.Top}
            isConnectableStart={false}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            isValidConnection={isValidConnection}
          />
        </>
      }
    >
      <Editable
        value={data.title}
        editable={isEditable}
        onChange={onChange}
        onDoubleClick={setEditable}
      />
    </BaseWidget>
  );
};
