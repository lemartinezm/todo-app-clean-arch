import { Database } from "../../../src/data/interfaces/dataSources/database";
import { MongoDBTodoDataSource } from "../../../src/data/dataSource/mongodb/mongodbTodoDataSource";
import { Todo } from "../../../src/domain/entities/todo";

describe("MongoDB todo data source", () => {
  let mockDatabase: Database = {
    find: jest.fn(),
    findOne: jest.fn(),
    insertOne: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("MongoDB todo data source should be defined", () => {
    expect(MongoDBTodoDataSource).toBeDefined();
  });

  test("getAll should return data", async () => {
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
      .spyOn(mockDatabase, "find")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const mongodbTodoDataSource = new MongoDBTodoDataSource(mockDatabase);
    const result = await mongodbTodoDataSource.getAll();

    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toBe(ExpectedResult);
  });

  test("getById should return data", async () => {
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
      .spyOn(mockDatabase, "findOne")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const mongodbTodoDataSource = new MongoDBTodoDataSource(mockDatabase);
    const result = await mongodbTodoDataSource.getById(id);

    expect(mockDatabase.findOne).toHaveBeenCalledWith({ _id: id });
    expect(result).toBe(ExpectedResult);
  });

  test("Create should return true", async () => {
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
      .spyOn(mockDatabase, "insertOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbTodoDataSource = new MongoDBTodoDataSource(mockDatabase);
    const result = await mongodbTodoDataSource.create(InputData);

    expect(mockDatabase.insertOne).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });

  test("deleteById should return true", async () => {
    const id = "1a1a";

    jest
      .spyOn(mockDatabase, "deleteOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbTodoDataSource = new MongoDBTodoDataSource(mockDatabase);
    const result = await mongodbTodoDataSource.deleteById(id);

    expect(mockDatabase.deleteOne).toHaveBeenCalledWith({ _id: id });
    expect(result).toBe(true);
  });

  test("updateById should return true", async () => {
    const id = "a1a11";
    const dataToUpdate: Partial<Todo> = {
      name: "My todo modified",
      description: "My description modified",
    };

    jest
      .spyOn(mockDatabase, "updateOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbTodoDataSource = new MongoDBTodoDataSource(mockDatabase);
    const result = await mongodbTodoDataSource.updateById(id, dataToUpdate);

    expect(mockDatabase.updateOne).toHaveBeenCalledWith(
      { _id: id },
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
