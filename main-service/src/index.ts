import app from "./app";
import { serverConfig } from "./config";
import { pool } from "./db";
import { logger } from "./utils/logger";

// Function to start the server
const startServer = async () => {
  try {
    // Try to get a client from the pool to check if the connection is successful
    const client = await pool.connect();
    client.release(); // Release the client back to the pool

    logger.info("Connected to the database successfully");

    app.listen(serverConfig.PORT, () => {
      logger.info(`server started @${serverConfig.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  }
};

startServer();
