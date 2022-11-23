import request from "supertest";
import server from "../../../src/server";
import { Todo } from "../../../src/domain/entities/todo";
import { TodoRouter } from "../../../src/presentation/routers/todoRouter";
import { GetAllTodosUseCase } from "../../../src/domain/interfaces/useCases/todos/getAllTodos";
import { CreateTodoUseCase } from "../../../src/domain/interfaces/useCases/todos/createTodo";
import { DeleteTodoUseCase } from "../../../src/domain/interfaces/useCases/todos/deleteTodo";
import { UpdateTodoUseCase } from "../../../src/domain/interfaces/useCases/todos/updateTodo";

describe("Todo Router", () => {
  class MockGetAllTodosUseCase implements GetAllTodosUseCase {
    execute(): Promise<Todo[]> {
      throw new Error("Method not implemented.");
    }
  }

  class MockCreateTodoUseCase implements CreateTodoUseCase {
    execute(InputData: Todo): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  class MockDeleteTodoUseCase implements DeleteTodoUseCase {
    execute(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  class MockUpdateTodoUseCase implements UpdateTodoUseCase {
    execute(id: string, dataToUpdate: Partial<Todo>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockGetAllTodosUseCase: MockGetAllTodosUseCase;
  let mockCreateTodoUseCase: MockCreateTodoUseCase;
  let mockDeleteTodoUseCase: MockDeleteTodoUseCase;
  let mockUpdateTodoUseCase: MockUpdateTodoUseCase;

  beforeAll(() => {
    mockGetAllTodosUseCase = new MockGetAllTodosUseCase();
    mockCreateTodoUseCase = new MockCreateTodoUseCase();
    mockDeleteTodoUseCase = new MockDeleteTodoUseCase();
    mockUpdateTodoUseCase = new MockUpdateTodoUseCase();

    server.use(
      "/todo",
      TodoRouter(
        mockGetAllTodosUseCase,
        mockCreateTodoUseCase,
        mockDeleteTodoUseCase,
        mockUpdateTodoUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Todo Router should be defined", () => {
    expect(TodoRouter).toBeDefined();
  });

  describe("GET /todo", () => {
    it("should return all todos", async () => {
      const ExpectedResult: Todo[] = [
        {
          id: "1",
          name: "My todo",
          description: "My description",
          createdAt: new Date().toJSON(),
          deadline: new Date().toJSON(),
          priority: "low",
          completed: false,
          creator: "1",
        },
      ];

      jest
        .spyOn(mockGetAllTodosUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedResult));

      const response = await request(server).get("/todo");

      expect(mockGetAllTodosUseCase.execute).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(ExpectedResult);
    });

    it("should return error with status 500", async () => {
      const message = "Error fetching todos";

      jest
        .spyOn(mockGetAllTodosUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/todo");

      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
    });
  });

  describe("POST /todo", () => {
    const InputData: Todo = {
      id: "1",
      name: "My todo",
      description: "My description",
      createdAt: new Date().toJSON(),
      deadline: new Date().toJSON(),
      priority: "low",
      completed: false,
      creator: "1",
    };

    it("should return true", async () => {
      const message = "Todo created successfully";

      jest
        .spyOn(mockCreateTodoUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).post("/todo").send(InputData);

      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message });
      expect(mockCreateTodoUseCase.execute).toHaveBeenCalledWith(InputData);
    });

    it("should return error with status 500", async () => {
      const message = "Error creating todo";

      jest
        .spyOn(mockCreateTodoUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post("/todo").send(InputData);

      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message });
      expect(mockCreateTodoUseCase.execute).toHaveBeenCalledWith(InputData);
    });
  });
});
