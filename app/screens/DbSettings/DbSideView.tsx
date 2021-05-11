const React = require("react");
import { connect } from "react-redux";

const DbSideView = (props) => {
  React.useEffect(() => {
    props.dispatchEvent({
      type: "CHANGEVIEW",
      view: "dbsettings",
      title: "Database Settings",
    });
  });
  return <div></div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DbSideView);
