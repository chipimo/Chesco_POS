import Printer from "./Printer";
import { mdToPdfFile } from "./pdfGen";
import { saveToCsvFile } from "./csvGenFile";

// var appRoot = require('app-root-path');
// var '/chesco-server/index.js' = require(appRoot + '/chesco-server/index.js');
// import appDb from "./app/redux/dataBase";
const db = require("electron-db");
var nodemon = require("nodemon");

const electron = require("electron");
const fs = require("fs-extra");
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const { webContents, ipcMain } = require("electron");

let mainWindow;
const { dialog } = require("electron");
const userhome = require("user-home");

let app_files = "/app/index.html";
let win;
let mainRender;

const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
}
// Printer

// Splash Screen

function screenLoader() {
  const modalPath = path.join("file://", __dirname, "splashscreen.html");
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    fullscreen: true,
    transparent: true,
    resizable: false,
    // webPreferences: {
    //   nodeIntegration: true,
    // },
    icon: path.join(__dirname, "assets/img/icons/logo.png"),
  });

  win.on("close", function () {
    win = null;
  });
  win.loadURL(modalPath);
  // win.setMenu(null);
  win.setResizable(false);
  win.show();
  // win.setIgnoreMouseEvents(true);
}

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    show: false,
    width,
    height,
    frame: false,
    fullscreen: true,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, "assets/img/icons/logo.png"),
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, app_files),
      protocol: "file:",
      slashes: false,
    })
  );

  mainWindow.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options, additionalFeatures) => {
      if (frameName === "modal") {
        // open window as modal
        event.preventDefault();
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          width: 600,
          height: 500,
        });
        event.newGuest = new BrowserWindow(options);
      }
    }
  );

  mainWindow.webContents.once("dom-ready", () => {
    mainWindow.setMinimumSize(1200, 600);

    const obj = {
      host: "localhost",
      user: "postgres",
      port: 5432,
      database: "chesco_pos",
      password: "root",
    };

    db.createTable("config", (succ, msg) => {
      db.getAll("config", (succ, data) => {
        // const '/chesco-server/index.js' = path.dirname(require.main.filename);

        // console.log("/chesco-server/index.js");

        if (data.length !== 0) {
          win.close();
          // mainWindow.setMenu(null);
          mainWindow.maximize();
          mainWindow.show();

          nodemon({
            script:path.join(__dirname, "chesco-server/index.js"),
            ext: "js json",
          });

          nodemon
            .on("start", function () {
              console.log("App has started");
            })
            .on("quit", function () {
              console.log("App has quit");
              process.exit();
            })
            .on("restart", function (files) {
              console.log("App restarted due to: ", files);
            });
        } else {
          db.insertTableContent("config", obj, (succ, msg) => {
            if (succ) {
              win.close();
              // mainWindow.setMenu(null);
              mainWindow.maximize();
              mainWindow.show();

              nodemon({
                script: path.join(__dirname, "chesco-server/index.js"),  
                ext: "js json",
              });

              nodemon  
                .on("start", function () {
                  console.log("App has started");
                })
                .on("quit", function () {
                  console.log("App has quit");
                  process.exit();
                })
                .on("restart", function (files) {
                  console.log("App restarted due to: ", files);
                });
            }
          });
        }
      });
    });

    // win.close();
    // mainWindow.setMenu(null);
    // mainWindow.maximize();
    // mainWindow.show();
    // ipcMain.emit("do_config_db",{})
    // win.webContents.send("do_config_db", {});

    // ipcMain.on("db_done", (event, arg) => {
    // });
    // ipcMain.on("closeApp", (event, arg) => {
    //   win.close();
    //   app.quit();
    // });
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.webContents.session.on(
    "will-download",
    (event, item, webContents) => {
      // Set the save path, making Electron not to prompt a save dialog.
      item.setSavePath("/tmp/save.pdf");

      item.on("updated", (event, state) => {
        if (state === "interrupted") {
          console.log("Download is interrupted but can be resumed");
        } else if (state === "progressing") {
          if (item.isPaused()) {
            console.log("Download is paused");
          } else {
            console.log(`Received bytes: ${item.getReceivedBytes()}`);
          }
        }
      });
      item.once("done", (event, state) => {
        if (state === "completed") {
          console.log("Download successfully");
        } else {
          console.log(`Download failed: ${state} - ${event}`);
        }
      });
    }
  );
}

// IPC Render

ipcMain.on("do_print_receipt", (event, arg) => {
  event.reply("asynchronous-reply", "pong");
  Printer("receipt", arg);
});

ipcMain.on("do_print_order", (event, arg) => {
  Printer("order", arg);
});

ipcMain.on("do_print_saleReports", (event, arg) => {
  Printer("sale", arg);
});

ipcMain.on("do_print_bill", (event, arg) => {
  Printer("bill", arg);
});

ipcMain.on("save_pdf", (event, arg) => {
  exportFromMain(arg);
});

ipcMain.on("save_csv", (event, arg) => {
  saveToCsvFile(arg);
});

ipcMain.on("network", (event, arg) => {
  Printer("network", arg);
});

ipcMain.on("relaunch", (event, arg) => {
  app.relaunch();
  app.quit();
});

async function exportFromMain(props): Promise<void> {
  const md = fs.readFileSync(`${__dirname}/text.md`, "utf8");
  const file = `${userhome}/Documents/Chesco-Tec/reports/doc.md`;

  fs.ensureFileSync(file);
  const pdfPathMain = `${userhome}/Documents/Chesco-Tec/reports/financial-Report-${CreateId()}.pdf`;

  try {
    await mdToPdfFile(md, pdfPathMain, {
      basePath: __dirname,
      cssFiles: [`${__dirname}/styles.css`],
      wrapperClasses: "markdown-body",
      props: props,
    });
    await dialog.showMessageBox({
      title: "Export successful",
      message: `Exported PDF from main process to ${pdfPathMain}`,
    });
  } catch (err) {
    await dialog.showErrorBox(
      "Export error",
      `Error during export from main process: ${err}`
    );
  }
}

ipcMain.on("show_notification", (event, arg) => {
  // console.log(arg);
  mainRender = event;

  const options1 = {
    type: arg.type,
    buttons: ["Cancel", "Yes, please", "No, thanks"],
    defaultId: 2,
    title: arg.data.title,
    message: arg.message,
    detail: arg.data.detail,
  };

  const options2 = {
    type: arg.type,
    defaultId: 2,
    title: arg.data.title,
    message: arg.message,
    detail: arg.data.detail,
  };

  dialog
    .showMessageBox(mainWindow, arg.state === "msgBox" ? options2 : options1)
    .then((result) => {
      if (result.response === 1) {
        event.reply("notification_reponse", {
          delete: true,
          deleteId: arg.data.id,
        });
      } else {
        event.reply("notification_reponse", { delete: false, deleteId: "" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.on("ready", () => {
  screenLoader();
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
