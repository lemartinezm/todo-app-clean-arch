import { Request, Response, Router } from "express";
import { CreateUserUseCase } from "../../domain/interfaces/useCases/users/createUser";
import { DeleteUserUseCase } from "../../domain/interfaces/useCases/users/deleteUser";
import { GetAllUsersUseCase } from "../../domain/interfaces/useCases/users/getAllUsers";
import { UpdateUserUseCase } from "../../domain/interfaces/useCases/users/updateUser";

export function UserRouter(
  getAllUsersUseCase: GetAllUsersUseCase,
  createUserUseCase: CreateUserUseCase,
  deleteUserUseCase: DeleteUserUseCase,
  updateUserUseCase: UpdateUserUseCase
) {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const users = await getAllUsersUseCase.execute();
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send({ message: "Error fetching users" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const response = await createUserUseCase.execute(req.body);
      res.status(201).send({ message: "User created successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error creating user" });
    }
  });

  router.delete("/", async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      await deleteUserUseCase.execute(id);
      res.status(204).end();
    } catch (err) {
      res.status(500).send({ message: "Error deleting user" });
    }
  });

  router.put("/", async (req: Request, res: Response) => {
    try {
      const { id, dataToUpdate } = req.body;
      await updateUserUseCase.execute(id, dataToUpdate);
      res.status(200).send({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error updating user" });
    }
  });

  return router;
}
