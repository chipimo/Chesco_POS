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
var react_swipeable_views_1 = require("react-swipeable-views");
var styles_1 = require("@material-ui/core/styles");
var AppBar_1 = require("@material-ui/core/AppBar");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Divider_1 = require("@material-ui/core/Divider");
var Inbox_1 = require("@material-ui/icons/Inbox");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var Customers_1 = require("../../Customers");
var core_1 = require("@material-ui/core");
var dataBase_1 = require("../../../redux/dataBase");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var Currency = require("react-currency-formatter");
function a11yProps(index) {
    return {
        id: "full-width-tab-" + index,
        "aria-controls": "full-width-tabpanel-" + index,
    };
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}); });
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
var DateNumInput = "" + year + month + date; // combining to format for defaultValue or value attribute of material <TextField>
var columns = [
    { id: "ItemName", label: "Product Name", minWidth: 170 },
    { id: "qnt", label: "Qty", minWidth: 100 },
    {
        id: "initalPrice",
        label: "Price",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toLocaleString("en-US"); },
    },
    {
        id: "total",
        label: "Total",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toLocaleString("en-US"); },
    },
];
exports.index = function (props) {
    var classes = useStyles();
    var theme = styles_1.useTheme();
    var _a = React.useState(0), value = _a[0], setValue = _a[1];
    var _b = React.useState(0), page = _b[0], setPage = _b[1];
    var _c = React.useState(10), rowsPerPage = _c[0], setRowsPerPage = _c[1];
    var _d = React.useState({
        row: [],
    }), tableData = _d[0], setTableData = _d[1];
    var _e = React.useState(1), selectedIndex = _e[0], setSelectedIndex = _e[1];
    var _f = React.useState({
        columns: [],
        data: [],
    }), state = _f[0], setState = _f[1];
    var _g = React.useState(""), customer = _g[0], setCustomer = _g[1];
    var _h = React.useState({
        startDate: "",
        endDate: "",
    }), DefaultDate = _h[0], setDefaultDate = _h[1];
    var _j = React.useState(0), TotalMain = _j[0], setTotalMain = _j[1];
    var onOpenChange = function (dateValue, type) {
        var _a;
        var dateSplit = dateValue.target.value.split("-");
        var DateValue = "" + dateSplit[0] + dateSplit[1] + dateSplit[2];
        setDefaultDate(__assign({}, DefaultDate, (_a = {}, _a[type] = DateValue, _a)));
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    var search = function (event, item) { };
    React.useEffect(function () {
        dataBase_1.default.HandleCustomers({ _type: "get" }, function (reciveCallback) {
            setState({
                data: reciveCallback.customers,
            });
            // console.log(reciveCallback.customers);
        });
    }, []);
    var handleListItemClick = function (event, index, list) {
        // console.log(list.id);
        setSelectedIndex(index);
        setCustomer(list.id);
        handleGetSaleData({
            startDate: parseInt(DateNumInput),
            endDate: parseInt(DateNumInput),
            customer: list.id,
        });
    };
    var handleGetSaleData = function (prop) {
        dataBase_1.default.HandelReports({
            _type: "get_sales_byCustmore",
            startDate: prop.startDate,
            endDate: prop.endDate,
            customer: prop.customer,
        }, function (callback) {
            var tempArrData = [];
            var total = 0;
            callback.data.map(function (list) {
                total = total + list.GrandTotal;
                list.TicketList.list.map(function (items) {
                    items.user = list.userName;
                    items.time = list.time;
                    items.branch = list.branche;
                    tempArrData.push(items);
                });
            });
            setTotalMain(total);
            setTableData(__assign({}, tableData, { row: tempArrData }));
        });
    };
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    var handleChangeIndex = function (index) {
        setValue(index);
    };
    return (React.createElement("div", { style: { width: "85vw" } },
        React.createElement(AppBar_1.default, { position: "static", color: "default", style: { width: "100%" } },
            React.createElement(Tabs_1.default, { value: value, onChange: handleChange, indicatorColor: "secondary", textColor: "secondary", variant: "fullWidth", "aria-label": "full width tabs example" },
                React.createElement(Tab_1.default, __assign({ label: "Customer Records" }, a11yProps(0))),
                React.createElement(Tab_1.default, __assign({ label: "Customer Transactions" }, a11yProps(1))))),
        React.createElement(react_swipeable_views_1.default, { axis: theme.direction === "rtl" ? "x-reverse" : "x", index: value, onChangeIndex: handleChangeIndex },
            React.createElement("div", { value: value, index: 0, dir: theme.direction },
                React.createElement(Customers_1.default, null)),
            React.createElement("div", { value: value, index: 1, dir: theme.direction },
                React.createElement("div", { style: { width: "100%", display: "flex", padding: 15 } },
                    React.createElement("div", { style: { width: "30%" } },
                        React.createElement("div", null,
                            React.createElement(core_1.Typography, { variant: "h6" }, "Select customer")),
                        React.createElement("div", null,
                            React.createElement("div", { style: { width: 200 } },
                                React.createElement(Autocomplete_1.default, { options: state.data, getOptionLabel: function (option) { return option.name; }, id: "debug", onChange: search, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Search Customers...", margin: "normal" }))); } }))),
                        React.createElement(Divider_1.default, null),
                        React.createElement(List_1.default, { style: { maxHeight: "50vh", overflow: "auto" }, component: "nav", "aria-label": "main mailbox folders" }, state.data.map(function (list, index) { return (React.createElement(ListItem_1.default, { key: index + list.id, button: true, selected: selectedIndex === index, onClick: function (event) { return handleListItemClick(event, index, list); } },
                            React.createElement(ListItemIcon_1.default, null,
                                React.createElement(Inbox_1.default, null)),
                            React.createElement(ListItemText_1.default, { primary: list.name }))); })),
                        React.createElement(Divider_1.default, null)),
                    React.createElement("div", { style: { width: "65%", padding: 10 } },
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
                                            customer: customer,
                                            startDate: parseInt(DefaultDate.startDate),
                                            endDate: parseInt(DefaultDate.endDate),
                                        });
                                    } }, "Submit"))),
                        React.createElement(Divider_1.default, null),
                        React.createElement(core_1.Paper, { style: { marginTop: 6 } },
                            React.createElement(TableContainer_1.default, null,
                                React.createElement(Table_1.default, { stickyHeader: true, "aria-label": "sticky table" },
                                    React.createElement(TableHead_1.default, null,
                                        React.createElement(TableRow_1.default, null, columns.map(function (column, index) { return (React.createElement(TableCell_1.default, { key: column.id + index, align: column.align, style: { minWidth: column.minWidth } }, column.label)); }))),
                                    React.createElement(TableBody_1.default, null, tableData.row
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (row, index) {
                                        return (React.createElement(TableRow_1.default, { hover: true, role: "checkbox", tabIndex: -1, key: index }, columns.map(function (column, index) {
                                            var value = row[column.id];
                                            if (column.id === "total")
                                                return (React.createElement(TableCell_1.default, { key: column.id, align: column.align },
                                                    React.createElement(Currency, { locale: "en", quantity: row.qnt * row.initalPrice, symbol: props.UseCurrency.currencyInUse.currency.symbol_native })));
                                            return (React.createElement(TableCell_1.default, { key: column.id, align: column.align }, column.format &&
                                                typeof value === "number" ? (React.createElement(Currency, { locale: "en", quantity: value, symbol: props.UseCurrency.currencyInUse.currency.symbol_native })) : (value)));
                                        })));
                                    })))),
                            React.createElement(core_1.Paper, { style: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    paddingRight: 15,
                                } },
                                React.createElement(core_1.Typography, { variant: "h6" }, "Total:"),
                                React.createElement(core_1.Typography, { variant: "h6" },
                                    React.createElement(Currency, { locale: "en", quantity: TotalMain, symbol: props.UseCurrency.currencyInUse.currency.symbol_native }))),
                            React.createElement(TablePagination_1.default, { rowsPerPageOptions: [10, 25, 100], component: "div", count: tableData.row.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }))))))));
};
function mapStateToProps(state) {
    return {
        UseCurrency: state.UseCurrencyReducer,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(exports.index);
//# sourceMappingURL=index.js.map