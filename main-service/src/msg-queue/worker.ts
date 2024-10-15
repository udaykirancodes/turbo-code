import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import { EVALUATION_JOB, EVALUATION_QUEUE } from "../utils/constants";
import EvaluatedJob from "./job";

const myWorker = new Worker(
  EVALUATION_QUEUE,
  async (job: Job) => {
    if (job.name === EVALUATION_JOB) {
      const evaluatedJob = new EvaluatedJob(job.data);
      evaluatedJob.handle();
    }
  },
  {
    connection: redisConnection,
  }
);

export default myWorker;
