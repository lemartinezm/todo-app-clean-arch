import { Team } from "../../entities/team";

export interface TeamController {
  getAllTeams(): Promise<Team[]>;
  getTeamById(id: string): Promise<Team>;
  createTeam(team: Team): Promise<boolean>;
  deleteTeam(id: string): Promise<boolean>;
  updateTeam(id: string, dataToUpdate: Partial<Team>): Promise<boolean>;
}
