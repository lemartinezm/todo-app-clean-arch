import { Todo } from "../../entities/todo";
import { TodoController } from "../../interfaces/controllers/todoController";
import { GetAllTodosUseCase } from "../../interfaces/useCases/todos/getAllTodos";

export class GetAllTodos implements GetAllTodosUseCase {
  todoController: TodoController;

  constructor(todoController: TodoController) {
    this.todoController = todoController;
  }

  async execute(): Promise<Todo[]> {
    const result = await this.todoController.getAllTodos();
    return result;
  }
}
