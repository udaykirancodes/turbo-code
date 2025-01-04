import { db } from "../db";
import { files } from "../db/schema";
import { CreateFileType } from "../types/file.type";

class FileRepository {
  async createFile(file: CreateFileType) {
    try {
      const f = await db.insert(files).values(file).returning();
      return f[0];
    } catch (error) {
      throw new Error("error occured at file creation");
    }
  }
}

export default FileRepository;
