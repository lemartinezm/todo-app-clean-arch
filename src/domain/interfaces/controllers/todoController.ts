import { Todo } from "../../entities/todo";

export interface TodoController {
  getAllTodos(): Promise<Todo[]>;
  getTodo(): Promise<Todo>;
  createTodo(): Promise<boolean>;
  updateTodo(): Promise<boolean>;
  deleteTodo(): Promise<boolean>;
}
