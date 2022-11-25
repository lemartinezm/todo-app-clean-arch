import { User } from "../../../entities/user";

export interface UpdateUserUseCase {
  execute(id: string, dataToUpdate: Partial<User>): Promise<boolean>;
}
