import express, { Request, Response } from "express";
import { devLogger } from "../logger.config";
import { BlogData, UserData } from "../interfaces/interfaces";
import User from "../models/User";
import DB from "../lib/Database";
import BlogPost from "../models/BlogPost";
import Cookie from "../lib/Cookie";
import JWT from "../lib/Jwt";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const cookie = req.header("cookie");
  const token = cookie ? Cookie.getCookieValue(cookie, "auth_token") : null;

  if (JWT.isVerified(token ?? "")) {
    const data: BlogData | undefined = req.body;

    res.status(200).json({ message: "Success" });
  } else {
    res.status(401).json({ message: "Unauthorized!" });
  }
});

export default router;
