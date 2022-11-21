import { Todo } from "../../../entities/todo";

export interface UpdateTodoUseCase {
  execute(id: string, dataToUpdate: Partial<Todo>): Promise<boolean>;
}
