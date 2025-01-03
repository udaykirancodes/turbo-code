import { db } from "../db";
import { users } from "../db/schema";
import { CreateUserType } from "../types/user.type";

class UserRepository {
  // Create User
  async createUser(user: CreateUserType): CreateUserType {
    const newUser = await db.insert(users).values(user).returning();
    return newUser;
  }
  // Find User By ID
  async findById(id: number) {
    try {
      const user = await db.query.users.findFirst({ with: { id: id } });
      return user;
    } catch (error) {
      throw error;
    }
  }
  // Find User By Email
  async findByEmail(email: string) {
    const user = await db.query.users.findFirst({ with: { email: email } });
    return user;
  }
}

export default UserRepository;
