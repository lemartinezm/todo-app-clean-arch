import mongoose from "mongoose";

export interface TodoSchema {
  name: string;
  description?: string;
  createdAt: Date;
  deadline: Date;
  priority: string;
  completed: boolean;
  creator: mongoose.ObjectId;
}
