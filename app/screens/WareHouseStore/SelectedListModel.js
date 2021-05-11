"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var Card_1 = require("@material-ui/core/Card");
var CardActions_1 = require("@material-ui/core/CardActions");
var CardContent_1 = require("@material-ui/core/CardContent");
var Button_1 = require("@material-ui/core/Button");
var Typography_1 = require("@material-ui/core/Typography");
var TextField_1 = require("@material-ui/core/TextField");
var dataBase_1 = require("../../redux/dataBase");
var core_1 = require("@material-ui/core");
var react_toastify_1 = require("react-toastify");
var useStyles = styles_1.makeStyles({
    root: {
        minWidth: 275,
        margin: 10,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
var SelectedListModel = function (props) {
    var selectedRows = props.selectedRows, type = props.type;
    var classes = useStyles();
    var _a = React.useState([]), productsList = _a[0], setProductsList = _a[1];
    React.useEffect(function () {
        getData();
    }, []);
    var getData = function () {
        dataBase_1.default.HandelProducts({ _type: "getWarehouseListById", selectedRows: selectedRows }, function (callback) {
            // console.log(callback);
            setProductsList(callback);
        });
    };
    var handleChange = function (event) {
        var index = productsList.findIndex(function (x) { return x.productKey === event.index; });
        productsList[index].transfer = parseInt(event.e.target.value);
        productsList[index].user = props.User;
        // console.log(productsList);
    };
    var handleTransfer = function () {
        if (type === "trans") {
            dataBase_1.default.HandelProducts({ _type: "TransferWarehouseListById", productsList: productsList }, function (callback) {
                getData();
                react_toastify_1.toast("Successfully Updated", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                props.dispatchEvent({ type: "HANDELCLOSE", toClose: "transModel" });
            });
        }
        else {
            dataBase_1.default.HandelProducts({ _type: "PurchaseWarehouseListById", productsList: productsList }, function (callback) {
                getData();
                react_toastify_1.toast("Successfully Updated", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                props.dispatchEvent({ type: "HANDELCLOSE", toClose: "transModel" });
            });
        }
    };
    return (React.createElement("div", { style: { width: "70%", height: "80%" } },
        React.createElement(core_1.Divider, null),
        React.createElement("div", { style: { padding: 10 } }, type === "trans" ? (React.createElement(Typography_1.default, { variant: "h6" }, "Warehouse Transfer List")) : (React.createElement(Typography_1.default, { variant: "h6" }, "Reorder Stock List"))),
        React.createElement(core_1.Divider, null),
        productsList.map(function (product, index) {
            return (React.createElement(Card_1.default, { key: index, className: classes.root, variant: "outlined" },
                React.createElement(CardContent_1.default, null,
                    React.createElement("div", { style: { display: "flex" } },
                        React.createElement(Typography_1.default, { className: classes.title, color: "primary", variant: "h6", gutterBottom: true }, product.ItemName),
                        React.createElement(Typography_1.default, { className: classes.title, style: { marginLeft: 10 }, color: "textSecondary", gutterBottom: true },
                            "In stock ",
                            product.amountInstore))),
                React.createElement(CardActions_1.default, null, type === "trans" ? (React.createElement(TextField_1.default, { id: "outlined-basic", label: "Transfer", variant: "outlined", type: "number", onChange: function (e) {
                        return handleChange({ index: product.productKey, e: e });
                    } })) : (React.createElement(TextField_1.default, { id: "outlined-basic", label: "Amount of items", variant: "outlined", type: "number", onChange: function (e) {
                        return handleChange({ index: product.productKey, e: e });
                    } })))));
        }),
        React.createElement("div", { style: { marginLeft: 10 } },
            React.createElement(Button_1.default, { onClick: handleTransfer, variant: "outlined" }, "Transfer"))));
};
function mapStateToProps(state) {
    return {
        User: state.User,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SelectedListModel);
//# sourceMappingURL=SelectedListModel.js.map