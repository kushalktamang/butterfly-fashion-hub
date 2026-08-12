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
export const ADMIN_EMAIL: string = process.env["ADMIN_EMAIL"] ?? "";
export const ADMIN_PASSWORD: string = process.env["ADMIN_PASSWORD"] ?? "";
export const JWT_SECRET: string = process.env["JWT_SECRET"] ?? "";
export const CLOUDINARY_API_KEY: string = process.env["CLOUDINARY_API_KEY"] ?? "";
export const CLOUDINARY_NAME: string = process.env["CLOUDINARY_NAME"] ?? "";
export const CLOUDINARY_SECRET_KEY: string = process.env["CLOUDINARY_SECRET_KEY"] ?? "";
