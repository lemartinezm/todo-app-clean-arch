import { TeamControllerImpl } from "../../../src/domain/controllers/teamController";
import { TeamDataSource } from "../../../src/data/interfaces/dataSources/teamDataSource";
import { Team } from "../../../src/domain/entities/team";

describe("Team controller", () => {
  class MockTeamDataSource implements TeamDataSource {
    getAll(): Promise<Team[]> {
      throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Team> {
      throw new Error("Method not implemented.");
    }
    create(team: Team): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    updateById(id: string, dataToUpdate: Partial<Team>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockTeamDataSource: TeamDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTeamDataSource = new MockTeamDataSource();
  });

  test("TeamControllerImpl should be defined", () => {
    expect(TeamControllerImpl).toBeDefined();
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
      .spyOn(mockTeamDataSource, "getAll")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const teamController = new TeamControllerImpl(mockTeamDataSource);
    const result = await teamController.getAllTeams();

    expect(mockTeamDataSource.getAll).toHaveBeenCalled();
    expect(result).toStrictEqual(ExpectedResult);
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
      .spyOn(mockTeamDataSource, "getById")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const teamController = new TeamControllerImpl(mockTeamDataSource);
    const result = await teamController.getTeamById(id);

    expect(mockTeamDataSource.getById).toHaveBeenCalledWith(id);
    expect(result).toStrictEqual(ExpectedResult);
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
      .spyOn(mockTeamDataSource, "create")
      .mockImplementation(() => Promise.resolve(true));

    const teamController = new TeamControllerImpl(mockTeamDataSource);
    const result = await teamController.createTeam(InputData);

    expect(mockTeamDataSource.create).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });

  test("Delete team should return true", async () => {
    const id = "1a1a1a";

    jest
      .spyOn(mockTeamDataSource, "deleteById")
      .mockImplementation(() => Promise.resolve(true));

    const teamController = new TeamControllerImpl(mockTeamDataSource);
    const result = await teamController.deleteTeam(id);

    expect(mockTeamDataSource.deleteById).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });

  test("Update team should return true", async () => {
    const id = "1a1a1a";
    const dataToUpdate: Partial<Team> = {
      name: "my new name",
    };

    jest
      .spyOn(mockTeamDataSource, "updateById")
      .mockImplementation(() => Promise.resolve(true));

    const teamController = new TeamControllerImpl(mockTeamDataSource);
    const result = await teamController.updateTeam(id, dataToUpdate);

    expect(mockTeamDataSource.updateById).toHaveBeenCalledWith(
      id,
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
