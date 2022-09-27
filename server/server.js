const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.UI_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnet", () => {
    console.log("User Disconnected : ", socket.id);
  });
});

server.listen(3001, () => {
  console.log(`SERVER STARTED at port ${process.env.PORT}`);
});
