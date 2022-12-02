import { Team } from "../../../domain/entities/team";
import { Database } from "../../interfaces/dataSources/database";
import { TeamDataSource } from "../../interfaces/dataSources/teamDataSource";

export class MongoDBTeamDataSource implements TeamDataSource {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async getAll(): Promise<Team[]> {
    const result = await this.database.find({});
    return result;
  }

  async getById(id: string): Promise<Team> {
    const result = await this.database.findOne({ _id: id });
    return result;
  }

  async create(team: Team): Promise<boolean> {
    const result = await this.database.insertOne(team);
    return result !== null;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.database.deleteOne({ _id: id });
    return result !== null;
  }

  async updateById(id: string, dataToUpdate: Partial<Team>): Promise<boolean> {
    const result = await this.database.updateOne({ _id: id }, dataToUpdate);
    return result !== null;
  }
}
