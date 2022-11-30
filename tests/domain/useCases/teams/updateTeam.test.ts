import { UpdateTeam } from "../../../../src/domain/useCases/teams/updateTeam";
import { TeamController } from "../../../../src/domain/interfaces/controllers/teamController";
import { Team } from "../../../../src/domain/entities/team";

describe("Update team use case", () => {
  class MockTeamController implements TeamController {
    getAllTeams(): Promise<Team[]> {
      throw new Error("Method not implemented.");
    }
    getTeamById(id: string): Promise<Team> {
      throw new Error("Method not implemented.");
    }
    createTeam(team: Team): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    deleteTeam(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    updateTeam(id: string, dataToUpdate: Partial<Team>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockTeamController: TeamController;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTeamController = new MockTeamController();
  });

  test("UpdateTeam should be defined", () => {
    expect(UpdateTeam).toBeDefined();
  });

  test("Update team should return true", async () => {
    const id = "1a1a1a";
    const dataToUpdate: Partial<Team> = {
      name: "My new team name",
    };

    jest
      .spyOn(mockTeamController, "updateTeam")
      .mockImplementation(() => Promise.resolve(true));

    const updateTeamUseCase = new UpdateTeam(mockTeamController);
    const result = await updateTeamUseCase.execute(id, dataToUpdate);

    expect(mockTeamController.updateTeam).toHaveBeenCalledWith(
      id,
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
