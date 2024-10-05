import app from "./app";
import { serverConfig } from "./config";
import connectToDb from "./config/db.config";
import { logger } from "./utils/logger";

connectToDb()
  .then(() => {
    // if db connects then starts the server
    logger.info("connected to database");
    app.listen(serverConfig.PORT, () => {
      logger.info(`server started @${serverConfig.PORT}`);
    });
  })
  .catch(() => {
    logger.error(`server started @${serverConfig.PORT}`);
  });
