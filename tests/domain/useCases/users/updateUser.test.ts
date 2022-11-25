import { User } from "../../../../src/domain/entities/user";
import { UserController } from "../../../../src/domain/interfaces/controllers/userController";
import { UpdateUser } from "../../../../src/domain/useCases/users/updateUser";

describe("Update user use case", () => {
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

  test("UpdateUser should be defined", () => {
    expect(UpdateUser).toBeDefined();
  });

  test("Update user should return true", async () => {
    const id = "1a1a1a1";
    const dataToUpdate: Partial<User> = {
      username: "myNewUsername",
      email: "myNewEmail@email.com",
    };

    jest
      .spyOn(mockUserController, "updateUser")
      .mockImplementation(() => Promise.resolve(true));

    const updateUserUseCase = new UpdateUser(mockUserController);
    const result = await updateUserUseCase.execute(id, dataToUpdate);

    expect(mockUserController.updateUser).toHaveBeenCalledWith(
      id,
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
