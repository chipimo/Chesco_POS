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
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var semantic_ui_react_1 = require("semantic-ui-react");
var IconButton_1 = require("@material-ui/core/IconButton");
var OutlinedInput_1 = require("@material-ui/core/OutlinedInput");
var InputAdornment_1 = require("@material-ui/core/InputAdornment");
var Visibility_1 = require("@material-ui/icons/Visibility");
var VisibilityOff_1 = require("@material-ui/icons/VisibilityOff");
var InputLabel_1 = require("@material-ui/core/InputLabel");
var FormControl_1 = require("@material-ui/core/FormControl");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
var react_swipeable_views_1 = require("react-swipeable-views");
var styles_1 = require("@material-ui/core/styles");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var Slide_1 = require("@material-ui/core/Slide");
var LinearProgress_1 = require("@material-ui/core/LinearProgress");
var react_toastify_1 = require("react-toastify");
var dataBase_1 = require("../../redux/dataBase");
var react_router_dom_1 = require("react-router-dom");
var Transition = React.forwardRef(function Transition(props, ref) {
    return React.createElement(Slide_1.default, __assign({ direction: "up", ref: ref }, props));
});
var _a = require("envfile"), parse = _a.parse, stringify = _a.stringify;
var fs = require("fs");
var sourcePath = "../../../.env";
var sourceObject = {};
var electron = require("electron");
var ipcRenderer = require("electron").ipcRenderer;
var remote = electron.remote;
var win = remote.getCurrentWindow();
var useStyles = styles_1.makeStyles(function (theme) { return ({
    textField: {
        width: "100%",
        display: "flex",
    },
}); });
// Inspired by the Facebook spinners.
var useStylesFacebook = styles_1.makeStyles({
    root: {
        position: "relative",
    },
    top: {
        color: "#eef3fd",
    },
    bottom: {
        color: "#6798e5",
        animationDuration: "550ms",
        marginTop: 20,
    },
});
// ispiered by facebook
function FacebookProgress(props) {
    var classes = useStylesFacebook();
    return (React.createElement("div", { className: classes.root },
        React.createElement(CircularProgress_1.default, __assign({ variant: "indeterminate", disableShrink: true, className: classes.bottom, size: 24, thickness: 4 }, props))));
}
var DialPad = function (props) {
    var history = react_router_dom_1.useHistory();
    var classes = useStyles();
    var _a = React.useState(""), pin = _a[0], setPin = _a[1];
    var _b = React.useState(""), name = _b[0], setName = _b[1];
    var _c = React.useState({
        brancheName: "",
        street: "",
        city: "",
        province: "",
        phone: "",
        appId: "",
    }), compInfo = _c[0], setCompInfo = _c[1];
    var _d = React.useState(false), showPassword = _d[0], setshowPassword = _d[1];
    var _e = React.useState(false), isSet = _e[0], setIsSet = _e[1];
    var _f = React.useState(false), serverEnvIsSet = _f[0], setServerEnvIsSet = _f[1];
    var inputRef = React.useRef();
    var _g = React.useState(0), progress = _g[0], setProgress = _g[1];
    var _h = React.useState(10), buffer = _h[0], setBuffer = _h[1];
    var _j = React.useState({
        db_host: "",
        db_port: "",
        db_name: "",
        db_user: "",
        db_pass: "",
    }), envData = _j[0], setEnvData = _j[1];
    var _k = React.useState("default"), layoutName = _k[0], setlayoutName = _k[1];
    var _l = React.useState(false), open = _l[0], setOpen = _l[1];
    var handleClickOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var onChange = function (input) {
        setPin(input);
    };
    var OnKeyPress = function (key) {
        console.log(key);
        // console.log(key);
    };
    var progressRef = React.useRef(function () { });
    React.useEffect(function () {
        progressRef.current = function () {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            }
            else {
                var diff = Math.random() * 10;
                var diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
        setTimeout(function () {
            setIsSet(true);
        }, 5300);
        document.addEventListener("keydown", handleKeyDown, false);
        dataBase_1.default.TestDbConnection(function (callback) {
            handleChangeIndex(1);
            setServerEnvIsSet(true);
            // console.log(callback);
        });
        return function () {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, []);
    var handleKeyDownEnter = function (event) {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };
    var theme = styles_1.useTheme();
    var _m = React.useState(0), value = _m[0], setValue = _m[1];
    var handleSaveServerEnv = function (type) {
        if (type === "useLocal") {
            fs.appendFile(".env", "\n        DB_NAME=chesco_pos\n        DB_PORT=5432\n        DB_HOST=localhost\n        DB_USER=postgres \n        DB_PASS=root", function (err) {
                if (err)
                    throw err;
                handleClickOpen();
                var timer = setInterval(function () {
                    progressRef.current();
                }, 500);
                setServerEnvIsSet(true);
                handleChangeIndex(1);
                setTimeout(function () {
                    ipcRenderer.send("relaunch", {});
                }, 6000);
            });
        }
        else {
            fs.appendFile(".env", "\n          DB_NAME=" + envData.db_name + "\n          DB_PORT=" + envData.db_port + "\n          DB_HOST=" + envData.db_host + "\n          DB_USER=" + envData.db_user + " \n          DB_PASS=" + envData.db_pass, function (err) {
                if (err)
                    throw err;
                handleClickOpen();
                var timer = setInterval(function () {
                    progressRef.current();
                }, 500);
                setServerEnvIsSet(true);
                handleChangeIndex(1);
                setTimeout(function () {
                    ipcRenderer.send("relaunch", {});
                }, 6000);
            });
        }
    };
    var handleEnvTextChange = function (type, event) {
        var _a;
        setEnvData(__assign({}, envData, (_a = {}, _a[type] = event.target.value, _a)));
    };
    var handleChangeIndex = function (index) {
        setValue(index);
    };
    var handleKeyDown = function (event) {
        inputRef.current.focus();
        if (event.key === "Enter") {
            handleSubmit();
        }
        else if (event.key === "Backspace") {
            pin = pin.slice(0, -1);
            setPin(pin);
        }
        else if (event.key === "Delete") {
            pin = "";
            setPin(pin);
        }
        else if (event.key === "Alt" ||
            event.key === "Tab" ||
            event.key === "Control" ||
            event.key === "Shift" ||
            event.key === "CapsLock") {
        }
        else {
            pin = pin + event.key;
            setPin(pin);
        }
    };
    var handleClick = function (value) {
        pin = pin + value;
        setPin(pin);
    };
    var clear = function () {
        pin = "";
        setPin(pin);
    };
    var handleSave = function () {
        dataBase_1.default.HandleDepartments({ type: "set", compInfo: compInfo }, function (reciveCallback) {
            if (reciveCallback.isSet) {
                setIsSet(true);
                props.dispatchEvent({
                    type: "SETCONFIG",
                    isSet: true,
                    config: reciveCallback.department[0],
                });
            }
        });
    };
    var handleSubmit = function () {
        dataBase_1.default.HandleLogIn({ pin: pin, name: name }, function (reciveCallback) {
            // console.log(reciveCallback);
            if (reciveCallback.isLoggedIn) {
                props.dispatchEvent({
                    type: "LOGIN",
                    userLogged: reciveCallback.config,
                });
                setTimeout(function () {
                    history.push("/home");
                }, 400);
            }
            else {
                react_toastify_1.toast("User not found or Account does not exist. Please contact the Adminstrtor", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "error",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                props.dispatchEvent({
                    type: "SHOW_NETIVE_NOTIFICATION",
                    payload: {
                        type: "error",
                        title: "Invalid Pin",
                        message: "User not found or Account does not exist. Please contact the Adminstrtor",
                        state: "msgBox",
                        detail: "",
                        data: {},
                    },
                });
                props.dispatchEvent({
                    type: "DISMISS_NETIVE_NOTIFY",
                });
            }
        });
    };
    var handleChange = function (event) {
        var _a;
        // console.log(event);
        setCompInfo(__assign({}, compInfo, (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var handleTextChange = function (event) {
        setName(event.target.value);
    };
    var handleClickShowPassword = function () {
        setshowPassword(!showPassword);
    };
    var handleMouseDownPassword = function (event) {
        event.preventDefault();
    };
    return (React.createElement("div", { style: { width: "100%", marginTop: 25 } },
        React.createElement(Dialog_1.default, { open: open, TransitionComponent: Transition, keepMounted: true, "aria-labelledby": "alert-dialog-slide-title", "aria-describedby": "alert-dialog-slide-description" },
            React.createElement(DialogTitle_1.default, { id: "alert-dialog-slide-title" }, "Optimum please wait while we restart your app"),
            React.createElement(DialogContent_1.default, null,
                React.createElement(DialogContentText_1.default, { id: "alert-dialog-slide-description" }, "This will help us to apply all the database configuring. Please wait this won't take long"),
                React.createElement("div", null,
                    React.createElement(LinearProgress_1.default, { variant: "buffer", value: progress, valueBuffer: buffer })))),
        props.Config.isSet ? (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement(FormControl_1.default, { className: classes.textField, variant: "outlined" },
                    React.createElement("div", { style: { marginTop: 7 } },
                        React.createElement(InputLabel_1.default, { htmlFor: "outlined-adornment-password" }, "Password"),
                        React.createElement(OutlinedInput_1.default, { autoFocus: true, inputRef: inputRef, id: "outlined-adornment-password", type: showPassword ? "text" : "password", value: pin, disabled: props.Config.isSet ? false : true, fullWidth: true, label: "ENTER PIN", color: props.Theme.theme === "light" ? "primary" : "secondary", 
                            // onChange={handleChange}
                            endAdornment: React.createElement(InputAdornment_1.default, { position: "end" },
                                React.createElement(IconButton_1.default, { "aria-label": "toggle password visibility", onClick: handleClickShowPassword, onMouseDown: handleMouseDownPassword, edge: "end" }, showPassword ? React.createElement(Visibility_1.default, null) : React.createElement(VisibilityOff_1.default, null))), labelWidth: 70 })))),
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                } },
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("1"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "1")),
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("2"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "2")),
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("3"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "3"))),
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                } },
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("4"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "4")),
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("5"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "5")),
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("6"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "6"))),
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                } },
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("7"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "7")),
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("8"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "8")),
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("9"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "9"))),
            React.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                } },
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function () {
                        handleKeyDown({ key: "Delete" });
                        // clear();
                    }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "X")),
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function (v) { return handleClick("0"); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "0")),
                React.createElement(core_1.Button, { disabled: props.Config.isSet ? false : true, onClick: function () { return handleSubmit(); }, style: {
                        width: "12vw",
                        backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                        height: "9vh",
                        borderRadius: 0,
                    }, variant: "outlined" },
                    React.createElement(core_1.Typography, { variant: "h5" }, "Login"))),
            React.createElement("div", { style: {
                    width: "100%",
                    marginTop: 10,
                    textAlign: "center",
                    justifyContent: "center",
                } },
                React.createElement("div", { style: { marginTop: 6 } },
                    React.createElement(core_1.Button, { onClick: function () { return win.close(); }, disabled: props.Config.isSet ? false : true, style: {
                            width: "10vw",
                            backgroundColor: props.Theme.theme === "light" ? "#fff" : "#212121",
                            height: "9vh",
                            borderRadius: 0,
                        }, variant: "outlined" },
                        React.createElement(core_1.Typography, { variant: "h5" },
                            React.createElement(semantic_ui_react_1.Icon, { name: "power off" }))))))) : (React.createElement("div", null, isSet ? (React.createElement("div", null,
            React.createElement("div", { style: { marginTop: "40%" } },
                React.createElement(core_1.Typography, null, "Setup New Company")),
            React.createElement("div", { style: { marginTop: 20 } },
                React.createElement(FormControl_1.default, { className: classes.textField, variant: "outlined" },
                    React.createElement(react_swipeable_views_1.default, { axis: theme.direction === "rtl" ? "x-reverse" : "x", index: value, onChangeIndex: handleChangeIndex },
                        React.createElement("div", { value: value, index: 0, dir: theme.direction, style: { padding: 6 } },
                            React.createElement(core_1.Divider, null),
                            "Remote server setup",
                            React.createElement("div", { style: { marginTop: 10 } },
                                React.createElement(core_1.TextField, { id: "standard-basic", label: "Server Host", color: "secondary", name: " db_host", value: envData.db_host, onChange: function (event) {
                                        return handleEnvTextChange("db_host", event);
                                    } }),
                                React.createElement(core_1.TextField, { type: "number", id: "standard-basic", label: "Post Number", color: "secondary", name: "db_port", value: envData.db_port, onChange: function (event) {
                                        return handleEnvTextChange("db_port", event);
                                    } }),
                                React.createElement(core_1.TextField, { id: "standard-basic", label: "Db Name", color: "secondary", name: "db_name", value: envData.db_name, onChange: function (event) {
                                        return handleEnvTextChange("db_name", event);
                                    } }),
                                React.createElement(core_1.TextField, { id: "standard-basic", label: "Db Username", color: "secondary", name: "db_user", value: envData.db_user, onChange: function (event) {
                                        return handleEnvTextChange("db_user", event);
                                    } }),
                                React.createElement(core_1.TextField, { id: "standard-basic", label: "Db Password", color: "secondary", name: "db_pass", value: envData.db_pass, onChange: function (event) {
                                        return handleEnvTextChange("db_pass", event);
                                    } })),
                            React.createElement("div", { style: { marginTop: 10, marginBottom: 10 } },
                                React.createElement(core_1.Button, { onClick: function () { return handleSaveServerEnv("useLocal"); }, variant: "contained", color: "primary", style: { marginTop: 20, width: "70%" } }, "Use Local host db")),
                            React.createElement(core_1.Divider, null)),
                        React.createElement("div", { value: value, index: 1, dir: theme.direction },
                            React.createElement("div", null,
                                React.createElement("div", null, "Company Name"),
                                React.createElement(OutlinedInput_1.default, { type: "text", value: compInfo.brancheName, name: "brancheName", fullWidth: true, label: "BRANCHE", color: props.Theme.theme === "light"
                                        ? "primary"
                                        : "secondary", onChange: handleChange, labelWidth: 70 })),
                            React.createElement("div", null,
                                React.createElement("div", null, "Street"),
                                React.createElement(OutlinedInput_1.default, { type: "text", value: compInfo.street, name: "street", fullWidth: true, label: "street", color: props.Theme.theme === "light"
                                        ? "primary"
                                        : "secondary", onChange: handleChange, labelWidth: 70 })),
                            React.createElement("div", null,
                                React.createElement("div", null, "City"),
                                React.createElement(OutlinedInput_1.default, { type: "text", value: compInfo.city, name: "city", fullWidth: true, label: "city", color: props.Theme.theme === "light"
                                        ? "primary"
                                        : "secondary", onChange: handleChange, labelWidth: 70 })),
                            React.createElement("div", null,
                                React.createElement("div", null, "Province"),
                                React.createElement(OutlinedInput_1.default, { type: "text", value: compInfo.province, name: "province", fullWidth: true, label: "province", color: props.Theme.theme === "light"
                                        ? "primary"
                                        : "secondary", onChange: handleChange, labelWidth: 70 })),
                            React.createElement("div", null,
                                React.createElement("div", null, "Phone Number"),
                                React.createElement(OutlinedInput_1.default, { type: "text", value: compInfo.phone, name: "phone", fullWidth: true, label: "phone", color: props.Theme.theme === "light"
                                        ? "primary"
                                        : "secondary", onChange: handleChange, labelWidth: 70 })))))),
            React.createElement("div", null, serverEnvIsSet ? (React.createElement(core_1.Button, { onClick: handleSave, variant: "contained", color: "primary", style: { marginTop: 20, width: "70%" } }, "Save")) : (React.createElement(core_1.Button, { onClick: handleSaveServerEnv, variant: "contained", color: "primary", style: { marginTop: 20, width: "70%" } }, "Next"))))) : (React.createElement("div", null,
            React.createElement(FacebookProgress, null)))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Config: state.Config,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DialPad);
//# sourceMappingURL=DialPad.js.map