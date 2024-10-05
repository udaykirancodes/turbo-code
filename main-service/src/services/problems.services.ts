import { ProblemRepository } from "../repositories";
import { ProblemType } from "../types/problem.type";
import sanitizeMarkdownContent from "../utils/markdown-sanitizer";

class ProblemService {
  private problemRepository: ProblemRepository;
  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
  }
  // get all problems
  async getProblems() {
    const problems = await this.problemRepository.getProblems();
    return problems;
  }
  // create problem
  async createProblem(problemdata: ProblemType) {
    problemdata.description = sanitizeMarkdownContent(problemdata.description);
    const problem = await this.problemRepository.createProblem(problemdata);
    return problem;
  }
  // get problem
  async getProblem(id: string) {
    const problem = await this.problemRepository.getProblem(id);
    return problem;
  }
  // delete problem
  async deleteProblem(id: string) {
    const problem = await this.problemRepository.deleteProblem(id);
    return problem;
  }
  // edit problem
  async editProblem(id: string, data: Partial<ProblemType>) {
    // sanitize the markdown
    if (data.description) {
      data.description = sanitizeMarkdownContent(data.description);
    }
    const problem = await this.problemRepository.editProblem(id, data);
    return problem;
  }
}

export default ProblemService;
