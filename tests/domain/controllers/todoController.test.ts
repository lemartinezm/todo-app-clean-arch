import { TodoControllerImpl } from "../../../src/domain/controllers/todoController";
import { TodoDataSource } from "../../../src/data/interfaces/dataSources/todoDataSource";
import { Todo } from "../../../src/domain/entities/todo";

describe("Todo controller", () => {
  class MockTodoDataSource implements TodoDataSource {
    getAll(): Promise<Todo[]> {
      throw new Error("Method not implemented.");
    }
    getById(): Promise<Todo> {
      throw new Error("Method not implemented.");
    }
    create(todo: Todo): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    updateById(id: string, dataToUpdate: Partial<Todo>): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockTodoDataSource: TodoDataSource;

  beforeEach(() => {
    jest.clearAllMocks();
    mockTodoDataSource = new MockTodoDataSource();
  });

  test("Controller should be defined", () => {
    expect(TodoControllerImpl).toBeDefined();
  });

  test("Get all todos should return data", async () => {
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
      .spyOn(mockTodoDataSource, "getAll")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const todoController = new TodoControllerImpl(mockTodoDataSource);
    const result = await todoController.getAllTodos();

    expect(mockTodoDataSource.getAll).toHaveBeenCalled();
    expect(result).toBe(ExpectedResult);
  });

  test("Get by id should return data", async () => {
    const id = "1a1a";
    const ExpectedResult: Todo = {
      id: "1",
      name: "My todo",
      description: "My description",
      createdAt: new Date().toJSON(),
      deadline: new Date().toJSON(),
      priority: "low",
      completed: false,
      creator: "1",
    };

    jest
      .spyOn(mockTodoDataSource, "getById")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const todoController = new TodoControllerImpl(mockTodoDataSource);
    const result = await todoController.getTodo(id);

    expect(mockTodoDataSource.getById).toHaveBeenCalledWith(id);
    expect(result).toBe(ExpectedResult);
  });

  test("Create todo should return true", async () => {
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

    jest
      .spyOn(mockTodoDataSource, "create")
      .mockImplementation(() => Promise.resolve(true));

    const todoController = new TodoControllerImpl(mockTodoDataSource);
    const result = await todoController.createTodo(InputData);

    expect(mockTodoDataSource.create).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });

  test("Delete todo should return true", async () => {
    const id = "1a1a";

    jest
      .spyOn(mockTodoDataSource, "deleteById")
      .mockImplementation(() => Promise.resolve(true));

    const todoController = new TodoControllerImpl(mockTodoDataSource);
    const result = await todoController.deleteTodo(id);

    expect(mockTodoDataSource.deleteById).toHaveBeenCalledWith(id);
    expect(result).toBe(true);
  });

  test("Update todo should return true", async () => {
    const id = "1a1a";
    const dataToUpdate: Partial<Todo> = {
      name: "My todo modified",
      description: "My description modified",
    };

    jest
      .spyOn(mockTodoDataSource, "updateById")
      .mockImplementation(() => Promise.resolve(true));

    const todoController = new TodoControllerImpl(mockTodoDataSource);
    const result = await todoController.updateTodo(id, dataToUpdate);

    expect(mockTodoDataSource.updateById).toHaveBeenCalledWith(
      id,
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
