"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var React = require("react");
var react_redux_1 = require("react-redux");
var semantic_ui_react_1 = require("semantic-ui-react");
function SuppliresPayments(props) {
    return (React.createElement("div", { style: { height: "90vh", width: "100%" } },
        React.createElement("div", { style: { marginLeft: 20, marginTop: 20, width: "100%" } },
            React.createElement(core_1.Typography, { variant: "h6", style: { paddingBottom: 20 } }, "Supplier Payments")),
        React.createElement("div", { style: {
                width: "100%",
                margin: "auto",
                display: "flex",
                padding: 10,
            } },
            React.createElement("div", { style: {
                    height: "100%",
                    width: "70%",
                    margin: "auto",
                    padding: 20,
                } },
                React.createElement(semantic_ui_react_1.Table, { celled: true, inverted: true, selectable: true },
                    React.createElement(semantic_ui_react_1.Table.Header, null,
                        React.createElement(semantic_ui_react_1.Table.Row, null,
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Supplier Name"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Address"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Contact #"),
                            React.createElement(semantic_ui_react_1.Table.HeaderCell, null, "Action"))),
                    React.createElement(semantic_ui_react_1.Table.Body, null,
                        React.createElement(semantic_ui_react_1.Table.Row, null,
                            React.createElement(semantic_ui_react_1.Table.Cell, null, "John"),
                            React.createElement(semantic_ui_react_1.Table.Cell, null, "Approved"),
                            React.createElement(semantic_ui_react_1.Table.Cell, { textAlign: "right" }, "None"),
                            React.createElement(semantic_ui_react_1.Table.Cell, { textAlign: "right" }, "None")),
                        React.createElement(semantic_ui_react_1.Table.Row, null,
                            React.createElement(semantic_ui_react_1.Table.Cell, null, "Jamie"),
                            React.createElement(semantic_ui_react_1.Table.Cell, null, "Approved"),
                            React.createElement(semantic_ui_react_1.Table.Cell, { textAlign: "right" }, "Requires call"),
                            React.createElement(semantic_ui_react_1.Table.Cell, { textAlign: "right" }, "Requires call")),
                        React.createElement(semantic_ui_react_1.Table.Row, null,
                            React.createElement(semantic_ui_react_1.Table.Cell, null, "Jill"),
                            React.createElement(semantic_ui_react_1.Table.Cell, null, "Denied"),
                            React.createElement(semantic_ui_react_1.Table.Cell, { textAlign: "right" }, "None"),
                            React.createElement(semantic_ui_react_1.Table.Cell, { textAlign: "right" }, "None"))))),
            React.createElement(core_1.Paper, { style: {
                    width: "30%",
                    height: "100%",
                    backgroundColor: props.Theme.theme === "light" ? "#EBEBEB" : "#2B2B2B",
                    padding: 15,
                } },
                React.createElement("div", null,
                    React.createElement(core_1.Typography, { variant: "h6" }, "Add New Supplier Payment")),
                React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(core_1.TextField, { style: { marginTop: props.type === "edit" ? 20 : 0 }, name: "ProductQt", type: "text", variant: "outlined", fullWidth: true, 
                        // onChange={handleTextChange("ProductQt")}
                        // value={values.ProductQt}
                        id: "ProductQt", label: "Supplier Name" }),
                    React.createElement("div", { style: { height: 10 } }),
                    React.createElement(core_1.TextField, { style: { marginTop: props.type === "edit" ? 20 : 0 }, name: "ProductQt", type: "text", variant: "outlined", fullWidth: true, 
                        // onChange={handleTextChange("ProductQt")}
                        // value={values.ProductQt}
                        id: "ProductQt", label: "Supplier Address" }),
                    React.createElement("div", { style: { height: 10 } }),
                    React.createElement(core_1.TextField, { style: { marginTop: props.type === "edit" ? 20 : 0 }, name: "ProductQt", type: "text", variant: "outlined", fullWidth: true, 
                        // onChange={handleTextChange("ProductQt")}
                        // value={values.ProductQt}
                        id: "ProductQt", label: "Supplier Contact " }),
                    React.createElement("div", { style: { marginTop: 10 } },
                        React.createElement(core_1.Button, { variant: "contained", color: "primary", style: {} }, "Create")))))));
}
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SuppliresPayments);
//# sourceMappingURL=SuppliresPayments.js.map