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
var ListAlt_1 = require("@material-ui/icons/ListAlt");
var Delete_1 = require("@material-ui/icons/Delete");
var Edit_1 = require("@material-ui/icons/Edit");
var IconButton_1 = require("@material-ui/core/IconButton");
var ListItemSecondaryAction_1 = require("@material-ui/core/ListItemSecondaryAction");
var dataBase_1 = require("../../redux/dataBase");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 10,
    },
}); });
var IngredientsList = function (props) {
    var classes = useStyles();
    var _a = React.useState(1), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var _b = React.useState({ data: [] }), state = _b[0], setState = _b[1];
    var _c = React.useState(""), selected = _c[0], setSelected = _c[1];
    var handleListItemClick = function (event, index) {
        setSelectedIndex(index);
    };
    React.useEffect(function () {
        LoadData();
    }, []);
    var LoadData = function () {
        dataBase_1.default.HandelProducts({ _type: "GetRecipe" }, function (reciveCallback) {
            setState(__assign({}, state, { data: reciveCallback }));
        });
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: classes.root },
            React.createElement(List_1.default, { component: "nav", "aria-label": "main mailbox folders" }, state.data.map(function (list, index) {
                return (React.createElement(ListItem_1.default, { key: index, button: true, selected: selected === list.idKey, onClick: function (event) { return setSelected(list.idKey); } },
                    React.createElement(ListItemIcon_1.default, null,
                        React.createElement(ListAlt_1.default, null)),
                    React.createElement(ListItemText_1.default, { primary: list.recipeName }),
                    React.createElement(ListItemSecondaryAction_1.default, null,
                        React.createElement(IconButton_1.default, { onClick: function () {
                                return props.dispatchEvent({
                                    type: "SETINGREDIENTSSTATE",
                                    state: {
                                        changeView: "editIngre",
                                        data: list,
                                    },
                                });
                            }, edge: "end", "aria-label": "delete" },
                            React.createElement(Edit_1.default, { style: { color: "teal" } })),
                        React.createElement(IconButton_1.default, { onClick: function () {
                                dataBase_1.default.HandelProducts({ _type: "DeleteRecipe", item: list }, function (callback) {
                                    LoadData();
                                });
                            }, edge: "end", "aria-label": "delete" },
                            React.createElement(Delete_1.default, { style: { color: "red" } })))));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
//# sourceMappingURL=IngredientsList.js.map