import Docker from "dockerode";

const createContainer = async (image: string, cmdExecutable: string[]) => {
  const docker = new Docker();
  const container = await docker.createContainer({
    Image: image,
    Cmd: cmdExecutable,
    AttachStdin: true, // to enable input streams
    AttachStdout: true, // to enable output streams
    AttachStderr: true, // to enable error streams
    Tty: false,
    // memory limit
    HostConfig: {
      Memory: 1024 * 1024 * 1024, // 2GB
    },
    OpenStdin: true, // keep the input stream open even no interaction is there
  });
  return container;
};

export default createContainer;
