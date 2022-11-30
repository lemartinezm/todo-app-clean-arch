import { GetTeamById } from "../../../../src/domain/useCases/teams/getTeamById";
import { TeamController } from "../../../../src/domain/interfaces/controllers/teamController";
import { Team } from "../../../../src/domain/entities/team";

describe("Get team by id use case", () => {
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

  test("GetTeamById should be defined", () => {
    expect(GetTeamById).toBeDefined();
  });

  test("Get team by id should return data", async () => {
    const id = "1a1a1a";
    const ExpectedResult: Team = {
      id: "1a1a1a",
      name: "My team",
      leader: "a1a1a1",
      participants: ["a1a1a"],
      todos: ["a1a1a1"],
    };

    jest
      .spyOn(mockTeamController, "getTeamById")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const getTeamByIdUseCase = new GetTeamById(mockTeamController);
    const result = await getTeamByIdUseCase.execute(id);

    expect(mockTeamController.getTeamById).toHaveBeenCalledWith(id);
    expect(result).toStrictEqual(ExpectedResult);
  });
});
