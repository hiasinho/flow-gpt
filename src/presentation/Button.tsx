import clsx from "clsx";
import { SpinnerIcon } from "./SpinnerIcon";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "md";
  loading?: boolean;
}

export const Button = ({
  size = "md",
  loading,
  className,
  children,
  ...props
}: ButtonProps) => {
  const classes = clsx(
    "inline-flex items-center gap-1 rounded text-white",
    {
      ["bg-indigo-500 hover:bg-indigo-600"]: !loading,
      ["w-full justify-center bg-indigo-300 cursor-not-allowed"]: loading,
      ["p-1"]: size === "xs",
      ["px-3 py-2"]: size === "md",
    },
    className
  );

  return (
    <button {...props} className={classes} disabled={loading}>
      {loading ? <SpinnerIcon /> : children}
    </button>
  );
};
