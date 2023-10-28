import mongoose from "mongoose";

export interface Para {
  para: string;
}

export interface BlogData {
  author: mongoose.Types.ObjectId | UserData;
  main_head: string;
  main_subhead?: string;
  main_img?: string; // Source link
  main_paras: Para[];
  created_at: Date;
  updated_at?: Date;
}

export interface UserData {
  full_name: string;
  email_id: string;
  password: string;
  phone_no?: number;
  designation?: string;
  is_admin?: boolean;
  created_at: Date;
}
