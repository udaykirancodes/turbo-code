import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { files } from "../db/schema";
import { NotFoundError } from "../errors";
import { CreateFileType, UpdateFileRequestType } from "../types/file.type";

class FileRepository {
  async createFile(file: CreateFileType) {
    try {
      const res = await db.insert(files).values(file).returning();
      return res[0];
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
  async getFileByFileId(id: number) {
    try {
      const res = await db.query.files.findFirst({
        where: eq(files.id, id),
      });
      if (!res) {
        throw new NotFoundError("File not found", {});
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getAuthorisedFileByFileId(userId: number, id: number) {
    try {
      const res = await db.query.files.findFirst({
        where: and(eq(files.id, id), eq(files.owner, userId)),
      });
      if (!res) {
        throw new NotFoundError("File not found", {});
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getUserFilesByUserId(userId: number) {
    try {
      const res = await db.query.files.findMany({
        where: and(eq(files.owner, userId)),
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export default FileRepository;
