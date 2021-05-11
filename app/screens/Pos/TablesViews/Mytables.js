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
var material_table_1 = require("material-table");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AddBox_1 = require("@material-ui/icons/AddBox");
var ArrowDownward_1 = require("@material-ui/icons/ArrowDownward");
var Check_1 = require("@material-ui/icons/Check");
var ChevronLeft_1 = require("@material-ui/icons/ChevronLeft");
var ChevronRight_1 = require("@material-ui/icons/ChevronRight");
var Clear_1 = require("@material-ui/icons/Clear");
var DeleteOutline_1 = require("@material-ui/icons/DeleteOutline");
var Edit_1 = require("@material-ui/icons/Edit");
var FilterList_1 = require("@material-ui/icons/FilterList");
var FirstPage_1 = require("@material-ui/icons/FirstPage");
var LastPage_1 = require("@material-ui/icons/LastPage");
var Remove_1 = require("@material-ui/icons/Remove");
var SaveAlt_1 = require("@material-ui/icons/SaveAlt");
var Search_1 = require("@material-ui/icons/Search");
var ViewColumn_1 = require("@material-ui/icons/ViewColumn");
var ShoppingCart_1 = require("@material-ui/icons/ShoppingCart");
var dataBase_1 = require("../../../redux/dataBase");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var core_1 = require("@material-ui/core");
var AddShoppingCart_1 = require("@material-ui/icons/AddShoppingCart");
var styles_1 = require("@material-ui/core/styles");
var Modal_1 = require("@material-ui/core/Modal");
var Backdrop_1 = require("@material-ui/core/Backdrop");
var Fade_1 = require("@material-ui/core/Fade");
var Paper_1 = require("@material-ui/core/Paper");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var ListAlt_1 = require("@material-ui/icons/ListAlt");
var react_toastify_1 = require("react-toastify");
var Currency = require("react-currency-formatter");
var ipcRenderer = require("electron").ipcRenderer;
var columns = [
    { id: "ItemName", label: "Product Name", minWidth: 170 },
    {
        id: "qnt",
        label: "Quantity",
        minWidth: 170,
        align: "right",
    },
    {
        id: "initalPrice",
        label: "Price",
        minWidth: 170,
        align: "right",
    },
    {
        id: "total",
        label: "Total Cost",
        minWidth: 170,
        align: "right",
    },
];
var tableIcons = {
    Add: react_1.forwardRef(function (props, ref) { return React.createElement(AddBox_1.default, null); }),
    Check: react_1.forwardRef(function (props, ref) { return React.createElement(Check_1.default, null); }),
    Clear: react_1.forwardRef(function (props, ref) { return React.createElement(Clear_1.default, null); }),
    Delete: react_1.forwardRef(function (props, ref) { return React.createElement(DeleteOutline_1.default, null); }),
    DetailPanel: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronRight_1.default, null); }),
    Edit: react_1.forwardRef(function (props, ref) { return React.createElement(Edit_1.default, null); }),
    Export: react_1.forwardRef(function (props, ref) { return React.createElement(SaveAlt_1.default, null); }),
    Filter: react_1.forwardRef(function (props, ref) { return React.createElement(FilterList_1.default, null); }),
    FirstPage: react_1.forwardRef(function (props, ref) { return React.createElement(FirstPage_1.default, null); }),
    LastPage: react_1.forwardRef(function (props, ref) { return React.createElement(LastPage_1.default, null); }),
    NextPage: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronRight_1.default, null); }),
    PreviousPage: react_1.forwardRef(function (props, ref) { return React.createElement(ChevronLeft_1.default, null); }),
    ResetSearch: react_1.forwardRef(function (props, ref) { return React.createElement(Clear_1.default, null); }),
    Search: react_1.forwardRef(function (props, ref) { return React.createElement(Search_1.default, null); }),
    SortArrow: react_1.forwardRef(function (props, ref) { return React.createElement(ArrowDownward_1.default, null); }),
    ThirdStateCheck: react_1.forwardRef(function (props, ref) { return React.createElement(Remove_1.default, null); }),
    ViewColumn: react_1.forwardRef(function (props, ref) { return React.createElement(ViewColumn_1.default, null); }),
    ShoppingCart: react_1.forwardRef(function (props, ref) { return React.createElement(ShoppingCart_1.default, null); }),
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
}); });
var Mytables = function (props) {
    var classes = useStyles();
    var _a = React.useState({
        columns: [],
        data: [],
    }), state = _a[0], setState = _a[1];
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var _c = React.useState({}), selected = _c[0], setSeleted = _c[1];
    var _d = React.useState(0), total = _d[0], setTotal = _d[1];
    var _e = React.useState("1"), qty = _e[0], setQty = _e[1];
    var _f = React.useState([]), selectedRows = _f[0], setSeletedRows = _f[1];
    var _g = React.useState([]), selectedRowsDefault = _g[0], setSeletedRowsDefault = _g[1];
    var _h = React.useState(""), tableName = _h[0], settableName = _h[1];
    var _j = React.useState(""), time = _j[0], settime = _j[1];
    var _k = React.useState(""), date = _k[0], setdate = _k[1];
    var _l = React.useState(""), tableKey = _l[0], settableKey = _l[1];
    var history = react_router_dom_1.useHistory();
    var _m = React.useState({
        data: [],
    }), purchase = _m[0], setPurchase = _m[1];
    var _o = React.useState(0), page = _o[0], setPage = _o[1];
    var _p = React.useState(10), rowsPerPage = _p[0], setRowsPerPage = _p[1];
    var _q = React.useState(false), isKitchen = _q[0], setIsKitchen = _q[1];
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    React.useEffect(function () {
        dataBase_1.default.HandleTables({ _type: "getMyTabes" }, function (reciveCallback) {
            var dataArr = [];
            reciveCallback.data.map(function (data) {
                if (data.user === props.User.userLogged.userName ||
                    props.User.userLogged.prevarges === "1") {
                    dataArr.push(data);
                }
            });
            props.dispatchEvent({
                type: "SETCOUNT",
                count: dataArr.length,
            });
            if (props.User.userLogged.prevarges === "1")
                setState(__assign({}, state, { data: dataArr, columns: [
                        {
                            title: "Table Name",
                            field: "name",
                        },
                        {
                            title: "Date",
                            field: "date",
                        },
                        {
                            title: "Time",
                            field: "time",
                        },
                        {
                            title: "Cashier",
                            field: "user",
                        },
                    ] }));
            else
                setState(__assign({}, state, { data: dataArr, columns: [
                        {
                            title: "Table Name",
                            field: "name",
                        },
                        {
                            title: "Date",
                            field: "date",
                        },
                        {
                            title: "Time",
                            field: "time",
                        },
                    ] }));
        });
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
            setPurchase(__assign({}, purchase, { data: receiveCallback.productsList }));
        });
    }, []);
    var handlesubmit = function () {
        selected.qty = parseInt(qty);
        // selected.amountInstore = selected.amountInstore - parseInt(selected.qty);
        selected.tableName = tableName;
        selected.key = tableKey;
        selected.time = time;
        selected.date = date;
        selected._type = "KitchenTableUpdate";
        dataBase_1.default.HandleTables(selected, function (callback) { });
        var index = selectedRows.findIndex(function (x) { return x.productKey === selected.productKey; });
        if (index !== -1) {
            var tempArr = [];
            var totalNum_1 = 0;
            selectedRows[index].qnt =
                parseInt(qty) + parseInt(selectedRows[index].qnt);
            selectedRows[index].amountInstore = selectedRows[index].amountInstore - parseInt(qty);
            // setTimeout(() => {
            var data = {
                qty: parseInt(qty),
                table: tableName,
                product_list: { data: selectedRows },
                _type: "updateTable",
            };
            // console.log(data);
            dataBase_1.default.HandleTables(data, function (callback) {
                // console.log(callback);
                var dataArr = [];
                var index = callback.data.findIndex(function (x) { return x.name === tableName; });
                callback.data[index].list.data.map(function (list) {
                    totalNum_1 = list.qnt * list.initalPrice + totalNum_1;
                });
                setTotal(totalNum_1);
                setSeletedRows(callback.data[index].list.data);
                react_toastify_1.toast("Added " + qty + " successfully to", {
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
            // }, 900);
        }
        else {
            var data = {
                qty: parseInt(qty),
                tableName: tableName,
                selectedRows: selectedRows,
                _type: "addToTable",
            };
            var temArry = selectedRows;
            var totalNum = 0;
            selected.isAddedToCart = true;
            selected.qnt = selected.qty;
            temArry.push(selected);
            // selectedRows.push(temArry)
            setSeletedRows(temArry);
            setRowsPerPage(25);
            // console.log(data);
            temArry.map(function (list) {
                totalNum = list.qnt * list.initalPrice + totalNum;
            });
            setTotal(totalNum);
            dataBase_1.default.HandleTables(data, function (callback) {
                react_toastify_1.toast("Added successfully", {
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
        }
    };
    var handleOnchange = function (event) {
        setQty(event.target.value);
    };
    var search = function (event, item) {
        setSeleted(item);
    };
    return (React.createElement("div", { style: { padding: 20, width: "100%", height: "95vh", overflow: "auto" } },
        React.createElement("div", { style: { padding: 10 } },
            React.createElement(core_1.Divider, null)),
        React.createElement(material_table_1.default, { icons: tableIcons, title: "My Tables", columns: state.columns, data: state.data, 
            // options={{
            //   exportButton: true,
            // }}
            actions: props.User.userLogged.prevarges === "1"
                ? [
                    {
                        icon: "edit",
                        disabled: props.User.userLogged.prevarges === "1" ? false : true,
                        tooltip: "Edit Table",
                        onClick: function (event, rowData) {
                            // console.log(rowData);
                            props.dispatchEvent({
                                type: "SETTOPRINT",
                                id: rowData.id,
                                table: rowData.name,
                                userName: rowData.user,
                            });
                            props.dispatchEvent({
                                type: "RESTATECART",
                            });
                            props.dispatchEvent({
                                type: "TABLESET",
                                state: false,
                                table_name: rowData.name,
                            });
                            rowData.list.data.map(function (list) {
                                // console.log(list);
                                props.dispatchEvent({
                                    type: "ADDTOCART",
                                    payload: {
                                        items: list,
                                    },
                                });
                                props.dispatchEvent({
                                    type: "SETTABLEACTIONS",
                                    ActionType: "close_left_drawer & show edit",
                                    id: rowData.id,
                                });
                            });
                            setTimeout(function () {
                                history.push("/pos");
                            }, 100);
                        },
                    },
                    {
                        icon: "delete",
                        disabled: props.User.userLogged.prevarges === "1" ? false : true,
                        tooltip: "Delete Bill",
                        onClick: function (event, rowData) {
                            dataBase_1.default.HandleTables({ _type: "DeleteTableFromMyTables", id: rowData.id }, function (callback) {
                                dataBase_1.default.HandleTables({ _type: "getMyTabes" }, function (reciveCallback) {
                                    props.dispatchEvent({
                                        type: "SETCOUNT",
                                        count: reciveCallback.data.length,
                                    });
                                    props.dispatchEvent({
                                        type: "CLEARTABLEACTIONS",
                                    });
                                    setState(__assign({}, state, { data: reciveCallback.data }));
                                });
                            });
                        },
                    },
                ]
                : [
                    {
                        icon: function () { return React.createElement(ShoppingCart_1.default, null); },
                        tooltip: "Close Sale",
                        onClick: function (event, rowData) {
                            // console.log(rowData);
                            props.dispatchEvent({
                                type: "RESTATECART",
                            });
                            props.dispatchEvent({
                                type: "SETTOPRINT",
                                id: rowData.id,
                                table: rowData.name,
                            });
                            rowData.list.data.map(function (list) {
                                props.dispatchEvent({
                                    type: "ADDTOCART",
                                    payload: {
                                        items: list,
                                    },
                                });
                                props.dispatchEvent({
                                    type: "SETTABLEACTIONS",
                                    ActionType: "close_left_drawer & open_bottom_drawer",
                                    id: rowData.id,
                                });
                            });
                        },
                    },
                    {
                        icon: "print",
                        tooltip: "Print Out Bill",
                        onClick: function (event, rowData) {
                            rowData.compInfo = props.Dep;
                            ipcRenderer.send("do_print_bill", rowData);
                        },
                    },
                    {
                        icon: function () { return React.createElement(AddShoppingCart_1.default, null); },
                        tooltip: "Add To Bill",
                        onClick: function (event, rowData) {
                            // console.log(rowData);
                            var totalNum = 0;
                            settableName(rowData.name);
                            settime(rowData.time);
                            setdate(rowData.date);
                            settableKey(rowData.id);
                            setSeletedRows(rowData.list.data);
                            setSeletedRowsDefault(rowData.list.data);
                            setSeleted(rowData);
                            setOpen(true);
                            rowData.list.data.map(function (list) {
                                totalNum = list.qnt * list.initalPrice + totalNum;
                            });
                            setTotal(totalNum);
                        },
                    },
                    {
                        icon: function () { return React.createElement(ListAlt_1.default, null); },
                        disabled: isKitchen,
                        tooltip: "Print Out Order To kitchen",
                        onClick: function (event, rowData) {
                            rowData.compInfo = props.Dep;
                            rowData._type = "KitchenTable";
                            dataBase_1.default.HandleTables(rowData, function (reciveCallback) {
                                if (reciveCallback.length === 0)
                                    setIsKitchen(false);
                            });
                        },
                    },
                ] }),
        React.createElement("div", null,
            React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: open, onClose: handleClose, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                    timeout: 500,
                } },
                React.createElement(Fade_1.default, { in: open },
                    React.createElement("div", { className: classes.paper },
                        React.createElement("div", null,
                            React.createElement(core_1.Typography, { variant: "h6" },
                                "Table name: ",
                                tableName)),
                        React.createElement("div", { style: { padding: 10 } },
                            React.createElement(core_1.Divider, null)),
                        React.createElement("div", { style: { display: "flex", width: "100%" } },
                            React.createElement("div", { style: {
                                    width: "75%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                } },
                                React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: purchase.data, getOptionLabel: function (option) { return option.ItemName; }, onChange: search, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Search products", fullWidth: true, variant: "outlined", style: { width: 300 } }))); } }),
                                React.createElement(core_1.TextField, { id: "outlined-basic", label: "Qty", type: "number", variant: "outlined", value: qty, onChange: handleOnchange })),
                            React.createElement("div", { style: { marginLeft: 10, marginRight: 10 } },
                                React.createElement(core_1.Button, { onClick: handlesubmit, variant: "outlined", startIcon: React.createElement(AddShoppingCart_1.default, null) }, "Add to bill"))),
                        React.createElement("div", { style: { padding: 10 } },
                            React.createElement(core_1.Divider, null)),
                        React.createElement("div", { style: { marginTop: 10, marginBottom: 10 } },
                            React.createElement(Paper_1.default, { className: classes.root },
                                React.createElement(TableContainer_1.default, { className: classes.container },
                                    React.createElement(Table_1.default, { stickyHeader: true, "aria-label": "sticky table" },
                                        React.createElement(TableHead_1.default, null,
                                            React.createElement(TableRow_1.default, null, columns.map(function (column, indexMain) { return (React.createElement(TableCell_1.default, { key: indexMain + column.id, align: column.align, style: { minWidth: column.minWidth } }, column.label)); }))),
                                        React.createElement(TableBody_1.default, null, selectedRows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(function (row) {
                                            return (React.createElement(TableRow_1.default, { hover: true, role: "checkbox", tabIndex: -1, key: row.code }, columns.map(function (column, index) {
                                                var value = row[column.id];
                                                if (column.id === "total")
                                                    return (React.createElement(TableCell_1.default, { key: index + row.ItemName, align: column.align },
                                                        React.createElement(Currency, { locale: "en", quantity: row.initalPrice * row.qnt, symbol: "K" })));
                                                return (React.createElement(TableCell_1.default, { key: index + row.ItemName, align: column.align }, column.format &&
                                                    typeof value === "number" ? (React.createElement(Currency, { locale: "en", quantity: value, symbol: "K" })) : (value)));
                                            })));
                                        })))),
                                React.createElement(Paper_1.default, { style: {
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        marginRight: 15,
                                    } },
                                    React.createElement(core_1.Typography, { variant: "h5", style: { marginRight: 15 } }, "Total"),
                                    React.createElement(core_1.Typography, { variant: "h5" },
                                        React.createElement(Currency, { locale: "en", quantity: total, symbol: "K" }))),
                                React.createElement(TablePagination_1.default, { rowsPerPageOptions: [10, 25, 100], component: "div", count: selectedRows.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }))),
                        React.createElement("div", { style: { padding: 10 } },
                            React.createElement(core_1.Divider, null)),
                        React.createElement("div", { style: { marginTop: 10, marginBottom: 10 } },
                            React.createElement(core_1.Button, { onClick: function () {
                                    handleClose();
                                }, variant: "contained", color: "secondary" }, "Close"))))))));
};
var mapStateToProps = function (state) { return ({
    MytablesReducer: state.MytablesReducer,
    User: state.User,
    Dep: state.Dep,
}); };
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Mytables);
//# sourceMappingURL=Mytables.js.map