import request from "supertest";
import server from "../../../src/server";
import { User } from "../../../src/domain/entities/user";
import { UserRouter } from "../../../src/presentation/routers/userRouter";
import { GetAllUsersUseCase } from "../../../src/domain/interfaces/useCases/users/getAllUsers";
import { CreateUserUseCase } from "../../../src/domain/interfaces/useCases/users/createUser";
import { DeleteUserUseCase } from "../../../src/domain/interfaces/useCases/users/deleteUser";
import { UpdateUserUseCase } from "../../../src/domain/interfaces/useCases/users/updateUser";

describe("User router", () => {
  class MockGetAllUsersUseCase implements GetAllUsersUseCase {
    execute(): Promise<User[]> {
      throw new Error("Method not implemented.");
    }
  }

  class MockCreateUserUseCase implements CreateUserUseCase {
    execute(user: User): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  class MockDeleteUserUseCase implements DeleteUserUseCase {
    execute(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  class MockUpdateUserUseCase implements UpdateUserUseCase {
    execute(id: string, dataToUpdate: Partial<User>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockGetAllUsersUseCase: MockGetAllUsersUseCase;
  let mockCreateUserUseCase: MockCreateUserUseCase;
  let mockDeleteUserUseCase: MockDeleteUserUseCase;
  let mockUpdateUserUseCase: MockUpdateUserUseCase;

  beforeAll(() => {
    mockGetAllUsersUseCase = new MockGetAllUsersUseCase();
    mockCreateUserUseCase = new MockCreateUserUseCase();
    mockDeleteUserUseCase = new MockDeleteUserUseCase();
    mockUpdateUserUseCase = new MockUpdateUserUseCase();

    server.use(
      "/user",
      UserRouter(
        mockGetAllUsersUseCase,
        mockCreateUserUseCase,
        mockDeleteUserUseCase,
        mockUpdateUserUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("UserRouter should be defined", () => {
    expect(UserRouter).toBeDefined();
  });

  describe("GET /user", () => {
    it("Should return data", async () => {
      const ExpectedResult: User[] = [
        {
          id: "1a1a",
          username: "luis123",
          email: "luis@email.com",
          password: "luisPass",
          todos: ["todo1", "todo2"],
        },
      ];

      jest
        .spyOn(mockGetAllUsersUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedResult));

      const response = await request(server).get("/user");

      expect(mockGetAllUsersUseCase.execute).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(ExpectedResult);
    });

    it("should return error with status 500", async () => {
      const message = "Error fetching users";

      jest
        .spyOn(mockGetAllUsersUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/user");

      expect(mockGetAllUsersUseCase.execute).toHaveBeenCalled();
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("POST /user", () => {
    const InputData: User = {
      id: "1a1a",
      username: "luis123",
      email: "luis@email.com",
      password: "luisPass",
      todos: ["todo1", "todo2"],
    };

    it("should return status 201 with message", async () => {
      const message = "User created successfully";

      jest
        .spyOn(mockCreateUserUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).post("/user").send(InputData);

      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(InputData);
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message });
    });

    it("should return error with status 500", async () => {
      const message = "Error creating user";

      jest
        .spyOn(mockCreateUserUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post("/user").send(InputData);

      expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(InputData);
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("DELETE /user", () => {
    const id = "1a1a1a";

    it("should return status 204", async () => {
      jest
        .spyOn(mockDeleteUserUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).delete("/user").send({ id });

      expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith(id);
      expect(response.status).toBe(204);
    });

    it("should return error with status 500", async () => {
      const message = "Error deleting user";

      jest
        .spyOn(mockDeleteUserUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).delete("/user").send({ id });

      expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith(id);
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("PUT /user", () => {
    const id = "1a1a1a";
    const dataToUpdate: Partial<User> = {
      username: "myNewUsername",
    };

    it("should return status 200", async () => {
      const message = "User updated successfully";

      jest
        .spyOn(mockUpdateUserUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .put("/user")
        .send({ id, dataToUpdate });

      expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith(
        id,
        dataToUpdate
      );
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ message });
    });

    it("should return error with status 500", async () => {
      const message = "Error updating user";

      jest
        .spyOn(mockUpdateUserUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .put("/user")
        .send({ id, dataToUpdate });

      expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith(
        id,
        dataToUpdate
      );
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });
});
