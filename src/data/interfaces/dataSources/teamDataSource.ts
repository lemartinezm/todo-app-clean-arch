import { Team } from "../../../domain/entities/team";

export interface TeamDataSource {
  getAll(): Promise<Team[]>;
  getById(id: string): Promise<Team>;
  create(team: Team): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
  updateById(id: string, dataToUpdate: Partial<Team>): Promise<boolean>;
}
