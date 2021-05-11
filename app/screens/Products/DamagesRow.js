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
var semantic_ui_react_1 = require("semantic-ui-react");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var dataBase_1 = require("../../redux/dataBase");
var core_1 = require("@material-ui/core");
var semantic_ui_react_2 = require("semantic-ui-react");
var DamagesRow = function (props) {
    var _a = React.useState({
        rows: [],
        total: 0,
    }), state = _a[0], setState = _a[1];
    var _b = React.useState({ data: [] }), selected = _b[0], setSelected = _b[1];
    React.useEffect(function () {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "getGrouped" }, function (receiveCallback) {
            setTimeout(function () {
                if (receiveCallback.productResult[0]) {
                    setState(__assign({}, state, { rows: receiveCallback.productResult[0] }));
                }
            }, 100);
        });
    }, []);
    var search = function (even, data) {
        var index = selected.data.findIndex(function (x) { return x.productKey === data.productKey; });
        if (index !== -1)
            return;
        var arry = [];
        arry = selected.data;
        arry.push(data);
        setSelected(__assign({}, selected, { data: arry }));
    };
    var onSubmit = function () {
        // console.log(selected);
        var data = {
            type: "set",
            list: selected.data,
        };
        dataBase_1.default.HandelDamages(data, function (reciveCallback) {
            // console.log("test");
            setSelected(__assign({}, selected, { data: [] }));
            props.dispatchEvent({
                type: "SETSTATE",
                state: "loadDamagesTable",
            });
        });
    };
    var handleDelete = function (list) {
        var index = selected.data.findIndex(function (x) { return x.productKey === list.productKey; });
        selected.data.splice(index, 1);
        setSelected(__assign({}, selected, { data: selected.data }));
    };
    return (React.createElement("div", null,
        React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: state.rows, getOptionLabel: function (option) { return option.ItemName; }, onChange: search, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Search products", variant: "outlined" }))); } }),
        React.createElement(semantic_ui_react_1.Table, { compact: true, celled: true },
            React.createElement(semantic_ui_react_1.Table.Header, null,
                React.createElement(semantic_ui_react_1.Table.Row, null,
                    React.createElement(semantic_ui_react_1.Table.HeaderCell, null),
                    React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Product Name"),
                    React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Price"),
                    React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Qty"),
                    React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Number"))),
            React.createElement(semantic_ui_react_1.Table.Body, null, selected.data.map(function (list, index) { return (React.createElement(semantic_ui_react_1.Table.Row, { key: index + list.productKey },
                React.createElement(semantic_ui_react_1.Table.Cell, { collapsing: true },
                    React.createElement(semantic_ui_react_2.Button, { onClick: function () { return handleDelete(list, index); }, circular: true, color: "red", icon: "delete" })),
                React.createElement(semantic_ui_react_1.Table.Cell, null, list.ItemName),
                React.createElement(semantic_ui_react_1.Table.Cell, null, list.sallingprice),
                React.createElement(semantic_ui_react_1.Table.Cell, null, list.amountInstore),
                React.createElement(semantic_ui_react_1.Table.Cell, null,
                    React.createElement("input", { onInput: function (e) {
                            selected.data[index].damaged = e.target.value;
                        }, type: "number" })))); })),
            React.createElement(semantic_ui_react_1.Table.Footer, { fullWidth: true },
                React.createElement(semantic_ui_react_1.Table.Row, null,
                    React.createElement(semantic_ui_react_1.Table.HeaderCell, null,
                        React.createElement(semantic_ui_react_2.Button, { onClick: onSubmit, size: "small" }, "Add To Damages")))))));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DamagesRow);
//# sourceMappingURL=DamagesRow.js.map