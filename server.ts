import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import { logger } from "./src/logger.config";

const server: Express = express();
const PORT: number = 8000;

server.listen(PORT, "", () => {
  logger.log(`[server] SERVER IS RUNNING ON PORT: ${PORT}`);
});
