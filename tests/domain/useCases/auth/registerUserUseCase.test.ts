import { RegisterUser } from "../../../../src/domain/useCases/auth/registerUser";
import { AuthController } from "../../../../src/domain/interfaces/controllers/authController";
import { User } from "../../../../src/domain/entities/user";

describe("Register user use case", () => {
  class MockAuthController implements AuthController {
    registerUser(user: User): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    loginUser(loginData: Pick<User, "email" | "password">): Promise<string> {
      throw new Error("Method not implemented.");
    }
  }

  let mockAuthController: AuthController;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthController = new MockAuthController();
  });

  test("RegisterUser should be defined", () => {
    expect(RegisterUser).toBeDefined();
  });

  test("RegisterUser should return true", async () => {
    const InputData: User = {
      id: "1a1a",
      username: "luis123",
      email: "luis@email.com",
      password: "luisPass",
      todos: ["todo1", "todo2"],
    };

    jest
      .spyOn(mockAuthController, "registerUser")
      .mockImplementation(() => Promise.resolve(true));

    const registerUserUseCase = new RegisterUser(mockAuthController);
    const result = await registerUserUseCase.execute(InputData);

    expect(mockAuthController.registerUser).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });
});
