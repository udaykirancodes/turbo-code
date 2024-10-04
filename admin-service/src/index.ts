import app from "./app";
import { logger, serverConfig } from "./config";
import connectToDb from "./config/db.config";

connectToDb()
  .then(() => {
    // if db connects then starts the server
    logger.info("Db Connected Successfully!");
    app.listen(serverConfig.PORT, () => {
      logger.info(`Server Started @${serverConfig.PORT}`);
    });
  })
  .catch(() => {
    logger.error(`Error connecting to database`);
  });
