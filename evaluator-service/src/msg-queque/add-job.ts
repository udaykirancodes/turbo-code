import { SubmissionType } from "../types/submission.type";
import createQueue from "./create-queue";
const addJobToQueue = async (
  queueName: string,
  payload: SubmissionType,
  jobName: string
) => {
  const queue = createQueue(queueName);
  await queue.add(jobName, payload);
};

export default addJobToQueue;
