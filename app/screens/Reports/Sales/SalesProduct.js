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
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var dataBase_1 = require("../../../redux/dataBase");
var Currency = require("react-currency-formatter");
var ipcRenderer = require("electron").ipcRenderer;
var dateNow = new Date(); // Creating a new date object with the current date and time
var year = dateNow.getFullYear(); // Getting current year from the created Date object
var monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
var month = // Setting current Month number from current Date object
 monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? "0" + monthWithOffset
    : monthWithOffset;
var date = dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? "0" + dateNow.getUTCDate()
    : dateNow.getUTCDate();
var materialDateInput = year + "-" + month + "-" + date; // combining to format for defaultValue or value attribute of material <TextField>
var DateNumInput = "" + year + month + date;
var SalesProduct = function (props) {
    var _a = React.useState([]), MainCategory = _a[0], setMainCategory = _a[1];
    var _b = React.useState([]), MainProductList = _b[0], setMainProductList = _b[1];
    var _c = React.useState({
        name: "",
        number: "",
        date: "",
        User: "",
        time: "",
        Branch: "",
        list: { list: [] },
        paid: 0,
        total: 0,
        invoiceNumber: "",
    }), selected = _c[0], setSeleted = _c[1];
    var _d = React.useState({
        active: null,
        selectedItem: {},
        amount: 0,
        reason: "",
    }), state = _d[0], setState = _d[1];
    var _e = React.useState({
        startTime: "",
        endTime: "",
    }), DefaultTime = _e[0], setDefaultTime = _e[1];
    var _f = React.useState({
        ProfitLoss: 0,
        totalValue: 0,
    }), Totals = _f[0], setTotals = _f[1];
    var _g = React.useState(false), error = _g[0], setError = _g[1];
    React.useEffect(function () {
        handleGetSaleData({
            date: "monthString",
            Datetype: "Month",
            startDate: props.startDate,
            endDate: props.endDate,
            startTime: props.startTime,
            endTime: props.endTime,
        });
    }, [props]);
    var handleGetSaleData = function (prop) {
        dataBase_1.default.HandelReports({
            _type: "get_sales_tickets_byDateRange",
            startTime: prop.startTime,
            endTime: prop.endTime,
            startDate: prop.startDate,
            endDate: prop.endDate,
        }, function (callback) {
            // console.log(callback);
            var Total_Profit = 0;
            var Total_value = 0;
            var tempArrData = [];
            callback.data.map(function (list) {
                list.TicketList.list.map(function (items) {
                    items.user = list.userName;
                    items.time = list.time;
                    items.branch = list.branche;
                    Total_Profit =
                        items.initalPrice * items.qnt -
                            items.buyingPrice * items.qnt +
                            Total_Profit;
                    Total_value = items.initalPrice * items.qnt + Total_value;
                    tempArrData.push(items);
                });
            });
            setTotals(__assign({}, Totals, { ProfitLoss: Total_Profit, totalValue: Total_value }));
            setMainProductList(tempArrData);
        });
    };
    return (React.createElement("div", { style: {
            width: "70vw",
            padding: 20,
            display: "flex",
        } },
        React.createElement("div", null,
            React.createElement(core_1.Paper, { style: { width: "70vw", margin: "auto" } },
                React.createElement("div", { style: {} },
                    React.createElement("div", { style: { marginLeft: 10 } },
                        React.createElement(core_1.Button, { onClick: function () {
                                ipcRenderer.send("save_csv", {
                                    type: "Filtered_Product_List",
                                    header: [
                                        {
                                            id: "ItemName",
                                            title: "Product Sold",
                                        },
                                        {
                                            id: "user",
                                            title: "Sold by",
                                        },
                                        {
                                            id: "branch",
                                            title: "Branch",
                                        },
                                        {
                                            id: "time",
                                            title: "Time",
                                        },
                                        {
                                            id: "qnt",
                                            title: "Quantity sold",
                                        },
                                        {
                                            id: "buyingPrice",
                                            title: "Cost Price",
                                        },
                                        {
                                            id: "initalPrice",
                                            title: "Selling Price",
                                        },
                                    ],
                                    data: MainProductList,
                                });
                            }, color: "primary", variant: "outlined" }, "Export to Excel file")),
                    React.createElement(core_1.Divider, null),
                    React.createElement("div", { style: {
                            marginLeft: 10,
                            marginTop: 10,
                            width: "100%",
                            borderStyle: "solid",
                            borderWidth: 1,
                            borderColor: "#5A5A5A",
                        } },
                        React.createElement("div", null,
                            React.createElement(core_1.Divider, null),
                            React.createElement("div", { style: { height: "100%" } },
                                React.createElement(TableContainer_1.default, { component: core_1.Paper },
                                    React.createElement(Table_1.default, { stickyHeader: true, "aria-label": "simple table" },
                                        React.createElement(TableHead_1.default, { style: {
                                                backgroundColor: props.Theme.theme === "light" ? "#ccc" : "#000000",
                                            } },
                                            React.createElement(TableRow_1.default, null,
                                                React.createElement(TableCell_1.default, null, "Product Sold"),
                                                React.createElement(TableCell_1.default, { align: "right" }, "Sold by"),
                                                React.createElement(TableCell_1.default, null, "Branch"),
                                                React.createElement(TableCell_1.default, null, "Time"),
                                                React.createElement(TableCell_1.default, { align: "right" }, "Quantity sold"),
                                                React.createElement(TableCell_1.default, { align: "right" }, "Cost Price"),
                                                React.createElement(TableCell_1.default, { align: "right" }, "Selling Price"),
                                                React.createElement(TableCell_1.default, { align: "right" }, "Profit Loss Margin"),
                                                React.createElement(TableCell_1.default, { align: "right" }, "Total"))),
                                        React.createElement(TableBody_1.default, null, MainProductList.map(function (row, index) { return (React.createElement(TableRow_1.default, { style: {
                                                backgroundColor: props.Theme.theme === "light"
                                                    ? "#EDEDED"
                                                    : "#424242",
                                            }, key: index },
                                            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.ItemName),
                                            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.user),
                                            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.branch),
                                            React.createElement(TableCell_1.default, { component: "th", scope: "row" }, row.time),
                                            React.createElement(TableCell_1.default, { align: "right" }, row.qnt),
                                            React.createElement(TableCell_1.default, { align: "right" },
                                                React.createElement(core_1.Typography, null,
                                                    React.createElement(Currency, { locale: "en", quantity: row.buyingPrice, symbol: props.UseCurrency.currencyInUse.currency.symbol_native }))),
                                            React.createElement(TableCell_1.default, { align: "right" },
                                                React.createElement(core_1.Typography, null,
                                                    React.createElement(Currency, { locale: "en", quantity: row.initalPrice, symbol: props.UseCurrency.currencyInUse.currency.symbol_native }))),
                                            React.createElement(TableCell_1.default, { align: "right" },
                                                React.createElement(core_1.Typography, { style: {
                                                        backgroundColor: row.initalPrice * row.qnt -
                                                            row.buyingPrice <
                                                            -1
                                                            ? "#EF8E60"
                                                            : "#84A475",
                                                        padding: 7,
                                                    } },
                                                    React.createElement(Currency, { locale: "en", quantity: row.initalPrice * row.qnt -
                                                            row.buyingPrice * row.qnt, symbol: props.UseCurrency.currencyInUse.currency.symbol_native }))),
                                            React.createElement(TableCell_1.default, { align: "right" },
                                                React.createElement(core_1.Typography, null,
                                                    React.createElement(Currency, { locale: "en", quantity: row.initalPrice * row.qnt, symbol: props.UseCurrency.currencyInUse.currency.symbol_native }))))); }))),
                                    React.createElement(core_1.Paper, { style: {
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginRight: 10,
                                        } },
                                        React.createElement("div", { style: { display: "flex" } },
                                            React.createElement(core_1.Typography, { variant: "h6", style: {} },
                                                "Total Profit Margin:",
                                                "  ",
                                                React.createElement(Currency, { locale: "en", quantity: Totals.ProfitLoss, symbol: props.UseCurrency.currencyInUse.currency.symbol_native })),
                                            React.createElement(core_1.Typography, { variant: "h6", style: { marginLeft: 10 } },
                                                "Total:",
                                                "  ",
                                                React.createElement(Currency, { locale: "en", quantity: Totals.totalValue, symbol: props.UseCurrency.currencyInUse.currency.symbol_native })))))))))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        UseCurrency: state.UseCurrencyReducer,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SalesProduct);
//# sourceMappingURL=SalesProduct.js.map