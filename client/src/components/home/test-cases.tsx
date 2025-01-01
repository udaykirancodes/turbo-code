"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
} from "lucide-react";
import { useState } from "react";

export default function Testcases() {
  const [testCases, setTestCases] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [actualOutput, setActualOutput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleRunCode = () => {
    setActualOutput("Code execution result would appear here.");
  };

  const handleSubmitCode = () => {
    alert("Code submitted successfully!");
  };

  return (
    <Card className="fixed bottom-0  right-0 shadow-lg">
      <CardContent className="p-0">
        <div className="max-w-4xl mx-auto flex flex-col">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="testcases">Test Cases</Label>
                    <Textarea
                      id="testcases"
                      placeholder="Enter your test cases here..."
                      value={testCases}
                      onChange={(e) => setTestCases(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expected-output">Expected Output</Label>
                    <Textarea
                      id="expected-output"
                      placeholder="Enter the expected output here..."
                      value={expectedOutput}
                      onChange={(e) => setExpectedOutput(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actual-output">Actual Output</Label>
                    <Textarea
                      id="actual-output"
                      placeholder="The output of your code will appear here..."
                      value={actualOutput}
                      readOnly
                      className="min-h-[100px] resize-none bg-muted"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center px-4 py-2 border-t">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="text-sm font-medium"
            >
              {isOpen ? (
                <ChevronDownIcon className="w-4 h-4 mr-2" />
              ) : (
                <ChevronUpIcon className="w-4 h-4 mr-2" />
              )}
              {isOpen ? "Hide" : "Show"} Testcases
            </Button>
            <div className="flex space-x-2">
              <Button onClick={handleRunCode} size="sm" variant="outline">
                <PlayIcon className="w-4 h-4 mr-2" />
                Run Code
              </Button>
              <Button onClick={handleSubmitCode} size="sm">
                <CheckIcon className="w-4 h-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
