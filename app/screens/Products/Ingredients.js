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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_swipeable_views_1 = require("react-swipeable-views");
var styles_1 = require("@material-ui/core/styles");
var newIngredients_1 = require("./newIngredients");
var IngredientsList_1 = require("./IngredientsList");
var MaterialsList_1 = require("./Materials/MaterialsList");
var NewMaterials_1 = require("./Materials/NewMaterials");
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (React.createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "full-width-tabpanel-" + index, "aria-labelledby": "full-width-tab-" + index }, other), value === index && React.createElement(core_1.Box, { p: 3 }, children)));
}
function a11yProps(index) {
    return {
        id: "full-width-tab-" + index,
        "aria-controls": "full-width-tabpanel-" + index,
    };
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}); });
var Ingredients = function (props) {
    var theme = styles_1.useTheme();
    var _a = React.useState(0), value = _a[0], setValue = _a[1];
    React.useEffect(function () {
        if (props.IngredientsData.changeState)
            if (props.IngredientsData.state.changeView === "editIngre") {
                handleChangeIndex(2);
                props.dispatchEvent({
                    type: "CLEARINGREDIENTSSTATE",
                    state: {
                        changeView: "none",
                        data: props.IngredientsData.state.data,
                    },
                });
            }
            else if (props.IngredientsData.state.changeView === "showList") {
                handleChangeIndex(0);
                props.dispatchEvent({
                    type: "CLEARINGREDIENTSSTATE",
                    state: {
                        changeView: "none",
                        data: props.IngredientsData.state.data,
                    },
                });
            }
        if (props.MaterialsData.state.changeView === "newMaterial") {
            handleChangeIndex(4);
            props.dispatchEvent({
                type: "CLEARMATERIALSSTATE",
                state: {
                    changeView: "none",
                    data: {},
                },
            });
        }
        else if (props.MaterialsData.state.changeView === "showMaterailsList") {
            handleChangeIndex(3);
            props.dispatchEvent({
                type: "CLEARMATERIALSSTATE",
                state: {
                    changeView: "none",
                    data: props.MaterialsData.state.data,
                },
            });
        }
        else if (props.MaterialsData.state.changeView === "editMaterial") {
            handleChangeIndex(5);
            props.dispatchEvent({
                type: "CLEARMATERIALSSTATE",
                state: {
                    changeView: "none",
                    data: props.MaterialsData.state.data,
                },
            });
        }
    }, [props]);
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    var handleChangeIndex = function (index) {
        setValue(index);
    };
    return (React.createElement("div", { style: {
            width: "100%",
            height: "95%",
            overflow: "auto",
            backgroundColor: props.Theme.theme === "light" ? "#F1F1F1" : "#2C2C2C",
        } },
        React.createElement(core_1.Paper, { style: { padding: 10, display: "flex" } },
            React.createElement("div", null,
                React.createElement(semantic_ui_react_1.Icon, { circular: true, inverted: true, name: "food", color: "teal" })),
            React.createElement(core_1.Typography, { style: { marginLeft: 10 }, variant: "h6" }, "Recipes")),
        React.createElement("div", null,
            React.createElement("div", { style: { display: "flex", marginTop: 10 } },
                React.createElement(semantic_ui_react_1.Button.Group, { size: "large" },
                    React.createElement(semantic_ui_react_1.Button, { toggle: true, active: value === 0 ? true : false, onClick: function () { return handleChangeIndex(0); } }, "Recipes List"),
                    React.createElement(semantic_ui_react_1.Button.Or, null),
                    React.createElement(semantic_ui_react_1.Button, { toggle: true, active: value === 1 ? true : false, onClick: function () { return handleChangeIndex(1); } }, "Add New Recipes"),
                    React.createElement(semantic_ui_react_1.Button.Or, null),
                    React.createElement(semantic_ui_react_1.Button, { toggle: true, active: value === 3 ? true : false, onClick: function () { return handleChangeIndex(3); } }, "Materials"))),
            React.createElement(react_swipeable_views_1.default, { axis: theme.direction === "rtl" ? "x-reverse" : "x", index: value, onChangeIndex: handleChangeIndex },
                React.createElement(TabPanel, { value: value, index: 0, dir: theme.direction },
                    React.createElement(IngredientsList_1.default, null)),
                React.createElement(TabPanel, { value: value, index: 1, dir: theme.direction },
                    React.createElement(newIngredients_1.default, { type: "new" })),
                React.createElement(TabPanel, { value: value, index: 2, dir: theme.direction },
                    React.createElement(newIngredients_1.default, { type: "edit", data: props.IngredientsData.state })),
                React.createElement(TabPanel, { value: value, index: 3, dir: theme.direction },
                    React.createElement(MaterialsList_1.default, null)),
                React.createElement(TabPanel, { value: value, index: 4, dir: theme.direction },
                    React.createElement(NewMaterials_1.default, null)),
                React.createElement(TabPanel, { value: value, index: 5, dir: theme.direction },
                    React.createElement(NewMaterials_1.default, { type: "edit", data: props.MaterialsData.state }))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        IngredientsData: state.IngredientsReducer,
        MaterialsData: state.MaterialsReducer,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Ingredients);
//# sourceMappingURL=Ingredients.js.map