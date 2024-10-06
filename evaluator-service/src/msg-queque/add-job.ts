import { SubmissionBodyRequest } from "../types/submission.type";
import createQueue from "./create-queue";
const addJobToQueue = async (
  queueName: string,
  payload: SubmissionBodyRequest
) => {
  const queue = createQueue(queueName);
  await queue.add(queueName, payload);
};

export default addJobToQueue;
