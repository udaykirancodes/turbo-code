import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
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

export const updateFileSchema = createUpdateSchema(files);
export type UpdateFileRequestType = z.infer<typeof updateFileSchema>;

export const slugSchema = z.object({
  slug: z.string().min(1, { message: "slug should not be empty" }),
});
export const idSchema = z.object({
  id: z.coerce.number().min(1, { message: "Id should not be empty" }),
});
