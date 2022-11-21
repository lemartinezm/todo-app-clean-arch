import { Todo } from "../../../entities/todo";

export interface GetAllTodosUseCase {
  execute(): Promise<Todo[]>
}