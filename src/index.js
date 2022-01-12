const http = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 13000;

//db start
require("./db/db");

//else

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("new client");
});

server.listen(PORT, () => {
  console.log("a");
});
