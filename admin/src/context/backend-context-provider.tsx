import type { ReactNode } from "react";
import { BackendContext } from "../context/backend-context";

interface BackendContextProps {
  children: ReactNode;
}

const viteBackendURL = import.meta.env.VITE_BACKEND_URL as string;
if (!viteBackendURL) {
  throw new Error("VITE_BACKEND_URL is missing.");
}

const BackendContextProvider = ({ children }: BackendContextProps) => {
  const BackendUrl = viteBackendURL;
  const currency = "रू";

  const value = {
    BackendUrl,
    currency,
  };

  return <BackendContext value={value}>{children}</BackendContext>;
};

export default BackendContextProvider;
