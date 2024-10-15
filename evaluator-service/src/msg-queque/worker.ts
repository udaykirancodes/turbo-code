import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import { SUBMISSION_JOB, SUBMISSION_QUEUE } from "../constants";
import ExecutionJob from "./job";

const myWorker = new Worker(
  SUBMISSION_QUEUE,
  async (job: Job) => {
    if (job.name === SUBMISSION_JOB) {
      const executionJob = new ExecutionJob(job.data);
      executionJob.handle();
    }
  },
  {
    connection: redisConnection,
  }
);

export default myWorker;
