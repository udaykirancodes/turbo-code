import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ADD_PROBLEM_URL } from "@/url";
import axios from "axios";
import { Eye, Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(ADD_PROBLEM_URL);
      if (data.success) {
        setProblems(data.data);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Problem List</h1>
        <Link to={"/add-problem"}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Problem
          </Button>
        </Link>
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
