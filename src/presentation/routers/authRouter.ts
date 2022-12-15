import { Request, Response, Router } from "express";
import { LoginUserUseCase } from "../../domain/interfaces/useCases/auth/loginUser";
import { RegisterUserUseCase } from "../../domain/interfaces/useCases/auth/registerUser";

export function AuthRouter(
  loginUserUseCase: LoginUserUseCase,
  registerUserUseCase: RegisterUserUseCase
) {
  const authRouter = Router();

  authRouter.post("/login", async (req: Request, res: Response) => {
    try {
      const token = await loginUserUseCase.execute(req.body);
      res.status(200).send({ token });
    } catch (err) {
      res.status(500).send({ message: "Login failed" });
    }
  });

  authRouter.post("/register", async (req: Request, res: Response) => {
    try {
      const result = await registerUserUseCase.execute(req.body);
      res.status(201).send({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).send({ message: "User registration failed" });
    }
  });

  return authRouter;
}
