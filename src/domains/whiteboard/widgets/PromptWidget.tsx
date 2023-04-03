import { Editable } from "@p/Editable";
import { EnterIcon } from "@radix-ui/react-icons";
import { Handle, type Node, type NodeProps, Position } from "reactflow";
import { BaseWidget } from "./BaseWidget";
import { useConnectionValidator } from "./useConnectionValidator";
import { useUpdateableWidget } from "./useUpdateableWidget";

export const PromptIcon = EnterIcon;

export type PromptWidgetData = {
  title: string;
};

export type PromptWidgetNode = Node<PromptWidgetData>;
type PromptWidgetProps = NodeProps<PromptWidgetData>;

export const PromptWidget = ({ id, data, selected }: PromptWidgetProps) => {
  const isValidConnection = useConnectionValidator();
  const { isEditable, setEditable, onChange } = useUpdateableWidget(id);

  return (
    <BaseWidget
      id={id}
      title="Prompt"
      icon={PromptIcon}
      selected={selected}
      variant="yellow"
      noDrag={isEditable}
      handles={
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="s"
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
