import mongoose from "mongoose";
import { UserSchema } from "../../../interfaces/dataSources/mongodb/models/userModel";

const userSchema = new mongoose.Schema<UserSchema>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: false,
    default: [],
  },
});

export const User = mongoose.model("user", userSchema);
