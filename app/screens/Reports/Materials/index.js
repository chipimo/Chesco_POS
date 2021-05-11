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
var semantic_ui_react_1 = require("semantic-ui-react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var Paper_1 = require("@material-ui/core/Paper");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var dataBase_1 = require("../../../redux/dataBase");
var moment = require("moment");
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
var DateNumInput = "" + year + month + date; // combining to format for defaultValue or value attribute of material <TextField>
var columns = [
    { id: "materialName", label: "Name", minWidth: 170 },
    {
        id: "DateEntered",
        label: "Date Entered",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toLocaleString("en-US"); },
    },
    { id: "measuredBy", label: "Measured By", minWidth: 100 },
    {
        id: "quantityStarted",
        label: "Quantity At Start",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toLocaleString("en-US"); },
    },
    {
        id: "quantityOpening",
        label: "Quantity Opening",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toFixed(2); },
    },
    {
        id: "quantityClosing",
        label: "Quantity Closing",
        minWidth: 170,
        align: "right",
        format: function (value) { return value.toFixed(2); },
    },
    {
        id: "DateUpdated",
        label: "Date Updated",
        minWidth: 170,
        align: "right",
    },
];
var useStyles = styles_1.makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});
var index = function (props) {
    var classes = useStyles();
    var _a = React.useState(0), page = _a[0], setPage = _a[1];
    var _b = React.useState(10), rowsPerPage = _b[0], setRowsPerPage = _b[1];
    var _c = React.useState({ data: [] }), rows = _c[0], setRows = _c[1];
    var _d = React.useState({
        startDate: 0,
        endDate: 0,
    }), DefaultDate = _d[0], setDefaultDate = _d[1];
    var _e = React.useState({
        startTime: 0,
        endTime: 0,
    }), DefaultTime = _e[0], setDefaultTime = _e[1];
    React.useEffect(function () {
        handleGetSaleData({
            startDate: parseInt(DateNumInput),
            endDate: parseInt(DateNumInput),
        });
        setDefaultDate(__assign({}, DefaultDate, { startDate: parseInt(DateNumInput), endDate: parseInt(DateNumInput) }));
    }, []);
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    var onOpenChange = function (dateValue, type) {
        var _a;
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
    var handleGetSaleData = function (prop) {
        dataBase_1.default.HandelProducts({
            _type: "getMaterialsReports",
            startDate: prop.startDate,
            endDate: prop.endDate,
        }, function (callback) {
            setRows(__assign({}, rows, { data: callback }));
        });
    };
    var saveCSV = function () {
        ipcRenderer.send("save_csv", {
            type: "MaterialsList",
            data: rows.data,
            header: [
                { id: "materialName", title: "Name" },
                {
                    id: "DateEntered",
                    title: "Date Entered",
                },
                { id: "measuredBy", title: "Measured By", minWidth: 100 },
                {
                    id: "quantityStarted",
                    title: "Quantity At Start",
                },
                {
                    id: "quantityOpening",
                    title: "Quantity Opening",
                },
                {
                    id: "quantityClosing",
                    title: "Quantity Closing",
                },
                {
                    id: "DateUpdated",
                    title: "Date Updated",
                },
            ],
        });
    };
    return (React.createElement("div", { style: {
            padding: 10,
            height: "90vh",
            width: "90vw",
            backgroundColor: "#F1F1F1",
        } },
        React.createElement("div", { style: { padding: 10, display: "flex" } },
            React.createElement(semantic_ui_react_1.Icon, { name: "cart arrow down", color: "teal", circular: true }),
            React.createElement(core_1.Typography, { style: { marginLeft: 10 }, variant: "h6" }, "Material Reports")),
        React.createElement(core_1.Divider, null),
        React.createElement("div", { style: { padding: 10 } },
            React.createElement("div", { style: {
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
                                startDate: DefaultDate.startDate,
                                endDate: DefaultDate.endDate,
                            });
                        } }, "Submit")),
                React.createElement("div", { style: { marginLeft: 10 } },
                    React.createElement(core_1.Button, { variant: "outlined", style: { marginLeft: 15, marginTop: 10 }, onClick: function () {
                            saveCSV();
                        } }, "Export to excel")))),
        React.createElement(core_1.Divider, null),
        React.createElement("div", { style: { marginTop: 15 } },
            React.createElement(Paper_1.default, { className: classes.root },
                React.createElement(TableContainer_1.default, { className: classes.container },
                    React.createElement(Table_1.default, { stickyHeader: true, "aria-label": "sticky table" },
                        React.createElement(TableHead_1.default, null,
                            React.createElement(TableRow_1.default, null, columns.map(function (column) { return (React.createElement(TableCell_1.default, { key: column.id, align: column.align, style: { minWidth: column.minWidth } }, column.label)); }))),
                        React.createElement(TableBody_1.default, null, rows.data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(function (row) {
                            return (React.createElement(TableRow_1.default, { hover: true, role: "checkbox", tabIndex: -1, key: row.idKey }, columns.map(function (column) {
                                var value = row[column.id];
                                return (React.createElement(TableCell_1.default, { key: column.id, align: column.align }, column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value));
                            })));
                        })))),
                React.createElement(TablePagination_1.default, { rowsPerPageOptions: [10, 25, 100], component: "div", count: rows.data.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage })))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map