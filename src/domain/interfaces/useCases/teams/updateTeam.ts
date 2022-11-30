import { Team } from "../../../entities/team";

export interface UpdateTeamUseCase {
  execute(id: string, dataToUpdate: Partial<Team>): Promise<boolean>;
}
