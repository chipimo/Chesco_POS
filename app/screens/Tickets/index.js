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
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var Paper_1 = require("@material-ui/core/Paper");
var react_redux_1 = require("react-redux");
var dataBase_1 = require("../../redux/dataBase");
var Row_1 = require("./Row");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var ciqu_react_calendar_1 = require("ciqu-react-calendar");
var TextField_1 = require("@material-ui/core/TextField");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
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
var ipcRenderer = require("electron").ipcRenderer;
var Currency = require("react-currency-formatter");
var moment = require("moment");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    container: {
        zIndex: 8000,
        backgroundColor: "#fff",
        color: "#3b3b3b",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}); });
var index = function (props) {
    var _a = React.useState({
        columns: [],
        data: [],
    }), state = _a[0], setState = _a[1];
    var _b = React.useState({
        data: [],
    }), productsList = _b[0], setProductsList = _b[1];
    var _c = React.useState({
        date: "",
        cashier: "",
        compInfo: {},
    }), productInfo = _c[0], setProductInfo = _c[1];
    var _d = React.useState(0), ProductTotalSales = _d[0], setProductTotalSales = _d[1];
    var _e = React.useState(0), ProductTotalDiscount = _e[0], setProductTotalDiscount = _e[1];
    var _f = React.useState(0), TotalSales = _f[0], setTotalSales = _f[1];
    var classes = useStyles();
    var _g = React.useState({ value: moment() }), selectedDate = _g[0], setSelectedDate = _g[1];
    var _h = React.useState([]), users = _h[0], setUsers = _h[1];
    var _j = React.useState(null), totalsList = _j[0], settotalsList = _j[1];
    var _k = React.useState(0), totalCash = _k[0], settotalCash = _k[1];
    var _l = React.useState(0), GrossTotalSales = _l[0], setGrossTotalSales = _l[1];
    var _m = React.useState(0), totalCard = _m[0], settotalCard = _m[1];
    var _o = React.useState(0), totalOthers = _o[0], settotalOthers = _o[1];
    var onPrintFile = function () {
        // console.log(totalsList);
        if (state.data.length !== 0)
            ipcRenderer.send("do_print_saleReports", {
                data: totalsList,
                productsList: productsList,
                TotalSales: TotalSales,
                currency: props.UseCurrency.currencyInUse.currency.symbol_native,
                productInfo: productInfo,
            });
    };
    var onChange = function (value, inputValue) {
        // console.log(value.format("MM/DD/YYYY"));
        dataBase_1.default.HandelReports({ _type: "get_sales_tickets_byDate", date: value.format("MM/DD/YYYY") }, function (reciveCallback) {
            // console.log(reciveCallback.data);
            var card = [];
            var cash = [];
            var split = [];
            var others = [];
            var CashGrandTotal = 0;
            var CasDiscount = 0;
            var CashBalance = 0;
            var CardGrandTotal = 0;
            var CardDiscount = 0;
            var CardBalance = 0;
            reciveCallback.data.map(function (tickts) {
                if (tickts.PaymentType === "Card") {
                    card.push(tickts);
                }
                else if (tickts.PaymentType === "Cash") {
                    cash.push(tickts);
                }
                else if (tickts.PaymentType === "split") {
                    split.push(tickts);
                }
                else {
                    others.push(tickts);
                }
            });
            var data = { card: card, cash: cash, split: split, others: others };
            settotalsList(data);
            card.map(function (list) {
                CardGrandTotal = list.GrandTotal + CardGrandTotal;
                CardDiscount = list.Discount + CardDiscount;
                CardBalance = list.Balance + CardBalance;
            });
            split.map(function (split) {
                CardGrandTotal = split.Card_slipt + CardGrandTotal;
                CashGrandTotal = split.Cash_slipt + CashGrandTotal;
            });
            cash.map(function (list) {
                CashGrandTotal = list.GrandTotal + CashGrandTotal;
                CasDiscount = list.Discount + CasDiscount;
                CashBalance = list.Balance + CashBalance;
            });
            settotalCard(CardGrandTotal);
            settotalCash(CashGrandTotal);
            setProductsList(__assign({}, productsList, { data: [] }));
            reciveCallback.data.sort(compare);
            setState(__assign({}, state, { data: reciveCallback.data }));
            var totals = 0;
            var GrossTotals = 0;
            reciveCallback.data.map(function (items) {
                totals = items.GrandTotal + totals;
                GrossTotals = items.GrandTotal + GrossTotals + items.Discount;
                items.TicketList.list.map(function (productlist) {
                    productsList.data.push(productlist);
                    setProductsList(__assign({}, productsList, { data: productsList.data }));
                });
            });
            setTotalSales(totals);
            setGrossTotalSales(GrossTotals);
        });
        setSelectedDate(__assign({}, selectedDate, { value: value }));
    };
    var onOpenChange = function (status) {
        // console.log("open status: " + status);
    };
    var disabledDate = function (currentDate, inputValue) {
        return false;
    };
    var compare = function (a, b) {
        return b.timeRange - a.timeRange;
    };
    React.useEffect(function () {
        dataBase_1.default.HandleGetUser(function (callback) {
            setUsers(callback);
        });
        if (props.ViewType === "reports")
            dataBase_1.default.HandelReports({
                _type: "get_sales_tickets_byDateRange",
                startTime: props.startTime,
                endTime: props.endTime,
                startDate: parseInt(props.startDate),
                endDate: parseInt(props.endDate),
            }, function (reciveCallback) {
                // console.log(reciveCallback.data);\
                var card = [];
                var cash = [];
                var split = [];
                var others = [];
                var CashGrandTotal = 0;
                var CasDiscount = 0;
                var CashBalance = 0;
                var CardGrandTotal = 0;
                var CardDiscount = 0;
                var CardBalance = 0;
                reciveCallback.data.map(function (tickts) {
                    if (tickts.PaymentType === "Card") {
                        card.push(tickts);
                    }
                    else if (tickts.PaymentType === "Cash") {
                        cash.push(tickts);
                    }
                    else if (tickts.PaymentType === "split") {
                        split.push(tickts);
                    }
                    else {
                        others.push(tickts);
                    }
                });
                var data = { card: card, cash: cash, split: split, others: others };
                settotalsList(data);
                card.map(function (list) {
                    CardGrandTotal = list.GrandTotal + CardGrandTotal;
                    CardDiscount = list.Discount + CardDiscount;
                    CardBalance = list.Balance + CardBalance;
                });
                split.map(function (split) {
                    CardGrandTotal = split.Card_slipt + CardGrandTotal;
                    CashGrandTotal = split.Cash_slipt + CashGrandTotal;
                });
                cash.map(function (list) {
                    CashGrandTotal = list.GrandTotal + CashGrandTotal;
                    CasDiscount = list.Discount + CasDiscount;
                    CashBalance = list.Balance + CashBalance;
                });
                settotalCard(CardGrandTotal);
                settotalCash(CashGrandTotal);
                var totals = 0;
                var GrossTotals = 0;
                var productTotals = 0;
                var productdiscount = 0;
                // var productListArry = [];
                var tempArry = [];
                reciveCallback.data.sort(compare);
                setState(__assign({}, state, { data: reciveCallback.data }));
                // console.log(reciveCallback.data);
                reciveCallback.data.map(function (items) {
                    totals = items.GrandTotal + totals;
                    GrossTotals = items.GrandTotal + GrossTotals + items.Discount;
                    productdiscount = items.Discount + productdiscount;
                    setProductInfo(__assign({}, productInfo, { cashier: items.userName, date: props.dateString.startDate + " - " + props.dateString.endDate, compInfo: props.Dep }));
                    items.TicketList.list.map(function (productlist) {
                        productTotals = productlist.initalPrice + productTotals;
                        tempArry.push(productlist);
                    });
                });
                setProductsList(__assign({}, productsList, { data: tempArry }));
                setProductTotalSales(productTotals);
                setProductTotalDiscount(productdiscount);
                setTotalSales(totals);
                setGrossTotalSales(GrossTotals);
            });
        else
            dataBase_1.default.HandelReports({
                _type: "get_sales_tickets_byCasher",
                user: { id: props.User.userLogged.id },
                startDate: parseInt(DateNumInput),
                endDate: parseInt(DateNumInput),
            }, function (reciveCallback) {
                // console.log(reciveCallback.data);
                var card = [];
                var cash = [];
                var split = [];
                var others = [];
                var CashGrandTotal = 0;
                var CasDiscount = 0;
                var CashBalance = 0;
                var CardGrandTotal = 0;
                var CardDiscount = 0;
                var CardBalance = 0;
                reciveCallback.data.map(function (tickts) {
                    if (tickts.PaymentType === "Card") {
                        card.push(tickts);
                    }
                    else if (tickts.PaymentType === "Cash") {
                        cash.push(tickts);
                    }
                    else if (tickts.PaymentType === "split") {
                        split.push(tickts);
                    }
                    else {
                        others.push(tickts);
                    }
                });
                var data = { card: card, cash: cash, split: split, others: others };
                settotalsList(data);
                // console.log(data);
                card.map(function (list) {
                    CardGrandTotal = list.GrandTotal + CardGrandTotal;
                    CardDiscount = list.Discount + CardDiscount;
                    CardBalance = list.Balance + CardBalance;
                });
                split.map(function (split) {
                    CardGrandTotal = split.Card_slipt + CardGrandTotal;
                    CashGrandTotal = split.Cash_slipt + CashGrandTotal;
                });
                cash.map(function (list) {
                    CashGrandTotal = list.GrandTotal + CashGrandTotal;
                    CasDiscount = list.Discount + CasDiscount;
                    CashBalance = list.Balance + CashBalance;
                });
                settotalCard(CardGrandTotal);
                settotalCash(CashGrandTotal);
                var totals = 0;
                var GrossTotals = 0;
                var productTotals = 0;
                var productdiscount = 0;
                // var productListArry = [];
                var tempArry = [];
                reciveCallback.data.sort(compare);
                // console.log(reciveCallback.data);
                setState(__assign({}, state, { data: reciveCallback.data }));
                reciveCallback.data.map(function (items) {
                    totals = items.GrandTotal + totals;
                    GrossTotals = items.GrandTotal + GrossTotals + items.Discount;
                    productdiscount = items.Discount + productdiscount;
                    // console.log(items);
                    setProductInfo(__assign({}, productInfo, { cashier: items.userName, date: items.Date, compInfo: props.Dep }));
                    items.TicketList.list.map(function (productlist) {
                        productTotals = productlist.initalPrice + productTotals;
                        tempArry.push(productlist);
                    });
                });
                setProductsList(__assign({}, productsList, { data: tempArry }));
                setProductTotalSales(productTotals);
                setProductTotalDiscount(productdiscount);
                setTotalSales(totals);
                setGrossTotalSales(GrossTotals);
            });
    }, [props]);
    return (React.createElement("div", { style: {
            padding: 6,
            paddingLeft: 27,
            paddingRight: 27,
            height: "86vh",
            overflow: "auto",
        } },
        React.createElement("div", { style: { display: "flex" } },
            props.ViewType !== "reports" ? (React.createElement("div", { style: { height: 30, width: 220 } },
                React.createElement(ciqu_react_calendar_1.default, { onChange: onChange, value: selectedDate.value, allowClear: true, disabled: false, placeholder: "please input date", format: "MM/DD/YYYY", className: classes.container, onOpenChange: onOpenChange, disabledDate: disabledDate }))) : null,
            props.ViewType === "reports" ? (React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: users, getOptionLabel: function (option) { return option.userName; }, style: { width: 300 }, onChange: function (event, newData) {
                    dataBase_1.default.HandelReports({
                        _type: "get_sales_tickets_byCasher",
                        user: newData,
                        startDate: parseInt(props.startDate),
                        endDate: parseInt(props.endDate),
                    }, function (reciveCallback) {
                        var card = [];
                        var cash = [];
                        var split = [];
                        var others = [];
                        var CashGrandTotal = 0;
                        var CasDiscount = 0;
                        var CashBalance = 0;
                        var CardGrandTotal = 0;
                        var CardDiscount = 0;
                        var CardBalance = 0;
                        reciveCallback.data.map(function (tickts) {
                            if (tickts.PaymentType === "Card") {
                                card.push(tickts);
                            }
                            else if (tickts.PaymentType === "Cash") {
                                cash.push(tickts);
                            }
                            else if (tickts.PaymentType === "split") {
                                split.push(tickts);
                            }
                            else {
                                others.push(tickts);
                            }
                        });
                        var data = { card: card, cash: cash, split: split, others: others };
                        settotalsList(data);
                        // console.log(data);
                        card.map(function (list) {
                            CardGrandTotal = list.GrandTotal + CardGrandTotal;
                            CardDiscount = list.Discount + CardDiscount;
                            CardBalance = list.Balance + CardBalance;
                        });
                        split.map(function (split) {
                            CardGrandTotal = split.Card_slipt + CardGrandTotal;
                            CashGrandTotal = split.Cash_slipt + CashGrandTotal;
                        });
                        cash.map(function (list) {
                            CashGrandTotal = list.GrandTotal + CashGrandTotal;
                            CasDiscount = list.Discount + CasDiscount;
                            CashBalance = list.Balance + CashBalance;
                        });
                        settotalCard(CardGrandTotal);
                        settotalCash(CashGrandTotal);
                        var totals = 0;
                        var GrossTotals = 0;
                        var productTotals = 0;
                        var productdiscount = 0;
                        // var productListArry = [];
                        var tempArry = [];
                        reciveCallback.data.sort(compare);
                        setState(__assign({}, state, { data: reciveCallback.data }));
                        reciveCallback.data.map(function (items) {
                            totals = items.GrandTotal + totals;
                            GrossTotals =
                                items.GrandTotal + GrossTotals + items.Discount;
                            productdiscount = items.Discount + productdiscount;
                            // console.log(items);
                            setProductInfo(__assign({}, productInfo, { cashier: items.userName, date: items.Date }));
                            items.TicketList.list.map(function (productlist) {
                                productTotals = productlist.initalPrice + productTotals;
                                tempArry.push(productlist);
                            });
                        });
                        setProductsList(__assign({}, productsList, { data: tempArry }));
                        setProductTotalSales(productTotals);
                        setProductTotalDiscount(productdiscount);
                        setTotalSales(totals);
                        setGrossTotalSales(GrossTotals);
                    });
                }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "filter by cashier", variant: "outlined" }))); } })) : null,
            React.createElement("div", { style: { marginLeft: 10 } },
                React.createElement(core_1.Button, { onClick: onPrintFile, color: "primary", variant: "outlined" }, "Print Report")),
            React.createElement("div", { style: { marginLeft: 10 } },
                React.createElement(core_1.Button, { onClick: function () {
                        ipcRenderer.send("save_csv", {
                            type: "FilteredInvoiceList",
                            header: [
                                {
                                    id: "Date",
                                    title: "Date",
                                },
                                {
                                    id: "TotalQt",
                                    title: "Quantity Sold",
                                },
                                {
                                    id: "Balance",
                                    title: "Description",
                                },
                                {
                                    id: "PaymentType",
                                    title: "Payment",
                                },
                                {
                                    id: "GrandTotal",
                                    title: "Cash sale",
                                },
                                {
                                    id: "Discount",
                                    title: "Discount",
                                },
                                {
                                    id: "Cash_slipt",
                                    title: "Cash split",
                                },
                                {
                                    id: "Card_slipt",
                                    title: "Card split",
                                },
                            ],
                            data: state.data,
                        });
                    }, color: "primary", variant: "outlined" }, "Export to Excel file"))),
        React.createElement(TableContainer_1.default, { style: { maxHeight: "75vh" }, component: Paper_1.default },
            React.createElement(Table_1.default, { stickyHeader: true, size: "small", "aria-label": "collapsible table" },
                React.createElement(TableHead_1.default, null,
                    React.createElement(TableRow_1.default, null,
                        React.createElement(TableCell_1.default, null,
                            React.createElement(core_1.Typography, null, "Print")),
                        React.createElement(TableCell_1.default, null,
                            React.createElement(core_1.Typography, null, "Date")),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, "Time")),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, "Quantity Sold ")),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, "Description")),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Typography, null, "Payment")),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null, "Cash sale")),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null, "Discount")),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null, "Cash split")),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null, "Card split")),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, null, "More")))),
                React.createElement(TableBody_1.default, null,
                    state.data.map(function (row, index) { return (React.createElement(Row_1.default, { key: row.id + index, row: row })); }),
                    React.createElement(TableRow_1.default, { style: {
                            backgroundColor: props.Theme.theme === "light" ? "#ccc" : "#303030",
                        } },
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" }),
                        React.createElement(TableCell_1.default, { align: "left" },
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Typography, null, "Grand Total: "),
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, { variant: "h6" },
                                React.createElement(Currency, { locale: "en", quantity: GrossTotalSales, symbol: "K" })),
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Typography, { variant: "h6" },
                                React.createElement(Currency, { locale: "en", quantity: ProductTotalDiscount, symbol: "K" })),
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Typography, { variant: "h6" }, "Total:"),
                            React.createElement(core_1.Divider, null)),
                        React.createElement(TableCell_1.default, { align: "right" },
                            React.createElement(core_1.Typography, { style: { color: "red" }, variant: "h5" },
                                React.createElement(Currency, { locale: "en", quantity: TotalSales, symbol: "K" })),
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Divider, null),
                            React.createElement(core_1.Divider, null)))))),
        React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 10 } },
            React.createElement("div", null,
                React.createElement(core_1.Typography, { variant: "h6" },
                    "Total Cash :",
                    React.createElement(Currency, { locale: "en", quantity: totalCash, symbol: "K" })),
                React.createElement(core_1.Typography, { variant: "h6" },
                    "Total Card :",
                    React.createElement(Currency, { locale: "en", quantity: totalCard, symbol: "K" })),
                totalsList !== null ? (React.createElement("div", null, totalsList.others.map(function (t) {
                    return (React.createElement(core_1.Typography, { variant: "h6" },
                        "Total ",
                        t.PaymentType,
                        " :",
                        React.createElement(Currency, { locale: "en", quantity: t.GrandTotal - t.Discount - t.Balance, symbol: "K" })));
                }))) : null,
                React.createElement(core_1.Typography, { style: { color: "red" }, variant: "h5" },
                    "Total sales :",
                    React.createElement(Currency, { locale: "en", quantity: TotalSales, symbol: "K" }))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Dep: state.Dep,
        User: state.User,
        UseCurrency: state.UseCurrencyReducer,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map