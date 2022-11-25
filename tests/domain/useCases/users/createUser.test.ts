import { User } from "../../../../src/domain/entities/user";
import { UserController } from "../../../../src/domain/interfaces/controllers/userController";
import { CreateUser } from "../../../../src/domain/useCases/users/createUser";

describe("Create user use case", () => {
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

  test("CreateUser should be defined", () => {
    expect(CreateUser).toBeDefined();
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
      .spyOn(mockUserController, "createUser")
      .mockImplementation(() => Promise.resolve(true));

    const createUserUseCase = new CreateUser(mockUserController);
    const result = await createUserUseCase.execute(InputData);

    expect(mockUserController.createUser).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });
});
