import { useState } from "react";
import { useStore } from "../store";

export const useUpdateableWidget = (id: string) => {
  const updateData = useStore((state) => state.updateNodeData);
  const [editable, setEditable] = useState(false);

  const handleEdit: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setEditable(true);
  };

  const onChange = (value: string) => {
    console.log(value);
    setEditable(false);
    updateData(id, { title: value });
  };

  return { isEditable: editable, setEditable: handleEdit, onChange } as const;
};
