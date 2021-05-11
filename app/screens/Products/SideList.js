"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    inline: {
        display: "inline",
    },
    list_root: {
        width: "100%",
        listStyle: "none",
        padding: 0,
        margin: 0,
        marginTop: 2,
    },
    list_light: {
        width: "100%",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "#E3E3E3",
        },
    },
    list_dark: {
        width: "100%",
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "#6B6B6B",
        },
    },
    mainList: {
        height: "70vh",
        width: "100%",
        overflow: "auto",
    },
}); });
var InvSideView = function (props) {
    var classes = useStyles();
    var _a = React.useState(10), active = _a[0], setActive = _a[1];
    var handleSelected = function (id) {
        setActive(id);
        switch (id) {
            case 0:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "product_list",
                    title: "Products",
                });
                break;
            case 1:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "Price_List_Editor",
                    title: "Products",
                });
                break;
            case 2:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "Product_Groups",
                    title: "Products",
                });
                break;
            case 3:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "Damages",
                    title: "Damages",
                });
                break;
            case 4:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "ingredients",
                    title: "Ingredients",
                });
                break;
            case 5:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "Bulkupload",
                    title: "Bulkupload",
                });
                break;
            case 6:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "sideNote",
                    title: "Product Extra Message",
                });
                break;
            case 7:
                props.dispatchEvent({
                    type: "CHANGEVIEW",
                    view: "OrderSettings",
                    title: "Order Printer Settings",
                });
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", null,
        React.createElement("ul", { className: classes.list_root },
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark },
                React.createElement("li", { onClick: function () { return handleSelected(0); }, style: {
                        padding: 6,
                        backgroundColor: active === 0
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 0 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 0
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Product List"))),
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark },
                React.createElement("li", { onClick: function () { return handleSelected(2); }, style: {
                        padding: 6,
                        backgroundColor: active === 2
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 2 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 2
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Product Categories"))),
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark },
                React.createElement("li", { onClick: function () { return handleSelected(3); }, style: {
                        padding: 6,
                        backgroundColor: active === 3
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 3 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 3
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Damages"))),
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark },
                React.createElement("li", { onClick: function () { return handleSelected(4); }, style: {
                        padding: 6,
                        backgroundColor: active === 4
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 4 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 4
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Ingredients Settings"))),
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark },
                React.createElement("li", { onClick: function () { return handleSelected(5); }, style: {
                        padding: 6,
                        backgroundColor: active === 5
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 5 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 5
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Bulk Upload"))),
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark },
                React.createElement("li", { onClick: function () { return handleSelected(6); }, style: {
                        padding: 6,
                        backgroundColor: active === 6
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 6 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 6
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Extra Massage"))),
            React.createElement("div", { className: props.Theme.theme === "light"
                    ? classes.list_light
                    : classes.list_dark },
                React.createElement("li", { onClick: function () { return handleSelected(7); }, style: {
                        padding: 6,
                        backgroundColor: active === 7
                            ? props.Theme.theme === "light"
                                ? "#F78A09"
                                : "#212121"
                            : "transparent",
                        color: active === 7 ? "#fff" : "#1D1D1D",
                    } },
                    React.createElement(core_1.Typography, { style: {
                            color: props.Theme.theme === "light"
                                ? active === 7
                                    ? "#fff"
                                    : "#1D1D1D"
                                : "#fff",
                        } }, "Order Printer Settings"))))));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(InvSideView);
//# sourceMappingURL=SideList.js.map