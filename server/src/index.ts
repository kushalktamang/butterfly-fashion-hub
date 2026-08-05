import createServer from "./server";

const PORT = 8080;

const server = createServer().listen(PORT, () => {
  console.log(`🐼 server ready at: http://localhost:${PORT}`);
});

async function shutdown(exitCode: number): Promise<void> {
  process.exit(exitCode);
}

function closeServer(exitCode: number): void {
  server.close(() => {
    void shutdown(exitCode);
  });
}

// handle unhandled promise rejection (e.g database connection error)
process.on("unhandledRejection", (error) => {
  console.error("unhandled rejection", error);
  closeServer(1);
});

// handles uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("uncaught exception", error);
  closeServer(1);
});

// graceful shutdown
process.on("SIGTERM", () => {
  console.error("SIGTERM received, shutting down gracefully");
  closeServer(1);
});
