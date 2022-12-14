import { User } from "../../../entities/user";

export interface LoginUserUseCase {
  execute(loginData: Pick<User, "email" | "password">): Promise<string>;
}
