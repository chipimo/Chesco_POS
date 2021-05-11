const React = require("react");
import { connect } from "react-redux";

const PaymentSide = (props) => {
  React.useEffect(() => {
    props.dispatchEvent({
      type: "CHANGEVIEW",
      view: "paymentMode",
      title: "Payment Mode",
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSide);
