import mongoose from "mongoose";
import server from "./server";

import { TodoRouter } from "./presentation/routers/todoRouter";
import { UserRouter } from "./presentation/routers/userRouter";
import { TeamRouter } from "./presentation/routers/teamRouter";

import { TodoControllerImpl } from "./domain/controllers/todoController";
import { UserControllerImpl } from "./domain/controllers/userController";
import { TeamControllerImpl } from "./domain/controllers/teamController";
import { MongoDBTodoDataSource } from "./data/dataSource/mongodb/mongodbTodoDataSource";
import { MongoDBUserDataSource } from "./data/dataSource/mongodb/mongodbUserDataSource";
import { MongoDBTeamDataSource } from "./data/dataSource/mongodb/mongodbTeamDataSource";

import { Database } from "./data/interfaces/dataSources/database";

import { Todo } from "./data/dataSource/mongodb/models/todoModel";
import { GetAllTodos } from "./domain/useCases/todos/getAllTodos";
import { CreateTodo } from "./domain/useCases/todos/createTodo";
import { DeleteTodo } from "./domain/useCases/todos/deleteTodo";
import { UpdateTodo } from "./domain/useCases/todos/updateTodo";

import { User } from "./data/dataSource/mongodb/models/userModel";
import { GetAllUsers } from "./domain/useCases/users/getAllUsers";
import { CreateUser } from "./domain/useCases/users/createUser";
import { DeleteUser } from "./domain/useCases/users/deleteUser";
import { UpdateUser } from "./domain/useCases/users/updateUser";

import { Team } from "./data/dataSource/mongodb/models/teamModel";
import { GetAllTeams } from "./domain/useCases/teams/getAllTeams";
import { GetTeamById } from "./domain/useCases/teams/getTeamById";
import { CreateTeam } from "./domain/useCases/teams/createTeam";
import { DeleteTeam } from "./domain/useCases/teams/deleteTeam";
import { UpdateTeam } from "./domain/useCases/teams/updateTeam";

(async () => {
  await mongoose.connect("mongodb://localhost:27017/todoapp");

  const todoDatabase: Database = {
    find: async (query) => await Todo.find(query),
    findOne: async (query) => await Todo.findOne(query),
    insertOne: async (query) => await Todo.create(query),
    deleteOne: async (query) => await Todo.deleteOne(query),
    updateOne: async (query, dataToUpdate) =>
      await Todo.updateOne(query, dataToUpdate),
  };

  const userDatabase: Database = {
    find: async (query) => await User.find(query),
    findOne: async (query) => await User.findOne(query),
    insertOne: async (query) => await User.create(query),
    deleteOne: async (query) => await User.deleteOne(query),
    updateOne: async (query, dataToUpdate) =>
      await User.updateOne(query, dataToUpdate),
  };

  const teamDatabase: Database = {
    find: async (query) =>
      await Team.find(query).populate(["leader", "participants", "todos"]),
    findOne: async (query) => await Team.findOne(query),
    insertOne: async (query) => await Team.create(query),
    deleteOne: async (query) => await Team.deleteOne(query),
    updateOne: async (query, dataToUpdate) =>
      await Team.updateOne(query, dataToUpdate),
  };

  const todoMiddleware = TodoRouter(
    new GetAllTodos(
      new TodoControllerImpl(new MongoDBTodoDataSource(todoDatabase))
    ),
    new CreateTodo(
      new TodoControllerImpl(new MongoDBTodoDataSource(todoDatabase))
    ),
    new DeleteTodo(
      new TodoControllerImpl(new MongoDBTodoDataSource(todoDatabase))
    ),
    new UpdateTodo(
      new TodoControllerImpl(new MongoDBTodoDataSource(todoDatabase))
    )
  );

  const userMiddleware = UserRouter(
    new GetAllUsers(
      new UserControllerImpl(new MongoDBUserDataSource(userDatabase))
    ),
    new CreateUser(
      new UserControllerImpl(new MongoDBUserDataSource(userDatabase))
    ),
    new DeleteUser(
      new UserControllerImpl(new MongoDBUserDataSource(userDatabase))
    ),
    new UpdateUser(
      new UserControllerImpl(new MongoDBUserDataSource(userDatabase))
    )
  );

  const teamMiddleware = TeamRouter(
    new GetAllTeams(
      new TeamControllerImpl(new MongoDBTeamDataSource(teamDatabase))
    ),
    new GetTeamById(
      new TeamControllerImpl(new MongoDBTeamDataSource(teamDatabase))
    ),
    new CreateTeam(
      new TeamControllerImpl(new MongoDBTeamDataSource(teamDatabase))
    ),
    new DeleteTeam(
      new TeamControllerImpl(new MongoDBTeamDataSource(teamDatabase))
    ),
    new UpdateTeam(
      new TeamControllerImpl(new MongoDBTeamDataSource(teamDatabase))
    )
  );

  server.use("/todo", todoMiddleware);
  server.use("/user", userMiddleware);
  server.use("/team", teamMiddleware);
  server.listen(4000, () => {
    console.log("Running server on port 4000");
  });
})();
