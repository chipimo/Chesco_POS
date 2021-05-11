"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var TableSideView = function (props) {
    React.useEffect(function () {
        props.dispatchEvent({
            type: "CHANGEVIEW",
            view: "tables",
            title: "Table Settings",
        });
    }, []);
    return React.createElement("div", null);
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
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(TableSideView);
//# sourceMappingURL=TableSideView.js.map