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
var core_1 = require("@material-ui/core");
var React = require("react");
var react_redux_1 = require("react-redux");
var react_toastify_1 = require("react-toastify");
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
var dataBase_1 = require("../../redux/dataBase");
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
function Supplires(props) {
    var _a = React.useState({
        columns: [
            {
                title: "Supplier Name",
                field: "SupplierName",
            },
            {
                title: "Supplier Address",
                field: "address",
            },
            {
                title: "Supplier Contact",
                field: "contact",
            },
        ],
        data: [],
    }), state = _a[0], setState = _a[1];
    var _b = React.useState({
        SupplierName: "",
        SupplierAddress: "",
        SupplierContact: "",
    }), values = _b[0], setValues = _b[1];
    var _c = React.useState({
        SupplierNameError: "",
        SupplierAddressError: "",
        SupplierContactError: "",
    }), errors = _c[0], setErrors = _c[1];
    React.useEffect(function () {
        GetSuppliers();
    }, []);
    var GetSuppliers = function () {
        dataBase_1.default.HandleSuppliers({ type: "get" }, function (callback) {
            // console.log(callback);
            setState(__assign({}, state, { data: callback }));
        });
    };
    var handleTextChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        if (prop === "SupplierName")
            setErrors(__assign({}, errors, { SupplierNameError: "" }));
        if (prop === "SupplierAddress")
            setErrors(__assign({}, errors, { SupplierAddressError: "" }));
        if (prop === "SupplierContact")
            setErrors(__assign({}, errors, { SupplierContactError: "" }));
    }; };
    var handleSubmit = function () {
        if (values.SupplierName === "")
            return setErrors(__assign({}, errors, { SupplierNameError: "Supplier Name can't be empty" }));
        if (values.SupplierAddress === "")
            return setErrors(__assign({}, errors, { SupplierAddressError: "Supplier Address can't be empty" }));
        if (values.SupplierContact === "")
            return setErrors(__assign({}, errors, { SupplierContactError: "Supplier Address can't be empty" }));
        dataBase_1.default.HandleSuppliers({
            type: "set",
            SupplierName: values.SupplierName,
            SupplierAddress: values.SupplierAddress,
            SupplierContact: values.SupplierContact,
        }, function (callback) {
            if (callback.isSet) {
                setValues(__assign({}, values, { SupplierName: "", SupplierContact: "", SupplierAddress: "" }));
                GetSuppliers();
                react_toastify_1.toast("Successfully Added", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };
    return (React.createElement("div", { style: { height: "90vh", width: "100%" } },
        React.createElement("div", { style: { marginLeft: 20, marginTop: 20, width: "100%" } },
            React.createElement(core_1.Typography, { variant: "h6", style: { paddingBottom: 20 } }, "Supplier List")),
        React.createElement("div", { style: {
                width: "100%",
                margin: "auto",
                display: "flex",
                padding: 10,
            } },
            React.createElement(core_1.Paper, { style: {
                    height: "100%",
                    width: "70%",
                    margin: "auto",
                    padding: 20,
                } }, props.User.userLogged.prevarges === "1" ? (React.createElement(material_table_1.default, { icons: tableIcons, title: "Suppliers List ", columns: state.columns, data: state.data, editable: {
                    onRowUpdate: function (newData, oldData) {
                        return new Promise(function (resolve) {
                            dataBase_1.default.HandleSuppliers({ type: "edit", newData: newData }, function (callback) {
                                setTimeout(function () {
                                    resolve();
                                    if (oldData) {
                                        setState(function (prevState) {
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
                            dataBase_1.default.HandleSuppliers({ type: "delete", oldData: oldData }, function (callback) {
                                setTimeout(function () {
                                    resolve();
                                    setState(function (prevState) {
                                        var data = prevState.data.slice();
                                        data.splice(data.indexOf(oldData), 1);
                                        return __assign({}, prevState, { data: data });
                                    });
                                }, 600);
                            });
                        });
                    },
                } })) : (React.createElement(material_table_1.default, { icons: tableIcons, title: "Suppliers List ", columns: state.columns, data: state.data }))),
            React.createElement(core_1.Paper, { style: {
                    width: "30%",
                    height: "100%",
                    backgroundColor: props.Theme.theme === "light" ? "#EBEBEB" : "#2B2B2B",
                    padding: 15,
                } },
                React.createElement("div", null,
                    React.createElement(core_1.Typography, { variant: "h6" }, "Add New Supplier")),
                React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(core_1.TextField, { style: { marginTop: props.type === "edit" ? 20 : 0 }, name: "SupplierName", type: "text", variant: "outlined", fullWidth: true, onChange: handleTextChange("SupplierName"), value: values.SupplierName, id: "SupplierName", label: "Supplier Name", error: errors.SupplierNameError === "" ? false : true, helperText: errors.SupplierNameError }),
                    React.createElement("div", { style: { height: 10 } }),
                    React.createElement(core_1.TextField, { style: { marginTop: props.type === "edit" ? 20 : 0 }, name: "SupplierAddress", type: "text", variant: "outlined", fullWidth: true, onChange: handleTextChange("SupplierAddress"), value: values.SupplierAddress, id: "SupplierAddress", label: "Supplier Address", error: errors.SupplierAddressError === "" ? false : true, helperText: errors.SupplierAddressError }),
                    React.createElement("div", { style: { height: 10 } }),
                    React.createElement(core_1.TextField, { style: { marginTop: props.type === "edit" ? 20 : 0 }, name: "SupplierContact", type: "text", variant: "outlined", fullWidth: true, onChange: handleTextChange("SupplierContact"), value: values.SupplierContact, id: "SupplierContact", label: "Supplier Contact ", error: errors.SupplierContactError === "" ? false : true, helperText: errors.SupplierContactError }),
                    React.createElement("div", { style: { marginTop: 10 } },
                        React.createElement(core_1.Button, { onClick: handleSubmit, variant: "contained", color: "primary", style: {} }, "Create")))))));
}
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        User: state.User,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Supplires);
//# sourceMappingURL=index.js.map