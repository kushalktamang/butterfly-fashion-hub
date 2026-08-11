import "dotenv/config";
import type { Server } from "http";
import { PORT } from "./config/env.config";
import createServer from "./server";
import { connectDB, disconnectDB } from "./config/db.config";

async function shutdown(exitCode: number): Promise<void> {
  await disconnectDB();
  process.exit(exitCode);
}

function closeServer(server: Server, exitCode: number): void {
  server.close(() => {
    void shutdown(exitCode);
  });
}

async function start() {
  await connectDB();

  const server: Server = createServer().listen(PORT, () => {
    console.log(`SERVER ready at: http://localhost:${PORT}`);
  });

  process.on("unhandledRejection", (error) => {
    console.error("unhandled rejection", error);
    closeServer(server, 1);
  });

  process.on("uncaughtException", (error) => {
    console.error("uncaught exception", error);
    closeServer(server, 1);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    closeServer(server, 0);
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    closeServer(server, 0);
  });
}

void start();