import { User } from "../../entities/user";
import { UserController } from "../../interfaces/controllers/userController";
import { GetAllUsersUseCase } from "../../interfaces/useCases/users/getAllUsers";

export class GetAllUsers implements GetAllUsersUseCase {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  async execute(): Promise<User[]> {
    const result = await this.userController.getAllUsers();
    return result;
  }
}
