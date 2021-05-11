"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var semantic_ui_react_1 = require("semantic-ui-react");
var DepTable_1 = require("./DepTable");
var Branches_1 = require("./Branches");
var DepartmentView = function (props) {
    var panes = [
        {
            menuItem: { key: "Company", icon: "sitemap", content: "Company" },
            render: function () { return (React.createElement(semantic_ui_react_1.Tab.Pane, null,
                React.createElement(DepTable_1.default, null))); }
        },
        {
            menuItem: { key: "branches", icon: "users", content: "Branches" },
            render: function () { return (React.createElement(semantic_ui_react_1.Tab.Pane, null,
                React.createElement(Branches_1.default, null))); }
        }
        // {
        //   menuItem: (
        //     <Menu.Item key="messages">
        //       Notifications<Label>15</Label>
        //     </Menu.Item>
        //   ),
        //   render: () => (
        //     <Tab.Pane>
        //       <Dep_Notifications />
        //     </Tab.Pane>
        //   )
        // }
    ];
    return (React.createElement("div", { style: {
            width: "100%",
            display: "flex",
            height: "85vh",
            backgroundColor: props.Theme.theme === "light" ? "#E5E5E5" : "transparent"
        } },
        React.createElement("div", { style: {
                width: "100%",
                padding: 10
            } },
            React.createElement(semantic_ui_react_1.Tab, { panes: panes }))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DepartmentView);
//# sourceMappingURL=DepartmentView.js.map