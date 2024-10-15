import { Job, Worker } from "bullmq";
import redisConnection from "../config/redis.config";
import { NOTIFY_JOB, NOTIFY_QUEUE } from "../utils/constants";
import NotifyJob from "./job";
const myWorker = new Worker(
  NOTIFY_QUEUE,
  async (job: Job) => {
    if (job.name === NOTIFY_JOB) {
      const notify = new NotifyJob(job.data);
      notify.handle();
    }
  },
  {
    connection: redisConnection,
  }
);

export default myWorker;
