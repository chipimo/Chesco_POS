"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var WareHouseSide = function (props) {
    React.useEffect(function () {
        props.dispatchEvent({
            type: "CHANGEVIEW",
            view: "warehouse",
            title: "Warehouse settings",
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(WareHouseSide);
//# sourceMappingURL=WareHouseSide.js.map