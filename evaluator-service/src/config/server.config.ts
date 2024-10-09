import dotenv from "dotenv";
dotenv.config();

const serverConfig = {
  PORT: process.env.PORT as string,
  REDIS_PORT: process.env.REDIS_PORT as string,
  REDIS_HOST: process.env.REDIS_HOST as string,
  LOGGING_WEBSOCKET_URL: process.env.LOGGING_WEBSOCKET_URL as string,
};

export default serverConfig;
