import { GetAllTeams } from "../../../../src/domain/useCases/teams/getAllTeams";
import { TeamController } from "../../../../src/domain/interfaces/controllers/teamController";
import { Team } from "../../../../src/domain/entities/team";

describe("Get all teams use case", () => {
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

  let mockTeamController: MockTeamController;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTeamController = new MockTeamController();
  });

  test("GetAllTeams should be defined", () => {
    expect(GetAllTeams).toBeDefined();
  });

  test("Get all teams should return data", async () => {
    const ExpectedResult: Team[] = [
      {
        id: "1a1a1a",
        name: "My team",
        leader: "a1a1a1",
        participants: ["a1a1a"],
        todos: ["a1a1a1"],
      },
    ];

    jest
      .spyOn(mockTeamController, "getAllTeams")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const getAllTeamsUseCase = new GetAllTeams(mockTeamController);
    const result = await getAllTeamsUseCase.execute();

    expect(mockTeamController.getAllTeams).toHaveBeenCalled();
    expect(result).toStrictEqual(ExpectedResult);
  });
});
