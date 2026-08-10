import { use } from "react";
import { BackendContext } from "../context/backend-context";

export const useBackendContext = () => {
  const context = use(BackendContext);

  if (!context) {
    throw new Error("useBackendContext must be use within backendContext provider");
  }

  return context;
};
