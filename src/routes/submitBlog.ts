import express, { Request, Response } from "express";
import { devLogger } from "../logger.config";
import { BlogData } from "../interfaces/interfaces";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const data: BlogData | undefined = req.body;
  devLogger.log(data ?? null);

  res.status(200).json({ message: data });
});

export default router;
