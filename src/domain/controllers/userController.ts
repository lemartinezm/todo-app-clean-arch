import { UserDataSource } from "../../data/interfaces/dataSources/userDataSource";
import { User } from "../entities/user";
import { UserController } from "../interfaces/controllers/userController";

export class UserControllerImpl implements UserController {
  userDataSource: UserDataSource;

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.userDataSource.getAll();
    return result;
  }

  async getUser(id: string): Promise<User> {
    const result = await this.userDataSource.getById(id);
    return result;
  }

  async createUser(user: User): Promise<boolean> {
    const result = await this.userDataSource.create(user);
    return result;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userDataSource.deleteById(id);
    return result;
  }

  async updateUser(id: string, dataToUpdate: Partial<User>): Promise<boolean> {
    const result = await this.userDataSource.updateById(id, dataToUpdate);
    return result;
  }
}
