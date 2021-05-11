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
var react_toastify_1 = require("react-toastify");
var dataBase_1 = require("../../redux/dataBase");
var db = require("electron-db");
var ipcRenderer = require("electron").ipcRenderer;
var index = function (props) {
    var _a = React.useState({
        host: "localhost",
        user: "postgres",
        port: 5432,
        database: "chesco_pos",
        password: "root",
        old_host: "localhost",
        old_user: "postgres",
        old_port: 5432,
        old_database: "chesco_pos",
        old_password: "root",
    }), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        db.getAll("config", function (succ, data) {
            setState(__assign({}, state, { user: data[0].user, host: data[0].host, password: data[0].password, port: data[0].port, database: data[0].database, old_user: data[0].user, old_host: data[0].host, old_password: data[0].password, old_port: data[0].port, old_database: data[0].database }));
        });
    }, []);
    var handleChange = function (event) {
        var _a;
        setState(__assign({}, state, (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var handleSubmit = function () {
        // console.log(state);
        var where = {
            host: state.old_host,
            user: state.old_user,
            port: state.old_port,
            database: state.old_database,
            password: state.old_password,
        };
        var set = {
            host: state.host,
            user: state.user,
            port: state.port,
            database: state.database,
            password: state.password,
        };
        db.updateRow("config", where, set, function (succ, msg) {
            react_toastify_1.toast("Db settings updated successfully", {
                position: "bottom-right",
                autoClose: 5000,
                type: "success",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(function () {
                ipcRenderer.send("relaunch", {});
            }, 1000);
        });
    };
    return (React.createElement("div", { style: { padding: 20 } },
        React.createElement("div", { style: { marginBottom: 10 } },
            React.createElement(core_1.Typography, { variant: "h6" }, "Database settings"),
            React.createElement(core_1.Typography, { style: { paddingTop: 10 }, variant: "h6" },
                "default database connection:",
                " ",
                React.createElement("span", { style: { color: "teal" } }, state.host))),
        React.createElement(core_1.Divider, null),
        React.createElement("div", { style: { marginTop: 10 } },
            React.createElement(core_1.Paper, { style: { padding: 10 } },
                React.createElement("div", { style: { paddingTop: 10, paddingBottom: 10 } },
                    React.createElement(core_1.TextField, { onChange: handleChange, name: "host", value: state.host, id: "filled-basic", label: "Server host", variant: "filled" })),
                React.createElement("div", { style: { paddingTop: 10, paddingBottom: 10 } },
                    React.createElement(core_1.TextField, { onChange: handleChange, name: "user", value: state.user, id: "filled-basic", label: "User", variant: "filled" })),
                React.createElement("div", { style: { paddingTop: 10, paddingBottom: 10 } },
                    React.createElement(core_1.TextField, { onChange: handleChange, name: "port", value: state.port, id: "filled-basic", label: "Port", type: "number", variant: "filled" })),
                React.createElement("div", { style: { paddingTop: 10, paddingBottom: 10 } },
                    React.createElement(core_1.TextField, { onChange: handleChange, name: "database", value: state.database, id: "filled-basic", label: "Database", variant: "filled" })),
                React.createElement("div", { style: { paddingTop: 10, paddingBottom: 10 } },
                    React.createElement(core_1.TextField, { onChange: handleChange, name: "password", value: state.password, id: "filled-basic", label: "password", variant: "filled" })),
                React.createElement(core_1.Button, { variant: "outlined", onClick: handleSubmit, style: { marginTop: 10 } }, "Save and Restart")),
            React.createElement("div", { style: { marginTop: 30 } },
                React.createElement(core_1.Button, { onClick: function () {
                        dataBase_1.default.MakeAlTables();
                    } }, "Create missing tables")))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map