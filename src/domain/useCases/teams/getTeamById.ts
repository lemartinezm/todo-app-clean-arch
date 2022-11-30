import { Team } from "../../entities/team";
import { TeamController } from "../../interfaces/controllers/teamController";
import { GetTeamByIdUseCase } from "../../interfaces/useCases/teams/getTeamById";

export class GetTeamById implements GetTeamByIdUseCase {
  teamController: TeamController;

  constructor(teamController: TeamController) {
    this.teamController = teamController;
  }

  async execute(id: string): Promise<Team> {
    const result = await this.teamController.getTeamById(id);
    return result;
  }
}
