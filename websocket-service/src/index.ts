import express from "express";
import { createServer } from "node:http";
import { serverConfig } from "./config";

import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send({ status: "healthy!" });
});

server.listen(serverConfig.PORT, () => {
  console.log(`Server Started : ${serverConfig.PORT}`);
});

io.on("connection", (socket) => {
  console.log(socket.id);
  // UserID --> Socket Id
  socket.on("message", (data: string) => {
    console.log(data);
    socket.send("message" + "yayyy");
  });
});
