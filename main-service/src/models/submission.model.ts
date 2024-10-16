import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    problemId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      requried: true,
    },
    userSnippet: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["CPP", "PYTHON"],
      required: true,
    },
    id: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "WA", "TLE", "MLE", "SUCCESS"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Submissions = mongoose.model("submissions", SubmissionSchema);

export default Submissions;
