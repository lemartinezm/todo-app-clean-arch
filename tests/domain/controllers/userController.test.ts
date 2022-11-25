import { UserDataSource } from "../../../src/data/interfaces/dataSources/userDataSource";
import { UserControllerImpl } from "../../../src/domain/controllers/userController";
import { User } from "../../../src/domain/entities/user";

describe("User controller", () => {
  class MockUserDataSource implements UserDataSource {
    getAll(): Promise<User[]> {
      throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<User> {
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

  let mockUserDataSource: MockUserDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserDataSource = new MockUserDataSource();
  });

  test("UserController should be defined", () => {
    expect(UserControllerImpl).toBeDefined();
  });

  test("Get all should return data", async () => {
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
      .spyOn(mockUserDataSource, "getAll")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const userController = new UserControllerImpl(mockUserDataSource);
    const result = await userController.getAllUsers();

    expect(mockUserDataSource.getAll).toHaveBeenCalled();
    expect(result).toStrictEqual(ExpectedResult);
  });

  test("Get by id should return data", async () => {
    const id = "1a1a";
    const ExpectedResult: User = {
      id: "1a1a",
      username: "luis123",
      email: "luis@email.com",
      password: "luisPass",
      todos: ["todo1", "todo2"],
    };

    jest
      .spyOn(mockUserDataSource, "getById")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const userController = new UserControllerImpl(mockUserDataSource);
    const result = await userController.getUser(id);

    expect(mockUserDataSource.getById).toHaveBeenCalledWith(id);
    expect(result).toStrictEqual(ExpectedResult);
  });

  test("Create user should return true", async () => {
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

    const userController = new UserControllerImpl(mockUserDataSource);
    const result = await userController.createUser(InputData);

    expect(mockUserDataSource.create).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });

  test("Delete user should return true", async () => {
    const id = "1a1a1";

    jest
      .spyOn(mockUserDataSource, "deleteById")
      .mockImplementation(() => Promise.resolve(true));

    const userController = new UserControllerImpl(mockUserDataSource);
    const result = await userController.deleteUser(id);

    expect(mockUserDataSource.deleteById).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });

  test("Update user should return true", async () => {
    const id = "1a1a1";
    const dataToUpdate: Partial<User> = {
      username: "myNewUsername",
      email: "new@email.com",
    };

    jest
      .spyOn(mockUserDataSource, "updateById")
      .mockImplementation(() => Promise.resolve(true));

    const userController = new UserControllerImpl(mockUserDataSource);
    const result = await userController.updateUser(id, dataToUpdate);

    expect(mockUserDataSource.updateById).toHaveBeenCalledWith(
      id,
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
