import { User } from "../../entities/user";
import { UserController } from "../../interfaces/controllers/userController";
import { CreateUserUseCase } from "../../interfaces/useCases/users/createUser";

export class CreateUser implements CreateUserUseCase {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  async execute(user: User): Promise<boolean> {
    const result = await this.userController.createUser(user);
    return result;
  }
}
