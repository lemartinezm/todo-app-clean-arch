import { Team } from "../../entities/team";
import { TeamController } from "../../interfaces/controllers/teamController";
import { CreateTeamUseCase } from "../../interfaces/useCases/teams/createTeam";

export class CreateTeam implements CreateTeamUseCase {
  teamController: TeamController;

  constructor(teamController: TeamController) {
    this.teamController = teamController;
  }

  async execute(team: Team): Promise<boolean> {
    const result = await this.teamController.createTeam(team);
    return result;
  }
}
