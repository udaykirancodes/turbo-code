import { ClientLogger } from "websocket-logger";
import { serverConfig } from "../config";

const logger = new ClientLogger(
  serverConfig.LOGGING_WEBSOCKET_URL,
  "evaluator-service",
  true
);

export default logger;
