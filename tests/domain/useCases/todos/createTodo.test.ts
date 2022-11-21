import { Todo } from "../../../../src/domain/entities/todo";
import { TodoController } from "../../../../src/domain/interfaces/controllers/todoController";
import { CreateTodo } from "../../../../src/domain/useCases/todos/createTodo";

describe("Create Todo Use Case", () => {
  class MockTodoController implements TodoController {
    getAllTodos(): Promise<Todo[]> {
      throw new Error("Method not implemented.");
    }
    getTodo(id: string): Promise<Todo> {
      throw new Error("Method not implemented.");
    }
    createTodo(InputData: Todo): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    updateTodo(id: string, dataToUpdate: Partial<Todo>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    deleteTodo(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockTodoController: MockTodoController;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTodoController = new MockTodoController();
  });

  it("should return true", async () => {
    jest
      .spyOn(mockTodoController, "createTodo")
      .mockImplementation(() => Promise.resolve(true));

    const InputData: Todo = {
      id: "1",
      name: "My todo",
      description: "My description",
      createdAt: new Date(),
      deadline: new Date(),
      priority: "low",
      completed: false,
      creator: "1",
    };

    const createTodoUseCase = new CreateTodo(mockTodoController);
    const result = await createTodoUseCase.execute(InputData);

    expect(mockTodoController.createTodo).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });
});
