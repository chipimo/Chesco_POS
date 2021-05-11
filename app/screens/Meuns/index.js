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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_swipeable_views_1 = require("react-swipeable-views");
var styles_1 = require("@material-ui/core/styles");
var AppBar_1 = require("@material-ui/core/AppBar");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var Box_1 = require("@material-ui/core/Box");
var Expenses_1 = require("../Reports/Expenses/Expenses");
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (React.createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "full-width-tabpanel-" + index, "aria-labelledby": "full-width-tab-" + index }, other), value === index && React.createElement(Box_1.default, { p: 3 }, children)));
}
function a11yProps(index) {
    return {
        id: "full-width-tab-" + index,
        "aria-controls": "full-width-tabpanel-" + index,
    };
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
}); });
var index = function () {
    var classes = useStyles();
    var theme = styles_1.useTheme();
    var _a = React.useState(0), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    var handleChangeIndex = function (index) {
        setValue(index);
    };
    return (React.createElement("div", { style: { width: "100%" } },
        React.createElement("div", { className: classes.root },
            React.createElement(AppBar_1.default, { position: "static", color: "default" },
                React.createElement(Tabs_1.default, { value: value, onChange: handleChange, indicatorColor: "primary", textColor: "primary", variant: "fullWidth", "aria-label": "full width tabs example" },
                    React.createElement(Tab_1.default, __assign({ label: "Expenses" }, a11yProps(0))))),
            React.createElement(react_swipeable_views_1.default, { axis: theme.direction === "rtl" ? "x-reverse" : "x", index: value, onChangeIndex: handleChangeIndex },
                React.createElement(TabPanel, { value: value, index: 0, dir: theme.direction },
                    React.createElement(Expenses_1.default, null))))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map