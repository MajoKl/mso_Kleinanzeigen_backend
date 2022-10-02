const http = require("http");

//const https = require("https");

const { Server } = require("socket.io");

const chat = require("./socket/chat");

const PORT = process.env.PORT || 3000;

//db start
require("./db/db");

//else

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
  transports: ["websocket", "polling"],
});

io.on("connection", chat);

server.listen(PORT, () => {
  console.log(
    `The server is running on Port: "${PORT}" and is waiting for connections.`
  );
});
