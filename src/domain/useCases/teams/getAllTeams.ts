import { Team } from "../../entities/team";
import { TeamController } from "../../interfaces/controllers/teamController";
import { GetAllTeamsUseCase } from "../../interfaces/useCases/teams/getAllTeams";

export class GetAllTeams implements GetAllTeamsUseCase {
  teamController: TeamController;

  constructor(teamController: TeamController) {
    this.teamController = teamController;
  }

  async execute(): Promise<Team[]> {
    const result = await this.teamController.getAllTeams();
    return result;
  }
}
