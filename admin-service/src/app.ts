import express from "express";

import apiRoutes from "./routes";
import errorHandler from "./utils/error.handler";
import requestLogger from "./utils/request-logger";

const app = express();

// middlewares
app.use(express.json());
app.use(requestLogger);

// routes
app.use("/api", apiRoutes);

app.use(errorHandler);

export default app;
