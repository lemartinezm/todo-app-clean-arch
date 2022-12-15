import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserDataSource } from "../../data/interfaces/dataSources/userDataSource";
import { User } from "../entities/user";
import { AuthController } from "../interfaces/controllers/authController";

dotenv.config();

export class AuthControllerImpl implements AuthController {
  userDataSource: UserDataSource;

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  async registerUser(user: User): Promise<boolean> {
    const result = await this.userDataSource.create(user);
    return result;
  }

  async loginUser(
    loginData: Pick<User, "email" | "password">
  ): Promise<string> {
    const userFound = await this.userDataSource.getOne(loginData);
    if (!userFound) throw new Error("Email or password is wrong");

    const SECRET_KEY = process.env.SECRET_KEY;
    if (!SECRET_KEY) throw new Error("Secret key is missing");

    const token = jwt.sign(
      {
        username: userFound.username,
        email: userFound.email,
      },
      SECRET_KEY
    );

    return token;
  }
}
