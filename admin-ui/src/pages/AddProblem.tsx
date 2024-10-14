import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const problemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  testCase: z.object({
    input: z.string().min(1, "Input is required"),
    output: z.string().min(1, "Output is required"),
  }),
  codeStubs: z
    .array(
      z.object({
        language: z.enum(["CPP", "PYTHON"]),
        startSnippet: z.string().optional(),
        userSnippet: z.string().min(1, "User snippet is required"),
        endSnippet: z.string().optional(),
      })
    )
    .min(1, "At least one code stub is required"),
  editorial: z.string().optional(),
});

type ProblemFormValues = z.infer<typeof problemSchema>;

const AddProblemForm = () => {
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<ProblemFormValues>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "easy",
      testCase: { input: "", output: "" },
      codeStubs: [
        { language: "CPP", startSnippet: "", userSnippet: "", endSnippet: "" },
      ],
      editorial: "",
    },
  });

  const {
    fields: codeStubFields,
    append: appendCodeStub,
    remove: removeCodeStub,
  } = useFieldArray({
    control: form.control,
    name: "codeStubs",
  });

  const onSubmit = (data: ProblemFormValues) => {
    console.log(data);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="testCase">Test Case</TabsTrigger>
                <TabsTrigger value="codeStubs">Code Stubs</TabsTrigger>
                <TabsTrigger value="editorial">Editorial</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter problem title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter problem description"
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="testCase" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="testCase.input"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Input</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter test case input"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="testCase.output"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Output</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter expected output"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="codeStubs" className="space-y-4 mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  {codeStubFields.map((field, index) => (
                    <Card key={field.id} className="p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <FormField
                          control={form.control}
                          name={`codeStubs.${index}.language`}
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="CPP">C++</SelectItem>
                                  <SelectItem value="PYTHON">Python</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCodeStub(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`codeStubs.${index}.startSnippet`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Snippet</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter start snippet (optional)"
                                className="font-mono"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`codeStubs.${index}.userSnippet`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>User Snippet</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter user snippet"
                                className="font-mono"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`codeStubs.${index}.endSnippet`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Snippet</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter end snippet (optional)"
                                className="font-mono"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Card>
                  ))}
                </ScrollArea>
                <Button
                  type="button"
                  onClick={() =>
                    appendCodeStub({
                      language: "CPP",
                      startSnippet: "",
                      userSnippet: "",
                      endSnippet: "",
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Code Stub
                </Button>
              </TabsContent>
              <TabsContent value="editorial" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="editorial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Editorial</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter editorial (optional)"
                          className="h-64"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit">Submit Problem</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddProblemForm;
