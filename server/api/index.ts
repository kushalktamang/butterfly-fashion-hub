import "dotenv/config";
import { connectDB } from "../src/config/db.config";
import connectCloudinary from "../src/config/cloudinary.config";
import createServer from "../src/server";
import mongoose, { ConnectionStates } from "mongoose";

let dbReady: Promise<void> | null = null;

function ensureDB(): Promise<void> {
  if (mongoose.connection.readyState === ConnectionStates.connected) {
    return Promise.resolve();
  }
  if (!dbReady) {
    dbReady = connectDB();
    connectCloudinary();
  }
  return dbReady;
}

const app = createServer();

export default async function handler(
  req: import("http").IncomingMessage,
  res: import("http").ServerResponse,
) {
  await ensureDB();
  app(req, res);
}
