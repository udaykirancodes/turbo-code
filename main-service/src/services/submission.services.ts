import { v4 as uuidv4 } from "uuid";
import addJobToQueue from "../msg-queue/add-job";
import { ProblemRepository } from "../repositories";
import SubmissionRepository from "../repositories/submission.repository";
import { SubmissionReqBodyType } from "../types/submission.type";
import { EXECUTION_QUEUE_NAME } from "../utils/constants";

class SubmissionService {
  private submissionRepository: SubmissionRepository;
  constructor(submissionRepository: SubmissionRepository) {
    this.submissionRepository = submissionRepository;
  }
  private async getCode(userCode: string, problemId: string, language: string) {
    const problemResp = new ProblemRepository();
    const { codeStubs } = await problemResp.getProblem(problemId);
    const stub = codeStubs.find((c) => c.language === language);
    if (stub) {
      return `${stub.startSnippet}
              ${userCode}
              ${stub.endSnippet}`;
    }
    return "";
  }
  private async addSubmissionToQueue(data: SubmissionReqBodyType) {
    console.log("Adding Submission to Queue : WIP");
    const submissionId = uuidv4();
    const { userSnippet, ...rest } = data;
    const code: string = await this.getCode(
      data.userSnippet,
      data.problemId,
      data.language
    );
    const obj = {
      submissionId,
      code,
      ...rest,
    };
    await addJobToQueue(EXECUTION_QUEUE_NAME, obj);
    // TODO : get the problem related input output cases & codeStubs and add to the queue
  }
  async createSubmission(data: SubmissionReqBodyType) {
    if (data.type === "RUN") {
      // no need to store in the db
      this.addSubmissionToQueue(data);
      return {};
    } else {
      // store in the db
      const { type, ...others } = data;
      const submission = await this.submissionRepository.addSubmission(others);
      this.addSubmissionToQueue(data);
      return submission;
    }
  }
  async getSubmissionById(id: string) {
    const submission = await this.submissionRepository.getSubmissionById(id);
    return submission;
  }
}

export default SubmissionService;
