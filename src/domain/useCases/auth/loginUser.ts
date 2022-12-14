import { User } from "../../entities/user";
import { AuthController } from "../../interfaces/controllers/authController";
import { LoginUserUseCase } from "../../interfaces/useCases/auth/loginUser";

export class LoginUser implements LoginUserUseCase {
  authController: AuthController;

  constructor(authController: AuthController) {
    this.authController = authController;
  }

  async execute(loginData: Pick<User, "email" | "password">): Promise<string> {
    const result = await this.authController.loginUser(loginData);
    return result;
  }
}
