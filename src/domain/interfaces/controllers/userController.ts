import { User } from "../../entities/user";

export interface UserController {
  getAllUsers(): Promise<User[]>;
  getUser(query: Partial<User>): Promise<User>;
  createUser(user: User): Promise<boolean>;
  deleteUser(id: string): Promise<boolean>;
  updateUser(id: string, dataToUpdate: Partial<User>): Promise<boolean>;
}
