import React = require("react");
import { connect } from "react-redux";
import { Label, Menu, Tab } from "semantic-ui-react";
import { Button } from "@material-ui/core";
import DepTable from "./DepTable";
import Dep_Notifications from "./Dep_Notifications";
import Branches from "./Branches";

const DepartmentView = props => {
  const panes = [
    {
      menuItem: { key: "Company", icon: "sitemap", content: "Company" },
      render: () => (
        <Tab.Pane>
          <DepTable />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: "branches", icon: "users", content: "Branches" },
      render: () => (
        <Tab.Pane>
          <Branches />
        </Tab.Pane>
      )
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

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "85vh",
        backgroundColor:
          props.Theme.theme === "light" ? "#E5E5E5" : "transparent"
      }}
    >
      <div
        style={{
          width: "100%",
          padding: 10
        }}
      >
        <Tab panes={panes} />
      </div>
     
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentView);
