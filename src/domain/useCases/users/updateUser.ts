import { User } from "../../entities/user";
import { UserController } from "../../interfaces/controllers/userController";
import { UpdateUserUseCase } from "../../interfaces/useCases/users/updateUser";

export class UpdateUser implements UpdateUserUseCase {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  async execute(id: string, dataToUpdate: Partial<User>): Promise<boolean> {
    const result = await this.userController.updateUser(id, dataToUpdate);
    return result;
  }
}
