import bcryptjs from "bcryptjs";
import { FilterQuery } from "mongoose";
import { BadRequestError } from "../errors";
import User from "../models/user.model";
import { UserType } from "../types/user.type";

class UserRepository {
  async register(data: UserType) {
    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      throw new BadRequestError("email already taken", {});
    }
    // User Password Hash
    const { email, password } = data;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    return user;
  }
  async findOne(obj: FilterQuery<typeof User>) {
    const user = await User.findOne(obj);
    return user;
  }
}

export default UserRepository;
