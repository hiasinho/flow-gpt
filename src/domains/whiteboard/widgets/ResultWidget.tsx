import { Button } from "@p/Button";
import { ExitIcon, RocketIcon } from "@radix-ui/react-icons";
import { Handle, type Node, type NodeProps, Position } from "reactflow";
import { api } from "~/utils/api";
import { useStore } from "../store";
import { BaseWidget } from "./BaseWidget";

export const ResultIcon = ExitIcon;

export type ResultWidgetData = {
  title: string;
  result?: string;
};

export type ResultWidgetNode = Node<ResultWidgetData>;
type ResultWidgetProps = NodeProps<ResultWidgetData>;

export const ResultWidget = ({ id, data, selected }: ResultWidgetProps) => {
  const generateFullPrompt = useStore((state) => state.generateFullPrompt);
  const updateNodeContent = useStore((state) => state.updateNodeContent);
  const mutation = api.openai.chatCompletion.useMutation();

  const handleGenerate = () => {
    const prompt = generateFullPrompt(id);
    mutation
      .mutateAsync({ prompt })
      .then((answer) => {
        if (answer) {
          updateNodeContent(id, answer);
        }
      })
      .catch(() => {
        console.error("OpenAI API didn't work. Please investigate.");
      });
  };

  return (
    <BaseWidget
      id={id}
      title="Result"
      icon={ResultIcon}
      selected={selected}
      variant="green"
      noDrag={false}
      handles={
        <>
          <Handle type="target" position={Position.Top} />
        </>
      }
    >
      <div className="max-w-[450px] whitespace-pre-wrap p-2 outline-none">
        {data.result ? (
          <>
            <div className="pb-4">
              {data.result}
            </div>
            <div className="flex justify-end">
              <Button onClick={handleGenerate} loading={mutation.isLoading}>
                <RocketIcon className="h-3" />
                Re-generate response
              </Button>
            </div>
          </>
        ) : (
          <Button onClick={handleGenerate} loading={mutation.isLoading}>
            <RocketIcon className="h-3" />
            Generate response
          </Button>
        )}
      </div>
    </BaseWidget>
  );
};
