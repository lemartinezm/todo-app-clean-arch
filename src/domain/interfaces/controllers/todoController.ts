import { Todo } from "../../entities/todo";

export interface TodoController {
  getAllTodos(): Promise<Todo[]>;
  getTodo(id: string): Promise<Todo>;
  createTodo(InputData: Todo): Promise<boolean>;
  updateTodo(id: string, dataToUpdate: Partial<Todo>): Promise<boolean>;
  deleteTodo(id: string): Promise<boolean>;
}
