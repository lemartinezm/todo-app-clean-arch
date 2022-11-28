import mongoose from "mongoose";
import server from "./server";
import { TodoRouter } from "./presentation/routers/todoRouter";
import { UserRouter } from "./presentation/routers/userRouter";
import { GetAllTodos } from "./domain/useCases/todos/getAllTodos";
import { TodoControllerImpl } from "./domain/controllers/todoController";
import { MongoDBTodoDataSource } from "./data/dataSource/mongodb/mongodbTodoDataSource";
import { Database } from "./data/interfaces/dataSources/database";
import { Todo } from "./data/dataSource/mongodb/models/todoModel";
import { CreateTodo } from "./domain/useCases/todos/createTodo";
import { DeleteTodo } from "./domain/useCases/todos/deleteTodo";
import { UpdateTodo } from "./domain/useCases/todos/updateTodo";

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

  server.use("/todo", todoMiddleware);
  server.listen(4000, () => {
    console.log("Running server on port 4000");
  });
})();
