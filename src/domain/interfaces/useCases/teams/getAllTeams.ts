import { Team } from "../../../entities/team";

export interface GetAllTeamsUseCase {
  execute(): Promise<Team[]>;
}
