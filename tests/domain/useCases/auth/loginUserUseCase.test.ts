import { LoginUser } from "../../../../src/domain/useCases/auth/loginUser";
import { AuthController } from "../../../../src/domain/interfaces/controllers/authController";
import { User } from "../../../../src/domain/entities/user";

describe("Login user use case", () => {
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

  test("LoginUser should be defined", () => {
    expect(LoginUser).toBeDefined();
  });

  test("LoginUser should return a token", async () => {
    const LoginData: Pick<User, "email" | "password"> = {
      email: "luis@email.com",
      password: "luisPass",
    };
    const token: string = "asdasd123asd123";

    jest
      .spyOn(mockAuthController, "loginUser")
      .mockImplementation(() => Promise.resolve(token));

    const loginUserUseCase = new LoginUser(mockAuthController);
    const result = await loginUserUseCase.execute(LoginData);

    expect(mockAuthController.loginUser).toHaveBeenCalledWith(LoginData);
    expect(result).toBe(token);
  });
});
