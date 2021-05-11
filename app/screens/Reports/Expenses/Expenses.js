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
var styles_1 = require("@material-ui/core/styles");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var TableRow_1 = require("@material-ui/core/TableRow");
var TableSortLabel_1 = require("@material-ui/core/TableSortLabel");
var Toolbar_1 = require("@material-ui/core/Toolbar");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var IconButton_1 = require("@material-ui/core/IconButton");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
var Switch_1 = require("@material-ui/core/Switch");
var Delete_1 = require("@material-ui/icons/Delete");
var FilterList_1 = require("@material-ui/icons/FilterList");
var Edit_1 = require("@material-ui/icons/Edit");
var dataBase_1 = require("../../../redux/dataBase");
var react_toastify_1 = require("react-toastify");
var Modal_1 = require("@material-ui/core/Modal");
var Backdrop_1 = require("@material-ui/core/Backdrop");
var Fade_1 = require("@material-ui/core/Fade");
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
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? function (a, b) { return descendingComparator(a, b, orderBy); }
        : function (a, b) { return -descendingComparator(a, b, orderBy); };
}
function stableSort(array, comparator) {
    var stabilizedThis = array.map(function (el, index) { return [el, index]; });
    stabilizedThis.sort(function (a, b) {
        var order = comparator(a[0], b[0]);
        if (order !== 0)
            return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(function (el) { return el[0]; });
}
var headCells = [
    {
        id: "action",
        numeric: false,
        disablePadding: true,
        label: "Action",
    },
    {
        id: "description",
        numeric: false,
        disablePadding: true,
        label: "Description",
    },
    { id: "cost", numeric: true, disablePadding: false, label: "Cost" },
    { id: "user", numeric: true, disablePadding: false, label: "User" },
    { id: "time", numeric: true, disablePadding: false, label: "Time" },
    { id: "date", numeric: true, disablePadding: false, label: "Date" },
];
function EnhancedTableHead(props) {
    var classes = props.classes, onSelectAllClick = props.onSelectAllClick, order = props.order, orderBy = props.orderBy, numSelected = props.numSelected, rowCount = props.rowCount, onRequestSort = props.onRequestSort;
    var createSortHandler = function (property) { return function (event) {
        onRequestSort(event, property);
    }; };
    return (React.createElement(TableHead_1.default, null,
        React.createElement(TableRow_1.default, null,
            React.createElement(TableCell_1.default, { padding: "checkbox" },
                React.createElement(Checkbox_1.default, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, 
                    // disabled={props.User.userLogged.prevarges === "2" ? true : false}
                    inputProps: { "aria-label": "select all desserts" } })),
            headCells.map(function (headCell) { return (React.createElement(TableCell_1.default, { key: headCell.id, align: headCell.numeric ? "right" : "left", padding: headCell.disablePadding ? "none" : "default", sortDirection: orderBy === headCell.id ? order : false },
                React.createElement(TableSortLabel_1.default, { active: orderBy === headCell.id, direction: orderBy === headCell.id ? order : "asc", onClick: createSortHandler(headCell.id) },
                    headCell.label,
                    orderBy === headCell.id ? (React.createElement("span", { className: classes.visuallyHidden }, order === "desc" ? "sorted descending" : "sorted ascending")) : null))); }))));
}
var useToolbarStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight: theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: styles_1.lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    title: {
        flex: "1 1 100%",
    },
}); });
var EnhancedTableToolbar = function (props) {
    var classes = useToolbarStyles();
    var numSelected = props.numSelected;
    return (React.createElement(Toolbar_1.default, { className: classes.root },
        numSelected > 0 ? (React.createElement(core_1.Typography, { className: classes.title, color: "inherit", variant: "subtitle1", component: "div" },
            numSelected,
            " selected")) : (React.createElement(core_1.Typography, { className: classes.title, variant: "h6", id: "tableTitle", component: "div" }, "Nutrition")),
        numSelected > 0 ? (React.createElement(Tooltip_1.default, { title: "Delete" },
            React.createElement(IconButton_1.default, { "aria-label": "delete" },
                React.createElement(Delete_1.default, null)))) : (React.createElement(Tooltip_1.default, { title: "Filter list" },
            React.createElement(IconButton_1.default, { "aria-label": "filter list" },
                React.createElement(FilterList_1.default, null))))));
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper2: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}); });
var Expenses = function (props) {
    var classes = useStyles();
    var _a = React.useState("asc"), order = _a[0], setOrder = _a[1];
    var _b = React.useState("calories"), orderBy = _b[0], setOrderBy = _b[1];
    var _c = React.useState([]), selected = _c[0], setSelected = _c[1];
    var _d = React.useState(0), page = _d[0], setPage = _d[1];
    var _e = React.useState(false), dense = _e[0], setDense = _e[1];
    var _f = React.useState(5), rowsPerPage = _f[0], setRowsPerPage = _f[1];
    var _g = React.useState([]), rows = _g[0], setRows = _g[1];
    var _h = React.useState({
        des: "",
        amount: 0,
        amountEdit: 0,
        desEdit: "",
        id: "",
    }), data = _h[0], setData = _h[1];
    var _j = React.useState({
        startDate: "",
        endDate: "",
    }), DefaultDate = _j[0], setDefaultDate = _j[1];
    var _k = React.useState(false), open = _k[0], setOpen = _k[1];
    var _l = React.useState(false), openError = _l[0], setOpenError = _l[1];
    var handleOpen = function () {
        props.User.userLogged.prevarges === "1"
            ? setOpen(true)
            : setOpenError(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var handleRequestSort = function (event, property) {
        var isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    var handleSelectAllClick = function (event) {
        if (event.target.checked) {
            var newSelecteds = rows.map(function (n) { return n.name; });
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    var handleClick = function (event, name) {
        var selectedIndex = selected.indexOf(name);
        var newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    var handleOnChange = function (event) {
        var _a;
        setData(__assign({}, data, (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var handleChangeDense = function (event) {
        setDense(event.target.checked);
    };
    var handleSubmit = function () {
        var sendData = {
            des: data.des,
            amount: data.amount,
            _type: "expenses",
            user: props.User.userLogged.userName,
            branch: props.User.userLogged.branche === null
                ? "all"
                : props.User.userLogged.branche,
            dateRange: parseInt(DateNumInput),
        };
        // console.log(sendData);
        // console.log(props);
        dataBase_1.default.HandelReports(sendData, function (callback) {
            setData(__assign({}, data, { des: "", amount: 0 }));
            handleGetSaleData({
                startDate: parseInt(DateNumInput),
                endDate: parseInt(DateNumInput),
            });
            react_toastify_1.toast("Add new expense", {
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
    };
    var handleSubmitEdit = function () {
        var sendData = {
            des: data.desEdit,
            amount: data.amountEdit,
            _type: "edit_expenses",
            id: data.id,
        };
        dataBase_1.default.HandelReports(sendData, function (callback) {
            setData(__assign({}, data, { desEdit: "", amountEdit: 0 }));
            handleGetSaleData({
                startDate: parseInt(DateNumInput),
                endDate: parseInt(DateNumInput),
            });
            react_toastify_1.toast("Successfully edited", {
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
    };
    var handleSubmitDelete = function (id) {
        var sendData = {
            id: id,
            _type: "delete_expenses",
        };
        dataBase_1.default.HandelReports(sendData, function (callback) {
            handleGetSaleData({
                startDate: parseInt(DateNumInput),
                endDate: parseInt(DateNumInput),
            });
            react_toastify_1.toast("Successfully Deleted", {
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
    };
    React.useEffect(function () {
        // console.log(props.User.userLogged.prevarges);
        handleGetSaleData({
            startDate: parseInt(DateNumInput),
            endDate: parseInt(DateNumInput),
        });
    }, []);
    var handleGetSaleData = function (prop) {
        dataBase_1.default.HandelReports({
            _type: "get_expenses",
            startDate: prop.startDate,
            endDate: prop.endDate,
        }, function (callback) {
            setRows(callback.data);
        });
    };
    var onOpenChange = function (dateValue, type) {
        var _a;
        var dateSplit = dateValue.target.value.split("-");
        var DateValue = "" + dateSplit[0] + dateSplit[1] + dateSplit[2];
        setDefaultDate(__assign({}, DefaultDate, (_a = {}, _a[type] = DateValue, _a)));
    };
    var isSelected = function (name) { return selected.indexOf(name) !== -1; };
    var emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (React.createElement("div", { style: { padding: 15, width: "80vw" } },
        React.createElement("div", null,
            React.createElement(core_1.Typography, { variant: "h6" }, "Expenses")),
        React.createElement("div", { style: { marginTop: 15 } },
            React.createElement(core_1.Divider, null)),
        props.type === "reports" ? (React.createElement("div", { style: { display: "flex" } },
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
            React.createElement(core_1.Button, { variant: "outlined", style: { marginLeft: 15, marginTop: 10 }, onClick: function () {
                    handleGetSaleData({
                        startDate: parseInt(DefaultDate.startDate),
                        endDate: parseInt(DefaultDate.endDate),
                    });
                } }, "Submit"),
            React.createElement(core_1.Button, { variant: "outlined", style: { marginLeft: 15, marginTop: 10 }, onClick: function () {
                    ipcRenderer.send("save_csv", {
                        type: "Expenses",
                        header: [
                            {
                                id: "description",
                                title: "Description",
                            },
                            {
                                id: "cost",
                                title: "Cost",
                            },
                            {
                                id: "user",
                                title: "User",
                            },
                            {
                                id: "time",
                                title: "Time",
                            },
                            {
                                id: "date",
                                title: "Date",
                            },
                        ],
                        data: rows,
                    });
                } }, "Export to csv"))) : null,
        React.createElement("div", { style: {
                marginTop: 15,
                display: "flex",
                justifyContent: "space-between",
            } },
            React.createElement(core_1.Paper, { style: { width: "65%" } },
                React.createElement("div", { className: classes.root },
                    React.createElement(core_1.Paper, { className: classes.paper },
                        React.createElement(EnhancedTableToolbar, { numSelected: selected.length }),
                        React.createElement(TableContainer_1.default, null,
                            React.createElement(Table_1.default, { className: classes.table, "aria-labelledby": "tableTitle", size: dense ? "small" : "medium", "aria-label": "enhanced table" },
                                React.createElement(EnhancedTableHead, { classes: classes, numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: rows.length }),
                                React.createElement(TableBody_1.default, null,
                                    stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(function (row, index) {
                                        var isItemSelected = isSelected(row.idKey);
                                        var labelId = "enhanced-table-checkbox-" + index;
                                        return (React.createElement(TableRow_1.default, { hover: true, role: "checkbox", "aria-checked": isItemSelected, tabIndex: -1, key: row.idKey, selected: isItemSelected },
                                            React.createElement(TableCell_1.default, { padding: "checkbox" },
                                                React.createElement(IconButton_1.default, { disabled: props.type === "reports"
                                                        ? props.User.userLogged.prevarges === "2"
                                                            ? true
                                                            : false
                                                        : true, onClick: function () {
                                                        handleSubmitDelete(row.idKey);
                                                    }, "aria-label": "delete" },
                                                    React.createElement(Delete_1.default, { fontSize: "inherit" }))),
                                            React.createElement(TableCell_1.default, null,
                                                React.createElement(IconButton_1.default, { disabled: props.type === "reports"
                                                        ? props.User.userLogged.prevarges === "2"
                                                            ? true
                                                            : false
                                                        : true, onClick: function () {
                                                        setData(__assign({}, data, { desEdit: row.description, amountEdit: row.cost, id: row.idKey }));
                                                        handleOpen();
                                                    }, "aria-label": "delete" },
                                                    React.createElement(Edit_1.default, { fontSize: "inherit" }))),
                                            React.createElement(TableCell_1.default, { component: "th", id: labelId, scope: "row", padding: "none" }, row.description),
                                            React.createElement(TableCell_1.default, { align: "right" }, row.cost),
                                            React.createElement(TableCell_1.default, { align: "right" }, row.user),
                                            React.createElement(TableCell_1.default, { align: "right" }, row.time),
                                            React.createElement(TableCell_1.default, { align: "right" }, row.date)));
                                    }),
                                    emptyRows > 0 && (React.createElement(TableRow_1.default, { style: { height: (dense ? 33 : 53) * emptyRows } },
                                        React.createElement(TableCell_1.default, { colSpan: 6 })))))),
                        React.createElement(TablePagination_1.default, { rowsPerPageOptions: [5, 10, 25], component: "div", count: rows.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage })),
                    React.createElement(FormControlLabel_1.default, { control: React.createElement(Switch_1.default, { checked: dense, onChange: handleChangeDense }), label: "Dense padding" }))),
            React.createElement(core_1.Paper, { style: { width: "30%" } },
                React.createElement("div", { style: { padding: 15 } },
                    React.createElement("div", null,
                        React.createElement(core_1.Typography, { variant: "h6" }, "Add New Expense")),
                    React.createElement("div", { style: { marginTop: 15 } },
                        React.createElement(core_1.Divider, null)),
                    React.createElement("div", { style: { marginTop: 10 } },
                        React.createElement(core_1.TextField, { id: "filled-basic", rowsMax: 4, name: "des", onChange: handleOnChange, value: data.des, multiline: true, label: "Expense Description", variant: "filled" })),
                    React.createElement("div", { style: { marginTop: 10 } },
                        React.createElement(core_1.TextField, { id: "filled-basic", name: "amount", onChange: handleOnChange, value: data.amount, type: "number", label: "Expense Amount", variant: "filled" })),
                    React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(core_1.Button, { onClick: handleSubmit, variant: "contained", color: "primary" }, "Save"))))),
        React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: open, onClose: handleClose, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                timeout: 500,
            } },
            React.createElement(Fade_1.default, { in: open },
                React.createElement("div", { className: classes.paper2 },
                    React.createElement("div", { style: { padding: 15 } },
                        React.createElement("div", null,
                            React.createElement(core_1.Typography, { variant: "h6" }, "Edit Expense")),
                        React.createElement("div", { style: { marginTop: 15 } },
                            React.createElement(core_1.Divider, null)),
                        React.createElement("div", { style: { marginTop: 10 } },
                            React.createElement(core_1.TextField, { id: "filled-basic", rowsMax: 4, name: "desEdit", onChange: handleOnChange, value: data.desEdit, multiline: true, label: "Expense Description", variant: "filled" })),
                        React.createElement("div", { style: { marginTop: 10 } },
                            React.createElement(core_1.TextField, { id: "filled-basic", name: "amountEdit", onChange: handleOnChange, value: data.amountEdit, type: "number", label: "Expense Amount", variant: "filled" })),
                        React.createElement("div", { style: { marginTop: 20 } },
                            React.createElement(core_1.Button, { onClick: handleSubmitEdit, variant: "contained", color: "primary" }, "Save"),
                            React.createElement(core_1.Button, { onClick: function () {
                                    setData(__assign({}, data, { des: "", amount: 0 }));
                                }, variant: "contained", color: "secondary" }, "Clear")))))),
        React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: openError, onClose: function () { return setOpenError(false); }, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                timeout: 500,
            } },
            React.createElement(Fade_1.default, { in: open },
                React.createElement("div", { className: classes.paper2 },
                    React.createElement(core_1.Typography, { variant: "h6" }, "Access denied"),
                    React.createElement("div", null, "You can't perform this action ! \uD83D\uDE1E"))))));
};
function mapStateToProps(state) {
    return {
        User: state.User,
        Theme: state.Theme,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Expenses);
//# sourceMappingURL=Expenses.js.map