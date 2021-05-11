const React = require("react");
import { app } from "electron";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import appDb from "../../redux/dataBase";
import { Divider } from "@material-ui/core";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SelectedListModel = (props) => {
  const { selectedRows, type } = props;
  const classes = useStyles();
  const [productsList, setProductsList] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    appDb.HandelProducts(
      { _type: "getWarehouseListById", selectedRows },
      (callback) => {
        // console.log(callback);
        setProductsList(callback);
      }
    );
  };

  const handleChange = (event) => {
    const index = productsList.findIndex((x) => x.productKey === event.index);

    productsList[index].transfer = parseInt(event.e.target.value);
    productsList[index].user = props.User;

    // console.log(productsList);
  };

  const handleTransfer = () => {
    if (type === "trans") {
      appDb.HandelProducts(
        { _type: "TransferWarehouseListById", productsList },
        (callback) => {
          getData();
          toast(`Successfully Updated`, {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.dispatchEvent({ type: "HANDELCLOSE", toClose: "transModel" });
        }
      );
    } else {
      appDb.HandelProducts(
        { _type: "PurchaseWarehouseListById", productsList },
        (callback) => {
          getData();
          toast(`Successfully Updated`, {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.dispatchEvent({ type: "HANDELCLOSE", toClose: "transModel" });
        }
      );
    }
  };

  return (
    <div style={{ width: "70%", height: "80%" }}>
      <Divider />
      <div style={{ padding: 10 }}>
        {type === "trans" ? (
          <Typography variant="h6">Warehouse Transfer List</Typography>
        ) : (
          <Typography variant="h6">Reorder Stock List</Typography>
        )}
      </div>
      <Divider />

      {productsList.map((product, index) => {
        return (
          <Card key={index} className={classes.root} variant="outlined">
            <CardContent>
              <div style={{ display: "flex" }}>
                <Typography
                  className={classes.title}
                  color="primary"
                  variant="h6"
                  gutterBottom
                >
                  {product.ItemName}
                </Typography>
                <Typography
                  className={classes.title}
                  style={{ marginLeft: 10 }}
                  color="textSecondary"
                  gutterBottom
                >
                  In stock {product.amountInstore}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              {type === "trans" ? (
                <TextField
                  id="outlined-basic"
                  label="Transfer"
                  variant="outlined"
                  type="number"
                  onChange={(e) =>
                    handleChange({ index: product.productKey, e })
                  }
                />
              ) : (
                <TextField
                  id="outlined-basic"
                  label="Amount of items"
                  variant="outlined"
                  type="number"
                  onChange={(e) =>
                    handleChange({ index: product.productKey, e })
                  }
                />
              )}
            </CardActions>
          </Card>
        );
      })}
      <div style={{ marginLeft: 10 }}>
        <Button onClick={handleTransfer} variant="outlined">
          Transfer
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedListModel);
