import { User } from "../../../domain/entities/user";
import { Database } from "../../interfaces/dataSources/database";
import { UserDataSource } from "../../interfaces/dataSources/userDataSource";

export class MongoDBUserDataSource implements UserDataSource {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async getAll(): Promise<User[]> {
    const result = await this.database.find({});
    return result;
  }

  async getOne(query: Partial<User>): Promise<User> {
    let result;
    if (query.id) {
      result = await this.database.findOne({ _id: query.id });
    } else {
      result = await this.database.findOne(query);
    }
    return result;
  }

  async create(user: User): Promise<boolean> {
    const result = await this.database.insertOne(user);
    return result !== null;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.database.deleteOne({ _id: id });
    return result !== null;
  }

  async updateById(id: string, dataToUpdate: Partial<User>): Promise<boolean> {
    const result = await this.database.updateOne({ _id: id }, dataToUpdate);
    return result;
  }
}
