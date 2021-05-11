var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = (module.exports.io = require("socket.io")(http));

require("custom-env").env();

const SocketManager = require("./SocketManager");
io.on("connection", SocketManager);

const PORT = process.env.PORT || 3200;

http.listen(PORT, () => {
  console.log("listing to port " + PORT);
});
