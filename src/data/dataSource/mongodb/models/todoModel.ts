import mongoose from "mongoose";
import { TodoSchema } from "../../../interfaces/dataSources/mongodb/models/todoModel";

const todoSchema = new mongoose.Schema<TodoSchema>({
  name: { type: String, required: true },
  description: { type: String, required: false, default: "" },
  priority: { type: String, required: true },
  createdAt: { type: Date, required: false, default: new Date() },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, required: false, default: false },
  creator: { type: mongoose.SchemaTypes.ObjectId, required: true },
});

export const Todo = mongoose.model("todo", todoSchema);
