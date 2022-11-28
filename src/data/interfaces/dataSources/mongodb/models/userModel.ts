import mongoose from "mongoose";

export interface UserSchema {
  username: string;
  email: string;
  password: string;
  todos: Array<mongoose.ObjectId>;
}
