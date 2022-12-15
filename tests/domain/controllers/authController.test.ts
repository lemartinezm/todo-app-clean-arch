import { AuthControllerImpl } from "../../../src/domain/controllers/authController";
import { UserDataSource } from "../../../src/data/interfaces/dataSources/userDataSource";
import { User } from "../../../src/domain/entities/user";

describe("Auth controller", () => {
  class MockUserDataSource implements UserDataSource {
    getAll(): Promise<User[]> {
      throw new Error("Method not implemented.");
    }
    getOne(query: Partial<User>): Promise<User> {
      throw new Error("Method not implemented.");
    }
    create(user: User): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    updateById(id: string, dataToUpdate: Partial<User>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockUserDataSource: UserDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserDataSource = new MockUserDataSource();
  });

  test("AuthControllerImpl should be defined", () => {
    expect(AuthControllerImpl).toBeDefined();
  });

  test("Login should return jwt", async () => {
    const ExpectedResult: User = {
      id: "1a1a",
      username: "luis123",
      email: "luis@email.com",
      password: "luisPass",
      todos: ["todo1", "todo2"],
    };
    const LoginData: Pick<User, "email" | "password"> = {
      email: "luis@email.com",
      password: "luisPass",
    };

    jest
      .spyOn(mockUserDataSource, "getOne")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const authController = new AuthControllerImpl(mockUserDataSource);
    const result = await authController.loginUser(LoginData);

    expect(mockUserDataSource.getOne).toHaveBeenCalledWith(LoginData);
    expect(typeof result).toBe("string");
  });

  test("Register should return true", async () => {
    const InputData: User = {
      id: "1a1a",
      username: "luis123",
      email: "luis@email.com",
      password: "luisPass",
      todos: ["todo1", "todo2"],
    };

    jest
      .spyOn(mockUserDataSource, "create")
      .mockImplementation(() => Promise.resolve(true));

    const authController = new AuthControllerImpl(mockUserDataSource);
    const result = await authController.registerUser(InputData);

    expect(mockUserDataSource.create).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });
});
