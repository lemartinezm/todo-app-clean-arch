import { MongoDBTeamDataSource } from "../../../src/data/dataSource/mongodb/mongodbTeamDataSource";
import { Database } from "../../../src/data/interfaces/dataSources/database";
import { Team } from "../../../src/domain/entities/team";

describe("MongoDB team data source", () => {
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

  test("TeamDataSource should be defined", () => {
    expect(MongoDBTeamDataSource).toBeDefined();
  });

  test("Get all should return data", async () => {
    const ExpectedResult: Team[] = [
      {
        id: "1a1a1a",
        name: "My team",
        leader: "a1a1a1",
        participants: ["a1a1a"],
        todos: ["a1a1a1"],
      },
    ];

    jest
      .spyOn(mockDatabase, "find")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const mongodbTeamDataSource = new MongoDBTeamDataSource(mockDatabase);
    const result = await mongodbTeamDataSource.getAll();

    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toStrictEqual(ExpectedResult);
  });

  test("Get by id should return data", async () => {
    const id = "1a1a1a";
    const ExpectedResult: Team = {
      id: "1a1a1a",
      name: "My team",
      leader: "a1a1a1",
      participants: ["a1a1a"],
      todos: ["a1a1a1"],
    };

    jest
      .spyOn(mockDatabase, "findOne")
      .mockImplementation(() => Promise.resolve(ExpectedResult));

    const mongodbTeamDataSource = new MongoDBTeamDataSource(mockDatabase);
    const result = await mongodbTeamDataSource.getById(id);

    expect(mockDatabase.findOne).toHaveBeenCalledWith({ _id: id });
    expect(result).toStrictEqual(ExpectedResult);
  });

  test("Create should return true", async () => {
    const InputData: Team = {
      id: "1a1a1a",
      name: "My team",
      leader: "a1a1a1",
      participants: ["a1a1a"],
      todos: ["a1a1a1"],
    };

    jest
      .spyOn(mockDatabase, "insertOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbTeamDataSource = new MongoDBTeamDataSource(mockDatabase);
    const result = await mongodbTeamDataSource.create(InputData);

    expect(mockDatabase.insertOne).toHaveBeenCalledWith(InputData);
    expect(result).toBe(true);
  });

  test("Delete by id should return true", async () => {
    const id = "1a1a1a";

    jest
      .spyOn(mockDatabase, "deleteOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbTeamDataSource = new MongoDBTeamDataSource(mockDatabase);
    const result = await mongodbTeamDataSource.deleteById(id);

    expect(mockDatabase.deleteOne).toHaveBeenCalledWith({ _id: id });
    expect(result).toBe(true);
  });

  test("Update by id should return true", async () => {
    const id = "1a1a1a";
    const dataToUpdate: Partial<Team> = {
      name: "my new name",
    };

    jest
      .spyOn(mockDatabase, "updateOne")
      .mockImplementation(() => Promise.resolve(true));

    const mongodbTeamDataSource = new MongoDBTeamDataSource(mockDatabase);
    const result = await mongodbTeamDataSource.updateById(id, dataToUpdate);

    expect(mockDatabase.updateOne).toHaveBeenCalledWith(
      { _id: id },
      dataToUpdate
    );
    expect(result).toBe(true);
  });
});
