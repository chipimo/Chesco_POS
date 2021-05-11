"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var NewProduct_1 = require("../Products/NewProduct");
var TableList_1 = require("./TableList");
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        width: "97%",
        padding: 10,
        backgroundColor: theme.palette.background.paper,
        overflowX: "auto",
        maxHeight: "60vh",
        paddingBottom: 20,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "absolute",
        width: 900,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
    },
}); });
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState(false), openNewProduct = _a[0], setopenNewProduct = _a[1];
    var handleOpenNewProduct = function () {
        setopenNewProduct(true);
    };
    var CloseOpenNewProduct = function () {
        setopenNewProduct(false);
    };
    React.useEffect(function () {
        if (props.Model.toClose === "new_product") {
            props.dispatchEvent({ type: "HANDELCLEAR" });
            CloseOpenNewProduct();
        }
    }, [props]);
    return (React.createElement("div", { style: {
            width: "98%",
            display: "flex",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: "#E5E5E5"
        } },
        React.createElement(core_1.Paper, { style: { width: "85%", height: "80vh" } },
            React.createElement("div", { style: { padding: 10, display: "flex" } },
                React.createElement(core_1.Typography, { variant: "h6" }, "Warehouse Product List")),
            React.createElement(core_1.Divider, null),
            React.createElement("div", { style: { padding: 10 } },
                React.createElement(TableList_1.default, null))),
        React.createElement("div", { style: { width: "15%" } },
            React.createElement("div", null,
                React.createElement(core_1.Button, { onClick: handleOpenNewProduct, variant: "contained", color: "primary", style: { width: "100%" } }, "Add New Product to warehouse")),
            React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openNewProduct, className: classes.modal, onClose: CloseOpenNewProduct },
                React.createElement("div", { className: classes.paper },
                    React.createElement(NewProduct_1.default, { type: "addToWareHouse" }))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Model: state.Model,
        LoadTabel: state.LoadTabel,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map