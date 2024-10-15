import { ALLOWED_TIME, SUPPORTED_IMAGES } from "../../constants";
import { ExecutionResultType } from "../../types/execution.type";
import { getExecutionResult } from "../helper";
import { createContainer } from "../index";
const cppRunner = async (
  code: string,
  input: string,
  output: string
): Promise<ExecutionResultType> => {
  // create a raw buffer
  const rawBuffer: Buffer[] = [];
  // here comes the executable cmd
  const runCommand = `echo '${code.replace(
    /'/g,
    `'\\"`
  )}' > main.cpp && g++ main.cpp -o main && echo '${input.replace(
    /'/g,
    `'\\"`
  )}' | ./main`;
  const cmd: string[] = ["/bin/sh", "-c", runCommand];
  // create a container
  const container = await createContainer(SUPPORTED_IMAGES.CPP_IMAGE, cmd);
  // start the container
  await container.start();
  // get the log stream from the container
  const loggerStream = await container.logs({
    stdout: true,
    stderr: true,
    follow: true, // Stream logs in real-time
  });
  // when there is some data, add it to the rawBuffer
  loggerStream.on("data", (chunk: Buffer) => {
    rawBuffer.push(chunk);
  });

  loggerStream.on("error", (err: Error) => {
    console.error("Error while streaming logs:", err);
  });
  const res = await getExecutionResult(
    loggerStream,
    container,
    rawBuffer,
    ALLOWED_TIME.CPP,
    output
  );
  return res;
};
export default cppRunner;
