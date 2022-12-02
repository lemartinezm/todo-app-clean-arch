import request from "supertest";
import server from "../../../src/server";
import { Team } from "../../../src/domain/entities/team";
import { TeamRouter } from "../../../src/presentation/routers/teamRouter";
import { CreateTeamUseCase } from "../../../src/domain/interfaces/useCases/teams/createTeam";
import { DeleteTeamUseCase } from "../../../src/domain/interfaces/useCases/teams/deleteTeam";
import { GetAllTeamsUseCase } from "../../../src/domain/interfaces/useCases/teams/getAllTeams";
import { GetTeamByIdUseCase } from "../../../src/domain/interfaces/useCases/teams/getTeamById";
import { UpdateTeamUseCase } from "../../../src/domain/interfaces/useCases/teams/updateTeam";

describe("Team router", () => {
  class MockGetAllTeamsUseCase implements GetAllTeamsUseCase {
    execute(): Promise<Team[]> {
      throw new Error("Method not implemented.");
    }
  }

  class MockGetTeamByIdUseCase implements GetTeamByIdUseCase {
    execute(id: string): Promise<Team> {
      throw new Error("Method not implemented.");
    }
  }

  class MockCreateTeamUseCase implements CreateTeamUseCase {
    execute(team: Team): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  class MockDeleteTeamUseCase implements DeleteTeamUseCase {
    execute(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  class MockUpdateTeamUseCase implements UpdateTeamUseCase {
    execute(id: string, dataToUpdate: Partial<Team>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockGetAllTeamsUseCase: GetAllTeamsUseCase;
  let mockGetTeamByIdUseCase: GetTeamByIdUseCase;
  let mockCreateTeamUseCase: CreateTeamUseCase;
  let mockDeleteTeamUseCase: DeleteTeamUseCase;
  let mockUpdateTeamUseCase: UpdateTeamUseCase;

  beforeAll(() => {
    mockGetAllTeamsUseCase = new MockGetAllTeamsUseCase();
    mockGetTeamByIdUseCase = new MockGetTeamByIdUseCase();
    mockCreateTeamUseCase = new MockCreateTeamUseCase();
    mockDeleteTeamUseCase = new MockDeleteTeamUseCase();
    mockUpdateTeamUseCase = new MockUpdateTeamUseCase();

    server.use(
      "/teams",
      TeamRouter(
        mockGetAllTeamsUseCase,
        mockGetTeamByIdUseCase,
        mockCreateTeamUseCase,
        mockDeleteTeamUseCase,
        mockUpdateTeamUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("TeamRouter should be defined", () => {
    expect(TeamRouter).toBeDefined();
  });

  describe("GET /teams", () => {
    it("should return all teams", async () => {
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
        .spyOn(mockGetAllTeamsUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedResult));

      const response = await request(server).get("/teams");

      expect(mockGetAllTeamsUseCase.execute).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(ExpectedResult);
    });

    it("should return error with status 500", async () => {
      const message = "Error fetching teams";

      jest
        .spyOn(mockGetAllTeamsUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/teams");

      expect(mockGetAllTeamsUseCase.execute).toHaveBeenCalled();
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("GET /teams/:id", () => {
    it("should return data", async () => {
      const id = "1a1a1a";
      const ExpectedResult: Team = {
        id: "1a1a1a",
        name: "My team",
        leader: "a1a1a1",
        participants: ["a1a1a"],
        todos: ["a1a1a1"],
      };

      jest
        .spyOn(mockGetTeamByIdUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedResult));

      const response = await request(server).get(`/teams/${id}`);

      expect(mockGetTeamByIdUseCase.execute).toHaveBeenCalledWith(id);
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(ExpectedResult);
    });

    it("should return error with status 500", async () => {
      const id = "1a1a1a";
      const message = "Error fetching team";

      jest
        .spyOn(mockGetTeamByIdUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get(`/teams/${id}`);

      expect(mockGetTeamByIdUseCase.execute).toHaveBeenCalledWith(id);
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("POST /teams", () => {
    const InputData: Team = {
      id: "1a1a1a",
      name: "My team",
      leader: "a1a1a1",
      participants: ["a1a1a"],
      todos: ["a1a1a1"],
    };

    it("should return confirmation message", async () => {
      const message = "Team created successfully";

      jest
        .spyOn(mockCreateTeamUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).post("/teams").send(InputData);

      expect(mockCreateTeamUseCase.execute).toHaveBeenCalledWith(InputData);
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message });
    });

    it("should return error message with status 500", async () => {
      const message = "Error creating team";

      jest
        .spyOn(mockCreateTeamUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post("/teams").send(InputData);

      expect(mockCreateTeamUseCase.execute).toHaveBeenCalledWith(InputData);
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("DELETE /teams", () => {
    it("should return status 204", async () => {
      const id = "1a1a1a";

      jest
        .spyOn(mockDeleteTeamUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).delete("/teams").send({ id });

      expect(mockDeleteTeamUseCase.execute).toHaveBeenCalledWith(id);
      expect(response.status).toBe(204);
    });

    it("should return error message with status 500", async () => {
      const id = "1a1a1a";
      const message = "Error deleting team";

      jest
        .spyOn(mockDeleteTeamUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).delete("/teams").send({ id });

      expect(mockDeleteTeamUseCase.execute).toHaveBeenCalledWith(id);
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("PUT /teams", () => {
    const id = "1a1a1a";
    const dataToUpdate: Partial<Team> = {
      name: "my new name",
    };

    it("should return confirmation message", async () => {
      const message = "Team updated successfully";

      jest
        .spyOn(mockUpdateTeamUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .put("/teams")
        .send({ id, dataToUpdate });

      expect(mockUpdateTeamUseCase.execute).toHaveBeenCalledWith(
        id,
        dataToUpdate
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ message });
    });

    it("should return error message with status 500", async () => {
      const message = "Error updating team";

      jest
        .spyOn(mockUpdateTeamUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .put("/teams")
        .send({ id, dataToUpdate });

      expect(mockUpdateTeamUseCase.execute).toHaveBeenCalledWith(
        id,
        dataToUpdate
      );
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });
});
