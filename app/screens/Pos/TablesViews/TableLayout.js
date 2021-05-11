"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@material-ui/core/styles");
var Button_1 = require("@material-ui/core/Button");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var TableChart_1 = require("@material-ui/icons/TableChart");
var dataBase_1 = require("../../../redux/dataBase");
var react_toastify_1 = require("react-toastify");
var moment = require("moment");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        position: "absolute",
        width: "50vw",
        height: "60vh",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: 10,
    },
    toolBar: {
        width: "100%",
        height: 30,
        textAlign: "center",
    },
    buttonLayout: {
        width: "100%",
        height: "100%",
        overflow: "auto",
        padding: theme.spacing(2, 4, 3),
    },
    buttonStyle: {
        width: "30%",
        height: 105,
        margin: 6,
    },
}); });
var TableLayout = function (props) {
    var classes = useStyles();
    var _a = React.useState([]), mainTables = _a[0], setMainTables = _a[1];
    var _b = React.useState(""), tableName = _b[0], setTableName = _b[1];
    var _c = React.useState(""), tableNameError = _c[0], setTableNameError = _c[1];
    var handleChange = function (event) {
        setTableName(event.target.value);
        setTableNameError("");
    };
    var onSubmit = function () {
        if (tableName == "")
            setTableNameError("Table Name can't be empty");
        else {
            // console.log(props);
            if (tableName !== "")
                dataBase_1.default.HandleTables({
                    _type: "setMyTabes",
                    user: props.User.userLogged.userName,
                    table: tableName,
                    date: moment().format("DD-MMM-YYYY"),
                    time: moment().format("LTS"),
                    total: props.total,
                    qty: 1,
                    product_list: { data: props.data.items },
                }, function (callback) {
                    // console.log(callback);
                    props.dispatchEvent({
                        type: "SETCOUNT",
                        count: callback.length,
                    });
                    props.dispatchEvent({
                        type: "SETSTATE",
                        state: 'clearCartList',
                    });
                    // props.dispatchEvent({
                    //   type: "TABLESET",
                    //   state: true,
                    //   table_name: tableName,
                    // });
                    react_toastify_1.toast("Table added successfuly", {
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
            else
                react_toastify_1.toast("You have to select table", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "error",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            props.dispatchEvent({
                type: "SETTABLEACTIONS",
                ActionType: "close_table_drawer",
            });
        }
    };
    React.useEffect(function () {
        LoadGroup();
    }, [props.MytablesReducer.count]);
    // Load all groups
    var LoadGroup = function () {
        var ArryTables = [];
        dataBase_1.default.HandleTables({ _type: "get" }, function (reciveCallback1) {
            // console.log(reciveCallback1);
            setMainTables(reciveCallback1.data);
            // appDb.HandleTables({ _type: "getMyTabes" }, (reciveCallback2) => {
            //   console.log(reciveCallback2);
            //   if (reciveCallback2.data.length !== 0) {
            //     const TableLength = reciveCallback2.data.length;
            //     let TableList = reciveCallback1.data;
            //     reciveCallback2.data.map((list) => {
            //       const index = TableList.findIndex((x) => x.table === list.name);
            //       TableList.splice(index, 1);
            //     });
            //     setMainTables(TableList);
            //   } else {
            //     setMainTables(reciveCallback1.data);
            //   }
            // });
        });
    };
    return (React.createElement("div", { className: classes.paper },
        React.createElement(core_1.Paper, { square: true, className: classes.toolBar },
            React.createElement(core_1.Typography, { variant: "h5" }, "Tables")),
        React.createElement("div", { className: classes.buttonLayout },
            React.createElement("div", { style: { height: "90%" } }, mainTables.map(function (list, index) { return (React.createElement(Button_1.default, { startIcon: React.createElement(TableChart_1.default, null), style: {
                    backgroundColor: list.colors.backgroundColor,
                    color: list.colors.textColor,
                }, onClick: function () {
                    props.dispatchEvent({
                        type: "TABLESET",
                        state: true,
                        table_name: list.table,
                    });
                }, className: classes.buttonStyle, key: index }, list.table)); })),
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                React.createElement("div", null,
                    React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: function () {
                            return props.dispatchEvent({
                                type: "SETTABLEACTIONS",
                                ActionType: "close_table_drawer",
                            });
                        } }, "Close")),
                React.createElement("div", { style: { display: "flex" } },
                    React.createElement(core_1.TextField, { label: "Custom table name", id: "outlined-size-small", variant: "outlined", size: "small", value: tableName, onChange: handleChange, helperText: tableNameError, error: tableNameError !== "" ? true : false }),
                    React.createElement(Button_1.default, { onClick: onSubmit, variant: "outlined" }, "Save table Name"))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        User: state.User,
        MytablesReducer: state.MytablesReducer,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TableLayout);
//# sourceMappingURL=TableLayout.js.map