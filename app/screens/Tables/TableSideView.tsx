import React = require("react");
import { connect } from "react-redux";

const TableSideView = (props) => {
  React.useEffect(() => {
    props.dispatchEvent({
      type: "CHANGEVIEW",
      view: "tables",
      title: "Table Settings",
    });
  }, []);
  return <div></div>;
};

function mapStateToProps(state) {
    return {
      Theme: state.Theme,
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      dispatchEvent: (data) => dispatch(data),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(TableSideView);
