import slugify from "slugify";
import { BadRequestError, NotFoundError } from "../errors";
import FileRepository from "../repositories/file.repository";
import {
  CreateFileRequestType,
  UpdateFileRequestType,
} from "../types/file.type";
class FileService {
  private fileRepo: FileRepository;
  constructor(fr: FileRepository) {
    this.fileRepo = fr;
  }
  // Create a File
  async createFile(file: CreateFileRequestType, userId: number) {
    // create slug
    const slug = this.sluggify(file.filename);
    // TODO :  check if already slug found
    const newFile = await this.fileRepo.createFile({
      filename: file.filename,
      content: "",
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
    // get the file
    const f = await this.fileRepo.getFileByFileId(fileId);
    if (!f) {
      throw new NotFoundError("file not found", {});
    }
    const res = await this.fileRepo.getAuthorisedFileByFileId(userId, fileId);
    if (!res) {
      throw new BadRequestError("you are not allowed", {});
    }
    // check if user has access
    const newFile = await this.fileRepo.updateFile(file, fileId);
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
  private sluggify(str: string): string {
    return slugify(str, {
      trim: true,
      lower: true,
    });
  }
}
export default FileService;
