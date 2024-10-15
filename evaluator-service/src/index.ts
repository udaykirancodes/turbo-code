import express from "express";

import myWorker from "./msg-queque/worker";

import { serverConfig } from "./config";
import { SUPPORTED_IMAGES } from "./constants";
import { pullImage } from "./docker";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "healthy" });
});

myWorker.on("error", (err) => console.error("Error at Queue ", err));

// Pull the supported images on starting the server
const pullAllImages = async () => {
  for await (const image of Object.keys(SUPPORTED_IMAGES)) {
    await pullImage(image);
  }
};
const startServer = async () => {
  await pullAllImages();
  app.listen(serverConfig.PORT, async () => {
    console.info("Server Started @" + serverConfig.PORT);
  });
};

startServer();

export default app;
