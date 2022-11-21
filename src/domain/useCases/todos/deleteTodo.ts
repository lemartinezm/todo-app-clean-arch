import { TodoController } from "../../interfaces/controllers/todoController";
import { DeleteTodoUseCase } from "../../interfaces/useCases/todos/deleteTodo";

export class DeleteTodo implements DeleteTodoUseCase {
  todoController: TodoController;

  constructor(todoController: TodoController) {
    this.todoController = todoController;
  }

  async execute(id: string): Promise<boolean> {
    const result = await this.todoController.deleteTodo(id);
    return result;
  }
}
