const React = require("react");
import { connect } from "react-redux";

const WareHouseSide = (props) => {
  React.useEffect(() => {
    props.dispatchEvent({
      type: "CHANGEVIEW",
      view: "warehouse",
      title: "Warehouse settings",
    });
  }, []);
  return <div></div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WareHouseSide);
