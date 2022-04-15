const http = require("http");


//const https = require("https");

const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

//db start
require("./db/db");

//else

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {



  socket.emit("penis");

  console.log("new client");




});

server.listen(PORT, () => {
  console.log(
    `The server is running on Port: "${PORT}" and is waiting for connections.`
  );
});
