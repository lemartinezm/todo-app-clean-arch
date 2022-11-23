import { User } from "../../../../src/domain/entities/user";
import { UserController } from "../../../../src/domain/interfaces/controllers/userController";
import { GetAllUsers } from "../../../../src/domain/useCases/users/getAllUsers";

describe("Get all users use case", () => {
  class MockUserController implements UserController {
    getAllUsers(): Promise<User[]> {
      throw new Error("Method not implemented.");
    }
    getUser(id: string): Promise<User> {
      throw new Error("Method not implemented.");
    }
    createUser(user: User): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    updateUser(id: string, dataToUpdate: Partial<User>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockUserController: MockUserController;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserController = new MockUserController();
  });

  test("MockGetAllUsers should be defined", () => {
    expect(MockUserController).toBeDefined();
  });

  test("Get all users should return data", async () => {
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
      .spyOn(mockUserController, "getAllUsers")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const getAllUsersUseCase = new GetAllUsers(mockUserController);
    const result = await getAllUsersUseCase.execute();

    expect(result).toStrictEqual(ExpectedResult);
    expect(mockUserController.getAllUsers).toHaveBeenCalled();
  });
});
