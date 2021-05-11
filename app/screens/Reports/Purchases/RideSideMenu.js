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
var dataBase_1 = require("../../../redux/dataBase");
var material_table_1 = require("material-table");
var react_1 = require("react");
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
var PictureAsPdf_1 = require("@material-ui/icons/PictureAsPdf");
var moment = require("moment");
var ipcRenderer = require("electron").ipcRenderer;
var _ = require("lodash");
var check = moment(new Date());
var monthString = check.format("MMM"); // => ('January','February.....)
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
};
var RideSideMenu = function (props) {
    var _a = React.useState({ data: [] }), purchaseList = _a[0], setPurchaseList = _a[1];
    var _b = React.useState({ value: moment() }), selectedDate = _b[0], setSelectedDate = _b[1];
    var _c = React.useState({
        startDate: "",
        endDate: "",
    }), DefaultDate = _c[0], setDefaultDate = _c[1];
    var _d = React.useState({
        columns: [
            {
                title: "Product Name ",
                field: "productName",
            },
            {
                title: "Category",
                field: "group",
            },
            {
                title: "Ivoice Number",
                field: "invoiceNumber",
            },
            {
                title: "Supplier",
                field: "SupplierName",
            },
            {
                title: "Date",
                field: "EventDate",
            },
            {
                title: "Time",
                field: "time",
            },
            {
                title: "Buying Price",
                field: "buyingPrice",
            },
            {
                title: "Old Buying Price",
                field: "buyingPriceOld",
            },
            {
                title: "Quantity",
                field: "quantity",
            },
        ],
        data: [],
    }), state = _d[0], setState = _d[1];
    var NodeId = 0;
    React.useEffect(function () {
        dataBase_1.default.Get_Purchases({
            _type: "get_purchases",
            startDate: parseInt(DateNumInput),
            endDate: parseInt(DateNumInput),
        }, function (reciveCallback) {
            setTimeout(function () {
                setState(__assign({}, state, { data: reciveCallback }));
            }, 300);
        });
    }, []);
    var onSubmit = function () {
        dataBase_1.default.Get_Purchases({
            _type: "get_purchases",
            startDate: parseInt(DefaultDate.startDate),
            endDate: parseInt(DefaultDate.endDate),
        }, function (reciveCallback) {
            setTimeout(function () {
                setState(__assign({}, state, { data: reciveCallback }));
            }, 300);
        });
    };
    var onOpenChange = function (dateValue, type) {
        var _a;
        var dateSplit = dateValue.target.value.split("-");
        var DateValue = "" + dateSplit[0] + dateSplit[1] + dateSplit[2];
        setDefaultDate(__assign({}, DefaultDate, (_a = {}, _a[type] = DateValue, _a)));
    };
    return (React.createElement("div", { style: { width: "90%", height: "70vh" } },
        React.createElement("div", { style: { width: "100%", padding: 10, height: "66vh", overflow: "auto" } },
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
                React.createElement("div", null,
                    React.createElement(core_1.Button, { variant: "outlined", style: { marginLeft: 15, marginTop: 10 }, onClick: function () { return onSubmit(); } }, "Submit")),
                React.createElement("div", null,
                    React.createElement(core_1.Button, { style: { marginLeft: 10 }, variant: "outlined", startIcon: React.createElement(PictureAsPdf_1.default, null), onClick: function () {
                            ipcRenderer.send("save_csv", {
                                type: "Purchases",
                                header: [
                                    {
                                        title: "Product Name ",
                                        id: "productName",
                                    },
                                    {
                                        title: "Category",
                                        id: "group",
                                    },
                                    {
                                        title: "Ivoice Number",
                                        id: "invoiceNumber",
                                    },
                                    {
                                        title: "Supplier",
                                        id: "SupplierName",
                                    },
                                    {
                                        title: "Date",
                                        id: "date",
                                    },
                                    {
                                        title: "Time",
                                        id: "time",
                                    },
                                    {
                                        title: "Buying Price",
                                        id: "buyingPrice",
                                    },
                                    {
                                        title: "Old Buying Price",
                                        id: "buyingPriceOld",
                                    },
                                    {
                                        title: "Quantity",
                                        id: "quantity",
                                    },
                                ],
                                data: state.data,
                            });
                        } }, "Export to excel file"))),
            React.createElement("div", { style: { marginTop: 60 } },
                React.createElement(material_table_1.default, { icons: tableIcons, title: "Purchases List ", columns: state.columns, data: state.data })))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RideSideMenu);
//# sourceMappingURL=RideSideMenu.js.map