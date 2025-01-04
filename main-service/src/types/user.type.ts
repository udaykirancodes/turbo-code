import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../db/schema/user.schema";

export const createUserSchema = createInsertSchema(users);
export type CreateUserType = z.infer<typeof createUserSchema>;

export const selectUserSchema = createSelectSchema(users);
export type SelectUserSchema = z.infer<typeof selectUserSchema>;

export const loginUserRequest = selectUserSchema.omit({ id: true, name: true });
export type LoginUserRequestType = z.infer<typeof loginUserRequest>;
