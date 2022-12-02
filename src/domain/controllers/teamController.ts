import { TeamDataSource } from "../../data/interfaces/dataSources/teamDataSource";
import { Team } from "../entities/team";
import { TeamController } from "../interfaces/controllers/teamController";

export class TeamControllerImpl implements TeamController {
  teamDataSource: TeamDataSource;

  constructor(teamDataSource: TeamDataSource) {
    this.teamDataSource = teamDataSource;
  }

  async getAllTeams(): Promise<Team[]> {
    const result = await this.teamDataSource.getAll();
    return result;
  }

  async getTeamById(id: string): Promise<Team> {
    const result = await this.teamDataSource.getById(id);
    return result;
  }

  async createTeam(team: Team): Promise<boolean> {
    const result = await this.teamDataSource.create(team);
    return result;
  }

  async deleteTeam(id: string): Promise<boolean> {
    const result = await this.teamDataSource.deleteById(id);
    return result;
  }

  async updateTeam(id: string, dataToUpdate: Partial<Team>): Promise<boolean> {
    const result = await this.teamDataSource.updateById(id, dataToUpdate);
    return result;
  }
}
