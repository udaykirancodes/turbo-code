import { SubmissionQueueDataType } from "../types/submission.type";
import createQueue from "./create-queue";
const addJobToQueue = async (
  queueName: string,
  payload: SubmissionQueueDataType,
  jobName: string
) => {
  const queue = createQueue(queueName);
  await queue.add(jobName, payload);
};

export default addJobToQueue;
