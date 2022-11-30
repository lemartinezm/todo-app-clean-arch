import { Team } from "../../../entities/team";

export interface CreateTeamUseCase {
  execute(team: Team): Promise<boolean>;
}
