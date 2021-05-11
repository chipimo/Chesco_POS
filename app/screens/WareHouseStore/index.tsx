const React = require("react");
import {
  Button,
  Divider,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import NewProduct from "../Products/NewProduct";
import ListTable from "./TableList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "97%",
    padding: 10,
    backgroundColor: theme.palette.background.paper,
    overflowX: "auto",
    maxHeight: "60vh",
    paddingBottom: 20,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    position: "absolute",
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    //
  },
}));

const index = (props) => {
  const classes = useStyles();
  const [openNewProduct, setopenNewProduct] = React.useState(false);

  const handleOpenNewProduct = () => {
    setopenNewProduct(true);
  };

  const CloseOpenNewProduct = () => {
    setopenNewProduct(false);
  };

  React.useEffect(() => {
    if (props.Model.toClose === "new_product") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      CloseOpenNewProduct();
    } 
  },[props])

  return (
    <div
      style={{
        width: "98%",
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#E5E5E5"
      }}
    >
      <Paper style={{ width: "85%", height: "80vh" }}>
        <div style={{ padding: 10, display: "flex" }}>
          <Typography variant="h6">Warehouse Product List</Typography>
        </div>
        <Divider />
        <div style={{ padding: 10 }}>
          <ListTable />
        </div>
      </Paper>
      <div style={{ width: "15%" }}>
        <div>
          <Button
            onClick={handleOpenNewProduct}
            variant="contained"
            color="primary"
            style={{ width: "100%" }}
          >
            Add New Product to warehouse
          </Button>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openNewProduct}
          className={classes.modal}
          onClose={CloseOpenNewProduct}
        >
          <div className={classes.paper}>
            <NewProduct type="addToWareHouse" />
          </div>
        </Modal>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Model: state.Model,
    LoadTabel: state.LoadTabel,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
