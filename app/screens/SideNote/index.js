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
var Modal_1 = require("@material-ui/core/Modal");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemSecondaryAction_1 = require("@material-ui/core/ListItemSecondaryAction");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var IconButton_1 = require("@material-ui/core/IconButton");
var Delete_1 = require("@material-ui/icons/Delete");
var Edit_1 = require("@material-ui/icons/Edit");
var dataBase_1 = require("../../redux/dataBase");
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
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}); });
var index = function (props) {
    var _a = React.useState(1), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var _b = React.useState({ data: [] }), state = _b[0], setState = _b[1];
    var _c = React.useState({ data: [] }), List = _c[0], setList = _c[1];
    var classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    var modalStyle = React.useState(getModalStyle)[0];
    var _d = React.useState(false), open = _d[0], setOpen = _d[1];
    var _e = React.useState(""), edit = _e[0], setEdit = _e[1];
    var _f = React.useState(""), editId = _f[0], setEditId = _f[1];
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    React.useEffect(function () {
        LoadData();
    }, []);
    var LoadData = function () {
        dataBase_1.default.HandleExtra({ _type: "get", state: state }, function (callback) {
            setList(__assign({}, List, { data: callback }));
        });
    };
    var handleListItemClick = function (event, index) {
        setSelectedIndex(index);
    };
    var HandleAdd = function (id) {
        var infor = state.data;
        // if(state.data.length===1)
        infor.push({ id: state.data.length, value: "" });
        setState(__assign({}, state, { data: infor }));
    };
    var HandleRemove = function (id) { };
    var onSave = function (id) {
        // console.log(state);
        dataBase_1.default.HandleExtra({ _type: "set", state: state }, function (callback) {
            setState(__assign({}, state, { data: [] }));
            dataBase_1.default.HandleExtra({ _type: "get", state: state }, function (callback) {
                setList(__assign({}, List, { data: callback }));
            });
        });
    };
    var HandleonChange = function (e, id) {
        var infor = (state.data[id].value = e.target.value);
    };
    var body = (React.createElement("div", { style: modalStyle, className: classes.paper },
        React.createElement(core_1.TextField, { id: "standard-basic", label: "Extra Massage", value: edit, onChange: function (e) { return setEdit(e.target.value); } }),
        React.createElement(core_1.Button, { style: { marginTop: 10, marginBottom: 10 }, onClick: function () {
                dataBase_1.default.HandleExtra({ _type: "edit", value: edit, idKey: editId }, function (callback) {
                    LoadData();
                    setOpen(false);
                });
            } }, "Save Changes")));
    return (React.createElement("div", { style: { padding: 10 } },
        React.createElement(core_1.Paper, null,
            React.createElement("div", { style: { marginTop: 10, marginBottom: 10 } }, "Extra Massage"),
            React.createElement("div", { style: { display: "flex" } },
                React.createElement("div", { style: { width: "30%", padding: 10 } },
                    React.createElement("ul", { style: { listStyle: "none" } }, List.data.map(function (items, x) {
                        return (React.createElement("div", null,
                            React.createElement(ListItem_1.default, null,
                                React.createElement(ListItemText_1.default, { primary: items.msg }),
                                React.createElement(ListItemSecondaryAction_1.default, null,
                                    React.createElement("div", { style: { display: "flex" } },
                                        React.createElement(IconButton_1.default, { onClick: function () {
                                                handleOpen();
                                                setEdit(items.msg);
                                                setEditId(items.idKey);
                                            }, edge: "end", "aria-label": "delete" },
                                            React.createElement(Edit_1.default, null)),
                                        React.createElement(IconButton_1.default, { onClick: function () {
                                                dataBase_1.default.HandleExtra({ _type: "delete", idKey: items.idKey }, function (callback) {
                                                    LoadData();
                                                });
                                            }, edge: "end", "aria-label": "delete" },
                                            React.createElement(Delete_1.default, null)))))));
                    }))),
                React.createElement("div", { style: { width: "65%", padding: 10 } },
                    React.createElement("div", { style: { padding: 10 } },
                        React.createElement(core_1.Button, { disabled: open, variant: "outlined", onClick: HandleAdd }, "Add new extra massage"),
                        React.createElement(core_1.Button, { style: { marginLeft: 10 }, variant: "outlined", onClick: onSave }, "Save")),
                    React.createElement("div", { style: { display: "block" } }, state.data.map(function (item, index) {
                        return (React.createElement("div", { key: index },
                            React.createElement(core_1.TextField, { id: "standard-basic", label: "Extra Massage", onChange: function (e) { return HandleonChange(e, index); } })));
                    }))))),
        React.createElement(Modal_1.default, { open: open, onClose: handleClose, "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description" }, body)));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map