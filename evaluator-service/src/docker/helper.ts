import Dockerode from "dockerode";
import { DOCKER_STREAM_HEADER_SIZE } from "../constants";
import { ExecutionResultType } from "../types/execution.type";
import { DockerStreamOutput } from "./types";

export function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  let offset = 0; // This variable keeps track of the current position in the buffer while parsing

  // The output that will store the accumulated stdout and stderr output as strings
  const output: DockerStreamOutput = { stdout: "", stderr: "" };

  // Loop until offset reaches end of the buffer
  while (offset < buffer.length) {
    // channel is read from buffer and has value of type of stream
    const typeOfStream = buffer[offset];

    // This length variable hold the length of the value
    // We will read this variable on an offset of 4 bytes from the start of the chunk
    const length = buffer.readUint32BE(offset + 4);

    // as now we have read the header, we can move forward to the value of the chunk
    offset += DOCKER_STREAM_HEADER_SIZE;

    if (typeOfStream === 1) {
      // stdout stream
      output.stdout += buffer.toString("utf-8", offset, offset + length);
    } else if (typeOfStream === 2) {
      // stderr stream
      output.stderr += buffer.toString("utf-8", offset, offset + length);
    }

    offset += length; // move offset to next chunk
  }

  return output;
}

export const getExecutionResult = async (
  loggerStream: NodeJS.ReadableStream,
  container: Dockerode.Container,
  rawBuffer: Buffer[],
  allowedTime: number,
  output: string
): Promise<ExecutionResultType> => {
  return new Promise((res, rej) => {
    const timeout = setTimeout(() => {
      container.kill();
      res({ output: "", status: "TLE" });
    }, allowedTime);
    // when the log stream ends
    loggerStream.on("end", async () => {
      clearTimeout(timeout);
      const completeBuffer = Buffer.concat(rawBuffer);
      // get the actual data from the buffer
      const decodedStream = decodeDockerStream(completeBuffer);
      // remove the created container from docker
      await container.remove();

      // send the response
      if (decodedStream.stderr) {
        res({ output: decodedStream.stderr, status: "ERROR" });
      } else {
        if (decodedStream.stdout.trim() === output.trim()) {
          res({ output: decodedStream.stdout.trim(), status: "SUCCESS" });
        } else {
          res({ output: decodedStream.stdout.trim(), status: "WA" });
        }
      }
    });
  });
};
