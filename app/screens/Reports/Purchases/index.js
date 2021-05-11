"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var RideSideMenu_1 = require("./RideSideMenu");
var index = function (props) {
    var _a = React.useState({ screens: [] }), panes = _a[0], setPanes = _a[1];
    React.useEffect(function () {
        var tempArr = [];
        // tempArr.push(
        //   {
        //     menuItem: {
        //       key: "inventory",
        //       icon: "box",
        //       content: "Reports",
        //     },
        //     render: () => (
        //       <Tab.Pane>
        //         <RideSideMenu />
        //       </Tab.Pane>
        //     ),
        //   },
        // );
        // setPanes({ ...panes, screens: tempArr });
    }, []);
    return (React.createElement("div", { style: { width: '80vw', height: "70vh" } },
        React.createElement(RideSideMenu_1.default, null)));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map