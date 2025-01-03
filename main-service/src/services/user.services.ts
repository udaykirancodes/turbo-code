import { BadRequestError, InternalServerError } from "../errors";
import UserRepository from "../repositories/user.repository";
import { CreateUserType } from "../types/user.type";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serverConfig } from "../config";
import { logger } from "../utils/logger";

class UserSerivice {
  private userRepo: UserRepository;

  constructor(ur: UserRepository) {
    this.userRepo = ur;
  }
  // Create a User
  async createUser(userData: CreateUserType): Promise<string> {
    logger.info("Inside user service");
    // Check if user exists
    let user = await this.userRepo.findByEmail(userData.email);
    if (user) {
      throw new BadRequestError("user already exists", {});
    }
    logger.info("user not found");
    // create salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    logger.info("user not found");
    // prepare the user
    const userDetails: CreateUserType = {
      email: userData.email,
      name: userData.name,
      password: hashedPassword,
    };

    logger.info("user creating");
    // insert into the database
    const newUser = await this.userRepo.createUser(userDetails);
    logger.info("user created ");
    // prepare jwt token

    const token = jwt.sign(newUser, serverConfig.JWT_SECRET);
    logger.info(token);
    if (!token) {
      throw new InternalServerError("Token not created", {});
    }

    return token;
  }
}

export default UserSerivice;
