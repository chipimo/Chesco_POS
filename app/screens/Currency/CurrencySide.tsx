const React = require("react");
import { connect } from "react-redux";

const CurrencySide = (props) => {
  React.useEffect(() => {
    props.dispatchEvent({
      type: "CHANGEVIEW",
      view: "currrency",
      title: "Currrency",
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySide);
