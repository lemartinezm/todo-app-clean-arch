import mongoose from "mongoose";
import { TeamSchema } from "../../../interfaces/dataSources/mongodb/models/teamModel";

const teamSchema = new mongoose.Schema<TeamSchema>({
  name: { type: String, required: true },
  leader: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "user" },
  participants: [
    { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "user" },
  ],
  todos: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: "todo" }],
});

export const Team = mongoose.model("team", teamSchema);
