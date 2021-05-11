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
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles"); // web.cjs is required for IE 11 support
var dataBase_1 = require("../../../redux/dataBase");
var TableCell_1 = require("@material-ui/core/TableCell");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var PictureAsPdf_1 = require("@material-ui/icons/PictureAsPdf");
var Tickets_1 = require("../../Tickets");
var SalesProduct_1 = require("../Sales/SalesProduct");
var Currency = require("react-currency-formatter");
var moment = require("moment");
var ipcRenderer = require("electron").ipcRenderer;
var _ = require("lodash");
var check = moment(new Date());
var monthString = check.format("MMMM"); // => ('January','February.....)
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
var useStyles = styles_1.makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
});
var StyledTableRow = styles_1.withStyles(function (theme) { return ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}); })(TableRow_1.default);
var initialState = {
    mouseX: null,
    mouseY: null,
};
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState({ value: moment() }), selectedDate = _a[0], setSelectedDate = _a[1];
    var _b = React.useState({ data: [] }), SalesList = _b[0], setSalesList = _b[1];
    var _c = React.useState("Deparment"), Dep = _c[0], setDep = _c[1];
    var _d = React.useState({
        date: "",
        day: "",
        totalInvoices: "",
    }), Header = _d[0], setHeader = _d[1];
    var _e = React.useState({
        GrandTotal: 0,
        Discount: 0,
        Balance: 0,
        Taxtotal: 0,
    }), Totals = _e[0], setTotals = _e[1];
    var _f = React.useState([]), Departments = _f[0], SetDepartments = _f[1];
    var _g = React.useState([]), Months = _g[0], SetMonths = _g[1];
    var _h = React.useState(""), defaultMonth = _h[0], setdefaultMonth = _h[1];
    var _j = React.useState(false), showFiltered = _j[0], setShowFiltered = _j[1];
    var _k = React.useState(false), SalesProductsList = _k[0], setSalesProductsList = _k[1];
    var _l = React.useState(2), reportType = _l[0], setReportType = _l[1];
    var _m = React.useState({
        startDate: 0,
        endDate: 0,
    }), DefaultDate = _m[0], setDefaultDate = _m[1];
    var _o = React.useState({
        startTime: 0,
        endTime: 0,
    }), DefaultTime = _o[0], setDefaultTime = _o[1];
    var _p = React.useState({
        startDate: '',
        endDate: ''
    }), dateString = _p[0], setDateString = _p[1];
    React.useEffect(function () {
        setDep(props.Dep.dep);
        // console.log(props.Dep);
        setdefaultMonth(monthString);
        setDateString(__assign({}, dateString, { startDate: moment().format("LL"), endDate: moment().format("LL") }));
        setDefaultDate(__assign({}, DefaultDate, { startDate: parseInt(DateNumInput), endDate: parseInt(DateNumInput) }));
        setDefaultTime(__assign({}, DefaultTime, { startTime: sliptTimeRange().startTimeSet, endTime: sliptTimeRange().endTimeSet }));
        handleGetSaleData({
            date: monthString,
            Datetype: "Month",
            dep: props.Dep.dep,
            startDate: parseInt(DateNumInput),
            endDate: parseInt(DateNumInput),
            time: sliptTimeRange(),
        });
    }, []);
    var handleGetSaleData = function (prop) {
        // console.log(prop);
        dataBase_1.default.HandelReports({
            _type: "get_sales_tickets_byDateRange",
            startTime: DefaultTime.startTime,
            endTime: DefaultTime.endTime,
            startDate: parseInt(prop.startDate),
            endDate: parseInt(prop.endDate),
        }, function (callback) {
            dataBase_1.default.HandelReports({
                _type: "get_sales",
                data: prop.dep,
                dateType: prop.Datetype,
                date: prop.date,
                startDate: prop.startDate,
                endDate: prop.endDate,
                startTime: prop.time.startTimeSet,
                endTime: prop.time.endTimeSet,
            }, function (totalsCallback) {
                // console.log(callback);
                setHeader(__assign({}, Header, { date: prop.date, totalInvoices: callback.data.length }));
                var tempData = [];
                var cash_sale = 0;
                var card_sale = 0;
                var tax = 0;
                var tatolsales = 0;
                var Date = "";
                var SrNo = "";
                callback.data.map(function (data) {
                    if (data.PaymentType === "Cash")
                        cash_sale = data.GrandTotal + cash_sale;
                    else
                        card_sale = data.GrandTotal + card_sale;
                    tax = parseInt(data.totalTax) + tax;
                    Date = data.Date;
                });
                totalsCallback.data.map(function (srno) {
                    SrNo = srno.SrNo;
                });
                tempData.push({
                    CashSales: cash_sale,
                    CardSales: card_sale,
                    GrandTotal: cash_sale + card_sale,
                    totalTaxFinal: tax,
                    Date: Date,
                    SrNo: SrNo,
                    Department: props.User.userLogged.branche,
                });
                setSalesList(__assign({}, SalesList, { data: tempData }));
            });
        });
    };
    var savePdf = function () {
        ipcRenderer.send("save_pdf", { type: "trx", SalesList: SalesList, dep: Dep });
    };
    var onOpenChange = function (dateValue, type) {
        var _a;
        if (type === 'startDate') {
            var d = moment(dateValue.target.value).format("LL");
            setDateString(__assign({}, dateString, { startDate: d }));
        }
        else {
            var endD = moment(dateValue.target.value).format("LL");
            setDateString(__assign({}, dateString, { endDate: endD }));
        }
        var dateSplit = dateValue.target.value.split("-");
        var DateValue = "" + dateSplit[0] + dateSplit[1] + dateSplit[2];
        setDefaultDate(__assign({}, DefaultDate, (_a = {}, _a[type] = DateValue, _a)));
    };
    var onTimeChange = function (TimeValue, type) {
        var _a;
        setDefaultTime(__assign({}, DefaultTime, (_a = {}, _a[type] = TimeValue.target.value, _a)));
    };
    var sliptTimeRange = function () {
        if (DefaultTime.startTime !== 0 && DefaultTime.endTime !== 0) {
            var startTimeSplit = DefaultTime.startTime.split(":");
            var startTimeValue = "" + startTimeSplit[0] + startTimeSplit[1];
            var endTimeSplit = DefaultTime.endTime.split(":");
            var endTimeValue = "" + endTimeSplit[0] + endTimeSplit[1];
            return {
                startTimeSet: parseInt(startTimeValue),
                endTimeSet: parseInt(endTimeValue),
            };
        }
        else
            return {
                startTimeSet: 0,
                endTimeSet: 0,
            };
    };
    return (React.createElement("div", { style: { width: "84vw", display: "flex" } },
        React.createElement("div", { style: {
                width: "100%",
                height: "84vh",
                // backgroundColor: "#424242",
                padding: 7,
                marginTop: 4,
                overflow: "auto",
            } },
            React.createElement("div", { style: {
                    height: 50,
                    position: "fixed",
                    zIndex: 400,
                    // backgroundColor: "#3b3b3b",
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
                React.createElement("div", { style: { marginLeft: 10 } },
                    React.createElement(core_1.TextField, { id: "time", label: "Time Date", type: "time", defaultValue: moment().format("HH:mm"), onChange: function (event) { return onTimeChange(event, "startTime"); }, 
                        // className={classes.textField}
                        InputLabelProps: {
                            shrink: true,
                        } })),
                React.createElement("div", { style: { marginLeft: 30 } },
                    React.createElement(core_1.TextField, { id: "time", label: "Time To", type: "time", defaultValue: moment().format("HH:mm"), onChange: function (event) { return onTimeChange(event, "endTime"); }, 
                        // className={classes.textField}
                        InputLabelProps: {
                            shrink: true,
                        } })),
                React.createElement("div", null,
                    React.createElement(core_1.Button, { variant: "outlined", style: { marginLeft: 15, marginTop: 10 }, onClick: function () {
                            handleGetSaleData({
                                startDate: DefaultDate.startDate,
                                endDate: DefaultDate.endDate,
                                time: sliptTimeRange(),
                            });
                        } }, "Submit"))),
            React.createElement(core_1.Divider, null),
            React.createElement("div", { style: { marginTop: 60 } },
                React.createElement(TableContainer_1.default, { component: core_1.Paper },
                    React.createElement(core_1.Typography, { style: { marginTop: 5, marginBottom: 5 } }, SalesProductsList
                        ? "Filtered Sales Products List"
                        : showFiltered
                            ? "Filtered Invoice List"
                            : "Sales pay day"),
                    React.createElement(core_1.Button, { style: { marginLeft: 25 }, variant: "outlined", startIcon: React.createElement(PictureAsPdf_1.default, null), onClick: function () { return savePdf(); } }, "Save As Pdf"),
                    React.createElement(core_1.Button, { style: { marginLeft: 10 }, variant: "outlined", disabled: SalesProductsList ? true : showFiltered ? true : false, startIcon: React.createElement(PictureAsPdf_1.default, null), onClick: function () {
                            props.dispatchEvent({ type: "SalesDay", data: SalesList.data });
                        } }, "Export to excel file"),
                    React.createElement(core_1.Button, { onClick: function () {
                            setSalesProductsList(false);
                            if (showFiltered)
                                setShowFiltered(false);
                            else
                                setShowFiltered(true);
                        }, style: { marginLeft: 10 }, variant: "outlined" }, showFiltered
                        ? "Show Sales Per day"
                        : "Show Filtered Sales Invoice List"),
                    React.createElement(core_1.Button, { disabled: props.User.userLogged.prevarges === "1" ? false : true, onClick: function () {
                            if (SalesProductsList)
                                setSalesProductsList(false);
                            else
                                setSalesProductsList(true);
                        }, style: { marginLeft: 10 }, variant: "outlined" }, "Show Filtered Sales Products List"),
                    SalesProductsList ? (React.createElement("div", null,
                        React.createElement(SalesProduct_1.default, { startTime: sliptTimeRange().startTimeSet, endTime: sliptTimeRange().endTimeSet, startDate: DefaultDate.startDate, endDate: DefaultDate.endDate }))) : (React.createElement("div", null, showFiltered ? (React.createElement("div", null,
                        React.createElement(Tickets_1.default, { ViewType: "reports", startTime: sliptTimeRange().startTimeSet, endTime: sliptTimeRange().endTimeSet, startDate: DefaultDate.startDate, endDate: DefaultDate.endDate, dateString: dateString }))) : (React.createElement(Table_1.default, { stickyHeader: true, size: "small", "aria-label": "a dense table" },
                        React.createElement(TableHead_1.default, null,
                            React.createElement(TableRow_1.default, null,
                                React.createElement(TableCell_1.default, { align: "left" }, "Invoice No"),
                                React.createElement(TableCell_1.default, { align: "left" }, "Date"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Cash sales"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Card sales"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Tax"),
                                React.createElement(TableCell_1.default, { align: "right" }, "Total"))),
                        React.createElement(TableBody_1.default, null, SalesList.data.map(function (row) { return (React.createElement(StyledTableRow, { key: row.SrNo },
                            React.createElement(core_1.Typography, { style: { marginLeft: 15 } },
                                props.User.userLogged.branche,
                                row.SrNo),
                            React.createElement(TableCell_1.default, { align: "left" },
                                React.createElement(core_1.Typography, null, row.Date)),
                            React.createElement(TableCell_1.default, { align: "right" },
                                React.createElement(core_1.Typography, null,
                                    React.createElement(Currency, { locale: "en", quantity: row.CashSales, symbol: "K" }))),
                            React.createElement(TableCell_1.default, { align: "right" },
                                React.createElement(core_1.Typography, null,
                                    React.createElement(Currency, { locale: "en", quantity: row.CardSales, symbol: "K" }))),
                            React.createElement(TableCell_1.default, { align: "right" },
                                React.createElement(core_1.Typography, null,
                                    React.createElement(Currency, { locale: "en", quantity: row.totalTaxFinal, symbol: "K" }))),
                            React.createElement(TableCell_1.default, { align: "right" },
                                React.createElement(core_1.Typography, null,
                                    React.createElement(Currency, { locale: "en", quantity: row.GrandTotal, symbol: "K" }))))); })))))))))));
};
function mapStateToProps(state) {
    return {
        Dep: state.Dep,
        User: state.User,
        SocketConn: state.SocketConn,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map