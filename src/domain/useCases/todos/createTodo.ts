import { Todo } from "../../entities/todo";
import { TodoController } from "../../interfaces/controllers/todoController";
import { CreateTodoUseCase } from "../../interfaces/useCases/todos/createTodo";

export class CreateTodo implements CreateTodoUseCase {
  todoController: TodoController;

  constructor(todoController: TodoController) {
    this.todoController = todoController;
  }

  async execute(InputData: Todo): Promise<boolean> {
    const result = await this.todoController.createTodo(InputData);
    return result;
  }
}
