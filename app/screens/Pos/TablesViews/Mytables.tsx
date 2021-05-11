import React = require("react");
import { connect } from "react-redux";

import MaterialTable from "material-table";
import { forwardRef } from "react";
import { useHistory } from "react-router-dom";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import appDb from "../../../redux/dataBase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { toast } from "react-toastify";

const Currency = require("react-currency-formatter");
const { ipcRenderer } = require("electron");

const columns = [
  { id: "ItemName", label: "Product Name", minWidth: 170 },
  {
    id: "qnt",
    label: "Quantity",
    minWidth: 170,
    align: "right",
  },
  {
    id: "initalPrice",
    label: "Price",
    minWidth: 170,
    align: "right",
  },
  {
    id: "total",
    label: "Total Cost",
    minWidth: 170,
    align: "right",
  },
];

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox />),
  Check: forwardRef((props, ref) => <Check />),
  Clear: forwardRef((props, ref) => <Clear />),
  Delete: forwardRef((props, ref) => <DeleteOutline />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight />),
  Edit: forwardRef((props, ref) => <Edit />),
  Export: forwardRef((props, ref) => <SaveAlt />),
  Filter: forwardRef((props, ref) => <FilterList />),
  FirstPage: forwardRef((props, ref) => <FirstPage />),
  LastPage: forwardRef((props, ref) => <LastPage />),
  NextPage: forwardRef((props, ref) => <ChevronRight />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft />),
  ResetSearch: forwardRef((props, ref) => <Clear />),
  Search: forwardRef((props, ref) => <Search />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn />),
  ShoppingCart: forwardRef((props, ref) => <ShoppingCartIcon />),
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
}));

const Mytables = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [],
    data: [],
  });
  const [open, setOpen] = React.useState(false);
  const [selected, setSeleted] = React.useState({});
  const [total, setTotal] = React.useState(0);
  const [qty, setQty] = React.useState("1");
  const [selectedRows, setSeletedRows] = React.useState([]);
  const [selectedRowsDefault, setSeletedRowsDefault] = React.useState([]);
  const [tableName, settableName] = React.useState("");
  const [time, settime] = React.useState("");
  const [date, setdate] = React.useState("");

  const [tableKey, settableKey] = React.useState("");
  const history = useHistory();
  const [purchase, setPurchase] = React.useState({
    data: [],
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isKitchen, setIsKitchen] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    appDb.HandleTables({ _type: "getMyTabes" }, (reciveCallback) => {
      var dataArr = [];

      reciveCallback.data.map((data) => {
        if (
          data.user === props.User.userLogged.userName ||
          props.User.userLogged.prevarges === "1"
        ) {
          dataArr.push(data);
        }
      });

      props.dispatchEvent({
        type: "SETCOUNT",
        count: dataArr.length,
      });

      if (props.User.userLogged.prevarges === "1")
        setState({
          ...state,
          data: dataArr,
          columns: [
            {
              title: "Table Name",
              field: "name",
            },
            {
              title: "Date",
              field: "date",
            },
            {
              title: "Time",
              field: "time",
            },
            {
              title: "Cashier",
              field: "user",
            },
          ],
        });
      else
        setState({
          ...state,
          data: dataArr,
          columns: [
            {
              title: "Table Name",
              field: "name",
            },
            {
              title: "Date",
              field: "date",
            },
            {
              title: "Time",
              field: "time",
            },
          ],
        });
    });

    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "all_P" },
      (receiveCallback) => {
        setPurchase({ ...purchase, data: receiveCallback.productsList });
      }
    );
  }, []);

  const handlesubmit = () => {
    selected.qty = parseInt(qty);
    // selected.amountInstore = selected.amountInstore - parseInt(selected.qty);
    selected.tableName = tableName;
    selected.key = tableKey;
    selected.time = time;
    selected.date = date;
    selected._type = "KitchenTableUpdate";

    appDb.HandleTables(selected, (callback) => { });

    const index = selectedRows.findIndex(
      (x) => x.productKey === selected.productKey
    );

    if (index !== -1) {
      let tempArr = [];
      let totalNum = 0;

      selectedRows[index].qnt =
        parseInt(qty) + parseInt(selectedRows[index].qnt);
      selectedRows[index].amountInstore = selectedRows[index].amountInstore - parseInt(qty); 
      // setTimeout(() => {
      const data = {
        qty: parseInt(qty),
        table: tableName,
        product_list: { data: selectedRows },
        _type: "updateTable",
      };
      // console.log(data);

      appDb.HandleTables(data, (callback) => {
        // console.log(callback);

        var dataArr = [];

        const index = callback.data.findIndex((x) => x.name === tableName);

        callback.data[index].list.data.map((list) => {
          totalNum = list.qnt * list.initalPrice + totalNum;
        });

        setTotal(totalNum);
        setSeletedRows(callback.data[index].list.data);

        toast(
          `Added ${qty} successfully to`,
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
      // }, 900);
    } else {

      const data = {
        qty: parseInt(qty),
        tableName,
        selectedRows,
        _type: "addToTable",
      };

      var temArry = selectedRows;
      var totalNum = 0;

      selected.isAddedToCart = true;
      selected.qnt = selected.qty;

      temArry.push(selected);

      // selectedRows.push(temArry)
      setSeletedRows(temArry);

      setRowsPerPage(25);
      // console.log(data);
      temArry.map((list) => {
        totalNum = list.qnt * list.initalPrice + totalNum;
      });
      setTotal(totalNum);

      appDb.HandleTables(data, (callback) => {
        toast(
          `Added successfully`,
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
    }
  };

  const handleOnchange = (event) => {
    setQty(event.target.value);
  };

  const search = (event, item) => {
    setSeleted(item);
  };

  return (
    <div
      style={{ padding: 20, width: "100%", height: "95vh", overflow: "auto" }}
    >
      <div style={{ padding: 10 }}>
        <Divider />
      </div>

      <MaterialTable
        icons={tableIcons}
        title="My Tables"
        columns={state.columns}
        data={state.data}
        // options={{
        //   exportButton: true,
        // }}
        actions={
          props.User.userLogged.prevarges === "1"
            ? [
              {
                icon: "edit",
                disabled:
                  props.User.userLogged.prevarges === "1" ? false : true,
                tooltip: "Edit Table",
                onClick: (event, rowData) => {

                  // console.log(rowData);
                  
                  props.dispatchEvent({
                    type: "SETTOPRINT",
                    id: rowData.id,
                    table: rowData.name,
                    userName: rowData.user,
                  });

                  props.dispatchEvent({
                    type: "RESTATECART",
                  });

                  props.dispatchEvent({
                    type: "TABLESET",
                    state: false,
                    table_name: rowData.name,
                  });

                  rowData.list.data.map((list) => {
                    // console.log(list);
                    props.dispatchEvent({
                      type: "ADDTOCART",
                      payload: {
                        items: list,
                      },
                    });

                    props.dispatchEvent({
                      type: "SETTABLEACTIONS",
                      ActionType: "close_left_drawer & show edit",
                      id: rowData.id,
                    });
                  });

                  setTimeout(() => {
                    history.push("/pos");
                  }, 100);
                },
              },
              {
                icon: "delete",
                disabled:
                  props.User.userLogged.prevarges === "1" ? false : true,
                tooltip: "Delete Bill",
                onClick: (event, rowData) => {
                  appDb.HandleTables(
                    { _type: "DeleteTableFromMyTables", id: rowData.id },
                    (callback) => {
                      appDb.HandleTables(
                        { _type: "getMyTabes" },
                        (reciveCallback) => {
                          props.dispatchEvent({
                            type: "SETCOUNT",
                            count: reciveCallback.data.length,
                          });

                          props.dispatchEvent({
                            type: "CLEARTABLEACTIONS",
                          });

                          setState({
                            ...state,
                            data: reciveCallback.data,
                          });
                        }
                      );
                    }
                  );
                },
              },
            ]
            : [
              {
                icon: () => <ShoppingCartIcon />,
                tooltip: "Close Sale",
                onClick: (event, rowData) => {
                  // console.log(rowData);

                  props.dispatchEvent({
                    type: "RESTATECART",
                  });

                  props.dispatchEvent({
                    type: "SETTOPRINT",
                    id: rowData.id,
                    table: rowData.name,
                  });

                  rowData.list.data.map((list) => {

                    props.dispatchEvent({
                      type: "ADDTOCART",
                      payload: {
                        items: list,
                      },
                    });

                    props.dispatchEvent({
                      type: "SETTABLEACTIONS",
                      ActionType: "close_left_drawer & open_bottom_drawer",
                      id: rowData.id,
                    });
                  });
                },
              },
              {
                icon: "print",
                tooltip: "Print Out Bill",
                onClick: (event, rowData) => {
                  rowData.compInfo = props.Dep;
                  ipcRenderer.send("do_print_bill", rowData);
                },
              },
              {
                icon: () => <AddShoppingCartIcon />,
                tooltip: "Add To Bill",
                onClick: (event, rowData) => {
                  // console.log(rowData);
                  let totalNum = 0;

                  settableName(rowData.name);
                  settime(rowData.time);
                  setdate(rowData.date);
                  settableKey(rowData.id);
                  setSeletedRows(rowData.list.data);
                  setSeletedRowsDefault(rowData.list.data);
                  setSeleted(rowData);
                  setOpen(true);

                  rowData.list.data.map((list) => {
                    totalNum = list.qnt * list.initalPrice + totalNum;
                  });
                  setTotal(totalNum);
                },
              },
              {
                icon: () => <ListAltIcon />,
                disabled: isKitchen,
                tooltip: "Print Out Order To kitchen",
                onClick: (event, rowData) => {
                  rowData.compInfo = props.Dep;
                  rowData._type = "KitchenTable";

                  appDb.HandleTables(rowData, (reciveCallback) => {
                    if (reciveCallback.length === 0) setIsKitchen(false);
                  });
                },
              },
            ]
        }
      />
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div>
                <Typography variant="h6">Table name: {tableName}</Typography>
              </div>
              <div style={{ padding: 10 }}>
                <Divider />
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    width: "75%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Autocomplete
                    id="combo-box-demo"
                    options={purchase.data}
                    getOptionLabel={(option) => option.ItemName}
                    onChange={search}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search products"
                        fullWidth
                        variant="outlined"
                        style={{ width: 300 }}
                      />
                    )}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Qty"
                    type="number"
                    variant="outlined"
                    value={qty}
                    onChange={handleOnchange}
                  />
                </div>
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                  <Button
                    onClick={handlesubmit}
                    variant="outlined"
                    startIcon={<AddShoppingCartIcon />}
                  >
                    Add to bill
                  </Button>
                </div>
              </div>
              <div style={{ padding: 10 }}>
                <Divider />
              </div>
              <div style={{ marginTop: 10, marginBottom: 10 }}>
                <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column, indexMain) => (
                            <TableCell
                              key={indexMain + column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedRows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                {columns.map((column, index) => {
                                  const value = row[column.id];
                                  if (column.id === "total")
                                    return (
                                      <TableCell
                                        key={index + row.ItemName}
                                        align={column.align}
                                      >
                                        <Currency
                                          locale="en"
                                          quantity={row.initalPrice * row.qnt}
                                          symbol="K"
                                        />
                                      </TableCell>
                                    );
                                  return (
                                    <TableCell
                                      key={index + row.ItemName}
                                      align={column.align}
                                    >
                                      {column.format &&
                                        typeof value === "number" ? (
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
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Paper
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: 15,
                    }}
                  >
                    <Typography variant="h5" style={{ marginRight: 15 }}>
                      Total
                    </Typography>
                    <Typography variant="h5">
                      <Currency locale="en" quantity={total} symbol="K" />
                    </Typography>
                  </Paper>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={selectedRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
              <div style={{ padding: 10 }}>
                <Divider />
              </div>
              <div style={{ marginTop: 10, marginBottom: 10 }}>
                <Button
                  onClick={() => {
                    handleClose();
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Close
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  MytablesReducer: state.MytablesReducer,
  User: state.User,
  Dep: state.Dep,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mytables);
