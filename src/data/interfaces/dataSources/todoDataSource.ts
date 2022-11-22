import { Todo } from "../../../domain/entities/todo";

export interface TodoDataSource {
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo>;
  create(todo: Todo): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  updateById(id: string, dataToUpdate: Partial<Todo>): Promise<boolean>;
}
