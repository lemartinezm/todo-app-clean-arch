import { DeleteTeam } from "../../../../src/domain/useCases/teams/deleteTeam";
import { TeamController } from "../../../../src/domain/interfaces/controllers/teamController";
import { Team } from "../../../../src/domain/entities/team";

describe("Delete team use case", () => {
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

  test("DeleteTeam should be defined", () => {
    expect(DeleteTeam).toBeDefined();
  });

  test("Delete team should return true", async () => {
    const id = "1a1a1a";

    jest
      .spyOn(mockTeamController, "deleteTeam")
      .mockImplementation(() => Promise.resolve(true));

    const deleteTeamUseCase = new DeleteTeam(mockTeamController);
    const result = await deleteTeamUseCase.execute(id);

    expect(mockTeamController.deleteTeam).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });
});
