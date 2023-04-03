import { PlusIcon } from "@radix-ui/react-icons";
import { type WidgetType } from "./widgetTypes";

const styles = {
  button:
    "w-full flex items-center gap-1 px-2 py-1 text-xs text-indigo-500 hover:bg-indigo-500 hover:text-white",
};

interface WhiteboardToolbarProps {
  onClickAdd: (type: WidgetType) => void;
}

export const WhiteboardToolbar = ({ onClickAdd }: WhiteboardToolbarProps) => {
  return (
    <div className="divide-y divide-indigo-500 overflow-hidden rounded border border-indigo-500 bg-white/50 shadow-lg backdrop-blur">
      <button onClick={() => onClickAdd("prompt")} className={styles.button}>
        <PlusIcon /> Add prompt
      </button>
      <button onClick={() => onClickAdd("modifier")} className={styles.button}>
        <PlusIcon /> Add modifier
      </button>
      <button onClick={() => onClickAdd("result")} className={styles.button}>
        <PlusIcon /> Add result
      </button>
    </div>
  );
};
