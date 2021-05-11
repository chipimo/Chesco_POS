"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Printer_1 = require("./Printer");
var pdfGen_1 = require("./pdfGen");
var csvGenFile_1 = require("./csvGenFile");
// var appRoot = require('app-root-path');
// var '/chesco-server/index.js' = require(appRoot + '/chesco-server/index.js');
// import appDb from "./app/redux/dataBase";
var db = require("electron-db");
var nodemon = require("nodemon");
var electron = require("electron");
var fs = require("fs-extra");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var path = require("path");
var url = require("url");
var _a = require("electron"), webContents = _a.webContents, ipcMain = _a.ipcMain;
var mainWindow;
var dialog = require("electron").dialog;
var userhome = require("user-home");
var app_files = "/app/index.html";
var win;
var mainRender;
var uuidv4 = require("uuid/v4");
function CreateId() {
    return uuidv4();
}
// Printer
// Splash Screen
function screenLoader() {
    var modalPath = path.join("file://", __dirname, "splashscreen.html");
    var _a = electron.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
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
    var _a = electron.screen.getPrimaryDisplay().workAreaSize, width = _a.width, height = _a.height;
    mainWindow = new BrowserWindow({
        show: false,
        width: width,
        height: height,
        frame: false,
        fullscreen: true,
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        },
        icon: path.join(__dirname, "assets/img/icons/logo.png"),
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, app_files),
        protocol: "file:",
        slashes: false,
    }));
    mainWindow.webContents.on("new-window", function (event, url, frameName, disposition, options, additionalFeatures) {
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
    });
    mainWindow.webContents.once("dom-ready", function () {
        mainWindow.setMinimumSize(1200, 600);
        var obj = {
            host: "localhost",
            user: "postgres",
            port: 5432,
            database: "chesco_pos",
            password: "root",
        };
        db.createTable("config", function (succ, msg) {
            db.getAll("config", function (succ, data) {
                // const '/chesco-server/index.js' = path.dirname(require.main.filename);
                // console.log("/chesco-server/index.js");
                if (data.length !== 0) {
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
                else {
                    db.insertTableContent("config", obj, function (succ, msg) {
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
    mainWindow.webContents.session.on("will-download", function (event, item, webContents) {
        // Set the save path, making Electron not to prompt a save dialog.
        item.setSavePath("/tmp/save.pdf");
        item.on("updated", function (event, state) {
            if (state === "interrupted") {
                console.log("Download is interrupted but can be resumed");
            }
            else if (state === "progressing") {
                if (item.isPaused()) {
                    console.log("Download is paused");
                }
                else {
                    console.log("Received bytes: " + item.getReceivedBytes());
                }
            }
        });
        item.once("done", function (event, state) {
            if (state === "completed") {
                console.log("Download successfully");
            }
            else {
                console.log("Download failed: " + state + " - " + event);
            }
        });
    });
}
// IPC Render
ipcMain.on("do_print_receipt", function (event, arg) {
    event.reply("asynchronous-reply", "pong");
    Printer_1.default("receipt", arg);
});
ipcMain.on("do_print_order", function (event, arg) {
    Printer_1.default("order", arg);
});
ipcMain.on("do_print_saleReports", function (event, arg) {
    Printer_1.default("sale", arg);
});
ipcMain.on("do_print_bill", function (event, arg) {
    Printer_1.default("bill", arg);
});
ipcMain.on("save_pdf", function (event, arg) {
    exportFromMain(arg);
});
ipcMain.on("save_csv", function (event, arg) {
    csvGenFile_1.saveToCsvFile(arg);
});
ipcMain.on("network", function (event, arg) {
    Printer_1.default("network", arg);
});
ipcMain.on("relaunch", function (event, arg) {
    app.relaunch();
    app.quit();
});
function exportFromMain(props) {
    return __awaiter(this, void 0, void 0, function () {
        var md, file, pdfPathMain, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    md = fs.readFileSync(__dirname + "/text.md", "utf8");
                    file = userhome + "/Documents/Chesco-Tec/reports/doc.md";
                    fs.ensureFileSync(file);
                    pdfPathMain = userhome + "/Documents/Chesco-Tec/reports/financial-Report-" + CreateId() + ".pdf";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 6]);
                    return [4 /*yield*/, pdfGen_1.mdToPdfFile(md, pdfPathMain, {
                            basePath: __dirname,
                            cssFiles: [__dirname + "/styles.css"],
                            wrapperClasses: "markdown-body",
                            props: props,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dialog.showMessageBox({
                            title: "Export successful",
                            message: "Exported PDF from main process to " + pdfPathMain,
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    return [4 /*yield*/, dialog.showErrorBox("Export error", "Error during export from main process: " + err_1)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
ipcMain.on("show_notification", function (event, arg) {
    // console.log(arg);
    mainRender = event;
    var options1 = {
        type: arg.type,
        buttons: ["Cancel", "Yes, please", "No, thanks"],
        defaultId: 2,
        title: arg.data.title,
        message: arg.message,
        detail: arg.data.detail,
    };
    var options2 = {
        type: arg.type,
        defaultId: 2,
        title: arg.data.title,
        message: arg.message,
        detail: arg.data.detail,
    };
    dialog
        .showMessageBox(mainWindow, arg.state === "msgBox" ? options2 : options1)
        .then(function (result) {
        if (result.response === 1) {
            event.reply("notification_reponse", {
                delete: true,
                deleteId: arg.data.id,
            });
        }
        else {
            event.reply("notification_reponse", { delete: false, deleteId: "" });
        }
    })
        .catch(function (err) {
        console.log(err);
    });
});
app.on("ready", function () {
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
//# sourceMappingURL=main.js.map