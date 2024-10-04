import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    requried: [true, "Description is required"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
  testCases: [
    {
      input: {
        type: Array,
        required: true,
      },
      output: {
        type: Array,
        required: true,
      },
    },
  ],
  editorial: {
    type: String,
  },
});

const Problems = mongoose.model("problems", ProblemSchema);

export default Problems;
