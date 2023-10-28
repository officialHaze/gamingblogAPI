import mongoose, { model } from "mongoose";

export const user = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
  },
  designation: {
    type: String,
  },
  is_admin: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const User = model("User", user);

export default User;
