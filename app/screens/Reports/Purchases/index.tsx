import React = require("react");
import { connect } from "react-redux";
import { Tab } from "semantic-ui-react";
import RideSideMenu from "./RideSideMenu";

const index = (props) => {
  const [panes, setPanes] = React.useState({ screens: [] });

  React.useEffect(() => {
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

  return (
    <div style={{ width: '80vw', height: "70vh" }}>
       <RideSideMenu />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
