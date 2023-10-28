import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import { logger } from "./src/logger.config";
import DB from "./src/lib/Database";
import { masterAdminData } from "./src/masterAdmin";

const server: Express = express();
const PORT: number = 8000;

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.listen(PORT, "", async () => {
  logger.log(`[server] SERVER IS RUNNING ON PORT: ${PORT}`);

  // Connect to database
  await DB.connect();

  // Check wether user admin exists
  const adminExists = await DB.adminExists();

  // Create a master admin initially if no admin exists
  adminExists ? logger.log("Admin already exists!") : DB.createAdmin(masterAdminData);
});

import submitBlog from "./src/routes/submitBlog";
server.use("/submit-blog", submitBlog);
