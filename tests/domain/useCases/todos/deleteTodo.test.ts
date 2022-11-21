import { Todo } from "../../../../src/domain/entities/todo";
import { TodoController } from "../../../../src/domain/interfaces/controllers/todoController";
import { DeleteTodo } from "../../../../src/domain/useCases/todos/deleteTodo";

describe("Delete todo use case", () => {
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
      .spyOn(mockTodoController, "deleteTodo")
      .mockImplementation(() => Promise.resolve(true));

    const id = "1a1a";
    const deleteTodoUseCase = new DeleteTodo(mockTodoController);
    const result = await deleteTodoUseCase.execute(id);

    expect(mockTodoController.deleteTodo).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });
});
