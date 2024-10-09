import { SUPPORTED_IMAGES } from "../../constants";
import logger from "../../utils/logger";
import { createContainer, decodeDockerStream } from "../index";
const nodeRunner = async (code: string) => {
  // create a raw buffer
  const rawBuffer: Buffer[] = [];
  // here comes the executable cmd
  const cmd: string[] = ["node", "-e", code];
  // create a container
  const container = await createContainer(SUPPORTED_IMAGES.NODE_IMAGE, cmd);
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
    logger.error("Error while streaming logs:", { error: err });
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
export default nodeRunner;
