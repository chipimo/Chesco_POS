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
var styles_1 = require("@material-ui/core/styles");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var react_toastify_1 = require("react-toastify");
var Inbox_1 = require("@material-ui/icons/Inbox");
var Delete_1 = require("@material-ui/icons/Delete");
var dataBase_1 = require("../../redux/dataBase");
var GroupList_1 = require("./GroupList");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
        maxWidth: 360,
        maxHeight: 360,
        overflow: "auto",
        backgroundColor: theme.palette.background.paper,
    },
}); });
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState(false), addNew = _a[0], setAddnew = _a[1];
    var _b = React.useState(false), edit = _b[0], setEdit = _b[1];
    var _c = React.useState({ data: [] }), groupList = _c[0], setGroupList = _c[1];
    var _d = React.useState(""), name = _d[0], setName = _d[1];
    var _e = React.useState(null), selected = _e[0], setSelected = _e[1];
    React.useEffect(function () {
        Loaddata();
    }, []);
    var Loaddata = function () {
        dataBase_1.default.HandlePrinterGroups({ _type: "get" }, function (callback) {
            setGroupList(__assign({}, groupList, { data: callback }));
        });
    };
    return (React.createElement("div", { style: { padding: 20, width: "100%" } },
        React.createElement("div", { style: { width: "80%", margin: "auto" } },
            React.createElement(core_1.Paper, { style: { width: "100%", padding: 10, display: "flex" } },
                React.createElement(core_1.Typography, null, "Settings"),
                React.createElement("div", { style: { marginLeft: 20 } }, edit ? (React.createElement("div", null,
                    React.createElement(core_1.Button, { onClick: function () { return setEdit(false); }, variant: "outlined" }, "Cancel"))) : (React.createElement(core_1.Button, { onClick: function () { return setAddnew(true); }, variant: "outlined" }, "Add New Group")))),
            React.createElement("div", { style: { marginTop: 15 } },
                edit ? (React.createElement("div", null,
                    React.createElement(GroupList_1.default, { selected: selected }))) : (React.createElement("div", { className: classes.root },
                    React.createElement(List_1.default, { component: "nav", "aria-label": "main mailbox folders" }, groupList.data.map(function (group, index) {
                        return (React.createElement(ListItem_1.default, { onClick: function () {
                                setSelected(group);
                                setEdit(true);
                            }, key: index, button: true },
                            React.createElement(ListItemIcon_1.default, null,
                                React.createElement(Inbox_1.default, null)),
                            React.createElement(ListItemText_1.default, { primary: group.group }),
                            React.createElement(core_1.ListItemSecondaryAction, null,
                                React.createElement(core_1.IconButton, { onClick: function () {
                                        return dataBase_1.default.HandlePrinterGroups({ _type: "delete", idKey: group.idKey }, function (callback) {
                                            Loaddata();
                                        });
                                    }, edge: "end", "aria-label": "delete" },
                                    React.createElement(Delete_1.default, null)))));
                    })))),
                addNew ? (React.createElement("div", { style: { display: "flex", marginTop: 10 } },
                    React.createElement(core_1.TextField, { id: "outlined-basic", label: "Outlined", variant: "outlined", onChange: function (e) { return setName(e.target.value); } }),
                    React.createElement(core_1.Button, { variant: "outlined", onClick: function () {
                            if (name !== "")
                                dataBase_1.default.HandlePrinterGroups({ _type: "set", name: name }, function (callback) {
                                    setName("");
                                    Loaddata();
                                    setAddnew(false);
                                });
                            else
                                react_toastify_1.toast("Name is already set", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    type: "error",
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                        }, style: { marginLeft: 20 } }, "Save Group"))) : null))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map