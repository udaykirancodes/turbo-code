import slugify from "slugify";
import FileRepository from "../repositories/file.repository";
import { CreateFileRequestType } from "../types/file.type";
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
  private sluggify(str: string): string {
    return slugify(str, {
      trim: true,
      lower: true,
    });
  }
}
export default FileService;
