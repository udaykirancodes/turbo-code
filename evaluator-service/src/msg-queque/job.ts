import cppRunner from "../docker/services/cpp-runner";
import { SubmissionBodyRequest } from "../types/submission.type";
import logger from "../utils/logger";

class ExecutionJob {
  data: SubmissionBodyRequest;
  constructor(data: SubmissionBodyRequest) {
    this.data = data;
  }
  handle = async () => {
    if (this.data.language === "CPP") {
      const res = await cppRunner(
        this.data.code,
        this.data.input,
        this.data.output || ""
      );
      logger.info("Result of CPP : ", { result: res });
    }
  };
  failed = () => {};
}
export default ExecutionJob;
