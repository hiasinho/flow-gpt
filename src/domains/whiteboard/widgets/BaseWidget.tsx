import { type IconProps } from "@radix-ui/react-icons/dist/types";
import clsx from "clsx";
import { type NodeProps } from "reactflow";

const styles = {
  base: "p-0 flex flex-col overflow-hidden rounded border",
  title: "flex items-center gap-4 justify-between border-b px-2 py-1 text-base",
  selected: "outline outline-2 outline-blue-500 outline-offset-1",
};

const variants = {
  yellow: {
    base: "bg-yellow-200 border-yellow-500",
    title: "bg-yellow-300 border-yellow-500",
  },
  blue: {
    base: "bg-blue-200 border-blue-500",
    title: "bg-blue-300 border-blue-500",
  },
  green: {
    base: "bg-green-200 border-green-500",
    title: "bg-green-300 border-green-500",
  },
} as const;

interface BaseWidgetProps extends Pick<NodeProps, "selected" | "id"> {
  title: string;
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  variant: keyof typeof variants;
  children: React.ReactNode;
  handles?: React.ReactNode;
  noDrag?: boolean;
}

export const BaseWidget = ({
  id,
  title,
  icon: Icon,
  selected,
  children,
  handles,
  variant,
  noDrag,
}: BaseWidgetProps) => {
  const baseClasses = clsx(styles.base, variants[variant].base, {
    [styles.selected]: selected,
    nodrag: noDrag,
  });
  const titleClasses = clsx(styles.title, variants[variant].title);

  return (
    <>
      <div className={baseClasses}>
        <div className={titleClasses}>
          <div className="flex items-center gap-2">
            {Icon && <Icon />}
            <span className="font-medium" title={id}>
              {title}
            </span>
          </div>
        </div>
        {children}
      </div>
      {handles}
    </>
  );
};
