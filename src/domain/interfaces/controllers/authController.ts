import { User } from "../../entities/user";

export interface AuthController {
  registerUser(user: User): Promise<boolean>;
  loginUser(loginData: Pick<User, "email" | "password">): Promise<string>;
}
