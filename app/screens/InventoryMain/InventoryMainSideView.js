"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var InventoryMainSideView = function (props) {
    React.useEffect(function () {
        props.dispatchEvent({
            type: "CHANGEVIEW",
            view: "inventoryMain",
            title: "Inventory settings",
        });
    }, []);
    return React.createElement("div", null);
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(InventoryMainSideView);
//# sourceMappingURL=InventoryMainSideView.js.map