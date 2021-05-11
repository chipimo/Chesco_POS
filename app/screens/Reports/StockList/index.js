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
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var react_toastify_1 = require("react-toastify");
var semantic_ui_react_1 = require("semantic-ui-react");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var dataBase_1 = require("../../../redux/dataBase");
var Totals_1 = require("./Totals");
var ipcRenderer = require("electron").ipcRenderer;
var Currency = require("react-currency-formatter");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: "73vh",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        position: "absolute",
        width: "90vw",
        height: 500,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 4, 3),
    },
    inline: {
        display: "inline",
    },
    list: {
        maxHeight: 400,
        overflow: "auto",
    },
    listHeader: {
        backgroundColor: theme.palette.background.paper,
    },
}); });
var columns = [
    {
        id: "checkBox",
        label: "",
        minWidth: 30,
        align: "left",
        format: function (value) { return value.toLocaleString(); },
    },
    { id: "ItemName", label: "Product", minWidth: 90 },
    {
        id: "group",
        label: "Category",
        minWidth: 90,
        align: "right",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "branche",
        label: "Branch",
        minWidth: 90,
        align: "right",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "supplier",
        label: "Supplier",
        minWidth: 90,
        align: "right",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "isTaxEnabled",
        label: "Vat Status",
        minWidth: 90,
        align: "left",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "amountInstore",
        label: "Qty",
        minWidth: 90,
        align: "left",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "buyingPrice",
        label: "Buying Price",
        minWidth: 90,
        align: "right",
        format: function (value) { return value.toLocaleString(); },
    },
    {
        id: "sallingprice",
        label: "Selling Price",
        minWidth: 70,
        align: "right",
        format: function (value) { return value.toFixed(2); },
    },
];
var initialState = {
    mouseX: null,
    mouseY: null,
};
var initialState2 = {
    mouseX: null,
    mouseY: null,
};
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), page = _a[0], setPage = _a[1];
    var _b = React.useState(50), rowsPerPage = _b[0], setRowsPerPage = _b[1];
    var _c = React.useState(), selectedId = _c[0], setSelectedId = _c[1];
    var _d = React.useState(), selected = _d[0], setSelected = _d[1];
    var _e = React.useState(false), openNewProduct = _e[0], setopenNewProduct = _e[1];
    var _f = React.useState({
        rows: [],
    }), state = _f[0], setState = _f[1];
    var _g = React.useState(initialState), menustate = _g[0], setMenuState = _g[1];
    var _h = React.useState(initialState2), menustate2 = _h[0], setMenuState2 = _h[1];
    var _j = React.useState([]), multi = _j[0], SetMulti = _j[1];
    var _k = React.useState(false), isMulti = _k[0], setisMulti = _k[1];
    var _l = React.useState(false), OpenProductList = _l[0], setOpenProductList = _l[1];
    var _m = React.useState(true), LoadOnceOff = _m[0], setLoadOnceOff = _m[1];
    var _o = React.useState({
        TotalBuyingPrices: 0,
        ExpectedProfit: 0,
        TotalStockValue: 0,
    }), TotalsState = _o[0], setTotalsState = _o[1];
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var _p = React.useState(false), open = _p[0], setOpen = _p[1];
    var _q = React.useState(false), LoadingData = _q[0], setLoadingData = _q[1];
    var handleDailogClickOpen = function () {
        setOpen(true);
    };
    var handleDailogClose = function () {
        setOpen(false);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    React.useEffect(function () {
        if (props.Model.toClose === "edit_product") {
            props.dispatchEvent({ type: "HANDELCLEAR" });
            CloseOpenNewProduct();
        }
        else if (props.LoadTabel.load) {
            props.dispatchEvent({ type: "CLEARLOADTABEL" });
        }
        else if (props.Model.toClose === "LoadServer_all_products") {
            props.dispatchEvent({ type: "HANDELCLEAR" });
            dataBase_1.default.HandelProducts({ _type: "getServerProducts" }, function (receiveCallback) {
                setTimeout(function () { }, 100);
            });
        }
        if (LoadOnceOff) {
            setLoadOnceOff(false);
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "getGrouped" }, function (receiveCallback) {
                // console.log(receiveCallback.productResult[0]);
                setTimeout(function () {
                    if (receiveCallback.productResult[0]) {
                        if (receiveCallback.productResult[0].length > 50)
                            setRowsPerPage(100);
                        props.dispatchEvent({
                            type: "ProductList",
                            list: receiveCallback.productResult[0],
                        });
                    }
                }, 100);
            });
        }
        var buyingPrice = 0;
        var profit = 0;
        var stockValue = 0;
        props.ProductList.list.map(function (list) {
            buyingPrice = list.amountInstore * list.buyingPrice + buyingPrice;
            stockValue = list.amountInstore * list.initalPrice + stockValue;
            profit = stockValue - buyingPrice;
        });
        setTotalsState(__assign({}, TotalsState, { TotalBuyingPrices: buyingPrice, ExpectedProfit: profit, TotalStockValue: stockValue }));
    }, [props]);
    var handleClose = function () {
        setMenuState(initialState);
    };
    var handleCloseSync = function () {
        setMenuState2(initialState2);
    };
    var handleOpenMulti = function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "mulitList", name: selected.ItemName }, function (receiveCallback) {
            setTimeout(function () {
                SetMulti(receiveCallback.data);
            }, 100);
        });
        handleClose();
        HandelOpenProductList();
    };
    var CloseProductList = function () {
        setOpenProductList(false);
    };
    var CloseOpenNewProduct = function () {
        setopenNewProduct(false);
        handleClose();
    };
    var HandelOpenProductList = function () {
        setOpenProductList(true);
    };
    var saveCSV = function () {
        ipcRenderer.send("save_csv", {
            type: "StockList",
            header: [
                { id: "ItemName", title: "Product" },
                {
                    id: "group",
                    title: "Category",
                },
                {
                    id: "branche",
                    title: "Branch",
                },
                {
                    id: "SupplierName",
                    title: "Supplier",
                },
                {
                    id: "isTaxEnabled",
                    title: "Vat Status",
                },
                {
                    id: "amountInstore",
                    title: "Qty",
                },
                {
                    id: "buyingPrice",
                    title: "Buying Price",
                },
                {
                    id: "sallingprice",
                    title: "Selling Price",
                },
            ],
            data: props.ProductList.list,
        });
    };
    var HandelAddToInventory = function () {
        var purchaseSelected = [selected];
        var data = {
            _type: "add_to_store",
            purchaseSelected: purchaseSelected,
            dep: props.Dep.dep,
        };
        dataBase_1.default.HandelProducts(data, function (reciveCallback) {
            react_toastify_1.toast("Successfully Purchased " + (reciveCallback.data.number === 1
                ? reciveCallback.data.name
                : reciveCallback.data.number + " Products") + " ", {
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
    };
    var HandelDelete = function (serverdelete) {
        handleDailogClose();
        dataBase_1.default.HandelProducts({ _type: "delete", serverdelete: serverdelete, selected: selected }, function (callback) {
            props.dispatchEvent({ type: "LOADTABEL" });
            react_toastify_1.toast("Successfully Purchased Successfully Deleted " + callback.name, {
                position: "top-right",
                autoClose: 5000,
                type: "success",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleClose();
        });
    };
    var UploadProduct = function () { };
    var DeleteProductServer = function (data) { };
    return (React.createElement("div", { style: {
            width: "80vw",
            height: "85vh",
            overflow: "auto",
        } },
        React.createElement(Dialog_1.default, { open: open, onClose: handleDailogClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
            React.createElement(DialogTitle_1.default, { id: "alert-dialog-title" }, "Delete " + (selected ? selected.ItemName : "product") + " ?"),
            React.createElement(DialogContent_1.default, null,
                React.createElement(DialogContentText_1.default, { id: "alert-dialog-description" }, "This product will be deleted from database")),
            React.createElement(DialogActions_1.default, null,
                React.createElement(core_1.Button, { onClick: function () {
                        HandelDelete(false);
                    }, color: "primary", variant: "contained", autoFocus: true }, "Disagree"),
                React.createElement(core_1.Button, { onClick: function () {
                        HandelDelete(true);
                    }, variant: "contained", color: "secondary" }, "Agree"))),
        React.createElement("div", null,
            React.createElement(core_1.Button, { variant: "contained", onClick: function () {
                    saveCSV();
                } }, "Export as csv file")),
        React.createElement(core_1.Paper, { className: classes.root },
            React.createElement(semantic_ui_react_1.Loader, { active: LoadingData }, "Loading Data From Server..."),
            React.createElement(TableContainer_1.default, { className: classes.container },
                React.createElement(Table_1.default, { size: "small", stickyHeader: true, "aria-label": "sticky table" },
                    React.createElement(TableHead_1.default, null,
                        React.createElement(TableRow_1.default, null,
                            columns.map(function (column, id) { return (React.createElement(TableCell_1.default, { key: id, align: column.align, style: { minWidth: column.minWidth } },
                                React.createElement(core_1.Typography, { variant: "h6" }, column.label))); }),
                            React.createElement(TableCell_1.default, null,
                                React.createElement(core_1.Typography, null, "Stock Value")))),
                    React.createElement(TableBody_1.default, null, props.ProductList.list
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(function (row, index) {
                        return (React.createElement(TableRow_1.default, { style: { cursor: "context-menu" }, onClick: function () {
                                setSelectedId(row.productKey);
                                setSelected(row);
                                setisMulti(row.isMulity);
                            }, hover: true, selected: selectedId === row.productKey, role: "checkbox", tabIndex: -1, key: index + row.productKey },
                            columns.map(function (column, Innerindex) {
                                var value = row[column.id];
                                var labelId = "enhanced-table-checkbox-" + Innerindex;
                                if (column.id === "checkBox") {
                                    return (React.createElement(TableCell_1.default, { key: labelId, padding: "checkbox" },
                                        React.createElement(core_1.Checkbox, { checked: selectedId === row.productKey, inputProps: {
                                                "aria-labelledby": labelId,
                                            } })));
                                }
                                else if (column.id === "isTaxEnabled") {
                                    if (row.isTaxEnabled)
                                        return (React.createElement(TableCell_1.default, { key: labelId },
                                            React.createElement(core_1.Typography, null, "inclusive")));
                                    else
                                        return (React.createElement(TableCell_1.default, { key: labelId },
                                            React.createElement(core_1.Typography, null, "not inclusive")));
                                }
                                else if (column.id === "supplier") {
                                    return (React.createElement(TableCell_1.default, { key: labelId },
                                        React.createElement(core_1.Typography, null, row.SupplierName)));
                                }
                                else if (column.id === "amountInstore") {
                                    return (React.createElement(TableCell_1.default, { key: labelId },
                                        React.createElement(core_1.Typography, null, row.amountInstore)));
                                }
                                else {
                                    return (React.createElement(TableCell_1.default, { key: column.id, align: column.align }, column.format && typeof value === "number" ? (React.createElement(Currency, { locale: "en", quantity: value, symbol: "K" })) : (value)));
                                }
                            }),
                            React.createElement(TableCell_1.default, null,
                                React.createElement(core_1.Typography, null,
                                    React.createElement(Currency, { locale: "en", quantity: row.initalPrice * row.amountInstore, symbol: "K" })))));
                    })))),
            React.createElement(core_1.Paper, { style: { display: "flex", justifyContent: "flex-end" } },
                React.createElement("div", { style: { marginTop: 12, padding: 10, marginRight: 10 } },
                    React.createElement(Totals_1.default, { TotalBuyingPrices: TotalsState.TotalBuyingPrices, ExpectedProfit: TotalsState.ExpectedProfit, TotalStockValue: TotalsState.TotalStockValue }))),
            React.createElement(TablePagination_1.default, { rowsPerPageOptions: [10, 25, 50, 100, 150, 200], component: "div", count: state.rows.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage })),
        React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: OpenProductList, className: classes.modal, onClose: CloseProductList },
            React.createElement("div", { className: classes.paper }, selected ? (React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(core_1.Typography, { color: "textPrimary" }, selected.ItemName)),
                React.createElement("div", null,
                    React.createElement(core_1.List, { subheader: React.createElement(core_1.ListSubheader, { className: classes.listHeader }, "Price List"), className: classes.list }, multi.map(function (data, sInnerIndex) { return (React.createElement(core_1.ListItem, { key: sInnerIndex + data.sallingprice },
                        React.createElement(core_1.ListItemText, { style: {
                                color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                            }, primary: React.createElement(core_1.Typography, null,
                                React.createElement(Currency, { locale: "en", quantity: parseInt(data.sallingprice), symbol: "K" })), secondary: React.createElement(React.Fragment, null,
                                React.createElement(core_1.Typography, { component: "span", variant: "body2", className: classes.inline, color: "textPrimary" },
                                    "barcode:",
                                    " ",
                                    data.barcode !== ""
                                        ? data.barcode
                                        : "no barcode",
                                    ",", " qnt: " + data.qnt + ", alertOut: " + data.alertOut)) }))); }))))) : null))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Model: state.Model,
        Dep: state.Dep,
        ProductsMainList: state.ProductsMainList,
        LoadTabel: state.LoadTabel,
        ProductSync: state.ProductSync,
        SocketConn: state.SocketConn,
        ProductList: state.ProductList,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map