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
var dataBase_1 = require("../../redux/dataBase");
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
var useStyles = styles_1.makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});
var ipcRenderer = require("electron").ipcRenderer;
var index = function (props) {
    var _a = React.useState({ data: [], columns: [] }), rows = _a[0], setRows = _a[1];
    var classes = useStyles();
    var _b = React.useState(0), page = _b[0], setPage = _b[1];
    var _c = React.useState(10), rowsPerPage = _c[0], setRowsPerPage = _c[1];
    var _d = React.useState({
        amount: "",
        ItemName: "",
    }), state = _d[0], setSate = _d[1];
    var _e = React.useState(false), loadOnce = _e[0], setLoadOnce = _e[1];
    React.useEffect(function () {
        if (!loadOnce) {
            setLoadOnce(true);
            LoadData();
            props.dispatchEvent({ type: "CLEARSTATE" });
        }
        if (props.ActionsReducer.state === "loadInvData")
            LoadData();
    }, [props]);
    var LoadData = function () {
        dataBase_1.default.HandleCompInventory({ type: "get" }, function (callback) {
            setRows(__assign({}, rows, { data: callback, columns: [
                    {
                        title: "Item Name",
                        field: "InventoryName",
                    },
                    {
                        title: "Quantiy",
                        field: "amount",
                    },
                ] }));
        });
    };
    var handleChangePage = function (event, newPage) {
        setPage(newPage);
    };
    var handleChangeRowsPerPage = function (event) {
        setRowsPerPage(event.target.value);
        setPage(0);
    };
    var handleTextChange = function (event) {
        var _a;
        setSate(__assign({}, state, (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    return (React.createElement("div", { style: { width: "80vw" } },
        React.createElement(core_1.Paper, { style: { width: "100%", padding: 10, display: "flex" } },
            React.createElement(core_1.Typography, { variant: "h6" }, "Inventory"),
            React.createElement("div", null,
                React.createElement(core_1.Button, { onClick: function () {
                        ipcRenderer.send("save_csv", {
                            type: "inventory",
                            data: rows.data,
                            header: [
                                { id: "InventoryName", title: "Item Name" },
                                { id: "amount", title: "Quantiy" },
                            ],
                        });
                    }, variant: "outlined", style: { marginLeft: 5 } }, "Export to excel"))),
        React.createElement(core_1.Paper, { style: {
                width: "95%",
                margin: "auto",
                padding: 15,
                marginTop: 10,
                display: "flex",
                justifyContent: "space-between",
            } },
            React.createElement(core_1.Paper, { style: {
                    padding: 10,
                    width: "50%",
                    height: "65vh",
                    overflow: "auto",
                } },
                React.createElement(core_1.Paper, { className: classes.root },
                    React.createElement(material_table_1.default, { icons: tableIcons, title: "Inventory", columns: rows.columns, data: rows.data, editable: {
                            onRowUpdate: function (newData, oldData) {
                                return new Promise(function (resolve) {
                                    dataBase_1.default.HandleCompInventory({ type: "edit", newData: newData }, function (reciveCallback) {
                                        setTimeout(function () {
                                            resolve();
                                            if (oldData) {
                                                setRows(function (prevState) {
                                                    var data = prevState.data.slice();
                                                    data[data.indexOf(oldData)] = newData;
                                                    return __assign({}, prevState, { data: data });
                                                });
                                            }
                                        }, 600);
                                    });
                                });
                            },
                            onRowDelete: function (oldData) {
                                return new Promise(function (resolve) {
                                    dataBase_1.default.HandleCompInventory({ type: "delete", oldData: oldData }, function (reciveCallback) {
                                        setTimeout(function () {
                                            resolve();
                                            setRows(function (prevState) {
                                                var data = prevState.data.slice();
                                                data.splice(data.indexOf(oldData), 1);
                                                return __assign({}, prevState, { data: data });
                                            });
                                        }, 600);
                                    });
                                });
                            },
                        } }))),
            React.createElement(core_1.Paper, { style: { padding: 10, width: "45%", height: "25vh" } },
                React.createElement(core_1.Typography, { variant: "h6", style: { marginTop: 10 } }, "Add New Inventory"),
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                    React.createElement(core_1.TextField, { id: "outlined-basic", label: "Item Name", variant: "outlined", name: "ItemName", onChange: handleTextChange, value: state.ItemName }),
                    React.createElement(core_1.TextField, { name: "amount", type: "number", id: "outlined-basic", label: "Quantity", variant: "outlined", onChange: handleTextChange, value: state.amount })),
                React.createElement("div", { style: {
                        marginTop: 10,
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                    } },
                    React.createElement(core_1.Button, { variant: "outlined", onClick: function () {
                            var data = {
                                type: "set",
                                ItemName: state.ItemName,
                                amount: parseInt(state.amount),
                            };
                            dataBase_1.default.HandleCompInventory(data, function (callback) {
                                setSate(__assign({}, state, { ItemName: "", amount: "" }));
                                props.dispatchEvent({
                                    type: "SETSTATE",
                                    state: "loadInvData",
                                });
                            });
                        } }, "Save Record"))))));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map