import { pino } from "pino";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          ignore: "pid,hostname",
        },
      },
      {
        target: "pino/file",
        options: { destination: "logs/combined.log" },
      },
    ],
  },
});

export { logger };
