import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { files } from "../db/schema";
import { NotFoundError } from "../errors";
import { CreateFileType, UpdateFileRequestType } from "../types/file.type";
import { logger } from "../utils/logger";

class FileRepository {
  async createFile(file: CreateFileType) {
    logger.info("file repo : create file");
    try {
      const res = await db.insert(files).values(file).returning();
      if (res.length === 0) throw new NotFoundError("File not found", {});
      return res[0];
    } catch (error) {
      throw error;
    }
  }
  async updateFile(file: UpdateFileRequestType, id: number, userId: number) {
    try {
      logger.info(`file repo : update file id : ${id}`);
      file.updatedAt = new Date();
      const res = await db
        .update(files)
        .set(file)
        .where(and(eq(files.id, id), eq(files.owner, userId)))
        .returning();
      if (res.length === 0) {
        throw new NotFoundError("File not found", { from: "repository" });
      }
      return res[0];
    } catch (error) {
      throw error;
    }
  }
  async getFileByFileId(id: number) {
    logger.info("file repo : get file by id");
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
  async getAuthorisedFileBySlug(userId: number, slug: string) {
    try {
      const res = await db.query.files.findFirst({
        where: and(eq(files.slug, slug), eq(files.owner, userId)),
      });
      if (!res) {
        throw new NotFoundError("File not found", {});
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getFileBySlug(slug: string) {
    try {
      const res = await db.query.files.findFirst({
        where: eq(files.slug, slug),
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
