import app from "./app";
import { serverConfig } from "./config";
import connectToDb from "./config/db.config";

connectToDb()
  .then(() => {
    // if db connects then starts the server
    app.listen(serverConfig.PORT, () => {
      console.log(`Server Started @${serverConfig.PORT}`);
    });
  })
  .catch(() => {
    console.error(`Error connecting to database`);
  });
