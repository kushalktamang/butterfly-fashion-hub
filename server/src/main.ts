import "dotenv/config";
import type { Server } from "http";
import { PORT } from "./config/env.config";
import createServer from "./server";
import { connectDB, disconnectDB } from "./config/db.config";

// disconnect database and then existing the process with the given code
async function shutdown(exitCode: number): Promise<void> {
  await disconnectDB();
  process.exit(exitCode);
}

// stop accepting new connection and the shutting down once existing code drain
function closeServer(server: Server, exitCode: number): void {
  server.close(() => {
    void shutdown(exitCode);
  });
}

/*

*/
async function main() {
  // making database conncetion before accepting any request
  await connectDB();

  const server: Server = createServer().listen(PORT, () => {
    console.log(`SERVER ready at: http://localhost:${PORT}`);
  });

  // crash-level errors: log, then shut down (exit code 1 = failure)
  process.on("unhandledRejection", (error) => {
    console.error("unhandled rejection", error);
    closeServer(server, 1);
  });

  process.on("uncaughtException", (error) => {
    console.error("uncaught exception", error);
    closeServer(server, 1);
  });

  // normal shutdown signals (deploy restart / Ctrl+C): exit code 0 = success
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    closeServer(server, 0);
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully");
    closeServer(server, 0);
  });
}

void main();