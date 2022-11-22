import { Todo } from "../entities/todo";
import { TodoController } from "../interfaces/controllers/todoController";
import { TodoDataSource } from "../../data/interfaces/dataSources/todoDataSource";

export class TodoControllerImpl implements TodoController {
  todoDataSource: TodoDataSource;

  constructor(todoDataSource: TodoDataSource) {
    this.todoDataSource = todoDataSource;
  }

  async getAllTodos(): Promise<Todo[]> {
    const result = await this.todoDataSource.getAll();
    return result;
  }
  async getTodo(id: string): Promise<Todo> {
    const result = await this.todoDataSource.getById(id);
    return result;
  }
  async createTodo(InputData: Todo): Promise<boolean> {
    const result = await this.todoDataSource.create(InputData);
    return result;
  }
  async updateTodo(id: string, dataToUpdate: Partial<Todo>): Promise<boolean> {
    const result = await this.todoDataSource.updateById(id, dataToUpdate);
    return result;
  }
  async deleteTodo(id: string): Promise<boolean> {
    const result = await this.todoDataSource.deleteById(id);
    return result;
  }
}
