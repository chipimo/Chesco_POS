"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
exports.index = function () {
    return (React.createElement("div", { style: { display: 'flex', width: '100%' } },
        React.createElement("div", { style: { width: '40%' } }, "1"),
        React.createElement("div", { style: { width: '40%' } }, "2")));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(exports.index);
//# sourceMappingURL=index.js.map