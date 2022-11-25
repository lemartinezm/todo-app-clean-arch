import { User } from "../../../../src/domain/entities/user";
import { UserController } from "../../../../src/domain/interfaces/controllers/userController";
import { DeleteUser } from "../../../../src/domain/useCases/users/deleteUser";

describe("Delete user use case", () => {
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

  test("DeleteUser should be defined", () => {
    expect(DeleteUser).toBeDefined();
  });

  test("Delete user should return true", async () => {
    const id = "a1a1a1";

    jest
      .spyOn(mockUserController, "deleteUser")
      .mockImplementation(() => Promise.resolve(true));

    const deleteUserUseCase = new DeleteUser(mockUserController);
    const result = await deleteUserUseCase.execute(id);

    expect(mockUserController.deleteUser).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });
});
