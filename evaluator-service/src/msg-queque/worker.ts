import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import { EXECUTION_JOB_NAME, EXECUTION_QUEUE_NAME } from "../constants";
import ExecutionJob from "./job";

const myWorker = new Worker(
  EXECUTION_QUEUE_NAME,
  async (job: Job) => {
    if (job.name === EXECUTION_JOB_NAME) {
      const executionJob = new ExecutionJob(job.data);
      executionJob.handle();
    }
  },
  {
    connection: redisConnection,
  }
);

export default myWorker;
