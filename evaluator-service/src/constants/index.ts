// Message Queue : bullmq
export const SUBMISSION_QUEUE = "SubmissionQueue";
export const SUBMISSION_JOB = "Submission";

export const EVALUATION_QUEUE = "EvaluationQueue";
export const EVALUATION_JOB = "Evaluation";

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
