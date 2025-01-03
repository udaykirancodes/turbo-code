import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../db/schema/user.schema";

export const createUserSchema = createInsertSchema(users);
export type CreateUserType = z.infer<typeof createUserSchema>;
