import addJobToQueue from "../msg-queue/add-job";
import { ProblemRepository } from "../repositories";
import SubmissionRepository from "../repositories/submission.repository";
import {
  SubmissionQueueDataType,
  SubmissionReqBodyType,
} from "../types/submission.type";
import { EXECUTION_QUEUE_NAME } from "../utils/constants";

const problemRespository = new ProblemRepository();
class SubmissionService {
  private submissionRepository: SubmissionRepository;
  constructor(submissionRepository: SubmissionRepository) {
    this.submissionRepository = submissionRepository;
  }
  private async getCodeAndTestCases(
    userCode: string,
    problemId: string,
    language: string
  ) {
    const problem = await problemRespository.getProblem(problemId);
    const stub = problem.codeStubs.find((c) => c.language === language);
    if (stub) {
      return {
        code: `${stub.startSnippet}
              ${userCode}
              ${stub.endSnippet}`,
        testCases: problem.testCases,
      };
    }
    return { code: userCode, testCases: { input: "", output: "" } };
  }
  private async addSubmissionToQueue(data: SubmissionQueueDataType) {
    console.log("Adding Submission to Queue : WIP");
    const { code, testCases } = await this.getCodeAndTestCases(
      data.code,
      data.problemId,
      data.language
    );
    data.code = code;
    data.input = testCases?.input || "";
    data.output = testCases?.output || "";
    await addJobToQueue(EXECUTION_QUEUE_NAME, data);
  }
  async createSubmission(data: SubmissionReqBodyType) {
    const { userSnippet, ...rest } = data;

    const object: SubmissionQueueDataType = {
      code: userSnippet,
      status: "PENDING",
      ...rest,
      input: "",
      output: "",
    };
    if (data.type === "RUN") {
      // no need to store in the db
      this.addSubmissionToQueue(object);
      return {};
    } else {
      // store in the db
      const submission = await this.submissionRepository.addSubmission(data);
      this.addSubmissionToQueue(object);
      return submission;
    }
  }
  async getSubmissionById(id: string) {
    const submission = await this.submissionRepository.getSubmissionById(id);
    return submission;
  }
}

export default SubmissionService;
