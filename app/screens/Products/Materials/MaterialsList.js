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
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Divider_1 = require("@material-ui/core/Divider");
var Inbox_1 = require("@material-ui/icons/Inbox");
var Delete_1 = require("@material-ui/icons/Delete");
var Edit_1 = require("@material-ui/icons/Edit");
var IconButton_1 = require("@material-ui/core/IconButton");
var ListItemSecondaryAction_1 = require("@material-ui/core/ListItemSecondaryAction");
var semantic_ui_react_1 = require("semantic-ui-react");
var dataBase_1 = require("../../../redux/dataBase");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
        maxWidth: 400,
        padding: 10,
        backgroundColor: theme.palette.background.paper,
    },
}); });
var MaterialsList = function (props) {
    var classes = useStyles();
    var _a = React.useState(1444), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var _b = React.useState(""), selected = _b[0], setSelected = _b[1];
    var _c = React.useState({ data: [] }), state = _c[0], setState = _c[1];
    var handleListItemClick = function (event, index) {
        setSelectedIndex(index);
    };
    React.useEffect(function () {
        LoadData();
    }, []);
    var LoadData = function () {
        dataBase_1.default.HandelProducts({ _type: "GetMaterials" }, function (reciveCallback) {
            setState(__assign({}, state, { data: reciveCallback }));
        });
    };
    return (React.createElement("div", { style: { padding: 10 } },
        React.createElement("div", { style: { marginTop: 10, marginBottom: 10 } },
            React.createElement(semantic_ui_react_1.Button, { color: "black", onClick: function () {
                    return props.dispatchEvent({
                        type: "SETNEWSTATE",
                        state: {
                            changeView: "newMaterial",
                            data: {},
                        },
                    });
                } }, "Add New Material")),
        React.createElement("div", { className: classes.root },
            React.createElement(List_1.default, { component: "nav", "aria-label": "main mailbox folders" }, state.data.map(function (list, index) {
                return (React.createElement("div", null,
                    React.createElement(ListItem_1.default, { button: true, selected: selectedIndex === index, onClick: function (event) { return handleListItemClick(event, index); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(Inbox_1.default, null)),
                        React.createElement(ListItemText_1.default, { primary: list.materialName, secondary: list.quantity + " " + list.measuredBy + " left" }),
                        React.createElement(ListItemSecondaryAction_1.default, null,
                            React.createElement(IconButton_1.default, { onClick: function () {
                                    return props.dispatchEvent({
                                        type: "SETMATERIALSSTATE",
                                        state: {
                                            changeView: "editMaterial",
                                            data: list,
                                        },
                                    });
                                }, edge: "end", "aria-label": "delete" },
                                React.createElement(Edit_1.default, { style: { color: "teal" } })),
                            React.createElement(IconButton_1.default, { onClick: function () {
                                    dataBase_1.default.HandelProducts({ _type: "DeleteMaterial", item: list }, function (callback) {
                                        LoadData();
                                    });
                                }, edge: "end", "aria-label": "delete" },
                                React.createElement(Delete_1.default, { style: { color: "red" } })))),
                    React.createElement(Divider_1.default, null)));
            })))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MaterialsList);
//# sourceMappingURL=MaterialsList.js.map