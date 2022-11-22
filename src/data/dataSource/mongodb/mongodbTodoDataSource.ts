import { Todo } from "../../../domain/entities/todo";
import { Database } from "../../interfaces/dataSources/database";
import { TodoDataSource } from "../../interfaces/dataSources/todoDataSource";

export class MongoDBTodoDataSource implements TodoDataSource {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async getAll(): Promise<Todo[]> {
    const result = await this.database.find({});
    return result;
  }

  async getById(id: string): Promise<Todo> {
    const result = await this.database.findOne({ _id: id });
    return result;
  }

  async create(todo: Todo): Promise<boolean> {
    const result = await this.database.insertOne(todo);
    return result;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.database.deleteOne({ _id: id });
    return result;
  }

  async updateById(id: string, dataToUpdate: Partial<Todo>): Promise<boolean> {
    const result = await this.database.updateOne({ _id: id }, dataToUpdate);
    return result;
  }
}
