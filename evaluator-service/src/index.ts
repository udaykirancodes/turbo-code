import express from "express";

import myWorker from "./msg-queque/worker";

import { serverConfig } from "./config";
import { SUPPORTED_IMAGES } from "./constants";
import { pullImage } from "./docker";
import apiRouter from "./routes";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.json({ status: "healthy" });
});

myWorker.on("error", (err) => console.log("Error at Queue ", err));

// Pull the supported images on starting the server
const pullAllImages = async () => {
  for await (const image of Object.keys(SUPPORTED_IMAGES)) {
    await pullImage(image);
  }
};
const startServer = async () => {
  await pullAllImages();
  app.listen(serverConfig.PORT, async () => {
    console.log("Server Started @" + serverConfig.PORT);
  });
  // const res = await cppRunner(
  //   `
  //   #include<iostream>
  //   using namespace std;
  //   int main(){
  //     cout<<"Hello World"<<endl;
  //     return 0;
  //   }
  //   `,
  //   ""
  // );
  // console.log(res);
};

startServer();

export default app;
