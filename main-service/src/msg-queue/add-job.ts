import { SubmissionReqBodyType } from "../types/submission.type";
import { EXECUTION_JOB_NAME } from "../utils/constants";
import createQueue from "./create-queue";
const addJobToQueue = async (
  queueName: string,
  payload: Partial<SubmissionReqBodyType> & {
    submissionId: string;
    code: string;
  }
) => {
  const queue = createQueue(queueName);
  await queue.add(EXECUTION_JOB_NAME, payload);
};

export default addJobToQueue;
