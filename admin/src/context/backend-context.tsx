import { createContext } from "react";

export interface BackendType {
  currency: string;
  BackendUrl: string;
}

export const BackendContext = createContext<BackendType | undefined>(undefined);
