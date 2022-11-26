import { MongoDBUserDataSource } from "../../../src/data/dataSource/mongodb/mongodbUserDataSource";
import { Database } from "../../../src/data/interfaces/dataSources/database";
import { User } from "../../../src/domain/entities/user";

describe("MongoDB user data source", () => {
  const mockDatabase: Database = {
    find: jest.fn(),
    findOne: jest.fn(),
    insertOne: jest.fn(),
    deleteOne: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("MongoDBUserDataSource should be defined", () => {
    expect(MongoDBUserDataSource).toBeDefined();
  });

  test("getAll should return data", async () => {
    const ExpectedResult: User[] = [
      {
        id: "1a1a",
        username: "luis123",
        email: "luis@email.com",
        password: "luisPass",
        todos: ["todo1", "todo2"],
      },
    ];

    jest
      .spyOn(mockDatabase, "find")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const mongodbUserDataSource = new MongoDBUserDataSource(mockDatabase);
    const result = await mongodbUserDataSource.getAll();

    expect(mockDatabase.find).toHaveBeenCalled();
    expect(result).toStrictEqual(ExpectedResult);
  });

  test("getById should return data", async () => {
    const id = "1a1a1a";
    const ExpectedResult: User = {
      id: "1a1a",
      username: "luis123",
      email: "luis@email.com",
      password: "luisPass",
      todos: ["todo1", "todo2"],
    };

    jest
      .spyOn(mockDatabase, "findOne")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const mongodbUserDataSource = new MongoDBUserDataSource(mockDatabase);
    const result = await mongodbUserDataSource.getById(id);

    expect(mockDatabase.findOne).toHaveBeenCalledWith({ _id: id });
    expect(result).toStrictEqual(ExpectedResult);
  });

  test("create should return true", async () => {
    const InputData: User = {
      id: "1a1a",
      username: "luis123",
      email: "luis@email.com",
      password: "luisPass",
      todos: ["todo1", "todo2"],
    };

    jest
      .spyOn(mockDatabase, "insertOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbUserDataSource = new MongoDBUserDataSource(mockDatabase);
    const result = await mongodbUserDataSource.create(InputData);

    expect(mockDatabase.insertOne).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });

  test("deleteById should return true", async () => {
    const id = "a1a1a1";

    jest
      .spyOn(mockDatabase, "deleteOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbUserDataSource = new MongoDBUserDataSource(mockDatabase);
    const result = await mongodbUserDataSource.deleteById(id);

    expect(mockDatabase.deleteOne).toHaveBeenCalledWith({ _id: id });
    expect(result).toBe(true);
  });

  test("updateById should return true", async () => {
    const id = "a1a1a1";
    const dataToUpdate: Partial<User> = {
      username: "myNewName",
    };

    jest
      .spyOn(mockDatabase, "updateOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbUserDataSource = new MongoDBUserDataSource(mockDatabase);
    const result = await mongodbUserDataSource.updateById(id, dataToUpdate);

    expect(mockDatabase.updateOne).toHaveBeenCalledWith(
      { _id: id },
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
