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
var semantic_ui_react_2 = require("semantic-ui-react");
var Delete_1 = require("@material-ui/icons/Delete");
var react_toastify_1 = require("react-toastify");
var dataBase_1 = require("../../redux/dataBase");
var styles_1 = require("@material-ui/core/styles");
var Modal_1 = require("@material-ui/core/Modal");
var Backdrop_1 = require("@material-ui/core/Backdrop");
var Fade_1 = require("@material-ui/core/Fade");
var Currency = require("react-currency-formatter");
var convert = require("convert-units");
var uuidv1 = require("uuid/v1");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}); });
var NewIngredients = function (props) {
    var _a = React.useState([]), MainCategory = _a[0], setMainCategory = _a[1];
    var _b = React.useState({
        mas: [
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
        ],
        volume: [
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
        ],
    }), unityList = _b[0], setUnityList = _b[1];
    var _c = React.useState({ data: [] }), List = _c[0], setList = _c[1];
    var _d = React.useState(null), selected = _d[0], setSelected = _d[1];
    var _e = React.useState(""), name = _e[0], setName = _e[1];
    var _f = React.useState(""), convertedFrist = _f[0], setConvertedFrist = _f[1];
    var _g = React.useState(""), convertedLast = _g[0], setConvertedLast = _g[1];
    var _h = React.useState(""), convertedFristUnity = _h[0], setConvertedFristUnity = _h[1];
    var _j = React.useState(""), convertedLastUnity = _j[0], setConvertedLastUnity = _j[1];
    var _k = React.useState(), Converted = _k[0], setConverted = _k[1];
    var _l = React.useState(""), UnityDrop = _l[0], setUnityDrop = _l[1];
    var classes = useStyles();
    var _m = React.useState(false), open = _m[0], setOpen = _m[1];
    var _o = React.useState(true), LoadOnce = _o[0], setLoadOnce = _o[1];
    var _p = React.useState(false), BackButton = _p[0], setBackButton = _p[1];
    var _q = React.useState({ data: [] }), state = _q[0], setState = _q[1];
    React.useEffect(function () {
        if (LoadOnce)
            dataBase_1.default.HandelProducts({ _type: "GetMaterials" }, function (reciveCallback) {
                setState(__assign({}, state, { data: reciveCallback }));
                setLoadOnce(false);
            });
        if (props.data)
            if (props.type === "edit") {
                // console.log(props);
                var tempArr_1 = [];
                tempArr_1 = List.data;
                setBackButton(true);
                setName(props.data.data.recipeName);
                props.data.data.ingredients.data.map(function (ingredient) {
                    tempArr_1.push({
                        id: ingredient.id,
                        name: ingredient.name,
                        material: ingredient.material,
                        ogQty: ingredient.ogQty,
                        Qty: ingredient.Qty,
                        convertTo: "",
                        newMeasuerment: ingredient.newMeasuerment,
                        pricePer: "",
                    });
                });
                setList(__assign({}, List, { data: tempArr_1 }));
            }
            else {
                setBackButton(false);
            }
    }, [props]);
    // const search = (event, item) => {
    //   if (item !== null) {
    //     setName(item.ItemName);
    //     setSelected(item);
    //   }
    // };
    var addMaterials = function () {
        var tempArr = [];
        tempArr = List.data;
        tempArr.push({
            id: uuidv1(),
            name: "",
            material: "",
            ogQty: 0,
            Qty: 0,
            convertTo: "",
            newMeasuerment: "",
            pricePer: "",
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
    var covertor = function () {
        var result = convert(1).from("cup").to("Tbs");
        setConverted(result);
        // console.log(result);
    };
    var handleOnChange = function (e) {
        var tempArr = [];
        tempArr = List.data;
        tempArr[e.index][e.title] = e.e.target.value;
        setList(__assign({}, List, { data: tempArr }));
        // setName(e.target.value);
    };
    var handleOnNameChange = function (e) {
        setName(e.target.value);
    };
    var handleOnDropChange = function (e) {
        var tempArr = [];
        tempArr = List.data;
        if (e.type === "material") {
            tempArr[e.index].material = e.value;
            setList(__assign({}, List, { data: tempArr }));
        }
        else {
            tempArr[e.index].newMeasuerment = e.value;
            setList(__assign({}, List, { data: tempArr }));
        }
    };
    var handleSubmit = function () {
        var data = {
            name: name,
            List: List,
            _type: "setRecipe",
        };
        dataBase_1.default.HandelProducts(data, function (reciveCallback) {
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
    var handleOnFristDropChange = function (event, newValue) {
        setConvertedFristUnity(newValue.title);
    };
    var handleOnLastDropChange = function (event, newValue) {
        setConvertedLastUnity(newValue.title);
    };
    var handleOnFristNumChange = function (e) {
        var result = convert(parseInt(e.target.value))
            .from(convertedFristUnity)
            .to(convertedLastUnity);
        // console.log(result);
        setConvertedFrist(result);
    };
    var handleOnLastNumChange = function (e) {
        var result = convert(parseInt(e.target.value))
            .from(convertedLastUnity)
            .to(convertedFristUnity);
        // console.log(result);
        setConvertedLast(result);
    };
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    return (React.createElement("div", { style: {
            width: "100%",
            height: "95%",
        } },
        React.createElement("div", null,
            React.createElement(semantic_ui_react_1.Button, { onClick: function () {
                    return props.dispatchEvent({
                        type: "SETINGREDIENTSSTATE",
                        state: {
                            changeView: "showList",
                            data: props.IngredientsData.state.data,
                        },
                    });
                }, circular: true, color: "black", icon: "arrow alternate circle left outline" })),
        React.createElement("div", { style: { width: "100%", height: "95%", overflow: "auto" } },
            React.createElement("div", { style: { padding: 10 } },
                React.createElement("div", { style: { display: "flex" } },
                    React.createElement(core_1.TextField, { id: "standard-basic", variant: "outlined", label: "Recipe Name", style: { width: 300 }, name: "name", value: name, onChange: handleOnNameChange })),
                React.createElement("div", { style: { width: "100%", height: "40%", overflow: "auto" } },
                    React.createElement("div", null,
                        React.createElement("div", { style: {
                                marginTop: 10,
                                display: "flex",
                                height: "98%",
                                overflow: "auto",
                                paddingTop: 10,
                                marginBottom: 10,
                            } },
                            React.createElement(core_1.Typography, { variant: "h6" }, name),
                            React.createElement("div", { style: { marginLeft: 10 } },
                                React.createElement(semantic_ui_react_1.Button, { onClick: addMaterials, variant: "outlined" },
                                    " ",
                                    "Add Ingredients / Materials",
                                    " "))),
                        React.createElement(core_1.Divider, null),
                        React.createElement("div", { style: { marginTop: 10 } },
                            React.createElement(semantic_ui_react_2.Table, { inverted: props.Theme.theme === "light" ? false : true, basic: "very", celled: true, collapsing: true },
                                React.createElement(semantic_ui_react_2.Table.Header, null,
                                    React.createElement(semantic_ui_react_2.Table.Row, null,
                                        React.createElement(semantic_ui_react_2.Table.HeaderCell, null, "Ingredients / Materials"),
                                        React.createElement(semantic_ui_react_2.Table.HeaderCell, null, "Unit Of Measurement"),
                                        React.createElement(semantic_ui_react_2.Table.HeaderCell, null, "Amount Used (Quantity)"),
                                        React.createElement(semantic_ui_react_2.Table.HeaderCell, null, "Actions"))),
                                React.createElement(semantic_ui_react_2.Table.Body, null, List.data.map(function (listItems, index) {
                                    // console.log(listItems);
                                    // console.log(state.data);
                                    var temp1Index = unityList.volume.findIndex(function (item) { return item.title === listItems.newMeasuerment.title; });
                                    var temp2Index = unityList.mas.findIndex(function (item) { return item.title === listItems.newMeasuerment.title; });
                                    var tempIndex = state.data.findIndex(function (item) {
                                        return item.materialName === listItems.material.materialName;
                                    });
                                    var masIndex = unityList.mas.findIndex(function (item) { return item.title === listItems.material.measuredBy; });
                                    var volumeIndex = unityList.volume.findIndex(function (item) { return item.title === listItems.material.measuredBy; });
                                    return (React.createElement(semantic_ui_react_2.Table.Row, { key: index },
                                        React.createElement(semantic_ui_react_2.Table.Cell, null,
                                            React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: state.data, getOptionLabel: function (option) { return option.materialName; }, defaultValue: state.data[tempIndex], onChange: function (e, newValue) {
                                                    handleOnDropChange({
                                                        type: "material",
                                                        value: newValue,
                                                        index: index,
                                                    });
                                                    setUnityDrop(newValue.newValue);
                                                }, style: { width: 250 }, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Select Material", variant: "outlined", helperText: props.type === "edit"
                                                        ? "Default value is " + listItems.material.materialName
                                                        : "Measured in " + (listItems.material.measuredBy ===
                                                            undefined
                                                            ? ""
                                                            : listItems.material.measuredBy) }))); } })),
                                        React.createElement(semantic_ui_react_2.Table.Cell, null,
                                            React.createElement(core_1.Typography, { variant: "h6" }, listItems.material.measuredBy)),
                                        React.createElement(semantic_ui_react_2.Table.Cell, null,
                                            React.createElement(core_1.TextField, { id: "standard-basic", type: "number", label: "Quantity", name: "OgQuantity", defaultValue: listItems.Qty, onChange: function (e) {
                                                    return handleOnChange({ title: "Qty", index: index, e: e });
                                                } })),
                                        React.createElement(semantic_ui_react_2.Table.Cell, null,
                                            React.createElement("div", { style: { display: "flex" } },
                                                React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: open, 
                                                    // onClose={handleClose}
                                                    closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                                                        timeout: 500,
                                                    } },
                                                    React.createElement(Fade_1.default, { in: open },
                                                        React.createElement("div", { className: classes.paper },
                                                            React.createElement("h2", { id: "transition-modal-title" }, "Unity Converter"),
                                                            React.createElement("div", { style: {
                                                                    padding: 10,
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                } },
                                                                React.createElement("div", null,
                                                                    React.createElement("div", { style: {
                                                                            paddingBottom: 10,
                                                                        } },
                                                                        React.createElement(core_1.TextField, { id: "standard-basic", type: "number", label: "Quantity", name: "OgQuantity", onChange: handleOnFristNumChange })),
                                                                    React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: unityList, groupBy: function (option) { return option.type; }, getOptionLabel: function (option) {
                                                                            return option.title;
                                                                        }, onChange: handleOnFristDropChange, style: { width: 250 }, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Unity Measurement", variant: "outlined" }))); } }),
                                                                    React.createElement("div", { style: { userSelect: "all" } },
                                                                        React.createElement(core_1.Typography, null,
                                                                            React.createElement(core_1.Typography, { variant: "h6" },
                                                                                convertedFristUnity,
                                                                                " ",
                                                                                convertedLast)))),
                                                                React.createElement("div", { style: {
                                                                        marginTop: 25,
                                                                        padding: 10,
                                                                        textAlign: "center",
                                                                    } },
                                                                    React.createElement("div", null, "="),
                                                                    React.createElement("div", { style: { marginTop: 15 } },
                                                                        " ",
                                                                        "Convert To",
                                                                        " ")),
                                                                React.createElement("div", null,
                                                                    React.createElement("div", { style: {
                                                                            paddingBottom: 10,
                                                                        } },
                                                                        React.createElement(core_1.TextField, { id: "standard-basic", type: "number", label: "Quantity", name: "OgQuantity", value: convertedLast, onChange: handleOnLastNumChange })),
                                                                    React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: unityList, groupBy: function (option) { return option.type; }, getOptionLabel: function (option) {
                                                                            return option.title;
                                                                        }, onChange: handleOnLastDropChange, style: { width: 250 }, renderInput: function (params) { return (React.createElement(core_1.TextField, __assign({}, params, { label: "Unity Measurement", variant: "outlined" }))); } }),
                                                                    React.createElement("div", { style: { userSelect: "all" } },
                                                                        React.createElement(core_1.Typography, { variant: "h6" },
                                                                            convertedLastUnity,
                                                                            " ",
                                                                            convertedFrist)))),
                                                            React.createElement("div", null,
                                                                React.createElement(semantic_ui_react_1.Button, { variant: "contained", color: "black", onClick: handleClose }, "Close"))))),
                                                React.createElement(core_1.IconButton, { onClick: function () {
                                                        return handleRemove({ id: listItems.id, index: index });
                                                    }, "aria-label": "delete" },
                                                    React.createElement(Delete_1.default, { style: { color: "red" } }))))));
                                })))))))),
        React.createElement("div", { style: { marginLeft: 10 } },
            React.createElement(semantic_ui_react_1.Button, { onClick: handleSubmit, variant: "contained", color: "black" }, "Save Ingredients"))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        IngredientsData: state.IngredientsReducer,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewIngredients);
//# sourceMappingURL=newIngredients.js.map