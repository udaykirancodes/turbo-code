import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "password is required"),
});

type UserType = z.infer<typeof UserSchema>;

export { UserSchema, UserType };
