import { UserController } from "../../interfaces/controllers/userController";
import { DeleteUserUseCase } from "../../interfaces/useCases/users/deleteUser";

export class DeleteUser implements DeleteUserUseCase {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  async execute(id: string): Promise<boolean> {
    const result = await this.userController.deleteUser(id);
    return result;
  }
}
