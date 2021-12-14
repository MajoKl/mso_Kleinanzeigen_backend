const http = require("http");
const { Server } = require("socketio");

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("new client");
});

server.listen(5000, () => {
  console.log();
});
