import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Pencil, Plus } from "lucide-react";

// Mock data for demonstration
const problems = [
  { id: 1, title: "Two Sum", difficulty: "easy" },
  { id: 2, title: "Reverse Linked List", difficulty: "medium" },
  { id: 3, title: "Binary Tree Inorder Traversal", difficulty: "medium" },
  { id: 4, title: "Merge k Sorted Lists", difficulty: "hard" },
  // Add more mock problems as needed
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "bg-green-500";
    case "medium":
      return "bg-yellow-500";
    case "hard":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const AdminProblemListPage = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Problem List</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Problem
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {problems.map((problem) => (
          <Card key={problem.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {problem.title}
                  </h2>
                  <Badge
                    className={`${getDifficultyColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminProblemListPage;
