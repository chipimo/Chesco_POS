const io = require("./index").io;
const {
  USER_LOGIN_REQ,
  USER_IS_VERIFYED,
  LOGIN,
  GETSAVEDTABLES,
} = require("./events");
const _ = require("lodash");
require("custom-env").env();

require("custom-env").env();

var isProcessing = false;

var connectedUsers = [];

module.exports = function (socket) {
  socket.on("connected", () => {
    // console.log(socket.id);
  });

  socket.on("UserConnected", (props) => {
    let data = {
      data: props,
      socketId: socket.id,
    };

    var users = _.findIndex(connectedUsers, data);
    if (users === -1) {
      connectedUsers.push(data);
      io.emit("ALL_LOG_USERS", {
        users: connectedUsers,
      });
      // io.emit("ALL_LOG_USERS",connectedUsers);
    }
  });

  socket.on(LOGIN, (userData) => {
    const data = {
      userData,
      socketId: socket.id,
    };

    io.emit(USER_LOGIN_REQ, data);
  });

  socket.on("GET_LOGGEDIN_USERS", () => {
    io.emit("ALL_LOG_USERS", { users: connectedUsers });
  });

  socket.on(USER_IS_VERIFYED, (storeData) => {
    io.emit("USER_DATA", storeData);
  });

  socket.on("USER_TABLES", (storeData) => {
    const index = connectedUsers.filter(
      (x) => x.data.dep_name === storeData.userName
    );

    io.to(index[0].socketId).emit("USER_SAVED_TABLES", storeData);
    // console.log(index);
  });

  socket.on(GETSAVEDTABLES, (storeData) => {
    io.emit("GET_USER_SAVED_TABLES", storeData);
  });

  socket.on("GETTABLENAMES", () => {
    io.emit("GET_ALL_TABLENAMES");
  });

  socket.on("ALL_TABLENAMES", (tableData) => {
    io.emit("ALL_TABLENAMES_PRESENT", tableData);
  });

  socket.on("GETALLPRODUCTS", (userData) => {
    io.emit("GET_USER_ALLPRODUCTS", userData);
  });

  socket.on("ALL_PRODUCTS", (userData) => {
    io.emit("USER_ALLPRODUCTS", userData);
  });

  socket.on("SAVETABLE", (userData) => {
    io.emit("SAVETABLEFROMUSER", userData);
  });

  socket.on("TABLESAVEDFORUSER", (userData) => {
    const index = connectedUsers.filter(
      (x) => x.data.dep_name === userData.user.userInfo.userName
    );
    io.to(index[0].socketId).emit("TABLESAVED", userData);
  }); 


  socket.on("disconnect", () => {
    let data = {
      socketId: socket.id,
      _type: "remove",
    };
    connectedUsers = connectedUsers.filter((x) => x.socketId !== socket.id);
  });
};
