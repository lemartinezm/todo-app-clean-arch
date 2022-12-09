import { ObjectId } from "mongoose";

export interface TeamSchema {
  name: string;
  leader: ObjectId;
  participants: Array<ObjectId>;
  todos: Array<ObjectId>;
}
