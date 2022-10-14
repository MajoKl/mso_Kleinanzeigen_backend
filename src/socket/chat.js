

const socks = (socket) => {
  socket.on("connect", () => {
    console.log("Connected to server");
  });
};
module.exports = socks;
