import React = require("react");
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Checkbox,
  Button,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { Icon, Loader } from "semantic-ui-react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import appDb from "../../../redux/dataBase";
import Totals from "./Totals";

const { ipcRenderer } = require("electron");

const Currency = require("react-currency-formatter");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "73vh",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "90vw",
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
  },
  inline: {
    display: "inline",
  },
  list: {
    maxHeight: 400,
    overflow: "auto",
  },
  listHeader: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const columns = [
  {
    id: "checkBox",
    label: "",
    minWidth: 30,
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  { id: "ItemName", label: "Product", minWidth: 90 },
  {
    id: "group",
    label: "Category",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "branche",
    label: "Branch",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "supplier",
    label: "Supplier",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "isTaxEnabled",
    label: "Vat Status",
    minWidth: 90,
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "amountInstore",
    label: "Qty",
    minWidth: 90,
    align: "left",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "buyingPrice",
    label: "Buying Price",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "sallingprice",
    label: "Selling Price",
    minWidth: 70,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const initialState = {
  mouseX: null,
  mouseY: null,
};

const initialState2 = {
  mouseX: null,
  mouseY: null,
};

const index = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [selectedId, setSelectedId] = React.useState();
  const [selected, setSelected] = React.useState();

  const [openNewProduct, setopenNewProduct] = React.useState(false);
  const [state, setState] = React.useState({
    rows: [],
  });
  const [menustate, setMenuState] = React.useState(initialState);
  const [menustate2, setMenuState2] = React.useState(initialState2);

  const [multi, SetMulti] = React.useState([]);
  const [isMulti, setisMulti] = React.useState(false);
  const [OpenProductList, setOpenProductList] = React.useState(false);
  const [LoadOnceOff, setLoadOnceOff] = React.useState(true);
  let [TotalsState, setTotalsState] = React.useState({
    TotalBuyingPrices: 0,
    ExpectedProfit: 0,
    TotalStockValue: 0,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [open, setOpen] = React.useState(false);
  const [LoadingData, setLoadingData] = React.useState(false);

  const handleDailogClickOpen = () => {
    setOpen(true);
  };

  const handleDailogClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (props.Model.toClose === "edit_product") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      CloseOpenNewProduct();
    } else if (props.LoadTabel.load) {
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    } else if (props.Model.toClose === "LoadServer_all_products") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      appDb.HandelProducts(
        { _type: "getServerProducts" },
        (receiveCallback) => {
          setTimeout(() => {}, 100);
        }
      );
    }
    if (LoadOnceOff) {
      setLoadOnceOff(false);
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "getGrouped" },
        (receiveCallback) => {
          // console.log(receiveCallback.productResult[0]);

          setTimeout(() => {
            if (receiveCallback.productResult[0]) {
              if (receiveCallback.productResult[0].length > 50)
                setRowsPerPage(100);
              props.dispatchEvent({
                type: "ProductList",
                list: receiveCallback.productResult[0],
              });
            }
          }, 100);
        }
      );
    }
    let buyingPrice = 0;
    let profit = 0;
    let stockValue = 0;

    props.ProductList.list.map((list) => {
      buyingPrice = list.amountInstore * list.buyingPrice + buyingPrice;
      stockValue = list.amountInstore * list.initalPrice + stockValue;
      profit = stockValue - buyingPrice;
    });

    setTotalsState({
      ...TotalsState,
      TotalBuyingPrices: buyingPrice,
      ExpectedProfit: profit,
      TotalStockValue: stockValue,
    });
  }, [props]);

  const handleClose = () => {
    setMenuState(initialState);
  };

  const handleCloseSync = () => {
    setMenuState2(initialState2);
  };

  const handleOpenMulti = () => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "mulitList", name: selected.ItemName },
      (receiveCallback) => {
        setTimeout(() => {
          SetMulti(receiveCallback.data);
        }, 100);
      }
    );
    handleClose();
    HandelOpenProductList();
  };

  const CloseProductList = () => {
    setOpenProductList(false);
  };

  const CloseOpenNewProduct = () => {
    setopenNewProduct(false);
    handleClose();
  };

  const HandelOpenProductList = () => {
    setOpenProductList(true);
  };

  const saveCSV = () => {
    ipcRenderer.send("save_csv", {
      type: "StockList",
      header: [
        { id: "ItemName", title: "Product" },
        {
          id: "group",
          title: "Category",
        },
        {
          id: "branche",
          title: "Branch",
        },
        {
          id: "SupplierName",
          title: "Supplier",
        },
        {
          id: "isTaxEnabled",
          title: "Vat Status",
        },
        {
          id: "amountInstore",
          title: "Qty",
        },
        {
          id: "buyingPrice",
          title: "Buying Price",
        },
        {
          id: "sallingprice",
          title: "Selling Price",
        },
      ],
      data: props.ProductList.list,
    });
  };

  const HandelAddToInventory = () => {
    var purchaseSelected = [selected];
    var data = {
      _type: "add_to_store",
      purchaseSelected,
      dep: props.Dep.dep,
    };

    appDb.HandelProducts(data, (reciveCallback) => {
      toast(
        `Successfully Purchased ${
          reciveCallback.data.number === 1
            ? reciveCallback.data.name
            : reciveCallback.data.number + " Products"
        } `,
        {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    });
  };

  const HandelDelete = (serverdelete) => {
    handleDailogClose();
    appDb.HandelProducts(
      { _type: "delete", serverdelete, selected },
      (callback) => {
        props.dispatchEvent({ type: "LOADTABEL" });

        toast(`Successfully Purchased Successfully Deleted ${callback.name}`, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose();
      }
    );
  };

  const UploadProduct = () => {};

  const DeleteProductServer = (data) => {};

  return (
    <div
      style={{
        width: "80vw",
        height: "85vh",
        overflow: "auto",
      }}
    >
      <Dialog
        open={open}
        onClose={handleDailogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${selected ? selected.ItemName : "product"} ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This product will be deleted from database
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              HandelDelete(false);
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              HandelDelete(true);
            }}
            variant="contained"
            color="secondary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Button
          variant="contained"
          onClick={() => {
            saveCSV();
          }}
        >
          Export as csv file
        </Button>
      </div>

      <Paper className={classes.root}>
        <Loader active={LoadingData}>Loading Data From Server...</Loader>
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, id) => (
                  <TableCell
                    key={id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Typography variant="h6">{column.label}</Typography>
                  </TableCell>
                ))}
                <TableCell>
                  <Typography>Stock Value</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.ProductList.list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      style={{ cursor: "context-menu" }}
                      onClick={() => {
                        setSelectedId(row.productKey);
                        setSelected(row);
                        setisMulti(row.isMulity);
                      }}
                      hover
                      selected={selectedId === row.productKey}
                      role="checkbox"
                      tabIndex={-1}
                      key={index + row.productKey}
                    >
                      {columns.map((column, Innerindex) => {
                        const value = row[column.id];
                        const labelId = `enhanced-table-checkbox-${Innerindex}`;

                        if (column.id === "checkBox") {
                          return (
                            <TableCell key={labelId} padding="checkbox">
                              <Checkbox
                                checked={selectedId === row.productKey}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                          );
                        } else if (column.id === "isTaxEnabled") {
                          if (row.isTaxEnabled)
                            return (
                              <TableCell key={labelId}>
                                <Typography>inclusive</Typography>
                              </TableCell>
                            );
                          else
                            return (
                              <TableCell key={labelId}>
                                <Typography>not inclusive</Typography>
                              </TableCell>
                            );
                        } else if (column.id === "supplier") {
                          return (
                            <TableCell key={labelId}>
                              <Typography>{row.SupplierName}</Typography>
                            </TableCell>
                          );
                        } else if (column.id === "amountInstore") {
                          return (
                            <TableCell key={labelId}>
                              <Typography>{row.amountInstore}</Typography>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number" ? (
                                <Currency
                                  locale="en"
                                  quantity={value}
                                  symbol="K"
                                />
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        }
                      })}
                      <TableCell>
                        <Typography>
                          <Currency
                            locale="en"
                            quantity={
                              row.initalPrice * row.amountInstore
                            }
                            symbol="K"
                          />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ marginTop: 12, padding: 10, marginRight: 10 }}>
            <Totals
              TotalBuyingPrices={TotalsState.TotalBuyingPrices}
              ExpectedProfit={TotalsState.ExpectedProfit}
              TotalStockValue={TotalsState.TotalStockValue}
            />
          </div>
        </Paper>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100, 150, 200]}
          component="div"
          count={state.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={OpenProductList}
        className={classes.modal}
        onClose={CloseProductList}
      >
        <div className={classes.paper}>
          {selected ? (
            <div>
              <div>
                <Typography color="textPrimary">{selected.ItemName}</Typography>
              </div>
              <div>
                <List
                  subheader={
                    <ListSubheader className={classes.listHeader}>
                      Price List
                    </ListSubheader>
                  }
                  className={classes.list}
                >
                  {multi.map((data, sInnerIndex) => (
                    <ListItem key={sInnerIndex + data.sallingprice}>
                      <ListItemText
                        style={{
                          color:
                            props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                        }}
                        primary={
                          <Typography>
                            <Currency
                              locale="en"
                              quantity={parseInt(data.sallingprice)}
                              symbol="K"
                            />
                          </Typography>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              barcode:{" "}
                              {data.barcode !== ""
                                ? data.barcode
                                : "no barcode"}
                              ,{` qnt: ${data.qnt}, alertOut: ${data.alertOut}`}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Model: state.Model,
    Dep: state.Dep,
    ProductsMainList: state.ProductsMainList,
    LoadTabel: state.LoadTabel,
    ProductSync: state.ProductSync,
    SocketConn: state.SocketConn,
    ProductList: state.ProductList,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
