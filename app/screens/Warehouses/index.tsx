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
  Menu,
  MenuItem,
  ListItemIcon,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Checkbox,
  Button,
  TextField,
} from "@material-ui/core";
import OpenIcon from "@material-ui/icons/OpenWithOutlined";
import appDb from "../../redux/dataBase";
import { Loader } from "semantic-ui-react";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
    width: 600,
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
    label: "Group",
    minWidth: 90,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "sallingprice",
    label: "Price",
    minWidth: 70,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Instore",
    label: "Quantity",
    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString(),
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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedId, setSelectedId] = React.useState();
  const [selected, setSelected] = React.useState();

  const [, setopenNewProduct] = React.useState(false);
  const [state, setState] = React.useState({
    rows: [],
    total: 0,
  });
  const [Items, setItems] = React.useState({
    rows: [],
  });
  const [] = React.useState({});
  const [menustate, setMenuState] = React.useState(initialState);
  const [] = React.useState(initialState2);

  const [multi, SetMulti] = React.useState([]);
  const [isMulti, setisMulti] = React.useState(false);
  const [OpenProductList, setOpenProductList] = React.useState(false);
  const [LoadOnce, setLoadOnce] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [, setOpen] = React.useState(false);
  const [LoadingData] = React.useState(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (props.Model.toClose === "edit_product") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      // console.log("text");
      CloseOpenNewProduct();
    } else if (props.LoadTabel.load) {
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    } else if (props.Model.toClose === "LoadServer_all_products") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      appDb.HandelProducts({ _type: "getServerProducts" }, () => {
        setTimeout(() => {}, 100);
      });
    }

    if (!LoadOnce) {
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "getGrouped" },
        (receiveCallback) => {
          // console.log(receiveCallback);

          setTimeout(() => {
            if (receiveCallback.length > 15) setRowsPerPage(25);
            var productTotals = 0;

            receiveCallback.productResult[0].map((list) => {
              productTotals = list.amountInstore + productTotals;
            });

            setState({
              ...state,
              rows: receiveCallback.productResult[0],
              total: productTotals,
            });

            setItems({ ...Items, rows: receiveCallback.productResult[0] });
          }, 100);
        }
      );
      setLoadOnce(true);
    }
  }, [props]);

  const search = (even, data) => {
    // console.log(data);
    if (data) {
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "searchedProduct", id: data },
        (receiveCallback) => {
          var productTotals = 0;

          receiveCallback.map((list) => {
            productTotals = list.amountInstore + productTotals;
          });

          setState({
            ...state,
            rows: receiveCallback,
            total: productTotals,
          });
        }
      );
    } else {
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "getGrouped" },
        (receiveCallback) => {
          setTimeout(() => {
            if (receiveCallback.length > 15) setRowsPerPage(25);
            var productTotals = 0;

            receiveCallback.productResult[0].map((list) => {
              productTotals = list.amountInstore + productTotals;
            });

            setState({
              ...state,
              rows: receiveCallback.productResult[0],
              total: productTotals,
            });
            // setState({ ...state, rows: receiveCallback.productsList });
          }, 100);
        }
      );
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    setMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setMenuState(initialState);
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

  return (
    <div
      style={{
        width: "100%",
        height: "85vh",
        overflow: "auto",
      }}
    >
      <div style={{ width: "100%", padding: 10 }}>
        <div style={{ marginTop: 10 }}>
          <Autocomplete
            id="combo-box-demo"
            options={Items.rows}
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
      <Paper className={classes.root}>
        <Loader active={LoadingData}>Loading Data From Server...</Loader>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Typography variant="h6">{column.label}</Typography>
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      onContextMenu={(event) => {
                        handleClick(event, row);
                        setSelectedId(row.productKey);
                        setSelected(row);
                        setisMulti(row.isMulity);
                      }}
                      style={{ cursor: "context-menu" }}
                      onClick={() => {
                        setSelectedId(row.productKey);
                        setSelected(row);
                        setisMulti(row.isMulity);
                        // console.log(row);
                      }}
                      hover
                      selected={selectedId === row.productKey}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id + index}
                    >
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        const labelId = `enhanced-table-checkbox-${index}`;

                        if (column.id === "checkBox") {
                          return (
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedId === row.productKey}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                          );
                        } else if (column.id === "Instore") {
                          return (
                            <TableCell align="right">
                              {row.amountInstore}
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
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper style={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h6" style={{ marginRight: 100 }}>
            Total Stock {state.total}
          </Typography>
        </Paper>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={state.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        <Menu
          keepMounted
          open={menustate.mouseY !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            menustate.mouseY !== null && menustate.mouseX !== null
              ? { top: menustate.mouseY, left: menustate.mouseX }
              : undefined
          }
        >
          {isMulti ? (
            <MenuItem onClick={() => handleOpenMulti()}>
              <ListItemIcon>
                <OpenIcon fontSize="small" />
              </ListItemIcon>
              <Typography>Open Price List</Typography>
            </MenuItem>
          ) : null}
        </Menu>
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
                  {multi.map((data) => {
                    if (data.isInstore)
                      return (
                        <ListItem key={data.productKey}>
                          <ListItemText
                            style={{ color: "#fff" }}
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
                                  {` In store: ${data.amountInstore}, `}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      );
                  })}
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
