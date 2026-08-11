import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({
  path: path.resolve(__dirname, "../../.env"),
  quiet: true,
});

export const NODE_ENV: string = process.env["NODE_ENV"] ?? "development";
export const PORT: string = process.env["PORT"] ?? "8081";
export const DATABASE_URI: string = process.env["DATABASE_URI"] ?? "";
