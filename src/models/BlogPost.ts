import mongoose, { model } from "mongoose";

const blogPost = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  main_head: {
    type: String,
    required: true,
  },
  main_subhead: {
    type: String,
  },
  main_img: {
    type: String,
  },
  main_paras: {
    type: Array,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
  },
});

const BlogPost = model("BlogPost", blogPost);

export default BlogPost;
