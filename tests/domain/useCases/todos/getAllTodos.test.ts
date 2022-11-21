import { GetAllTodos } from "../../../../src/domain/useCases/todos/getAllTodos";
import { TodoController } from "../../../../src/domain/interfaces/controllers/todoController";
import { Todo } from "../../../../src/domain/entities/todo";

describe("Get all todos use case", () => {
  class MockTodoRepository implements TodoController {
    getAllTodos(): Promise<Todo[]> {
      throw new Error("Method not implemented.");
    }
    getTodo(): Promise<Todo> {
      throw new Error("Method not implemented.");
    }
    createTodo(): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    updateTodo(): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    deleteTodo(): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockTodoRepository: MockTodoRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTodoRepository = new MockTodoRepository();
  });

  it("should return all todos", async () => {
    const ExpectedResult: Todo[] = [
      {
        id: "1",
        name: "My todo",
        description: "My description",
        createdAt: new Date(),
        deadline: new Date(),
        priority: "low",
        completed: false,
        creator: "1",
      },
    ];

    jest
      .spyOn(mockTodoRepository, "getAllTodos")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const getAllTodosUseCase = new GetAllTodos(mockTodoRepository);
    const result = await getAllTodosUseCase.execute();

    expect(mockTodoRepository.getAllTodos).toHaveBeenCalled();
    expect(result).toBe(ExpectedResult);
  });
});
