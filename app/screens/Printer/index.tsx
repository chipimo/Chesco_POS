import React = require("react");
import { connect } from "react-redux";

const index = (props) => {

  return (
    <div
      style={{
        backgroundColor: "rgb(14, 36, 36)",
        display: "flex",
      }}
    >
      <div style={{ width: "50vw", height: "85vh", overflow: "auto" }}>
        
      </div>
      <div>list</div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
