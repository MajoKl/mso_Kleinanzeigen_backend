const http = require("http");
const https = require("https");

const { Server } = require("socket.io");

const PORT = process.env.PORT || 13000;

//db start
require("./db/db");

//else

const app = require("./app");

var server = undefined;

if (process.env.NODE_ENV !== "production") {
  server = http.createServer(app);
} else {
  server = https.createServer(app);
}

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("new client");
});

server.listen(PORT, () => {
  console.log("a");
});
