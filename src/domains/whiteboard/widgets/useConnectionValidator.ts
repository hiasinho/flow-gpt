import { type Connection } from "reactflow";
import { useStore } from "../store";

export const useConnectionValidator = () => {
  const hasParent = useStore((state) => state.hasParent);

  return (connection: Connection) =>
    !!connection.target && !hasParent(connection.target);
};
