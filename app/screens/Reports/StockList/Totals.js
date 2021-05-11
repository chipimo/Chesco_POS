"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var semantic_ui_react_1 = require("semantic-ui-react");
var Currency = require("react-currency-formatter");
var Totals = function (props) {
    return (React.createElement("div", { style: { color: "#fff", marginRight: 12 } },
        React.createElement(semantic_ui_react_1.Table, { basic: "very", inverted: props.Theme.theme === "light" ? false : true, celled: true, collapsing: true },
            React.createElement(semantic_ui_react_1.Table.Body, null,
                React.createElement(semantic_ui_react_1.Table.Row, null,
                    React.createElement(semantic_ui_react_1.Table.Cell, null,
                        React.createElement(semantic_ui_react_1.Header.Content, null, "Total Buying Prices")),
                    React.createElement(semantic_ui_react_1.Table.Cell, null,
                        React.createElement(Currency, { locale: "en", quantity: props.TotalBuyingPrices, symbol: "K" }))),
                React.createElement(semantic_ui_react_1.Table.Row, null,
                    React.createElement(semantic_ui_react_1.Table.Cell, null,
                        React.createElement(semantic_ui_react_1.Header.Content, null, "Expected Profit")),
                    React.createElement(semantic_ui_react_1.Table.Cell, null,
                        React.createElement(Currency, { locale: "en", quantity: props.ExpectedProfit, symbol: "K" }))),
                React.createElement(semantic_ui_react_1.Table.Row, null,
                    React.createElement(semantic_ui_react_1.Table.Cell, null,
                        React.createElement(semantic_ui_react_1.Header.Content, null, "Total Stock Value")),
                    React.createElement(semantic_ui_react_1.Table.Cell, null,
                        React.createElement(Currency, { locale: "en", quantity: props.TotalStockValue, symbol: "K" })))))));
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Totals);
//# sourceMappingURL=Totals.js.map