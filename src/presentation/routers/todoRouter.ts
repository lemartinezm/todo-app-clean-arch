import { Request, Response, Router } from "express";
import { CreateTodoUseCase } from "../../domain/interfaces/useCases/todos/createTodo";
import { DeleteTodoUseCase } from "../../domain/interfaces/useCases/todos/deleteTodo";
import { GetAllTodosUseCase } from "../../domain/interfaces/useCases/todos/getAllTodos";
import { UpdateTodoUseCase } from "../../domain/interfaces/useCases/todos/updateTodo";

export function TodoRouter(
  getAllTodosUseCase: GetAllTodosUseCase,
  createTodoUseCase: CreateTodoUseCase,
  deleteTodoUseCase: DeleteTodoUseCase,
  updateTodoUseCase: UpdateTodoUseCase
) {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const todos = await getAllTodosUseCase.execute();
      res.status(200).send(todos);
    } catch (err) {
      res.status(500).send({ message: "Error fetching todos" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      await createTodoUseCase.execute(req.body);
      res.status(201).send({ message: "Todo created successfully" });
    } catch (err) {
      res.status(500).send({ message: "Error creating todo" });
    }
  });

  return router;
}
