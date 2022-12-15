import request from "supertest";
import server from "../../../src/server";
import { AuthRouter } from "../../../src/presentation/routers/authRouter";
import { LoginUserUseCase } from "../../../src/domain/interfaces/useCases/auth/loginUser";
import { RegisterUserUseCase } from "../../../src/domain/interfaces/useCases/auth/registerUser";

import { User } from "../../../src/domain/entities/user";

describe("Auth router", () => {
  class MockLoginUserUseCase implements LoginUserUseCase {
    execute(loginData: Pick<User, "email" | "password">): Promise<string> {
      throw new Error("Method not implemented.");
    }
  }

  class MockRegisterUserUseCase implements RegisterUserUseCase {
    execute(user: User): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockLoginUserUseCase: LoginUserUseCase;
  let mockRegisterUserUseCase: RegisterUserUseCase;

  beforeAll(() => {
    mockLoginUserUseCase = new MockLoginUserUseCase();
    mockRegisterUserUseCase = new MockRegisterUserUseCase();
    server.use(
      "/auth",
      AuthRouter(mockLoginUserUseCase, mockRegisterUserUseCase)
    );
  });

  test("AuthRouter should be defined", () => {
    expect(AuthRouter).toBeDefined();
  });

  describe("POST /auth/login", () => {
    const LoginData: Pick<User, "email" | "password"> = {
      email: "luis@email.com",
      password: "luisPass",
    };

    it("should return token", async () => {
      const token: string = "asd1231asd12";

      jest
        .spyOn(mockLoginUserUseCase, "execute")
        .mockImplementation(() => Promise.resolve(token));

      const response = await request(server)
        .post("/auth/login")
        .send(LoginData);

      expect(mockLoginUserUseCase.execute).toHaveBeenCalledWith(LoginData);
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ token });
    });

    it("should return error message", async () => {
      const message: string = "Login failed";

      jest
        .spyOn(mockLoginUserUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .post("/auth/login")
        .send(LoginData);

      expect(mockLoginUserUseCase.execute).toHaveBeenCalledWith(LoginData);
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("POST /auth/register", () => {
    const InputData: User = {
      id: "1a1a",
      username: "luis123",
      email: "luis@email.com",
      password: "luisPass",
      todos: ["todo1", "todo2"],
    };

    it("should return confirmation message", async () => {
      const message: string = "User registered successfully";

      jest
        .spyOn(mockRegisterUserUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .post("/auth/register")
        .send(InputData);

      expect(mockRegisterUserUseCase.execute).toHaveBeenCalledWith(InputData);
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message });
    });

    it("should return error message", async () => {
      const message: string = "User registration failed";

      jest
        .spyOn(mockRegisterUserUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .post("/auth/register")
        .send(InputData);

      expect(mockRegisterUserUseCase.execute).toHaveBeenCalledWith(InputData);
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });
});
