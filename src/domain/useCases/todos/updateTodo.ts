import { Todo } from "../../entities/todo";
import { TodoController } from "../../interfaces/controllers/todoController";
import { UpdateTodoUseCase } from "../../interfaces/useCases/todos/updateTodo";

export class UpdateTodo implements UpdateTodoUseCase {
  todoController: TodoController;

  constructor(todoController: TodoController) {
    this.todoController = todoController;
  }

  async execute(id: string, dataToUpdate: Partial<Todo>): Promise<boolean> {
    const result = await this.todoController.updateTodo(id, dataToUpdate);
    return result;
  }
}
