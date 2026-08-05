import { config } from "dotenv";

config({
  quiet: true,
});

const NODE_ENV: string = process.env.NODE_ENV ?? "development";
const PORT: string = process.env.PORT ?? "8081";

export { PORT, NODE_ENV };
