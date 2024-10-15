import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import { COMPLETED_JOB_NAME, COMPLETED_QUEUE_NAME } from "../utils/constants";
import EvaluatedJob from "./job";

const myWorker = new Worker(
  COMPLETED_QUEUE_NAME,
  async (job: Job) => {
    if (job.name === COMPLETED_JOB_NAME) {
      const evaluatedJob = new EvaluatedJob(job.data);
      evaluatedJob.handle();
    }
  },
  {
    connection: redisConnection,
  }
);

export default myWorker;
