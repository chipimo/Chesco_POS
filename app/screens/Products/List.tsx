import React = require("react");
import { connect } from "react-redux";
import { Typography, Paper, Modal, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NewProduct from "./NewProduct";
import ProductListTable from "./ProductList";
import appDb from "../../redux/dataBase";
import { Icon } from "semantic-ui-react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const PropTypes = require("prop-types");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "97%",
    padding: 10,
    backgroundColor: theme.palette.background.paper,
    overflowX: "auto",
    maxHeight: "60vh",
    paddingBottom: 20,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  rootSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  searchBar: {
    outline: "none",
    border: "none",
    width: 400,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    borderWidth: 1,
    width: "100%",
    borderStyle: "solid",
    borderColor: "transparent",
    borderBottomColor: "#0E2302",
    backgroundColor: "#2A6A08",
    color: "#ccc",
    padding: 5,
    transition: "all 1s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0E2302",
      borderBottomColor: "#091701",
      color: "#fff",
    },
  },
  addButton2: {
    borderWidth: 1,
    width: "100%",
    borderStyle: "solid",
    borderColor: "transparent",
    borderBottomColor: "#0E2302",
    backgroundColor: "#00508F",
    color: "#ccc",
    padding: 5,
    transition: "all 1s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#00233F",
      borderBottomColor: "#00233F",
      color: "#fff",
    },
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

var NodeId = 0;
var isCalled = false;

const ProductList = (props) => {
  const classes = useStyles();
  const [openNewProduct, setopenNewProduct] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [MainCategory, setMainCategory] = React.useState([]);
  const [LoadOnceOff, setLoadOnceOff] = React.useState(true);

  React.useEffect(() => {
    if (props.Model.toClose === "new_product") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      CloseOpenNewProduct();
    } else if (props.LoadTabel.load) {
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "getGrouped" },
        (receiveCallback) => {
          setTimeout(() => {
            // setState({ ...state, rows: receiveCallback.productsList });
            props.dispatchEvent({
              type: "ProductList",
              list: receiveCallback.productResult[0],
            });
          }, 100);
        }
      );
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    }
    if (LoadOnceOff) {
      setLoadOnceOff(false);
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "all_P" },
        (receiveCallback) => {
          setTimeout(() => {
            setMainCategory(receiveCallback.productsList);
          }, 100);
        }
      );
    }
  }, [props]);

  const handleOpenNewProduct = () => {
    setopenNewProduct(true);
  };

  const search = (event, item) => {
    if (item !== null)
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "searchedProduct", id: item },
        (receiveCallback) => {
          props.dispatchEvent({
            type: "ProductList",
            list: receiveCallback,
          });
        }
      );
    else
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "all_P" },
        (receiveCallback) => {
          props.dispatchEvent({
            type: "ProductList",
            list: receiveCallback.productsList,
          });
        }
      );
  };

  const CloseOpenNewProduct = () => {
    setopenNewProduct(false);
  };

  const HandelSelectedProduct = (data) => {
    props.dispatchEvent({ type: "SETPRODUCTS", products: data });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        padding: 4,
        backgroundColor: props.Theme.theme === "light" ? "#E5E5E5" : "#212121",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "84vh",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
          marginTop: 1,
        }}
      >
        <ProductListTable />
      </div>
      <div
        style={{
          width: "20%",
          height: "80vh",
          marginTop: 1,
          padding: 6,
        }}
      >
        <div>
          <div
            onClick={() => handleOpenNewProduct()}
            style={{ marginTop: 10, display: "flex" }}
          >
            <Typography className={classes.addButton}>
              <Icon name="plus cart" /> Add Product
            </Typography>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <Divider />
          <div>
            <Button
              onClick={() =>
                appDb.HandelProducts(
                  { _type: "getPOSList", layoutType: "all_P" },
                  (receiveCallback) => {
                    setTimeout(() => {
                      props.dispatchEvent({
                        type: "ProductList",
                        list: receiveCallback.productsList,
                      });
                    }, 100);
                  }
                )
              }
            >
              Load all products
            </Button>
          </div>
          <Divider />
          <div style={{ marginTop: 10 }}>
            <Autocomplete
              id="combo-box-demo"
              options={MainCategory}
              getOptionLabel={(option) => option.ItemName}
              onChange={search}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search products"
                  variant="outlined"
                />
              )}
            />
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openNewProduct}
        className={classes.modal}
        // onClose={handleCloseMulti}
      >
        <div className={classes.paper}>
          <NewProduct type="add" />
        </div>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
