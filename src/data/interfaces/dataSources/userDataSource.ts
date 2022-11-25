import { User } from "../../../domain/entities/user";

export interface UserDataSource {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User>;
  create(user: User): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  updateById(id: string, dataToUpdate: Partial<User>): Promise<boolean>;
}
