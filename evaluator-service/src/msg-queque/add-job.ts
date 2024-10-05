import { EXECUTION_JOB_NAME, EXECUTION_QUEUE_NAME } from "../constants";
import createQueue from "./create-queue";

const addJobToQueue = async (payload: Record<string, unknown>) => {
  const queue = createQueue(EXECUTION_QUEUE_NAME);
  await queue.add(EXECUTION_JOB_NAME, payload);
};

export default addJobToQueue;
