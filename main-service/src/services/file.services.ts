import slugify from "slugify";
import { BadRequestError, NotFoundError } from "../errors";
import FileRepository from "../repositories/file.repository";
import {
  CreateFileRequestType,
  UpdateFileRequestType,
} from "../types/file.type";
import { logger } from "../utils/logger";
class FileService {
  private fileRepo: FileRepository;
  constructor(fr: FileRepository) {
    this.fileRepo = fr;
  }
  // Create a File
  async createFile(file: CreateFileRequestType, userId: number) {
    // create slug
    const slug = this.sluggify(file.filename);

    // check
    const res = await this.checkIfFileExistsWithSlug(slug);

    if (res) throw new BadRequestError("same filename already exists", {});

    const newFile = await this.fileRepo.createFile({
      filename: file.filename,
      content: file.content || "",
      owner: userId,
      slug: slug,
    });
    return newFile;
  }
  async updateFile(
    file: UpdateFileRequestType,
    userId: number,
    fileId: number
  ) {
    logger.info("file-service : updated file");
    // get the file
    const f = await this.fileRepo.getFileByFileId(fileId);
    if (!f) {
      throw new NotFoundError("file not found", {});
    }
    const isAuthorized = f.owner === userId;
    if (!isAuthorized) {
      throw new BadRequestError("you are not allowed", {});
    }
    // check if user has access
    const newFile = await this.fileRepo.updateFile(file, fileId, userId);
    logger.info("file updated");
    return newFile;
  }
  async getUserFiles(userId: number) {
    // get the file
    const files = await this.fileRepo.getUserFilesByUserId(userId);
    return files;
  }
  async getAuthorizedFileById(userId: number, fileId: number) {
    const res = await this.fileRepo.getAuthorisedFileByFileId(userId, fileId);
    if (!res) {
      throw new BadRequestError("you are not allowed", {});
    }
    return res;
  }
  async getAuthorizedFileBySlug(userId: number, slug: string) {
    const res = await this.fileRepo.getAuthorisedFileBySlug(userId, slug);
    if (!res) {
      throw new BadRequestError("you are not allowed", {});
    }
    return res;
  }
  private async checkIfFileExistsWithSlug(slug: string): Promise<boolean> {
    try {
      const res = await this.fileRepo.getFileBySlug(slug);
      if (res) return true;
      return false;
    } catch (error) {
      return false;
    }
  }
  private sluggify(str: string): string {
    return slugify(str, {
      trim: true,
      lower: true,
    });
  }
}
export default FileService;
