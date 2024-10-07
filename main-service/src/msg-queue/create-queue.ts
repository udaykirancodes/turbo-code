import { Queue } from "bullmq";
import redisConnection from "../config/redis.config";

const createQueue = (queueName: string) => {
  return new Queue(queueName, {
    connection: redisConnection,
  });
};

export default createQueue;
