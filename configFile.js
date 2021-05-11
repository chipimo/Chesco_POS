// import { toast } from "react-toastify";
// const { ipcRenderer } = require("electron");
// const fs = require("fs-extra");
// const file = require("./db.json");
// import appDb from "./app/redux/dataBase";
// ipcRenderer.on("do_config_db", (event, arg) => {
//   let loaderId = document.getElementById("loader_ind");
//   let mainId = document.getElementById("main");
//   let db_form = document.getElementById("db_form");
//   loaderId.innerHTML = "Checking DataBase Config...";
//   appDb.TestDbConnection((callback) => {
//     setTimeout(() => {
//       if (callback.connection) {
//         loaderId.innerHTML = "DataBase Config is set";
//         setTimeout(() => {
//           ipcRenderer.send("db_done", {});
//         }, 1000);
//       } else {
//         mainId.className = "HideLoader";
//         db_form.className = "showDbForm";
//       }
//     }, 2000);
//   });
// });
// function closeapp() {
//   ipcRenderer.send("closeApp", {});
// }
// document.querySelector("#closeBtn").addEventListener("click", () => {
//   closeapp();
// });
// document.querySelector("#submit_local").addEventListener("click", (event) => {
//   event.preventDefault();
//   const data = {
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     database: "chesco_pos",
//     password: "root",
//   };
//   fs.writeJson(file, data)
//     .then(() => {
//       ipcRenderer.send("db_done", {});
//       // appDb.CreateDb((receiveCallback) => {
//       //   if (receiveCallback.db) {
//       //     setTimeout(() => {
//       //     }, 500);
//       //   }
//       //   console.log(receiveCallback);
//       // });
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });
// document.querySelector("#submit").addEventListener("click", (event) => {
//   event.preventDefault();
//   let host = document.getElementById("host").value;
//   let user = document.getElementById("user").value;
//   let port = document.getElementById("port").value;
//   let database = document.getElementById("database").value;
//   let password = document.getElementById("password").value;
//   const data = { host, user, port: parseInt(port), database, password };
//   if (data.host === "") {
//     toast(`Host is not set`, {
//       position: "bottom-right",
//       autoClose: 5000,
//       type: "error",
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   } else if (data.user === "") {
//     toast(`User is not set`, {
//       position: "bottom-right",
//       autoClose: 5000,
//       type: "error",
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   } else if (!data.port) {
//     toast(`Port is not set`, {
//       position: "bottom-right",
//       autoClose: 5000,
//       type: "error",
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   } else if (data.database === "") {
//     toast(`Database is not set`, {
//       position: "bottom-right",
//       autoClose: 5000,
//       type: "error",
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   } else if (data.password === "") {
//     toast(`Password is not set`, {
//       position: "bottom-right",
//       autoClose: 5000,
//       type: "error",
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   } else {
//     fs.writeJson(file, data)
//       .then(() => {
//         ipcRenderer.send("db_done", {});
//         // appDb.CreateDb((receiveCallback) => {
//         //   if (receiveCallback.db) {
//         //     setTimeout(() => {
//         //     }, 500);
//         //   }
//         //   console.log(receiveCallback);
//         // });
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// });
//# sourceMappingURL=configFile.js.map