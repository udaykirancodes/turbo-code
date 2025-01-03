import dotenv from "dotenv";
dotenv.config();

const serverConfig = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL || "",
  REDIS_PORT: process.env.REDIS_PORT as string,
  REDIS_HOST: process.env.REDIS_HOST as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

export default serverConfig;
