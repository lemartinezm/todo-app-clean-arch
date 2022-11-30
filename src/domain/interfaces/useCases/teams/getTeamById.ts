import { Team } from "../../../entities/team";

export interface GetTeamByIdUseCase {
  execute(id: string): Promise<Team>;
}
