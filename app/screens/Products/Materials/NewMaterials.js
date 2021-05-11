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
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var react_redux_1 = require("react-redux");
var semantic_ui_react_1 = require("semantic-ui-react");
var Delete_1 = require("@material-ui/icons/Delete");
var react_toastify_1 = require("react-toastify");
var dataBase_1 = require("../../../redux/dataBase");
var uuidv1 = require("uuid/v1");
var NewMaterials = function (props) {
    var _a = React.useState({ data: [] }), List = _a[0], setList = _a[1];
    var _b = React.useState([
        {
            title: "Kilogram (kg)",
            pre: "kg",
            type: "Mass",
        },
        {
            title: "Microgram (mcg)",
            pre: "mcg",
            type: "Mass",
        },
        {
            title: "Gram (g)",
            pre: "g",
            type: "Mass",
        },
        {
            title: "Ounce (oz)",
            pre: "oz",
            type: "Mass",
        },
        {
            title: "Pound (lb)",
            pre: "lb",
            type: "Mass",
        },
        {
            title: "Megatonne (mt)",
            pre: "mt",
            type: "Mass",
        },
        {
            title: "Tea spoon (t)",
            pre: "t",
            type: "Mass",
        },
        {
            title: "Cubic Millimeter (mm3)",
            pre: "mm3",
            type: "Volume",
        },
        {
            title: "Cubic Centimeter (cm3)",
            pre: "cm3",
            type: "Volume",
        },
        {
            title: "Milliliter (ml)",
            pre: "ml",
            type: "Volume",
        },
        {
            title: "Litre (l)",
            pre: "l",
            type: "Volume",
        },
        {
            title: "kiloliter (kl)",
            pre: "kl",
            type: "Volume",
        },
        {
            title: "Cubic Meter (m3)",
            pre: "m3",
            type: "Volume",
        },
        {
            title: "Cubic Kilometer (km3)",
            pre: "km3",
            type: "Volume",
        },
        {
            title: "Tea Spoon (tsp)",
            pre: "tsp",
            type: "Volume",
        },
        {
            title: "Table Spoon (Tbs)",
            pre: "Tbs",
            type: "Volume",
        },
        {
            title: "Cubic Inch (in3)",
            pre: "in3",
            type: "Volume",
        },
        {
            title: "Fluid Ounce (fl-oz)",
            pre: "fl-oz",
            type: "Volume",
        },
        {
            title: "Cup (cup)",
            pre: "cup",
            type: "Volume",
        },
        {
            title: "PNT (pnt)",
            pre: "pnt",
            type: "Volume",
        },
        {
            title: "QT (qt)",
            pre: "qt",
            type: "Volume",
        },
        {
            title: "Gallon (gal)",
            pre: "gal",
            type: "Volume",
        },
        {
            title: "Cubic Feet (ft3)",
            pre: "ft3",
            type: "Volume",
        },
        {
            title: "Cubic Yard (yd3)",
            pre: "yd3",
            type: "Volume",
        },
    ]), unityList = _b[0], setUnityList = _b[1];
    React.useEffect(function () {
        if (props.type) {
            var tempArr = [];
            tempArr = List.data;
            tempArr.push({
                id: props.data.data.idKey,
                name: props.data.data.materialName,
                measuredBy: props.data.data.measuredBy,
                Qty: props.data.data.quantity,
                ogQty: props.data.data.quantity,
            });
            setList(__assign({}, List, { data: tempArr }));
        }
    }, []);
    var addMaterials = function () {
        var tempArr = [];
        tempArr = List.data;
        tempArr.push({
            id: uuidv1(),
            name: "",
            measuredBy: "",
            Qty: 0,
            ogQty: 0,
        });
        setList(__assign({}, List, { data: tempArr }));
    };
    var handleRemove = function (e) {
        var tempArr = [];
        tempArr = List.data;
        var filter = tempArr.findIndex(function (x) { return x.id === e.id; });
        tempArr.splice(filter, 1);
        setList(__assign({}, List, { data: tempArr }));
    };
    var handleOnChange = function (e) {
        var tempArr = [];
        tempArr = List.data;
        tempArr[e.index][e.title] = e.e.target.value;
        setList(__assign({}, List, { data: tempArr }));
        // setName(e.target.value);
    };
    var handleOnDropChange = function (e) {
        var tempArr = [];
        tempArr = List.data;
        if (e.type === "quantityFrist") {
            tempArr[e.index].measuredBy = e.value;
            setList(__assign({}, List, { data: tempArr }));
        }
        else {
            tempArr[e.index].newMeasuerment = e.value;
            setList(__assign({}, List, { data: tempArr }));
        }
    };
    var handleSubmit = function () {
        var data = {
            List: List,
            _type: props.type ? "editMaterials" : "setMaterials",
        };
        dataBase_1.default.HandelProducts(data, function (callback) {
            setList(__assign({}, List, { data: [] }));
            react_toastify_1.toast("Successfully Updated", {
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
    return (React.createElement("div", { style: { width: "100%", height: "100%" } },
        React.createElement("div", null, props.type ? (React.createElement(core_1.Typography, { variant: "h6" }, "Edit Material")) : (React.createElement(core_1.Typography, { variant: "h6" }, "New Material"))),
        React.createElement(core_1.Divider, null),
        React.createElement("div", { style: { marginTop: 10, marginBottom: 10 } },
            React.createElement(semantic_ui_react_1.Button, { disabled: props.type ? true : false, onClick: addMaterials, color: "black" }, "Add Table Row")),
        React.createElement(core_1.Divider, null),
        React.createElement("div", { style: { marginTop: 10 } },
            React.createElement("div", { style: { maxHeight: "90%", overflow: "auto" } },
                React.createElement(semantic_ui_react_1.Table, { inverted: props.Theme.theme === "light" ? false : true, basic: "very", celled: true, collapsing: true },
                    React.createElement(semantic_ui_react_1.Table.Header, null,
                        React.createElement(semantic_ui_react_1.Table.Row, null,
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, " Materials Name"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Measured by"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Quantity"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Actions"))),
                    React.createElement(semantic_ui_react_1.Table.Body, null, List.data.map(function (listItems, index) {
                        // console.log(listItems);
                        var tempIndex = unityList.findIndex(function (item) { return item.title === listItems.measuredBy; });
                        return (React.createElement(semantic_ui_react_1.Table.Row, { key: index },
                            React.createElement(semantic_ui_react_1.Table.Cell, null,
                                React.createElement(semantic_ui_react_1.Header, { as: "h4", image: true },
                                    React.createElement(semantic_ui_react_1.Icon, { color: "red", name: "box" }),
                                    React.createElement(semantic_ui_react_1.Header.Content, null,
                                        React.createElement(core_1.FormControl, null,
                                            React.createElement(core_1.InputLabel, { htmlFor: "standard-adornment-password" }, "Enter Ingredient Name"),
                                            React.createElement(core_1.Input, { onChange: function (e) {
                                                    return handleOnChange({
                                                        title: "name",
                                                        index: index,
                                                        e: e,
                                                    });
                                                }, id: "standard-adornment-password", defaultValue: listItems.name }))))),
                            React.createElement(semantic_ui_react_1.Table.Cell, null,
                                React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: unityList, groupBy: function (option) { return option.type; }, getOptionLabel: function (option) { return option.title; }, defaultValue: unityList[tempIndex], onChange: function (e, newValue) {
                                        return handleOnDropChange({
                                            type: "quantityFrist",
                                            value: newValue,
                                            index: index,
                                        });
                                    }, style: { width: 250 }, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Unity Measurement", variant: "outlined", helperText: props.type === "edit"
                                            ? "Default value is " + listItems.measuredBy
                                            : "" }))); } })),
                            React.createElement(semantic_ui_react_1.Table.Cell, null,
                                React.createElement(core_1.TextField, { id: "standard-basic", type: "number", label: "Quantity", name: "OgQuantity", defaultValue: listItems.ogQty, onChange: function (e) {
                                        return handleOnChange({ title: "ogQty", index: index, e: e });
                                    } })),
                            React.createElement(semantic_ui_react_1.Table.Cell, null,
                                React.createElement(core_1.IconButton, { onClick: function () {
                                        return handleRemove({ id: listItems.id, index: index });
                                    }, "aria-label": "delete" },
                                    React.createElement(Delete_1.default, { style: { color: "red" } })))));
                    })))),
            React.createElement("div", { style: { marginTop: 10 } },
                React.createElement(core_1.Divider, null)),
            React.createElement("div", { style: { marginTop: 10 } },
                React.createElement(semantic_ui_react_1.Button, { onClick: handleSubmit, color: "black" }, "Save Materials")))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewMaterials);
//# sourceMappingURL=NewMaterials.js.map