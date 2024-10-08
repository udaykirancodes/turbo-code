import { EXECUTION_JOB_NAME } from "../constants";
import { SubmissionBodyRequest } from "../types/submission.type";
import createQueue from "./create-queue";
const addJobToQueue = async (
  queueName: string,
  payload: SubmissionBodyRequest
) => {
  const queue = createQueue(queueName);
  await queue.add(EXECUTION_JOB_NAME, payload);
};

export default addJobToQueue;
