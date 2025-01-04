import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { files } from "../db/schema";

export const createFileSchema = createInsertSchema(files);
export type CreateFileType = z.infer<typeof createFileSchema>;

export const createFileRequestSchema = createFileSchema.omit({
  slug: true,
  owner: true,
});
export type CreateFileRequestType = z.infer<typeof createFileRequestSchema>;

export const selectFileSchema = createSelectSchema(files);
export type SelectFileSchemaType = z.infer<typeof selectFileSchema>;
