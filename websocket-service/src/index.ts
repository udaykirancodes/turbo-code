import express from "express";
import { createServer } from "node:http";

import { serverConfig } from "./config";
import myWorker from "./msg-queue/worker";

const app = express();
export const server = createServer(app);

app.get("/", (req, res) => {
  res.send({ status: "healthy!" });
});

server.listen(serverConfig.PORT, () => {
  console.log(`Server Started : ${serverConfig.PORT}`);
});
myWorker.on("error", (err) => console.log("Error Occured ", err));

import { Server } from "socket.io";
import { cache, getUserIdBySocketId } from "./cache";

export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User Connected : ", socket.id);
  // Store User ID & Socket Id mapping in redis
  socket.on("setUserId", (data) => {
    // UserID --> Socket Id
    const userId = data;
    cache.set(userId, socket.id);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected : ", socket.id);
    cache.delete(getUserIdBySocketId(socket.id));
  });
  socket.on("message", (data: string) => {
    console.log(data);
    socket.send("message" + "yayyy");
  });
  socket.on("sendMyData", () => {
    io.to(socket.id).emit("data", socket.id);
  });
});
