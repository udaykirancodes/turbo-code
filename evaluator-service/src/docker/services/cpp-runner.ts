import { SUPPORTED_IMAGES } from "../../constants";
import { createContainer, decodeDockerStream } from "../index";
const cppRunner = async (code: string, input: string) => {
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

  const response = await new Promise((res) => {
    // when the log stream ends
    loggerStream.on("end", async () => {
      const completeBuffer = Buffer.concat(rawBuffer);
      // get the actual data from the buffer
      const decodedStream = decodeDockerStream(completeBuffer);
      // remove the created container from docker
      await container.remove();
      // send the response
      res(decodedStream);
    });
  });
  return response;
};
export default cppRunner;
