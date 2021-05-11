const React = require("react");
import { connect } from "react-redux";

 const index = () => {
  return <div>
      PurchasesReturns
  </div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
