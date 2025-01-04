import { BadRequestError, InternalServerError, NotFoundError } from "../errors";
import UserRepository from "../repositories/user.repository";
import {
  CreateUserType,
  LoginUserRequestType,
  SelectUserSchema,
} from "../types/user.type";

import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { serverConfig } from "../config";
import { logger } from "../utils/logger";

export interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  password: string;
  name: string;
}

class UserSerivice {
  private userRepo: UserRepository;

  constructor(ur: UserRepository) {
    this.userRepo = ur;
  }
  // Create a User
  async createUser(userData: CreateUserType): Promise<string> {
    logger.info("user-service");
    // Check if user exists
    let user = await this.getUserByEmail(userData.email);
    if (user) {
      throw new BadRequestError("user already exists", {});
    }
    const hashedPassword = await this.getHashedPassword(userData.password);

    // prepare the user
    const userDetails: CreateUserType = {
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
    };

    // insert into the database
    const newUser = await this.userRepo.createUser(userDetails);

    const token = await this.generateToken(newUser);
    return token;
  }
  // Login User
  async loginUser(userData: LoginUserRequestType) {
    logger.info("user-service");
    // check if user exists
    const user = await this.getUserByEmail(userData.email);
    if (!user) {
      throw new NotFoundError("user not found", {});
    }
    const token = await this.generateToken(user);
    return token;
  }

  async getUserById(id: number) {
    return this.userRepo.findById(id);
  }

  private async getUserByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }
  private async getHashedPassword(password: string) {
    // create salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  private async generateToken(user: SelectUserSchema) {
    // prepare jwt token
    const token = jwt.sign(user, serverConfig.JWT_SECRET, {
      expiresIn: "7 days",
    });
    logger.info(token);
    if (!token) {
      throw new InternalServerError("Token not created", {});
    }
    return token;
  }
}

export default UserSerivice;
