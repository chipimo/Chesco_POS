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
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var react_toastify_1 = require("react-toastify");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var List_2 = require("@material-ui/icons/List");
var RemoveShoppingCart_1 = require("@material-ui/icons/RemoveShoppingCart");
var dataBase_1 = require("../../../redux/dataBase");
var ipcRenderer = require("electron").ipcRenderer;
var index = function (props) {
    var _a = React.useState([]), MainCategory = _a[0], setMainCategory = _a[1];
    var _b = React.useState([]), ReturnsList = _b[0], setReturnsList = _b[1];
    var _c = React.useState({
        name: "",
        number: "",
        date: "",
        list: { list: [] },
        paid: 0,
        total: 0,
        invoiceNumber: "",
        Day: "",
        selling: 0,
    }), selected = _c[0], setSeleted = _c[1];
    var _d = React.useState({
        active: null,
        selectedItem: {},
        amount: "0",
        reason: "",
    }), state = _d[0], setState = _d[1];
    var _e = React.useState(false), error = _e[0], setError = _e[1];
    var _f = React.useState(0), selectedIndex = _f[0], setSelectedIndex = _f[1];
    var _g = React.useState(0), view = _g[0], setView = _g[1];
    var handleListItemClick = function (event, index) {
        setSelectedIndex(index);
    };
    React.useEffect(function () {
        dataBase_1.default.HandelReports({ _type: "all_get_sales_tickets" }, function (receiveCallback) {
            setTimeout(function () {
                setMainCategory(receiveCallback.data);
            }, 100);
        });
        HandlleReturnsGet();
    }, []);
    var HandlleReturnsGet = function () {
        dataBase_1.default.HandelReports({ _type: "get_returns" }, function (receiveCallback) {
            setTimeout(function () {
                setReturnsList(receiveCallback.data);
            }, 100);
        });
    };
    var savePdf = function () {
        ipcRenderer.send("save_pdf", {
            type: "returns",
            data: ReturnsList,
            header: [
                { id: "invoiceNumber", title: "Invoice Number" },
                { id: "productName", title: "Product Name" },
                { id: "qnt", title: "Reurned" },
                { id: "description", title: "Reason" },
                { id: "date", title: "Date" },
                { id: "customer", title: "Customer" },
                { id: "sallingprice", title: "Price" },
            ],
        });
    };
    var ReduceItem = function (item) {
        if (parseInt(state.amount) !== 0) {
            if (state.selectedItem.qnt >= parseInt(state.amount)) {
                var data = {
                    _type: "stockReturn",
                    invoiceNumber: selected.invoiceNumber,
                    selectedItem: state.selectedItem,
                    amount: parseInt(state.amount),
                    reason: state.reason,
                    customer: selected.name,
                    list: selected.list,
                    paid: selected.paid,
                    total: selected.total,
                    Day: selected.Day,
                    selling: selected.selling,
                };
                dataBase_1.default.HandelProducts(data, function (callback) {
                    HandlleReturnsGet();
                    setSeleted(__assign({}, selected, { name: "", number: "", date: "", list: { list: [] }, paid: 0, total: 0, Day: "", selling: 0, invoiceNumber: "" }));
                    if (callback)
                        react_toastify_1.toast("Successfuly returned", {
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
            else {
                react_toastify_1.toast("The number of items can't be more then the number of products on the invoice  ", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "error",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        else {
            react_toastify_1.toast("Make sure you put a correct amount to reduce", {
                position: "top-right",
                autoClose: 5000,
                type: "error",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError(true);
        }
    };
    var handleChange = function (event) {
        var _a, _b, _c, _d;
        // console.log(event.target.value);
        if (event.target.name === "amount")
            if (event.target.value === "")
                setState(__assign({}, state, (_a = {}, _a[event.target.name] = 0, _a)));
            else if (parseInt(event.target.value) > 0)
                setState(__assign({}, state, (_b = {}, _b[event.target.name] = 0, _b)));
            else
                setState(__assign({}, state, (_c = {}, _c[event.target.name] = parseInt(event.target.value), _c)));
        setState(__assign({}, state, (_d = {}, _d[event.target.name] = event.target.value, _d)));
        setError(false);
    };
    var search = function (event, item) {
        if (item !== null) {
            setSeleted(__assign({}, selected, { name: item.name, date: item.Date, list: item.TicketList, paid: item.AmountPaid, total: item.GrandTotal, selling: item.TicketList.list[0].initalPrice, Day: item.Day, invoiceNumber: item.InvoiceNumber }));
        }
        console.log(item);
    };
    return (React.createElement("div", { style: {
            width: "77vw",
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
        } },
        React.createElement("div", null,
            React.createElement(core_1.Button, { variant: "outlined", onClick: savePdf }, "Export to csv")),
        selectedIndex === 0 ? (React.createElement(core_1.Paper, { square: true, style: { width: "70%", height: "80h", padding: 20, marginTop: 6 } },
            React.createElement(core_1.Typography, { variant: "h5" }, "Sales Returns"),
            React.createElement(core_1.Divider, { style: { marginTop: 10 } }),
            React.createElement("div", null,
                React.createElement(core_1.Paper, { style: { width: "100%", margin: "auto", padding: 15 } },
                    React.createElement("div", { style: { marginTop: 10 } },
                        React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: MainCategory, getOptionLabel: function (option) { return option.InvoiceNumber; }, onChange: search, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Search Invoice", variant: "outlined" }))); } })),
                    React.createElement("div", { style: { display: "flex" } },
                        React.createElement("div", { style: {
                                width: "30%",
                            } },
                            React.createElement("div", { style: { marginTop: 10 } },
                                React.createElement(core_1.TextField, { type: "number", name: "amount", onChange: handleChange, id: "number-of-items", label: "Quantity Returned", variant: "filled", error: error, helperText: error ? "Number of items can't be empty" : "" })),
                            React.createElement("div", { style: { marginTop: 20 } },
                                React.createElement(core_1.TextField, { type: "number", multiline: true, onChange: handleChange, name: "reason", rows: 4, id: "number-of-items", label: "Reason for Return", variant: "filled" }))),
                        React.createElement("div", { style: {
                                marginLeft: 10,
                                marginTop: 10,
                                height: "40vh",
                                width: "70%",
                                borderStyle: "solid",
                                borderWidth: 1,
                                borderColor: "#5A5A5A",
                            } },
                            React.createElement("div", { style: {
                                    marginTop: 10,
                                    padding: 5,
                                    display: "flex",
                                    justifyContent: "space-between",
                                } },
                                React.createElement("div", { style: { marginRight: 5 } }, selected.name),
                                React.createElement("div", { style: { marginRight: 5 } }, selected.number),
                                React.createElement("div", null, selected.date)),
                            React.createElement("div", null,
                                React.createElement(core_1.Divider, null),
                                React.createElement("div", { style: { height: "34vh" } },
                                    React.createElement(TableContainer_1.default, { component: core_1.Paper },
                                        React.createElement(Table_1.default, { size: "small", stickyHeader: true, "aria-label": "simple table" },
                                            React.createElement(TableHead_1.default, { style: {
                                                    backgroundColor: props.Theme.theme === "light"
                                                        ? "#ccc"
                                                        : "#000000",
                                                } },
                                                React.createElement(TableRow_1.default, null,
                                                    React.createElement(TableCell_1.default, null),
                                                    React.createElement(TableCell_1.default, null, "Product Name"),
                                                    React.createElement(TableCell_1.default, { align: "right" }, "Qt"),
                                                    React.createElement(TableCell_1.default, { align: "right" }, "Price"),
                                                    React.createElement(TableCell_1.default, { align: "right" }, "Total"))),
                                            React.createElement(TableBody_1.default, null, selected.list.list.map(function (row, index) { return (React.createElement(TableRow_1.default, { style: {
                                                    backgroundColor: state.active === index
                                                        ? props.Theme.theme === "light"
                                                            ? "#F5CDD2"
                                                            : "#5E4E53"
                                                        : props.Theme.theme === "light"
                                                            ? "#ccc"
                                                            : "#424242",
                                                }, key: index },
                                                React.createElement(TableCell_1.default, { component: "th", scope: "row" },
                                                    React.createElement(core_1.Checkbox, { checked: state.active === index ? true : false, onChange: function (e) {
                                                            setState(__assign({}, state, { active: index, selectedItem: row }));
                                                        } })),
                                                React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.ItemName),
                                                React.createElement(TableCell_1.default, { align: "right" }, row.qnt),
                                                React.createElement(TableCell_1.default, { align: "right" }, row.initalPrice),
                                                React.createElement(TableCell_1.default, { align: "right" }, row.initalPrice * row.qnt))); }))))),
                                React.createElement(core_1.Divider, null),
                                React.createElement("div", { style: { marginTop: 5 } })))),
                    React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(core_1.Button, { disabled: selected.list.list.length === 0
                                ? true
                                : state.amount === 0
                                    ? true
                                    : false, style: { width: 160 }, onClick: ReduceItem, variant: "contained", color: "secondary" }, "Delete Item")))))) : (React.createElement(core_1.Paper, { square: true, style: { width: "70%", height: "80h", padding: 20 } },
            React.createElement("div", { style: { height: "34vh" } },
                React.createElement(TableContainer_1.default, { component: core_1.Paper },
                    React.createElement(Table_1.default, { size: "small", stickyHeader: true, "aria-label": "simple table" },
                        React.createElement(TableHead_1.default, null,
                            React.createElement(TableRow_1.default, null,
                                React.createElement(TableCell_1.default, null, "Invoice Number"),
                                React.createElement(TableCell_1.default, null, "Product Name"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Reurned"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Reason"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Date"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Customer"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Price"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Total"))),
                        React.createElement(TableBody_1.default, null, ReturnsList.map(function (row, index) { return (React.createElement(TableRow_1.default, { key: index },
                            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.invoiceNumber),
                            React.createElement(TableCell_1.default, { align: "right" }, row.productName),
                            React.createElement(TableCell_1.default, { align: "right" }, row.qnt),
                            React.createElement(TableCell_1.default, { align: "right" }, row.description),
                            React.createElement(TableCell_1.default, { align: "right" }, row.date),
                            React.createElement(TableCell_1.default, { align: "right" }, row.customer),
                            React.createElement(TableCell_1.default, { align: "right" }, row.sallingprice),
                            React.createElement(TableCell_1.default, { align: "right" }, row.sallingprice * row.qnt))); }))))))),
        React.createElement(core_1.Paper, { style: { width: "20%", padding: 10 } },
            React.createElement(core_1.Divider, null),
            React.createElement("div", null,
                React.createElement(core_1.Typography, { variant: "h6" }, "Explorer")),
            React.createElement("div", { style: { marginTop: 20 } },
                React.createElement(List_1.default, { component: "nav", "aria-label": "main mailbox folders" },
                    React.createElement(ListItem_1.default, { button: true, selected: selectedIndex === 0, onClick: function (event) { return handleListItemClick(event, 0); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(RemoveShoppingCart_1.default, null)),
                        React.createElement(ListItemText_1.default, { primary: "Return Items" })),
                    React.createElement(ListItem_1.default, { button: true, selected: selectedIndex === 1, onClick: function (event) { return handleListItemClick(event, 1); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(List_2.default, null)),
                        React.createElement(ListItemText_1.default, { primary: "Returns List" })))))));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map