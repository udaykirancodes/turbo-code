// Message Queue : bullmq
export const EXECUTION_QUEUE_NAME = "execution-queue";
export const SAMPLE_JOB_NAME = "sample-job";
export const EXECUTION_JOB_NAME = "execution-job";
// Docker : dockerode
export const DOCKER_STREAM_HEADER_SIZE = 8;

export const SUPPORTED_IMAGES = {
  NODE_IMAGE: "node:20-alpine",
  CPP_IMAGE: "gcc:latest",
};

export const ALLOWED_TIME = {
  CPP: 2 * 1000,
  NODE: 10 * 1000,
};
