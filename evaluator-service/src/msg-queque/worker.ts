import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import { EXECUTION_JOB_NAME, EXECUTION_QUEUE_NAME } from "../constants";

const myWorker = new Worker(
  EXECUTION_QUEUE_NAME,
  async (job: Job) => {
    if (job.name === EXECUTION_JOB_NAME) {
      console.log(job.data);
      // Here is the output
    }
  },
  {
    connection: redisConnection,
  }
);

export default myWorker;
