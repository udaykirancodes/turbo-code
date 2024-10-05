import Docker from "dockerode";
import { SUPPORTED_IMAGES } from "../constants";

const pullImage = async (imageName: string) => {
  const docker = new Docker();
  await new Promise((resolve, reject) => {
    docker.pull(
      SUPPORTED_IMAGES.NODE_IMAGE,
      (err: any, stream: NodeJS.ReadableStream) => {
        if (err) return reject(err);
        docker.modem.followProgress(stream, resolve);
      }
    );
  });
};

export default pullImage;
