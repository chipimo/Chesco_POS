"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var styles_2 = require("@material-ui/core/styles");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var AppBar_1 = require("@material-ui/core/AppBar");
var grommet_1 = require("grommet");
// import { Button } from "@blueprintjs/core";
var react_router_dom_1 = require("react-router-dom");
var semantic_ui_react_1 = require("semantic-ui-react");
var SelectionPan_1 = require("./screens/SelectionPan");
var LoginPage_1 = require("./screens/LoginPage");
var WorkPeriod_1 = require("./screens/WorkPeriod");
var Pos_1 = require("./screens/Pos");
var Tickets_1 = require("./screens/Tickets");
var Accounts_1 = require("./screens/Accounts");
var AccountDetails_1 = require("./screens/Accounts/AccountDetails");
var Warehouses_1 = require("./screens/Warehouses");
var DepartmentView_1 = require("./screens/Departments/DepartmentView");
var Reports_1 = require("./screens/Reports");
var Settings_1 = require("./screens/Settings");
var NewWorkPeriod_1 = require("./screens/WorkPeriod/NewWorkPeriod");
var Notifications_1 = require("./screens/Notifications");
var dataBase_1 = require("./redux/dataBase");
var Drawer_1 = require("@material-ui/core/Drawer");
var Dep_Notifications_1 = require("./screens/Departments/Dep_Notifications");
var react_toastify_1 = require("react-toastify");
var Modal_1 = require("@material-ui/core/Modal");
var electron_1 = require("electron");
var WindowSize_1 = require("./components/Icons/WindowSize");
var Meuns_1 = require("./screens/Meuns");
var Expenses_1 = require("./screens/Reports/Expenses/Expenses");
var react_barcode_reader_1 = require("react-barcode-reader");
var Masters_1 = require("./screens/Masters");
var Licence_1 = require("./screens/Licence");
var Settings_2 = require("@material-ui/icons/Settings");
var DbSettings_1 = require("./screens/DbSettings");
var electron = require("electron");
var mainWindow = electron_1.remote.getCurrentWindow();
var socketIOClient = require("socket.io-client");
var moment = require("moment");
var socketUrl = "http://localhost:3200";
// const socketUrl = "https://switch-smart.herokuapp.com/";
var ipcRenderer = require("electron").ipcRenderer;
// Moment valz
var date = new Date();
var check = moment(date);
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February ----)
var year = check.format("YYYY");
// Theme layout
var darkTheme = styles_1.createMuiTheme({
    palette: {
        type: "dark",
    },
});
var lightTheme = styles_1.createMuiTheme({
    palette: {
        type: "light",
    },
});
// Tool tip
var HtmlTooltip = styles_2.withStyles(function (theme) { return ({
    tooltip: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}); })(Tooltip_1.default);
var Accapp = function (props) {
    var _a = React.useState({ Connected: false }), conn = _a[0], setConn = _a[1];
    var _b = React.useState(true), iSConnecting = _b[0], setiSConnecting = _b[1];
    var _c = React.useState(false), LoadingBackUp = _c[0], setLoadingBackUp = _c[1];
    var _d = React.useState(false), OpenSettings = _d[0], setOpenSettings = _d[1];
    var _e = React.useState({
        top: false,
        left: false,
        bottom: false,
        bottom2: false,
        right: false,
    }), Drawerstate = _e[0], setDrawerState = _e[1];
    var _f = React.useState(true), LoadOnce = _f[0], setLoadOnce = _f[1];
    var _g = WindowSize_1.default(), height = _g.height, width = _g.width;
    var history = react_router_dom_1.useHistory();
    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }
    function getModalStyle() {
        var top = 50 + rand();
        var left = 50 + rand();
        return {
            top: top + "%",
            left: left + "%",
            transform: "translate(-" + top + "%, -" + left + "%)",
        };
    }
    var useStyles = styles_2.makeStyles(function (theme) { return ({
        paper: {
            width: "90vw",
            position: "absolute",
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
        },
    }); });
    var toggleDrawer = function (side, open) { return function (event) {
        var _a;
        if (event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerState(__assign({}, Drawerstate, (_a = {}, _a[side] = open, _a)));
    }; };
    var classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    var modalStyle = React.useState(getModalStyle)[0];
    var _h = React.useState(false), open = _h[0], setOpen = _h[1];
    var _j = React.useState({
        des: "",
        amount: 0,
        type: "expenses",
    }), data = _j[0], setData = _j[1];
    var _k = React.useState(""), shotbarcode = _k[0], setshotbarcode = _k[1];
    var _l = React.useState(false), showMaster = _l[0], setshowMaster = _l[1];
    var _m = React.useState(false), showUsers = _m[0], setShowUsers = _m[1];
    var _o = React.useState(false), sockTaking = _o[0], setSockTaking = _o[1];
    var _p = React.useState({ data: [] }), users = _p[0], setUsers = _p[1];
    var _q = React.useState("light"), themeSet = _q[0], setThemeSet = _q[1];
    var handleOnKeyPress = function (key) {
        // console.log(key);
        if (key !== "Enter") {
            shotbarcode = shotbarcode + key;
            setshotbarcode(shotbarcode);
        }
        if (key === "Enter") {
            if (shotbarcode === "L") {
                setshowMaster(true);
                setshotbarcode("");
            }
            else {
                setshotbarcode("");
                // setshowMaster(false);
            }
        }
    };
    var handleOnChange = function (event) {
        var _a;
        setData(__assign({}, data, (_a = {}, _a[event.target.name] = event.target.name, _a)));
    };
    var handleSubmit = function () {
        dataBase_1.default.HandelReports(data, function (callback) {
            react_toastify_1.toast("Add new expense", {
                position: "top-right",
                autoClose: 5000,
                type: "success",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    };
    React.useEffect(function () {
        dataBase_1.default.HandelProducts({ _type: "get_license_config" }, function (callback) {
            // console.log(callback);
            if (callback.length === 0)
                history.push("/licence");
            else {
                dataBase_1.default.HandelProducts({ _type: "validateLicense", Licence: callback[0].licenseKey }, function (LicenseCallback) {
                    if (LicenseCallback.message === "ok")
                        history.push("/");
                    else
                        history.push("/licence");
                });
            }
        });
        if (LoadOnce) {
            setLoadOnce(false);
            dataBase_1.default.HandleCurrency({ _type: "getCurrence" }, function (reciveCallback) {
                console.log(reciveCallback[0]);
                props.dispatchEvent({
                    type: "SETCURRENCY",
                    currency: reciveCallback[0],
                });
            });
            // check for expired stock
            CheckForExpiredStock();
            mainWindow.maximize();
            setTimeout(function () {
                initiSocket();
            }, 3000);
            dataBase_1.default.HandleTheme({ _type: "getTheme" }, function (callback) {
                props.dispatchEvent({ type: "setTheme", setTheme: "light" });
            });
            dataBase_1.default.HandleWorkperiods({ _type: "loadList" }, function (recivedCallback) {
                if (recivedCallback)
                    recivedCallback.map(function (list) {
                        if (list.dateEnded === "") {
                            var initalData = {
                                type: "STARTWORKPERIOD",
                                id: list.id,
                                dateStarted: list.dateStarted,
                                dateStartedString: list.dateStartedString,
                                date: list.date,
                                time: list.time,
                                timeEnded: list.timeEnded,
                                dateEnded: list.dateEnded,
                                dateEndedString: list.dateEndedString,
                                note: list.note,
                                userId: list.userId,
                                department: list.department,
                                departmentInfo: list.departmentInfo,
                                workedFor: list.workedFor,
                                year: list.year,
                                month: list.month,
                                week: list.week,
                                day: list.day,
                            };
                            props.dispatchEvent(initalData);
                        }
                    });
                props.dispatchEvent({
                    type: "SETWORKPERIOD",
                    data: recivedCallback,
                });
            });
        }
        setOpeningMaterials();
        setOpeningBalance();
        // console.log(props.Updater);
        // To remove just for dev only
    }, []);
    var setOpeningMaterials = function () {
        dataBase_1.default.HandelProducts({ _type: "setOpeningMaterials" }, function (callback) { });
    };
    var setOpeningBalance = function () {
        // setSockTaking(true);
        dataBase_1.default.HandelProducts({ _type: "setOpeningBalancesReports" }, function (callback) {
            // console.log("done");
            setSockTaking(false);
        });
    };
    var CheckForExpiredStock = function () {
        dataBase_1.default.HandelDamages({ type: "checkForExpired" }, function (callback) { });
    };
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var initiSocket = function () {
        dataBase_1.default.CheckConfig();
        setConn(__assign({}, conn, { Connected: false }));
        var socket = socketIOClient(socketUrl);
        socket.on("connect", function () {
            setConn(__assign({}, conn, { Connected: true }));
            props.dispatchEvent({ type: "CONNECTED", socket: socket });
            // Backup.isOnline();
            // console.log("connection");
        });
        // socket.emit("GETSALESTICKETS", (callback) => {
        //   // console.log(callback);
        // });
        socket.on("SALESREPORTLIST", function (callback) {
            // console.log(callback);
        });
        socket.on("disconnect", function () {
            props.dispatchEvent({ type: "CONNCETIONFAILED" });
        });
        socket.on("USER_LOGIN_REQ", function (userData) {
            // console.log(userData)
            dataBase_1.default.HandleLogIn({ pin: userData.userData, name: "" }, function (reciveCallback) {
                socket.emit("USER_IS_VERIFYED", reciveCallback);
            });
        });
        socket.emit("GET_LOGGEDIN_USERS", function () { });
        socket.on("GET_USER_SAVED_TABLES", function (userData) {
            dataBase_1.default.HandleTables({ _type: "getOpenTablesByUser", userName: userData.userInfo.userName }, function (tables) {
                socket.emit("USER_TABLES", {
                    tables: tables,
                    userName: userData.userInfo.userName,
                });
            });
        });
        socket.on("GET_ALL_TABLENAMES", function () {
            dataBase_1.default.HandleTables({ _type: "get" }, function (reciveCallback1) {
                socket.emit("ALL_TABLENAMES", reciveCallback1.data);
            });
        });
        socket.on("GET_USER_ALLPRODUCTS", function (userData) {
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "getGrouped" }, function (receiveCallback) {
                socket.emit("ALL_PRODUCTS", receiveCallback.productResult[0]);
            });
        });
        socket.on("BACKUPFILES", function (data) {
            setLoadingBackUp(false);
            // console.log(data);
            dataBase_1.default.HandelProducts({ _type: "backUp", data: data }, function (callback) { });
        });
        socket.on("TRANSFER_NOTIFICATION", function (data) {
            // console.log(data);
            var datalist = {
                _type: "tranfer",
                value: data.value,
                selected: data.selected,
                state: "recived",
                isCleared: true,
                data: data,
            };
            dataBase_1.default.HandelProducts(datalist, function (callback) {
                react_toastify_1.toast("You Have Recived Product(s) " + data.selected.ItemName + " " + data.value, {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        });
        socket.on("DELIVERY_NOTIFICATION", function (data) {
            var datalist = {
                _type: "tranfer",
                value: data.value,
                selected: data.selected,
                state: "delivery",
                isCleared: true,
                data: data,
            };
            dataBase_1.default.HandelProducts(datalist, function (callback) {
                react_toastify_1.toast("Product(s) " + callback.name + " (" + data.value + ") have been successfuly delivered to " + data.to + " ", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        });
        socket.on("ALL_LOG_USERS", function (callback) {
            props.dispatchEvent({
                type: "UserLoggedIn",
                users: callback.users,
            });
        });
        socket.on("SAVETABLEFROMUSER", function (userData) {
            // console.log(userData);
            dataBase_1.default.HandleTables({
                _type: "setMyTabes",
                user: userData.user.userInfo.userName,
                table: userData.table,
                date: moment().format("DD-MMM-YYYY"),
                time: moment().format("LTS"),
                total: userData.total,
                qty: 1,
                product_list: { data: userData.cart },
            }, function (callback) {
                props.dispatchEvent({
                    type: "SETCOUNT",
                    count: callback.length,
                });
                socket.emit("TABLESAVEDFORUSER", { user: userData.user });
            });
        });
        setTimeout(function () {
            setiSConnecting(false);
        }, 300);
    };
    return (React.createElement(styles_1.ThemeProvider, { theme: props.Theme.theme === "light" ? lightTheme : darkTheme },
        React.createElement(react_toastify_1.ToastContainer, null),
        React.createElement(Notifications_1.default, null),
        React.createElement(react_barcode_reader_1.default, { onKeyDetect: function (event) {
                handleOnKeyPress(event.key);
            } }),
        React.createElement(core_1.Paper, { square: true, style: {
                width: "100vw",
                height: height,
                overflow: "hidden !important",
            } },
            React.createElement(AppBar_1.default, { elevation: 1, position: "static", color: "default" },
                React.createElement("div", { style: {
                        width: "100vw",
                        paddingLeft: 10,
                        display: "flex",
                        justifyContent: "space-between",
                    } },
                    React.createElement("div", { style: { display: "flex", marginTop: 10 } },
                        React.createElement("div", null,
                            React.createElement("img", { style: { width: 30, marginTop: -2, marginRight: 10 }, src: "./assets/icons/logo.png" })),
                        React.createElement("div", null,
                            React.createElement(core_1.Typography, { variant: "h6", style: { color: "#AAAAAA", marginTop: 0 }, color: "inherit" }, "Chesco POS"))),
                    React.createElement("div", { style: { marginRight: 26, display: "flex" } },
                        React.createElement("div", { style: { display: "flex", color: "#888080" } },
                            React.createElement("div", { style: { marginTop: 5, marginRight: 10 } },
                                React.createElement(core_1.Typography, { variant: "h6" },
                                    day,
                                    ",")),
                            React.createElement("div", { style: { marginTop: 5, marginRight: 10 } },
                                React.createElement(core_1.Typography, { variant: "h6" },
                                    month,
                                    " ",
                                    date.getDate(),
                                    ",")),
                            React.createElement("div", { style: { marginTop: 5, marginRight: 10 } },
                                React.createElement(core_1.Typography, { variant: "h6" }, year)),
                            React.createElement("div", { style: { marginTop: 9, marginRight: 20 } },
                                React.createElement(core_1.Typography, { variant: "h6" },
                                    React.createElement(grommet_1.Clock, { style: { color: "#888080" }, type: "digital" }))))))),
            React.createElement(core_1.Paper, { style: {
                    width: "100vw",
                    height: height < 780 ? "88vh" : height <= 900 ? "90vh" : "92vh",
                    minHeight: height < 780 ? "88vh" : height <= 900 ? "90vh" : "92vh",
                } },
                React.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: LoginPage_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/home", component: SelectionPan_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/licence", component: Licence_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/workperiod/list-file", component: WorkPeriod_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/workperiod/new-file", component: NewWorkPeriod_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/pos", component: Pos_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/tickets" },
                    React.createElement(Tickets_1.default, { ViewType: "user" })),
                React.createElement(react_router_dom_1.Route, { path: "/accounts", component: Accounts_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/accounts_details", component: AccountDetails_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/warehouses", component: Warehouses_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/departments", component: DepartmentView_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/reports", component: Reports_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/expenses" },
                    React.createElement(Expenses_1.default, { type: "user" })),
                React.createElement(react_router_dom_1.Route, { path: "/settings", component: Settings_1.default })),
            React.createElement(AppBar_1.default, { style: {
                    borderStyle: "solid",
                    height: 50,
                    borderWidth: 1,
                    zIndex: 20000,
                    overflow: "hidden",
                    borderColor: "transparent",
                    borderTopColor: props.Theme.theme === "light" ? "#C6C6C6" : "transparent",
                }, position: "static", color: "default" },
                React.createElement("div", { style: {
                        marginTop: 5,
                        marginRight: 15,
                        display: "flex",
                        justifyContent: "space-between",
                    } },
                    React.createElement("div", { style: { marginLeft: 20, display: "flex" } },
                        props.Dep.dep ? (React.createElement("div", { style: { display: "flex", marginLeft: 10, marginTop: 5 } },
                            React.createElement(semantic_ui_react_1.Icon, { name: "building" }),
                            React.createElement(core_1.Typography, null,
                                props.Dep.dep,
                                " | ",
                                props.User.userLogged.branche),
                            React.createElement("div", { style: { marginLeft: 10 } }))) : null,
                        sockTaking ? (React.createElement("div", { style: { display: "flex" } },
                            React.createElement(semantic_ui_react_1.Icon, { loading: true, name: "sync" }),
                            React.createElement(core_1.Typography, { style: { marginLeft: 3, marginTop: 5 }, variant: "caption" }, "Runing A Stock Take..."))) : null),
                    React.createElement("div", { style: { display: "flex" } },
                        props.User.isLoggedIn ? (React.createElement("div", { style: { display: "flex" } },
                            React.createElement("div", { style: { marginTop: 3, marginRight: 10 } },
                                React.createElement(core_1.Typography, null, props.User.userLogged.userName)),
                            React.createElement("div", { style: { marginTop: -15 } },
                                React.createElement(Drawer_1.default, { anchor: "bottom", open: Drawerstate.bottom, onClose: toggleDrawer("bottom", false) },
                                    React.createElement(Dep_Notifications_1.default, null))),
                            React.createElement("div", { style: { marginRight: 10, marginTop: -1 } },
                                React.createElement(core_1.Button, { type: "button", variant: "outlined", onClick: function () {
                                        history.push("/home");
                                    } },
                                    React.createElement(core_1.Typography, null, "Main Menu"))))) : null,
                        React.createElement("div", null,
                            React.createElement("div", { style: { display: "flex" } },
                                !props.Dep.dep ? (React.createElement("div", null,
                                    React.createElement(core_1.IconButton, { style: { width: 30, height: 30 }, onClick: function () {
                                            setOpenSettings(true);
                                        } },
                                        React.createElement(Settings_2.default, { style: { marginTop: -7 } })))) : null,
                                React.createElement(HtmlTooltip, { title: React.createElement(React.Fragment, null,
                                        React.createElement(core_1.Typography, { color: "inherit" }, "Change Theme Color"), "default theme:" + props.Theme.theme) },
                                    React.createElement(core_1.IconButton, { style: {
                                            width: 30,
                                            height: 30,
                                            backgroundColor: props.Theme.theme === "light" ? "#212121" : "#ccc",
                                        }, onClick: function () {
                                            // if (themeSet !== "light") setThemeSet("dark");
                                            // else setThemeSet("light");
                                            props.dispatchEvent({
                                                type: "setTheme",
                                                setTheme: props.Theme.theme === "light" ? "dark" : "light",
                                            });
                                        } })))))))),
        React.createElement(Drawer_1.default, { anchor: "bottom", open: showMaster, onClose: function () { return setshowMaster(false); } },
            React.createElement("div", { style: { height: "40vh" } },
                React.createElement(Masters_1.default, null))),
        React.createElement(Drawer_1.default, { anchor: "left", open: showUsers, onClose: function () { return setShowUsers(false); } },
            React.createElement("div", { style: { width: "80vh" } },
                React.createElement(Masters_1.default, null))),
        React.createElement(Modal_1.default, { open: OpenSettings, onClose: function () { return setOpenSettings(false); }, "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description" },
            React.createElement(core_1.Paper, { style: { margin: "auto" }, className: classes.paper },
                React.createElement(core_1.Paper, { style: { width: "100%" } },
                    React.createElement(DbSettings_1.default, null)))),
        React.createElement(Modal_1.default, { open: open, onClose: handleClose, "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description" },
            React.createElement(core_1.Paper, { style: { margin: "auto" }, className: classes.paper },
                React.createElement(core_1.Paper, { style: { width: "100%" } },
                    React.createElement(Meuns_1.default, null))))));
};
function mapStateToProps(state) {
    return {
        NetiveNotify: state.NetiveNotify,
        Theme: state.Theme,
        SocketConn: state.SocketConn,
        User: state.User,
        Dep: state.Dep,
        WorkPeriod: state.WorkPeriod,
        Updater: state.Updater,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Accapp);
//# sourceMappingURL=app.js.map