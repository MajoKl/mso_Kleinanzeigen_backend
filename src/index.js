const http = require("http");
const sockslogic = require("./socket/chat")
const httpProxy = require("http-proxy");
//const https = require("https");

const { Server } = require("socket.io");

const PORT = +process.env.PORT || 3000;
httpProxy.createProxyServer({
  target: `http://localhost:${PORT}`, ws: true
}).listen(PORT + 1);

//db start
require("./db/db");

//else

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  sockslogic.socket(socket, io);
});

server.listen(PORT, () => {
  console.log(
    `The server is running on Port: "${PORT}" and is waiting for connections.`
  );
});
