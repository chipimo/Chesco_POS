"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var index = function (props) {
    return (React.createElement("div", { style: {
            backgroundColor: "rgb(14, 36, 36)",
            display: "flex",
        } },
        React.createElement("div", { style: { width: "50vw", height: "85vh", overflow: "auto" } }),
        React.createElement("div", null, "list")));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map