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
var styles_1 = require("@material-ui/core/styles");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var Typography_1 = require("@material-ui/core/Typography");
var Box_1 = require("@material-ui/core/Box");
var Sale_1 = require("./Sale");
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (React.createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "vertical-tabpanel-" + index, "aria-labelledby": "vertical-tab-" + index }, other), value === index && (React.createElement(Box_1.default, { p: 3 },
        React.createElement(Typography_1.default, null, children)))));
}
function a11yProps(index) {
    return {
        id: "vertical-tab-" + index,
        "aria-controls": "vertical-tabpanel-" + index,
    };
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: "100%",
    },
    tabs: {
        borderRight: "1px solid " + theme.palette.divider,
    },
}); });
var index = function () {
    var classes = useStyles();
    var _a = React.useState(0), value = _a[0], setValue = _a[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    return (React.createElement("div", { className: classes.root },
        React.createElement(Tabs_1.default, { orientation: "vertical", variant: "scrollable", value: value, onChange: handleChange, "aria-label": "Vertical tabs example", className: classes.tabs },
            React.createElement(Tab_1.default, __assign({ label: "Sale" }, a11yProps(0))),
            React.createElement(Tab_1.default, __assign({ label: "Sales Repports" }, a11yProps(1))),
            React.createElement(Tab_1.default, __assign({ label: "Product List" }, a11yProps(2)))),
        React.createElement(TabPanel, { value: value, index: 0 },
            React.createElement(Sale_1.default, null)),
        React.createElement(TabPanel, { value: value, index: 1 }, "Item Two"),
        React.createElement(TabPanel, { value: value, index: 2 }, "Item Three")));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map