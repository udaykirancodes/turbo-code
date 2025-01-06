import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { files } from "../db/schema";
import { CreateFileType, UpdateFileRequestType } from "../types/file.type";

class FileRepository {
  async createFile(file: CreateFileType) {
    try {
      const res = await db.insert(files).values(file).returning();
      return res[0];
    } catch (error) {
      throw new Error("error occured at file creation");
    }
  }
  async updateFile(file: UpdateFileRequestType, id: number) {
    try {
      const res = await db
        .update(files)
        .set(file)
        .where(eq(files.id, id))
        .returning();
      return res[0];
    } catch (error) {
      throw new Error("error occured at file creation");
    }
  }
  async getFileByFileId(id: number) {
    try {
      const res = await db.query.files.findFirst({
        where: eq(files.id, id),
      });
      return res;
    } catch (error) {
      throw new Error("error occured at file creation");
    }
  }
  async getAuthorisedFileByFileId(userId: number, id: number) {
    try {
      const res = await db.query.files.findFirst({
        where: and(eq(files.id, id), eq(files.owner, userId)),
      });
      return res;
    } catch (error) {
      throw new Error("error occured at file creation");
    }
  }
}

export default FileRepository;
