/*
    Handle User login
*/

import express, { Request, Response } from "express";
import JWT from "../lib/Jwt";
import { logger } from "../logger.config";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const dummyData = {
    name: "Moinak",
    id: "uniqueid",
  };
  try {
    const token = JWT.tokenize(dummyData);
    res.status(200).json({ message: "success", auth_token: token });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "There was an internal server error!" });
  }
});

export default router;
