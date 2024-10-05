import { Job } from "bullmq";

class ExecutionJob {
  name: string;
  payload: Record<string, any>;
  constructor(name: string, payload: Record<string, any>) {
    this.payload = payload;
    this.name = name;
  }
  handle = (job?: Job) => {
    if (job) {
      console.log(job.id);
    }
  };
  failed = (job: Job) => {
    if (job) {
      console.log(job?.id);
    }
  };
}
export default ExecutionJob;
