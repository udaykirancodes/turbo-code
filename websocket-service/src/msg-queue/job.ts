import { SubmissionType } from "../types/submission";

class NotifyJob {
  data: SubmissionType;
  constructor(data: SubmissionType) {
    this.data = data;
  }
  handle = async () => {
    console.log("Socket Server Data : ", this.data);
  };
  failed = () => {};
}
export default NotifyJob;
