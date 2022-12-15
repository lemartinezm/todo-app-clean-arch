import { User } from "../../entities/user";
import { AuthController } from "../../interfaces/controllers/authController";
import { RegisterUserUseCase } from "../../interfaces/useCases/auth/registerUser";

export class RegisterUser implements RegisterUserUseCase {
  authController: AuthController;

  constructor(authController: AuthController) {
    this.authController = authController;
  }

  async execute(user: User): Promise<boolean> {
    const result = await this.authController.registerUser(user);
    return result;
  }
}
