import { User } from "../../../entities/user";

export interface RegisterUseUseCase {
  execute(user: User): Promise<boolean>;
}
