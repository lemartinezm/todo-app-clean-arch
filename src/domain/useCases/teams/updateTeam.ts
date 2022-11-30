import { Team } from "../../entities/team";
import { TeamController } from "../../interfaces/controllers/teamController";
import { UpdateTeamUseCase } from "../../interfaces/useCases/teams/updateTeam";

export class UpdateTeam implements UpdateTeamUseCase {
  teamController: TeamController;

  constructor(teamController: TeamController) {
    this.teamController = teamController;
  }

  async execute(id: string, dataToUpdate: Partial<Team>): Promise<boolean> {
    const result = await this.teamController.updateTeam(id, dataToUpdate);
    return result;
  }
}
