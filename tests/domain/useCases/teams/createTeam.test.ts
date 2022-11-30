import { CreateTeam } from "../../../../src/domain/useCases/teams/createTeam";
import { TeamController } from "../../../../src/domain/interfaces/controllers/teamController";
import { Team } from "../../../../src/domain/entities/team";

describe("Create team use case", () => {
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

  test("CreateTeam should be defined", () => {
    expect(CreateTeam).toBeDefined();
  });

  test("Create team should return true", async () => {
    const InputData: Team = {
      id: "1a1a1a",
      name: "My team",
      leader: "a1a1a1",
      participants: ["a1a1a"],
      todos: ["a1a1a1"],
    };

    jest
      .spyOn(mockTeamController, "createTeam")
      .mockImplementation(() => Promise.resolve(true));

    const createTeamUseCase = new CreateTeam(mockTeamController);
    const result = await createTeamUseCase.execute(InputData);

    expect(mockTeamController.createTeam).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });
});
