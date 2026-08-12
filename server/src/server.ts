import express from "express";
import type { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouter } from "./routes/admin.routes";

export default function createServer(): Express {
  const server = express();

  // for connection frontend apps
  server.use(cors());

  // middleware setup
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());

  // routes
  /*  POST api/auth/login */
  server.use("/api/admin", AdminRouter());

  return server;
}
