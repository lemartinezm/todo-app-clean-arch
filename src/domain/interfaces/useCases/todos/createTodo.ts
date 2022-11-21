import { Todo } from "../../../entities/todo";

export interface CreateTodoUseCase {
  execute(InputData: Todo): Promise<boolean>;
}
