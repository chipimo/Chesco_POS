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
var IconButton_1 = require("@material-ui/core/IconButton");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var FormControlLabel_1 = require("@material-ui/core/FormControlLabel");
var Switch_1 = require("@material-ui/core/Switch");
var Delete_1 = require("@material-ui/icons/Delete");
var Edit_1 = require("@material-ui/icons/Edit");
var Send_1 = require("@material-ui/icons/Send");
var AddShoppingCart_1 = require("@material-ui/icons/AddShoppingCart");
var FilterList_1 = require("@material-ui/icons/FilterList");
var Close_1 = require("@material-ui/icons/Close");
var Modal_1 = require("@material-ui/core/Modal");
var Fade_1 = require("@material-ui/core/Fade");
var Backdrop_1 = require("@material-ui/core/Backdrop");
var dataBase_1 = require("../../redux/dataBase");
var SelectedListModel_1 = require("./SelectedListModel");
var Popper_1 = require("@material-ui/core/Popper");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var core_1 = require("@material-ui/core");
var NewProduct_1 = require("../Products/NewProduct");
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
        id: "ItemName",
        numeric: false,
        disablePadding: true,
        label: "Product Name",
    },
    { id: "group", numeric: false, disablePadding: false, label: "Category" },
    { id: "branche", numeric: false, disablePadding: false, label: "Branch" },
    {
        id: "isTaxEnabled",
        numeric: false,
        disablePadding: false,
        label: "Tax Status",
    },
    {
        id: "expiryDate",
        numeric: false,
        disablePadding: false,
        label: "Expiration date",
    },
    {
        id: "DaysRem",
        numeric: false,
        disablePadding: false,
        label: "Days remaining",
    },
    {
        id: "amountInstore",
        numeric: true,
        disablePadding: false,
        align: "right",
        label: "Quantity",
    },
    {
        id: "buyingPrice",
        numeric: true,
        align: "right",
        disablePadding: false,
        label: "Buying Price",
    },
    {
        id: "sallingprice",
        numeric: true,
        align: "right",
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
                React.createElement(Checkbox_1.default, { indeterminate: numSelected > 0 && numSelected < rowCount, checked: rowCount > 0 && numSelected === rowCount, onChange: onSelectAllClick, inputProps: { "aria-label": "select all desserts" } })),
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
    paper: {
        border: "1px solid",
        width: 250,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    paperMod: {
        position: "absolute",
        width: 900,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
    var numSelected = props.numSelected, selectedRows = props.selectedRows, list = props.list, dispatcher = props.dispatcher, Model = props.Model, selected = props.selected;
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var _b = React.useState(false), openCarMod = _b[0], setOpenCarMod = _b[1];
    var _c = React.useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var _d = React.useState(""), type = _d[0], setType = _d[1];
    var defaultProps = {
        options: list,
        getOptionLabel: function (option) { return option.ItemName; },
    };
    React.useEffect(function () {
        if (Model.toClose === "transModel") {
            handleCloseMod();
            dispatcher({ type: "HANDELCLEAR" });
        }
        if (Model.toClose === "edit_product") {
            dispatcher({ type: "HANDELCLEAR" });
            handleCloseCartMod();
        }
    }, [props]);
    var handleOpenMod = function () {
        setOpen(true);
    };
    var handleCloseMod = function () {
        setOpen(false);
    };
    var handleOpenCartMod = function () {
        setOpenCarMod(true);
    };
    var handleCloseCartMod = function () {
        setOpenCarMod(false);
    };
    var handleClick = function (event) {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    var search = function (event, item) {
        if (item !== null)
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "searcheWarehouseList", id: item }, function (receiveCallback) {
                dispatcher({
                    type: "LOADWAREHOUSELIST",
                    list: receiveCallback.data[0],
                });
            });
        else
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "warehouseList" }, function (receiveCallback) {
                if (receiveCallback.data.length !== 0) {
                    dispatcher({
                        type: "LOADWAREHOUSELIST",
                        list: receiveCallback.data[0],
                    });
                }
            });
    };
    var handleDelete = function () {
        dataBase_1.default.HandelProducts({
            _type: "warehouseListDelete",
            selectedRows: selectedRows,
            layoutType: "warehouseListDelete",
        }, function (reciveCallback) {
            dispatcher({ type: "HANDELCLOSE", toClose: "transModel" });
        });
    };
    var openMenu = Boolean(anchorEl);
    var id = openMenu ? "simple-popper" : undefined;
    return (React.createElement(Toolbar_1.default, { className: numSelected > 0 ? classes.highlight : null },
        numSelected > 0 ? (React.createElement(Typography_1.default, { className: classes.title, color: "inherit", variant: "subtitle1", component: "div" },
            numSelected,
            " selected")) : (React.createElement(Typography_1.default, { className: classes.title, variant: "h6", id: "tableTitle", component: "div" }, "List")),
        numSelected > 0 ? (React.createElement("div", { style: { display: "flex" } },
            React.createElement(Tooltip_1.default, { title: "Transfer to Product List" },
                React.createElement(IconButton_1.default, { onClick: function () {
                        setType("trans");
                        handleOpenMod();
                    }, "aria-label": "delete" },
                    React.createElement(Send_1.default, null))),
            React.createElement(Tooltip_1.default, { title: "Restock selected" },
                React.createElement(IconButton_1.default, { onClick: function () {
                        setType("cart");
                        handleOpenMod();
                    }, "aria-label": "delete" },
                    React.createElement(AddShoppingCart_1.default, null))),
            React.createElement(Tooltip_1.default, { title: numSelected === 1
                    ? "Edit Product"
                    : "Editing is disabled for multi-products" },
                React.createElement(IconButton_1.default, { onClick: function () {
                        handleOpenCartMod();
                    }, disabled: numSelected === 1 ? false : true, "aria-label": "delete" },
                    React.createElement(Edit_1.default, null))),
            React.createElement(Tooltip_1.default, { title: "Delete" },
                React.createElement(IconButton_1.default, { onClick: function () { return handleDelete(); }, "aria-label": "delete" },
                    React.createElement(Delete_1.default, null))))) : (React.createElement(Tooltip_1.default, { title: "Filter list" },
            React.createElement(IconButton_1.default, { "aria-describedby": id, type: "button", onClick: handleClick, "aria-label": "filter list" }, openMenu ? React.createElement(Close_1.default, null) : React.createElement(FilterList_1.default, null)))),
        React.createElement(Popper_1.default, { id: id, open: openMenu, anchorEl: anchorEl },
            React.createElement("div", { className: classes.paper },
                React.createElement(Autocomplete_1.default, __assign({}, defaultProps, { id: "debug", debug: true, onChange: search, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Search...", margin: "normal" }))); } })))),
        React.createElement(Modal_1.default, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openCarMod, className: classes.modal, onClose: handleCloseCartMod },
            React.createElement("div", { className: classes.paperMod },
                React.createElement(NewProduct_1.default, { saveTo: "trans", type: "edit", data: { selected: selected } }))),
        React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: open, onClose: handleCloseMod, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                timeout: 500,
            } },
            React.createElement(Fade_1.default, { in: open },
                React.createElement("div", { className: classes.paperMod },
                    React.createElement(SelectedListModel_1.default, { type: type, selectedRows: selectedRows }),
                    React.createElement("div", { style: { padding: 10 } },
                        React.createElement(core_1.Button, { onClick: handleCloseMod, variant: "contained", color: "secondary" }, "Close")))))));
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
}); });
var initialState = {
    mouseX: null,
    mouseY: null,
};
var ListTable = function (props) {
    var classes = useStyles();
    var _a = React.useState("asc"), order = _a[0], setOrder = _a[1];
    var _b = React.useState("calories"), orderBy = _b[0], setOrderBy = _b[1];
    var _c = React.useState([]), selected = _c[0], setSelected = _c[1];
    var _d = React.useState([]), selectedRow = _d[0], setSelectedRow = _d[1];
    var _e = React.useState({}), selectedItems = _e[0], setSelectedItems = _e[1];
    var _f = React.useState(0), page = _f[0], setPage = _f[1];
    var _g = React.useState(false), dense = _g[0], setDense = _g[1];
    var _h = React.useState(5), rowsPerPage = _h[0], setRowsPerPage = _h[1];
    var _j = React.useState({
        rows: [],
    }), state = _j[0], setState = _j[1];
    var _k = React.useState(true), LoadOnceOff = _k[0], setLoadOnceOff = _k[1];
    var _l = React.useState(false), OpenProductList = _l[0], setOpenProductList = _l[1];
    var _m = React.useState(initialState), menustate = _m[0], setMenuState = _m[1];
    var _o = React.useState([]), multi = _o[0], SetMulti = _o[1];
    var _p = React.useState(false), isMulti = _p[0], setisMulti = _p[1];
    var moment = require("moment");
    var Currency = require("react-currency-formatter");
    React.useEffect(function () {
        if (props.Model.toClose === "edit_product") {
            props.dispatchEvent({ type: "HANDELCLEAR" });
            CloseOpenNewProduct();
        }
        else if (props.LoadTabel.load) {
            LoadProducts();
            props.dispatchEvent({ type: "CLEARLOADTABEL" });
        }
        if (props.Model.toClose === "transModel") {
            LoadProducts();
            props.dispatchEvent({ type: "HANDELCLEAR" });
        }
        if (LoadOnceOff) {
            setLoadOnceOff(false);
            LoadProducts();
        }
        // console.log(props);
    }, [props]);
    var LoadProducts = function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "warehouseList" }, function (receiveCallback) {
            // console.log(receiveCallback.data[0]);
            if (receiveCallback.data.length !== 0) {
                setState(__assign({}, state, { rows: receiveCallback.data[0] }));
                props.dispatchEvent({
                    type: "LOADWAREHOUSELIST",
                    list: receiveCallback.data[0],
                });
            }
            if (receiveCallback.data.length > 50)
                setRowsPerPage(100);
        });
    };
    var handleClickMenu = function (event, data) {
        event.preventDefault();
        setMenuState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };
    var handleClose = function () {
        setMenuState(initialState);
    };
    var handleOpenMulti = function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "mulitList", name: selected.ItemName }, function (receiveCallback) {
            setTimeout(function () {
                SetMulti(receiveCallback.data);
            }, 100);
        });
        handleClose();
        HandelOpenProductList();
    };
    var CloseProductList = function () {
        setOpenProductList(false);
    };
    var CloseOpenNewProduct = function () {
        handleClose();
    };
    var HandelOpenProductList = function () {
        setOpenProductList(true);
    };
    var handleRequestSort = function (event, property) {
        var isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    var handleSelectAllClick = function (event) {
        if (event.target.checked) {
            var newSelecteds = props.WareHouseList.list.map(function (n) { return n.name; });
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
    var isSelected = function (name) { return selected.indexOf(name) !== -1; };
    var expiryDate = function (date_string) {
        var expiration = moment(date_string).format("YYYY-MM-DD");
        var current_date = moment().format("YYYY-MM-DD");
        var days = moment(expiration).diff(current_date, "days");
        return days;
    };
    var emptyRows = rowsPerPage -
        Math.min(rowsPerPage, props.WareHouseList.list.length - page * rowsPerPage);
    return (React.createElement("div", { className: classes.root },
        React.createElement(Paper_1.default, { className: classes.paper },
            React.createElement(EnhancedTableToolbar, { numSelected: selected.length, selectedRows: selected, selected: selectedItems, dispatcher: props.dispatchEvent, Model: props.Model, list: props.WareHouseList.list }),
            React.createElement(TableContainer_1.default, null,
                React.createElement(Table_1.default, { className: classes.table, "aria-labelledby": "tableTitle", size: dense ? "small" : "medium", "aria-label": "enhanced table" },
                    React.createElement(EnhancedTableHead, { classes: classes, numSelected: selected.length, order: order, orderBy: orderBy, onSelectAllClick: handleSelectAllClick, onRequestSort: handleRequestSort, rowCount: props.WareHouseList.list.length }),
                    React.createElement(TableBody_1.default, null,
                        stableSort(props.WareHouseList.list, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(function (row, index) {
                            var isItemSelected = isSelected(row.productKey);
                            var labelId = "enhanced-table-checkbox-" + index;
                            return (React.createElement(TableRow_1.default, { hover: true, onClick: function (event) {
                                    handleClick(event, row.productKey);
                                    setSelectedItems(row);
                                }, role: "checkbox", "aria-checked": isItemSelected, tabIndex: -1, key: row.productKey, selected: isItemSelected },
                                React.createElement(TableCell_1.default, { key: labelId, padding: "checkbox" },
                                    React.createElement(Checkbox_1.default, { checked: isItemSelected, inputProps: { "aria-labelledby": labelId } })),
                                headCells.map(function (column, Innerindex) {
                                    var value = row[column.id];
                                    var labelId = "enhanced-table-checkbox-" + Innerindex;
                                    if (column.id === "isTaxEnabled") {
                                        if (row.isTaxEnabled)
                                            return (React.createElement(TableCell_1.default, { key: labelId },
                                                React.createElement(Typography_1.default, null, "Is Taxable")));
                                        else
                                            return (React.createElement(TableCell_1.default, { key: labelId },
                                                React.createElement(Typography_1.default, null, "Not Taxable")));
                                    }
                                    else if (column.id === "DaysRem") {
                                        if (row.expiryDate === "not set")
                                            return (React.createElement(TableCell_1.default, { key: labelId },
                                                React.createElement(Typography_1.default, { style: {
                                                        backgroundColor: props.Theme.theme === "light"
                                                            ? "#F4B395"
                                                            : "#731512",
                                                    } }, "not set")));
                                        else if (expiryDate(row.expiryDate) > 30)
                                            return (React.createElement(TableCell_1.default, { key: labelId },
                                                React.createElement(Typography_1.default, { style: {
                                                        backgroundColor: props.Theme.theme === "light"
                                                            ? "#ADC2A3"
                                                            : "#586D4E",
                                                    } },
                                                    expiryDate(row.expiryDate),
                                                    " Days")));
                                        else if (expiryDate(row.expiryDate) > 0)
                                            return (React.createElement(TableCell_1.default, { key: labelId },
                                                React.createElement(Typography_1.default, { style: {
                                                        backgroundColor: props.Theme.theme === "light"
                                                            ? "#F4B395"
                                                            : "#731512",
                                                    } },
                                                    expiryDate(row.expiryDate),
                                                    " Days")));
                                        else
                                            return (React.createElement(TableCell_1.default, { key: labelId },
                                                React.createElement(Typography_1.default, { style: {
                                                        backgroundColor: props.Theme.theme === "light"
                                                            ? "#F4B395"
                                                            : "#731512",
                                                    } }, "Expired")));
                                    }
                                    else {
                                        if (column.id === "amountInstore")
                                            return (React.createElement(TableCell_1.default, { key: column.id, align: column.align },
                                                React.createElement(Typography_1.default, null, row.amountInstore)));
                                        else
                                            return (React.createElement(TableCell_1.default, { key: column.id, align: column.align }, column.format && typeof value === "number" ? (React.createElement(Currency, { locale: "en", quantity: value, symbol: "K" })) : (value)));
                                    }
                                }),
                                React.createElement(TableCell_1.default, null, row.isMulity ? (React.createElement("img", { style: { width: 25, height: 25 }, src: props.Theme.theme === "light"
                                        ? "./assets/icons/icons8_check_all_240px_1.png"
                                        : "./assets/icons/icons8_check_all_240px.png", alt: "multi Price" })) : (React.createElement("img", { style: { width: 20, height: 20 }, src: props.Theme.theme === "light"
                                        ? "./assets/icons/icons8_unchecked_checkbox_100px_2.png"
                                        : "./assets/icons/icons8_unchecked_checkbox_100px_3.png", alt: "multi Price" })))));
                        }),
                        emptyRows > 0 && (React.createElement(TableRow_1.default, { style: { height: (dense ? 33 : 53) * emptyRows } },
                            React.createElement(TableCell_1.default, { colSpan: 6 })))))),
            React.createElement(TablePagination_1.default, { rowsPerPageOptions: [5, 10, 25], component: "div", count: props.WareHouseList.list.length, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage })),
        React.createElement(FormControlLabel_1.default, { control: React.createElement(Switch_1.default, { checked: dense, onChange: handleChangeDense }), label: "Dense padding" })));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        Model: state.Model,
        Dep: state.Dep,
        ProductsMainList: state.ProductsMainList,
        LoadTabel: state.LoadTabel,
        ProductSync: state.ProductSync,
        SocketConn: state.SocketConn,
        ProductList: state.ProductList,
        User: state.User,
        WareHouseList: state.WareHouseListReducer,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ListTable);
//# sourceMappingURL=TableList.js.map