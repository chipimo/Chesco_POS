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
var dataBase_1 = require("../../redux/dataBase");
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
var Typography_1 = require("@material-ui/core/Typography");
var Paper_1 = require("@material-ui/core/Paper");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var react_toastify_1 = require("react-toastify");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var Currency = require("react-currency-formatter");
var moment = require("moment");
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
var DateNumInput = "" + year + month + date;
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
    { id: "name", numeric: false, disablePadding: false, label: "Product" },
    { id: "group", numeric: false, disablePadding: false, label: "Group" },
    {
        id: "sallingprice",
        numeric: true,
        disablePadding: false,
        label: "Sellnig Price",
    },
    {
        id: "buyingPrice",
        numeric: true,
        disablePadding: false,
        label: "Buying Price",
    },
    { id: "quantity", numeric: false, disablePadding: false, label: "Supplier" },
    { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
    {
        id: "costPrint",
        numeric: true,
        disablePadding: false,
        label: "Cost Price",
    },
    {
        id: "selling",
        numeric: true,
        disablePadding: false,
        label: "Selling Price",
    },
];
function EnhancedTableHead(props) {
    var classes = props.classes, onSelectAllClick = props.onSelectAllClick, order = props.order, orderBy = props.orderBy, numSelected = props.numSelected, rowCount = props.rowCount, onRequestSort = props.onRequestSort;
    var createSortHandler = function (property) { return function (event) {
        onRequestSort(event, property);
    }; };
    return (React.createElement(TableHead_1.default, null,
        React.createElement(TableRow_1.default, null,
            React.createElement(TableCell_1.default, { padding: "checkbox" },
                React.createElement(Checkbox_1.default, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, inputProps: { "aria-label": "select all products" } })),
            headCells.map(function (headCell) { return (React.createElement(TableCell_1.default, { key: headCell.id, align: headCell.numeric ? "right" : "left", padding: headCell.disablePadding ? "none" : "default", sortDirection: orderBy === headCell.id ? order : false },
                React.createElement(TableSortLabel_1.default, { active: orderBy === headCell.id, direction: orderBy === headCell.id ? order : "asc", onClick: createSortHandler(headCell.id) },
                    React.createElement(Typography_1.default, { variant: "h6" }, headCell.label)))); }),
            React.createElement(TableCell_1.default, { padding: "checkbox" }))));
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
    return (React.createElement(Toolbar_1.default, { className: numSelected > 0 ? classes.highlight : null }, numSelected > 0 ? (React.createElement(Typography_1.default, { className: classes.title, color: "inherit", variant: "subtitle1", component: "div" },
        numSelected,
        " selected")) : (React.createElement(Typography_1.default, { className: classes.title, variant: "h6", id: "tableTitle", component: "div" }, "Products List"))));
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "90%",
        overflow: "auto",
        padding: 10,
        backgroundColor: theme.palette.background.paper,
    },
}); });
var PaneRender = function (props) {
    var classes = useStyles();
    var _a = React.useState({
        columns: [
            {
                title: "Product Name ",
                field: "ItemName",
            },
            {
                title: "Group",
                field: "group",
            },
            {
                title: "In Store",
                field: "amountInstore",
            },
        ],
        data: [],
    }), state = _a[0], setState = _a[1];
    var _b = React.useState({
        data: [],
    }), purchase = _b[0], setPurchase = _b[1];
    var _c = React.useState({
        data: [],
    }), purchaseSearchList = _c[0], setPurchaseSearchList = _c[1];
    var _d = React.useState(false), openPurchase = _d[0], setopenPurchase = _d[1];
    var _e = React.useState(false), OpenTrans = _e[0], setOpenTrans = _e[1];
    var _f = React.useState([]), selected = _f[0], setSelected = _f[1];
    var _g = React.useState({}), selectedItem = _g[0], setSelectedItem = _g[1];
    var _h = React.useState([]), purchaseSelected = _h[0], setpurchaseSelected = _h[1];
    var _j = React.useState([]), mulitSelected = _j[0], setMulitSelected = _j[1];
    var _k = React.useState("asc"), order = _k[0], setOrder = _k[1];
    var _l = React.useState("calories"), orderBy = _l[0], setOrderBy = _l[1];
    var _m = React.useState(0), page = _m[0], setPage = _m[1];
    var _o = React.useState(false), dense = _o[0], setDense = _o[1];
    var _p = React.useState({ data: [] }), multi = _p[0], setMulti = _p[1];
    var _q = React.useState(5), rowsPerPage = _q[0], setRowsPerPage = _q[1];
    var _r = React.useState(true), loadOnce = _r[0], setLoadOnce = _r[1];
    var _s = React.useState([]), Departments = _s[0], SetDepartments = _s[1];
    var _t = React.useState(""), dep = _t[0], setDep = _t[1];
    var _u = React.useState({ value: "" }), qnt = _u[0], setqnt = _u[1];
    var _v = React.useState({
        supplier: "",
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false,
    }), values = _v[0], setValues = _v[1];
    var _w = React.useState([]), Suppliers = _w[0], SetSuppliers = _w[1];
    var _x = React.useState(""), inviceNumber = _x[0], setinviceNumber = _x[1];
    var handleChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
    }; };
    var handleChangeSupplier = function (event) {
        setinviceNumber(event.target.value);
    };
    var handleOpenPurchase = function () {
        setopenPurchase(true);
    };
    var handlePurchase = function () {
        var check = moment(new Date());
        var time = check.format("LT");
        var data = {
            _type: "add_to_store",
            purchaseSelected: purchaseSelected,
            mulitSelected: mulitSelected,
            selected: selected,
            dep: props.Dep.dep,
        };
        var dataPurchases = {
            _type: "purchases",
            purchaseSelected: purchaseSelected,
            mulitSelected: mulitSelected,
            dep: props.Dep.dep,
            invoiceNumber: inviceNumber,
            EventDate: moment().format("MM/DD/YYYY"),
            dateRange: parseInt(DateNumInput),
            time: time,
        };
        dataBase_1.default.HandelProducts(data, function (reciveCallback) {
            dataBase_1.default.HandelReports(dataPurchases, function (callback) {
                react_toastify_1.toast("Successfully Purchased", {
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
            CloseOpenPurchase();
            setpurchaseSelected([]);
            setSelected([]);
        });
    };
    var CloseOpenPurchase = function () {
        setopenPurchase(false);
    };
    var HandleQutChange = function (value, data, index, type) {
        if (type === "multi") {
            var selectedMulitIndex = mulitSelected.indexOf(data);
            purchaseSelected.map(function (list, index) {
                if (list.ItemName === data.productName) {
                    purchaseSelected[index].quantity = list.quantity
                        ? list.quantity + 1
                        : parseInt(value);
                }
            });
            if (selectedMulitIndex === -1) {
                data.quantity = parseInt(value);
                mulitSelected.push(data);
                setMulitSelected(mulitSelected);
            }
            else {
                mulitSelected[selectedMulitIndex].quantity = parseInt(value);
            }
        }
        else {
            var selectedIndex = purchaseSelected.indexOf(data);
            // console.log(type);
            if (type === "qt")
                purchaseSelected[selectedIndex].quantity = parseInt(value);
            else if (type === "cost")
                purchaseSelected[selectedIndex].costPrice = parseInt(value);
            else if (type === "price")
                purchaseSelected[selectedIndex].sellingPriceNew = parseInt(value);
            else if (type === "supplier")
                purchaseSelected[selectedIndex].supplier = value;
            setpurchaseSelected(purchaseSelected);
        }
    };
    React.useEffect(function () {
        if (loadOnce) {
            props.dispatchEvent({ type: "LOADTABEL" });
            setLoadOnce(false);
            dataBase_1.default.HandleSuppliers({ type: "get" }, function (callback) {
                SetSuppliers(callback);
            });
        }
        if (props.LoadTabel.load) {
            LoadData();
            props.dispatchEvent({ type: "CLEARLOADTABEL" });
        }
        dataBase_1.default.HandleDepartments({ type: "getAll" }, function (callback) {
            SetDepartments(callback.departments);
        });
    }, [props]);
    var LoadData = function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_purcheased" }, function (receiveCallback) {
            setTimeout(function () {
                setState(__assign({}, state, { data: receiveCallback }));
            }, 100);
        });
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "getGrouped" }, function (receiveCallback) {
            if (receiveCallback.productResult[0].length > 50)
                setRowsPerPage(50);
            // console.log(receiveCallback.productResult[0]);
            setPurchase(__assign({}, purchase, { data: receiveCallback.productResult[0] }));
            setPurchaseSearchList(__assign({}, purchaseSearchList, { data: receiveCallback.productResult[0] }));
            // setMulti({ ...multi, data: receiveCallback.mulitList });
        });
    };
    var handleRequestSort = function (event, property) {
        var isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    var handleSelectAllClick = function (event) {
        if (event.target.checked) {
            var newSelecteds = purchase.data.map(function (n) { return n.name; });
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    var handleClick = function (event, data) {
        // console.log(data);
        var selectedIndex = selected.indexOf(data.ItemName);
        var purchesSelected = [];
        var newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, data.ItemName);
            purchesSelected = purchesSelected.concat(purchaseSelected, data);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            purchesSelected = purchesSelected.concat(purchaseSelected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            purchesSelected = purchesSelected.concat(purchaseSelected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
            purchesSelected = purchesSelected.concat(purchaseSelected.slice(0, selectedIndex), purchaseSelected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
        setpurchaseSelected(purchesSelected);
        var filteredItems = mulitSelected.filter(function (item) {
            if (item.productName !== data.ItemName)
                return item;
        });
        setMulitSelected(filteredItems);
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    var handleDepChange = function (event) {
        setDep(event.target.value);
    };
    var isSelected = function (name) { return selected.indexOf(name) !== -1; };
    var emptyRows = rowsPerPage -
        Math.min(rowsPerPage, purchase.data.length - page * rowsPerPage);
    var submit = function () {
        if (dep === "") {
            alert("Please selecte a department");
            return;
        }
        dataBase_1.default.HandelProducts({
            _type: "getPOSList",
            layoutType: "mulitList",
            name: selectedItem.ItemName,
        }, function (callback) {
            // console.log(callback);
            if (props.Dep.dep === dep.dep_name) {
                return alert("We're sorry we can't send this item to the same department you are on \"" + props.Dep.dep + "\"");
            }
            var data = {
                _type: "tranfer",
                value: qnt.value,
                selected: selectedItem,
                to: dep.dep_name,
                from: props.Dep.dep,
                multi: callback,
                state: "send",
                isCleared: true,
            };
            dataBase_1.default.HandelProducts(data, function (callback) { });
            setOpenTrans(false);
        });
    };
    var search = function (event, item) {
        if (item !== null)
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "searchedProduct", id: item }, function (receiveCallback) {
                console.log(receiveCallback);
                setPurchase(__assign({}, purchase, { data: receiveCallback }));
            });
        else
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "all_P" }, function (receiveCallback) {
                if (receiveCallback.productsList.length > 50)
                    setRowsPerPage(100);
                setPurchase(__assign({}, purchase, { data: receiveCallback.productsList }));
                setMulti(__assign({}, multi, { data: receiveCallback.mulitList }));
            });
    };
    return (React.createElement("div", { className: classes.paper },
        React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: purchaseSearchList.data, getOptionLabel: function (option) { return option.ItemName; }, onChange: search, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Search products", variant: "outlined" }))); } }),
        React.createElement("div", { style: {
                overflow: "auto",
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 3,
            } },
            React.createElement(EnhancedTableToolbar, { numSelected: selected.length }),
            React.createElement(TableContainer_1.default, null,
                React.createElement(Table_1.default, { "aria-labelledby": "tableTitle", size: "small", "aria-label": "enhanced table" },
                    React.createElement(EnhancedTableHead, { classes: classes, numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: purchase.data.length }),
                    React.createElement(TableBody_1.default, null,
                        stableSort(purchase.data, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(function (row, index) {
                            var isItemSelected = isSelected(row.ItemName);
                            var labelId = "enhanced-table-checkbox-" + index;
                            if (!row.isMaster)
                                return (React.createElement(TableRow_1.default, { hover: true, role: "checkbox", "aria-checked": isItemSelected, tabIndex: -1, key: labelId + row.ItemName, selected: isItemSelected },
                                    React.createElement(TableCell_1.default, { padding: "checkbox" },
                                        React.createElement(Checkbox_1.default, { onClick: function (event) { return handleClick(event, row); }, checked: isItemSelected, inputProps: { "aria-labelledby": labelId } })),
                                    React.createElement(TableCell_1.default, { component: "th", id: labelId, scope: "row", padding: "none" },
                                        React.createElement(Typography_1.default, null, row.ItemName)),
                                    React.createElement(TableCell_1.default, { align: "left" },
                                        React.createElement(Typography_1.default, null, row.group)),
                                    React.createElement(TableCell_1.default, { align: "right" },
                                        React.createElement(Typography_1.default, null,
                                            React.createElement(Currency, { locale: "en", quantity: row.sallingprice, symbol: "K" }))),
                                    React.createElement(TableCell_1.default, { align: "right" },
                                        React.createElement(Typography_1.default, null,
                                            React.createElement(Currency, { locale: "en", quantity: row.buyingPrice, symbol: "K" }))),
                                    React.createElement(TableCell_1.default, { align: "right" },
                                        React.createElement(core_1.FormControl, null,
                                            React.createElement(core_1.InputLabel, { id: "demo-simple-select-label" }, "Supplier"),
                                            React.createElement(core_1.Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", 
                                                // value={values.supplier}
                                                fullWidth: true, onChange: function (e) {
                                                    HandleQutChange(e.target.value, row, index, "supplier");
                                                } }, Suppliers.map(function (supplier) { return (React.createElement(core_1.MenuItem, { key: supplier.supplierKey, value: supplier.SupplierName }, supplier.SupplierName)); })))),
                                    React.createElement(TableCell_1.default, { align: "right" },
                                        React.createElement("input", { style: { width: 50 }, disabled: isItemSelected ? false : true, defaultValue: isItemSelected ? 0 : null, onInput: function (e) {
                                                HandleQutChange(e.target.value, row, index, "qt");
                                            }, type: "number" })),
                                    React.createElement(TableCell_1.default, { align: "right" },
                                        React.createElement("input", { style: { width: 50 }, disabled: isItemSelected ? false : true, defaultValue: isItemSelected ? 0 : null, onInput: function (e) {
                                                HandleQutChange(e.target.value, row, index, "cost");
                                            }, type: "number" })),
                                    React.createElement(TableCell_1.default, { align: "right" },
                                        React.createElement("input", { style: { width: 50 }, disabled: isItemSelected ? false : true, defaultValue: isItemSelected ? 0 : null, onInput: function (e) {
                                                HandleQutChange(e.target.value, row, index, "price");
                                            }, type: "number" }))));
                        }),
                        emptyRows > 0 && (React.createElement(TableRow_1.default, { style: { height: (dense ? 33 : 53) * emptyRows } },
                            React.createElement(TableCell_1.default, { colSpan: 6 })))))),
            React.createElement(TablePagination_1.default, { rowsPerPageOptions: [5, 10, 25], component: "div", count: purchase.data.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage })),
        React.createElement("div", null,
            React.createElement(core_1.TextField, { id: "outlined-basic", label: "Invoice Number", variant: "outlined", onChange: function (e) {
                    handleChangeSupplier(e);
                } })),
        React.createElement("div", { style: { display: "flex", marginTop: 7 } },
            React.createElement(core_1.Button, { disabled: selected.length !== 0 ? false : true, variant: "contained", color: "primary", onClick: handlePurchase }, "Purchase Selected")),
        React.createElement("div", null,
            React.createElement(core_1.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: OpenTrans, className: classes.modal },
                React.createElement(Paper_1.default, { square: true, elevation: 12, style: { width: 400, height: 260, padding: 20 } },
                    React.createElement("div", { style: { marginTop: 15 } },
                        React.createElement(Typography_1.default, { variant: "h6" },
                            "Transfer",
                            " ",
                            React.createElement("span", { style: { color: "green" } }, selectedItem.ItemName))),
                    React.createElement("div", { style: { display: "flex" } },
                        React.createElement("div", { style: { width: 150, marginTop: 10 } },
                            React.createElement(Typography_1.default, null, "Tranfer to ")),
                        React.createElement(core_1.FormControl, { style: { width: "100%" } },
                            React.createElement(core_1.Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", value: dep, displayEmpty: true, onChange: handleDepChange }, Departments.map(function (list, index) { return (React.createElement(core_1.MenuItem, { key: index, value: list }, list.dep_name)); })))),
                    React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(core_1.TextField, { label: "Number of items", type: "number", value: qnt.value, onChange: function (e) { return setqnt(__assign({}, qnt, { value: e.target.value })); }, id: "outlined-margin-dense", 
                            // defaultValue={qnt.value}
                            helperText: "The default value is the total number of this items", margin: "dense", variant: "outlined" })),
                    React.createElement("div", { style: { marginTop: 15 } },
                        React.createElement(core_1.Button, { onClick: function () { return submit(); }, variant: "contained", color: "primary" }, "Done"),
                        React.createElement(core_1.Button, { onClick: function () { return setOpenTrans(false); }, variant: "contained", color: "secondary", style: { marginLeft: 5 } }, "Cancel")))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Dep: state.Dep,
        LoadTabel: state.LoadTabel,
        LoggedUsers: state.LoggedUsers,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PaneRender);
//# sourceMappingURL=PaneRender.js.map