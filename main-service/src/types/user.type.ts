import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { usersTable } from "../db/schema/user.schema";

export const createUserSchema = createInsertSchema(usersTable);
export type CreateUserType = z.infer<typeof createUserSchema>;
