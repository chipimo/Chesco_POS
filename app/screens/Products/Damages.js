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
var styles_1 = require("@material-ui/core/styles");
var Paper_1 = require("@material-ui/core/Paper");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var dataBase_1 = require("../../redux/dataBase");
var DamagesRow_1 = require("./DamagesRow");
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
var materialDateInput = year + "-" + month + "-" + date;
var DateNumInput = "" + year + month + date;
var columns = [
    { id: "ItemName", label: "Product Name", minWidth: 170 },
    {
        id: "date",
        label: "Date",
        minWidth: 170,
        align: "right",
    },
    {
        id: "number",
        label: "Number Damaged",
        minWidth: 170,
        align: "right",
    },
    {
        id: "sellingPrice",
        label: "Selling Price",
        minWidth: 170,
        align: "right",
    },
    {
        id: "buyingPrice",
        label: "Buying Price",
        minWidth: 170,
        align: "right",
    },
];
var useStyles = styles_1.makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: "70vh",
    },
});
var Damages = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), page = _a[0], setPage = _a[1];
    var _b = React.useState(10), rowsPerPage = _b[0], setRowsPerPage = _b[1];
    var _c = React.useState(false), isLoaded = _c[0], setIsLoad = _c[1];
    var _d = React.useState({ data: [] }), rows = _d[0], setRows = _d[1];
    var _e = React.useState({
        startDate: "",
        endDate: "",
    }), DefaultDate = _e[0], setDefaultDate = _e[1];
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    React.useEffect(function () {
        if (!isLoaded) {
            LoadData({ startDate: DateNumInput, endDate: DateNumInput });
            setIsLoad(true);
        }
        if (props.ActionsReducer.state === "loadDamagesTable") {
            LoadData({ startDate: DateNumInput, endDate: DateNumInput });
            props.dispatchEvent({
                type: "CLEARSTATE",
                state: "",
            });
        }
    }, [props]);
    var LoadData = function (prop) {
        dataBase_1.default.HandelDamages({
            type: "get",
            startDate: parseInt(prop.startDate),
            endDate: parseInt(prop.endDate),
        }, function (callback) {
            setRows(__assign({}, rows, { data: callback }));
        });
    };
    var onOpenChange = function (dateValue, type) {
        var _a;
        var dateSplit = dateValue.target.value.split("-");
        var DateValue = "" + dateSplit[0] + dateSplit[1] + dateSplit[2];
        setDefaultDate(__assign({}, DefaultDate, (_a = {}, _a[type] = DateValue, _a)));
    };
    var handleGetSaleData = function () {
        LoadData({
            startDate: DefaultDate.startDate,
            endDate: DefaultDate.endDate,
        });
    };
    return (React.createElement("div", { style: { width: "82vw", margin: "auto" } },
        React.createElement(core_1.AppBar, { position: "static", color: "inherit" },
            React.createElement(core_1.Toolbar, { variant: "dense" },
                React.createElement(core_1.Typography, { variant: "h6", style: { flexGrow: 1 } }, "Damages"))),
        React.createElement("div", { style: {
                display: "flex",
                justifyContent: "space-between",
                padding: 10,
            } },
            React.createElement("div", { style: { width: "60%" } },
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
                                handleGetSaleData();
                            } }, "Submit"))),
                React.createElement(Paper_1.default, { className: classes.root },
                    React.createElement(TableContainer_1.default, { className: classes.container },
                        React.createElement(Table_1.default, { stickyHeader: true, "aria-label": "sticky table" },
                            React.createElement(TableHead_1.default, null,
                                React.createElement(TableRow_1.default, null, columns.map(function (column) { return (React.createElement(TableCell_1.default, { key: column.id, align: column.align, style: { minWidth: column.minWidth } }, column.label)); }))),
                            React.createElement(TableBody_1.default, null, rows.data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(function (row) {
                                return (React.createElement(TableRow_1.default, { hover: true, role: "checkbox", tabIndex: -1, key: row.code }, columns.map(function (column) {
                                    var value = row[column.id];
                                    return (React.createElement(TableCell_1.default, { key: column.id, align: column.align }, column.format && typeof value === "number"
                                        ? column.format(value)
                                        : value));
                                })));
                            })))),
                    React.createElement(TablePagination_1.default, { rowsPerPageOptions: [10, 25, 100], component: "div", count: rows.data.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }))),
            React.createElement("div", { style: { width: "40%", padding: 5, overflow: 'auto' } },
                React.createElement("div", null,
                    React.createElement(core_1.Typography, { variant: "h6" }, "Add Damaged Product")),
                React.createElement(Paper_1.default, null,
                    React.createElement("div", { style: { marginTop: 10 } },
                        React.createElement("div", { style: {
                                marginTop: 10,
                                display: "flex",
                                justifyContent: "space-between",
                            } },
                            React.createElement(DamagesRow_1.default, null))))))));
};
function mapStateToProps(state) {
    return {
        ActionsReducer: state.ActionsReducer,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Damages);
//# sourceMappingURL=Damages.js.map