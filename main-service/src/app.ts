import express from "express";
import { rateLimit } from "express-rate-limit";

import myWorker from "./msg-queue/worker";
import apiRoutes from "./routes";
import errorHandler from "./utils/error.handler";
import requestLogger from "./utils/request-logger";

import cors from "cors";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const app = express();

app.use(cors());

myWorker.on("error", (err) => console.error("Error at Queue ", err));

// middlewares
app.use(express.json());
app.use(requestLogger);
app.use(limiter);

// routes
app.use("/api", apiRoutes);

app.use(errorHandler);

export default app;
