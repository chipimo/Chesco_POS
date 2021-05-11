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
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var Button_1 = require("@material-ui/core/Button");
var core_1 = require("@material-ui/core");
var react_toastify_1 = require("react-toastify");
var dataBase_1 = require("../../redux/dataBase");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        position: "absolute",
        width: "100%",
        padding: 15,
        height: "83vh",
        overflow: "auto",
    },
    table: {
        width: "100%",
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
        borderCollapse: "collapse",
    },
    tableCol: {
        width: 200,
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
    },
    tableRow: {
        width: 200,
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}); });
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState({
        backgroundColor: "#3b3b3b",
        textColor: "#fff",
    }), colors = _a[0], setColor = _a[1];
    var _b = React.useState({
        TableName: "",
    }), values = _b[0], setValues = _b[1];
    var _c = React.useState({
        tableError: "",
    }), errors = _c[0], setErrors = _c[1];
    var _d = React.useState([]), mainTables = _d[0], setMainTables = _d[1];
    // Edit Mood
    var _e = React.useState(false), isInEditMood = _e[0], setIsInEditMood = _e[1];
    var _f = React.useState({ tableName: "" }), toEdit = _f[0], setToEdit = _f[1];
    // React Effect
    React.useEffect(function () {
        LoadGroup();
    }, [props]);
    // Load all groups
    var LoadGroup = function () {
        dataBase_1.default.HandleTables({ _type: "get" }, function (reciveCallback) {
            setMainTables(reciveCallback.data);
        });
    };
    var handleTextChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        if (prop === "TableName")
            setErrors(__assign({}, errors, { tableError: "" }));
    }; };
    var handelColorChange = function (type, InputColor) {
        var _a;
        setColor(__assign({}, colors, (_a = {}, _a[type] = InputColor, _a)));
    };
    var handelSubmit = function () {
        if (values.TableName === "")
            return setErrors(__assign({}, errors, { tableError: "Name Should not be empty" }));
        var Data = {
            _type: "set",
            table: values.TableName,
            colors: colors,
        };
        dataBase_1.default.HandleTables(Data, function (callback) {
            if (callback.isSet) {
                setValues(__assign({}, values, { TableName: "" }));
                dataBase_1.default.HandleTables({ _type: "get" }, function (reciveCallback) {
                    setMainTables(reciveCallback.data);
                });
                react_toastify_1.toast("Successfully Added " + values.TableName + " ", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                react_toastify_1.toast("\"" + values.TableName + "\" Table already exists", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "error",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };
    var handelSubmitEdit = function () {
        dataBase_1.default.HandleTables({ _type: "editTable", group: toEdit, value: values.TableName }, function (reciveCallback) {
            LoadGroup();
            if (reciveCallback.done)
                react_toastify_1.toast("Successfully edited category name ", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            else
                react_toastify_1.toast("Error!! Failed to edit category name ", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "error",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        });
    };
    return (React.createElement("div", { className: classes.paper, style: {
            backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
            color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
        } },
        React.createElement(core_1.Typography, { variant: "h5" }, "Table Settings"),
        React.createElement("div", { style: { paddingBottom: 20, paddingTop: 12 } },
            React.createElement(core_1.Grid, { container: true, spacing: 2 },
                React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                    React.createElement(TextField_1.default, { name: "TableName", variant: "outlined", required: true, fullWidth: true, value: values.TableName, onChange: handleTextChange("TableName"), id: "TableName", label: "Table Name", 
                        // color="secondary"
                        error: errors.tableError === "" ? false : true, helperText: isInEditMood ? "You're in edit mood" : errors.tableError })),
                React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                    React.createElement("div", { style: { display: "flex" } },
                        React.createElement("div", null,
                            React.createElement(core_1.Typography, null, "Button Color"),
                            React.createElement("input", { onChange: function (e) {
                                    handelColorChange("backgroundColor", e.target.value);
                                }, type: "color" })),
                        React.createElement("div", { style: { marginLeft: 15 } },
                            React.createElement(core_1.Typography, null, "Button Text Color"),
                            React.createElement("input", { onChange: function (e) {
                                    handelColorChange("textColor", e.target.value);
                                }, type: "color" })),
                        React.createElement("div", { style: {
                                marginLeft: 15,
                                borderColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                padding: 15,
                            } },
                            "Button Preview",
                            React.createElement("div", null,
                                React.createElement(Button_1.default, { style: {
                                        // width: 150,
                                        backgroundColor: colors.backgroundColor,
                                        color: colors.textColor,
                                    } },
                                    React.createElement(core_1.Typography, { style: { width: "100%" } }, values.TableName)))))))),
        React.createElement("div", { style: {
                display: "flex",
                marginTop: 10,
            } },
            React.createElement("div", null,
                React.createElement(Button_1.default, { disabled: isInEditMood, style: { marginLeft: 10 }, variant: "contained", color: "primary", onClick: function () { return handelSubmit(); } }, "Save"),
                React.createElement(Button_1.default, { disabled: !isInEditMood, style: { marginLeft: 10 }, variant: "contained", color: "primary", onClick: function () { return handelSubmitEdit(); } }, "Save Edited"),
                React.createElement(Button_1.default, { disabled: !isInEditMood, style: { marginLeft: 10 }, variant: "contained", color: "secondary", onClick: function () {
                        setIsInEditMood(false);
                        setValues(__assign({}, values, { TableName: "" }));
                    } }, "Cancel"))),
        React.createElement("div", { style: { marginTop: 10 } },
            React.createElement("table", { style: {
                    width: "70%",
                    borderColor: "#ccc",
                    borderWidth: 1,
                    borderStyle: "solid",
                } },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { className: classes.tableCol }, "Action"),
                        React.createElement("th", { className: classes.tableCol }, "Tables"))),
                React.createElement("tbody", null, mainTables.map(function (list, index) { return (React.createElement("tr", { key: index },
                    props.User.userLogged.prevarges === "1" ? (React.createElement("td", { className: classes.tableRow },
                        React.createElement("button", { style: {
                                backgroundColor: "#5A342E",
                                color: "#fff",
                                cursor: "pointer",
                            }, onClick: function () {
                                dataBase_1.default.HandleTables({ _type: "delete", table: list }, function (callback) {
                                    LoadGroup();
                                    react_toastify_1.toast("Successfully deleted !", {
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
                            } }, "Delete"),
                        React.createElement("button", { style: { marginLeft: 10, cursor: "pointer" }, onClick: function () {
                                setIsInEditMood(true);
                                setToEdit(__assign({}, toEdit, { tableName: list.table }));
                                setValues(__assign({}, values, { TableName: list.table }));
                            } }, "Edit Table"))) : null,
                    React.createElement("td", { className: classes.tableRow }, list.table))); }))))));
};
function mapStateToProps(state) {
    return {
        Cart: state.Cart,
        Theme: state.Theme,
        User: state.User,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map