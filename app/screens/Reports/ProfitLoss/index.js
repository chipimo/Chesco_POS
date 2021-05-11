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
var semantic_ui_react_1 = require("semantic-ui-react");
var dataBase_1 = require("../../../redux/dataBase");
var Currency = require("react-currency-formatter");
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
var index = function (props) {
    var _a = React.useState({
        startDate: "",
        endDate: "",
    }), DefaultDate = _a[0], setDefaultDate = _a[1];
    var _b = React.useState(0), TotalSales = _b[0], setTotalSales = _b[1];
    var _c = React.useState(0), TotalExpenses = _c[0], setTotalExpenses = _c[1];
    var _d = React.useState(0), TotalBuyPrice = _d[0], setTotalBuyPrice = _d[1];
    var _e = React.useState(0), TotalNet = _e[0], setTotalNet = _e[1];
    React.useEffect(function () {
        handleGetSaleData({
            startDate: parseInt(DateNumInput),
            endDate: parseInt(DateNumInput),
        });
    }, [props]);
    var handleGetSaleData = function (prop) {
        var tempTotal = 0;
        var tempExpenses = 0;
        var tempBuyPrices = 0;
        dataBase_1.default.HandelReports({
            _type: "get_sales_tickets",
            startDate: prop.startDate,
            endDate: prop.endDate,
        }, function (callback) {
            // console.log(callback); 
            callback.data.map(function (list) {
                // console.log(list)
                tempTotal =
                    list.GrandTotal - list.Balance + tempTotal;
                list.TicketList.list.map(function (ticket) {
                    tempBuyPrices =
                        ticket.buyingPrice * ticket.qnt + tempBuyPrices;
                });
            });
            // console.log(TotalSales - TotalExpenses - TotalBuyPrice);
            setTotalSales(tempTotal);
            setTotalBuyPrice(tempBuyPrices);
            setTotalNet(TotalSales - TotalExpenses - TotalBuyPrice);
        });
        dataBase_1.default.HandelReports({
            _type: "get_expenses",
            startDate: prop.startDate,
            endDate: prop.endDate,
        }, function (callback) {
            callback.data.map(function (expenses) {
                tempExpenses = expenses.cost + tempExpenses;
            });
            setTotalExpenses(tempExpenses);
        });
        // tempNet = tempTotal - tempExpenses;
        // setTotalNet(tempNet);
    };
    var onOpenChange = function (dateValue, type) {
        var _a;
        var dateSplit = dateValue.target.value.split("-");
        var DateValue = "" + dateSplit[0] + dateSplit[1] + dateSplit[2];
        setDefaultDate(__assign({}, DefaultDate, (_a = {}, _a[type] = DateValue, _a)));
    };
    return (React.createElement("div", { style: { width: "100%" } },
        React.createElement("div", { style: {
                height: 50,
                display: "flex",
            } },
            React.createElement("div", null,
                React.createElement(core_1.TextField, { id: "date", label: "From Date", type: "date", defaultValue: materialDateInput, onChange: function (event) { return onOpenChange(event, "startDate"); }, 
                    // className={classes.textField}
                    InputLabelProps: {
                        shrink: true,
                    } })),
            React.createElement("div", { style: { marginLeft: 30 } },
                React.createElement(core_1.TextField, { id: "date", label: "Date To", type: "date", defaultValue: materialDateInput, onChange: function (event) { return onOpenChange(event, "endDate"); }, 
                    // className={classes.textField}
                    InputLabelProps: {
                        shrink: true,
                    } })),
            React.createElement("div", null,
                React.createElement(core_1.Button, { variant: "outlined", style: { marginLeft: 15, marginTop: 10 }, onClick: function () {
                        handleGetSaleData({
                            startDate: parseInt(DefaultDate.startDate),
                            endDate: parseInt(DefaultDate.endDate),
                        });
                    } }, "Update Report"))),
        React.createElement(core_1.Divider, { style: { marginTop: 10, marginBottom: 10 } }),
        React.createElement("div", { style: { width: "50vw" } },
            React.createElement(semantic_ui_react_1.Table, { basic: "very", celled: true, inverted: props.Theme.theme === "light" ? false : true },
                React.createElement(semantic_ui_react_1.Table.Header, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Description"),
                        React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Totals"))),
                React.createElement(semantic_ui_react_1.Table.Body, null,
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.Cell, null,
                            React.createElement(core_1.Typography, { variant: "h6" }, "Total Expenses")),
                        React.createElement(semantic_ui_react_1.Table.Cell, null,
                            React.createElement(Currency, { locale: "en", quantity: TotalExpenses, symbol: "K" }))),
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.Cell, null,
                            React.createElement(core_1.Typography, { variant: "h6" }, "Total Buying Prices")),
                        React.createElement(semantic_ui_react_1.Table.Cell, null,
                            React.createElement(Currency, { locale: "en", quantity: TotalBuyPrice, symbol: "K" }))),
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.Cell, null,
                            React.createElement(core_1.Typography, { variant: "h6" }, "Total Sales")),
                        React.createElement(semantic_ui_react_1.Table.Cell, null,
                            React.createElement(Currency, { locale: "en", quantity: TotalSales, symbol: "K" }))),
                    React.createElement(semantic_ui_react_1.Table.Row, null,
                        React.createElement(semantic_ui_react_1.Table.Cell, null,
                            React.createElement(core_1.Typography, { variant: "h6" }, "Net Sales")),
                        React.createElement(semantic_ui_react_1.Table.Cell, null,
                            React.createElement(core_1.Typography, { variant: "h6", style: {
                                    padding: 10,
                                    backgroundColor: TotalSales - TotalExpenses - TotalBuyPrice < 1
                                        ? "#FF5555"
                                        : "#2a7f2a",
                                    color: "#FFFFFF",
                                } },
                                React.createElement(Currency, { locale: "en", quantity: TotalSales - TotalExpenses - TotalBuyPrice, symbol: "K" })))))))));
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