import mongoose from "mongoose";
import { DATABASE_URI } from "./env.config";

mongoose.connection.on("disconnect", () => {
  console.log("database disconnected");
});

export async function connectDB() {
  const database_uri = DATABASE_URI;

  if (!database_uri) {
    throw new Error("database_url is not set in the environment variable");
  }

  try {
    await mongoose.connect(database_uri);
    console.log("database connected successfully");
  } catch (error) {
    console.error(" database connect failed:", error);
    throw error;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error("database disconnect failed:", error);
    throw error;
  }
}
