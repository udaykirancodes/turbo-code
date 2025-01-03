import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { CreateUserType } from "../types/user.type";
import { logger } from "../utils/logger";

class UserRepository {
  // Create User
  async createUser(user: CreateUserType) {
    const newUser = await db.insert(users).values(user).returning();
    logger.info("NEW USER : done");
    return newUser[0];
  }
  // Find User By ID
  async findById(id: number) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, id),
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  // Find User By Email
  async findByEmail(email: string) {
    logger.info("inside repository");
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    logger.info("done querying");
    console.log(user);
    return user;
  }
}

export default UserRepository;
