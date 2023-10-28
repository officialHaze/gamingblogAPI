import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import { logger } from "./src/logger.config";

const server: Express = express();
const PORT: number = 8000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.listen(PORT, "", () => {
  logger.log(`[server] SERVER IS RUNNING ON PORT: ${PORT}`);
});

import submitBlog from "./src/routes/submitBlog";
server.use("/submit-blog", submitBlog);
