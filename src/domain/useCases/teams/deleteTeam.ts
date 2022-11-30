import { TeamController } from "../../interfaces/controllers/teamController";
import { DeleteTeamUseCase } from "../../interfaces/useCases/teams/deleteTeam";

export class DeleteTeam implements DeleteTeamUseCase {
  teamController: TeamController;

  constructor(teamController: TeamController) {
    this.teamController = teamController;
  }

  async execute(id: string): Promise<boolean> {
    const result = await this.teamController.deleteTeam(id);
    return result;
  }
}
