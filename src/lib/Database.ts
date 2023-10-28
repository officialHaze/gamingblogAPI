import mongoose from "mongoose";
import { devLogger, logger } from "../logger.config";
import User from "../models/User";
import { BlogData, UserData } from "../interfaces/interfaces";
import BlogPost from "../models/BlogPost";

export default class DB {
  static async connect() {
    const mongoDBURL = process.env.MONGO_DB_URI ?? "";
    try {
      await mongoose.connect(mongoDBURL);
      logger.log("Connected to MongoDB database");
      return;
    } catch (err) {
      logger.error("Connection to MongoDB failed !");
      logger.error(err);
      return;
    }
  }

  static async adminExists(): Promise<boolean> {
    const admin = await User.findOne({ is_admin: true });
    return admin ? true : false;
  }

  static async createAdmin(adminOptions: UserData) {
    try {
      const user = new User(adminOptions);
      await user.save();
      logger.log("Admin created successfully!");
      return;
    } catch (err) {
      logger.error(err);
      return;
    }
  }

  static async createPost(blogData: BlogData, user: UserData) {
    const post: BlogData = {
      ...blogData,
      created_at: new Date(),
      author: user,
    };
    try {
      const blogPost = new BlogPost(post);
      await blogPost.save();
      devLogger.log("Post created!");
      return;
    } catch (err) {
      logger.error(err);
      return;
    }
  }
}
