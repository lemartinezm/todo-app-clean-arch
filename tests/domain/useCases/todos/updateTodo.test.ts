import { Todo } from "../../../../src/domain/entities/todo";
import { TodoController } from "../../../../src/domain/interfaces/controllers/todoController";
import { UpdateTodo } from "../../../../src/domain/useCases/todos/updateTodo";

describe("Update todo use case", () => {
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
      .spyOn(mockTodoController, "updateTodo")
      .mockImplementation(() => Promise.resolve(true));

    const id: string = "1a1a";
    const dataToUpdate: Partial<Todo> = {
      name: "My test modified",
      description: "This is my modified description",
    };

    const updateTodoUseCase = new UpdateTodo(mockTodoController);
    const result = await updateTodoUseCase.execute(id, dataToUpdate);

    expect(mockTodoController.updateTodo).toHaveBeenCalledWith(
      id,
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
