import React = require("react");
import { connect } from "react-redux";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import appDb from "../../redux/dataBase";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { toast } from "react-toastify";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Currency = require("react-currency-formatter");
const moment = require("moment");

const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const DateNumInput = `${year}${month}${date}`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Product" },
  { id: "group", numeric: false, disablePadding: false, label: "Group" },
  {
    id: "sallingprice",
    numeric: true,
    disablePadding: false,
    label: "Sellnig Price",
  },
  {
    id: "buyingPrice",
    numeric: true,
    disablePadding: false,
    label: "Buying Price",
  },
  { id: "quantity", numeric: false, disablePadding: false, label: "Supplier" },
  { id: "quantity", numeric: true, disablePadding: false, label: "Quantity" },
  {
    id: "costPrint",
    numeric: true,
    disablePadding: false,
    label: "Cost Price",
  },
  {
    id: "selling",
    numeric: true,
    disablePadding: false,
    label: "Selling Price",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
 
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all products" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h6">{headCell.label}</Typography>
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox"></TableCell>
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar className={numSelected > 0 ? classes.highlight : null}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products List
        </Typography>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    overflow: "auto",
    padding: 10,
    backgroundColor: theme.palette.background.paper,
  },
}));

const PaneRender = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Product Name ",
        field: "ItemName",
      },
      {
        title: "Group",
        field: "group",
      },
      {
        title: "In Store",
        field: "amountInstore",
      },
    ],
    data: [],
  });
  const [purchase, setPurchase] = React.useState({
    data: [],
  });
  const [purchaseSearchList, setPurchaseSearchList] = React.useState({
    data: [],
  });
  const [openPurchase, setopenPurchase] = React.useState(false);
  const [OpenTrans, setOpenTrans] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState({});
  const [purchaseSelected, setpurchaseSelected] = React.useState([]);
  const [mulitSelected, setMulitSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [multi, setMulti] = React.useState({ data: [] });
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loadOnce, setLoadOnce] = React.useState(true);
  const [Departments, SetDepartments] = React.useState([]);
  const [dep, setDep] = React.useState("");
  const [qnt, setqnt] = React.useState({ value: "" });
  const [values, setValues] = React.useState({
    supplier: "",
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [Suppliers, SetSuppliers] = React.useState([]);
  const [inviceNumber, setinviceNumber] = React.useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeSupplier = (event) => {
    setinviceNumber(event.target.value);
  };

  const handleOpenPurchase = () => {
    setopenPurchase(true);
  };

  const handlePurchase = () => {
    var check = moment(new Date());
    var time = check.format("LT");

    var data = {
      _type: "add_to_store",
      purchaseSelected,
      mulitSelected,
      selected,
      dep: props.Dep.dep,
    };  

    var dataPurchases = {
      _type: "purchases",
      purchaseSelected,
      mulitSelected,
      dep: props.Dep.dep,
      invoiceNumber: inviceNumber,
      EventDate: moment().format("MM/DD/YYYY"),
      dateRange: parseInt(DateNumInput),
      time: time,
    };

    appDb.HandelProducts(data, (reciveCallback) => {
      appDb.HandelReports(dataPurchases, (callback) => {
        toast(`Successfully Purchased`, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

      CloseOpenPurchase();
      setpurchaseSelected([]);
      setSelected([]);
    });
  };

  const CloseOpenPurchase = () => {
    setopenPurchase(false);
  };

  const HandleQutChange = (value, data, index, type) => {
    if (type === "multi") {
      const selectedMulitIndex = mulitSelected.indexOf(data);

      purchaseSelected.map((list, index) => {
        if (list.ItemName === data.productName) {
          purchaseSelected[index].quantity = list.quantity
            ? list.quantity + 1
            : parseInt(value);
        }
      });

      if (selectedMulitIndex === -1) {
        data.quantity = parseInt(value);
        mulitSelected.push(data);
        setMulitSelected(mulitSelected);
      } else {
        mulitSelected[selectedMulitIndex].quantity = parseInt(value);
      }
    } else {
      const selectedIndex = purchaseSelected.indexOf(data);

      // console.log(type);

      if (type === "qt")
        purchaseSelected[selectedIndex].quantity = parseInt(value);
      else if (type === "cost")
        purchaseSelected[selectedIndex].costPrice = parseInt(value);
      else if (type === "price")
        purchaseSelected[selectedIndex].sellingPriceNew = parseInt(value);
      else if (type === "supplier")
        purchaseSelected[selectedIndex].supplier = value;

      setpurchaseSelected(purchaseSelected);
    }
  };

  React.useEffect(() => {
    if (loadOnce) {
      props.dispatchEvent({ type: "LOADTABEL" });
      setLoadOnce(false);

      appDb.HandleSuppliers({ type: "get" }, (callback) => {
        SetSuppliers(callback);
      });
    }

    if (props.LoadTabel.load) {
      LoadData();
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    }

    appDb.HandleDepartments({ type: "getAll" }, (callback) => {
      SetDepartments(callback.departments);
    });
  }, [props]);

  const LoadData = () => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "all_purcheased" },
      (receiveCallback) => {
        setTimeout(() => {
          setState({ ...state, data: receiveCallback });
        }, 100);
      }
    );

    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "getGrouped" },
      (receiveCallback) => {
        if (receiveCallback.productResult[0].length > 50) setRowsPerPage(50);
        // console.log(receiveCallback.productResult[0]);
        setPurchase({ ...purchase, data: receiveCallback.productResult[0] });
        setPurchaseSearchList({ ...purchaseSearchList, data: receiveCallback.productResult[0] });
        // setMulti({ ...multi, data: receiveCallback.mulitList });
      }
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = purchase.data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, data) => {
    // console.log(data);
    const selectedIndex = selected.indexOf(data.ItemName);
    let purchesSelected = [];
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data.ItemName);
      purchesSelected = purchesSelected.concat(purchaseSelected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      purchesSelected = purchesSelected.concat(purchaseSelected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      purchesSelected = purchesSelected.concat(purchaseSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      purchesSelected = purchesSelected.concat(
        purchaseSelected.slice(0, selectedIndex),
        purchaseSelected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setpurchaseSelected(purchesSelected);

    var filteredItems = mulitSelected.filter(function (item) {
      if (item.productName !== data.ItemName) return item;
    });

    setMulitSelected(filteredItems);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDepChange = (event) => {
    setDep(event.target.value);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, purchase.data.length - page * rowsPerPage);

  const submit = () => {
    if (dep === "") {
      alert("Please selecte a department");
      return;
    }

    appDb.HandelProducts(
      {
        _type: "getPOSList",
        layoutType: "mulitList",
        name: selectedItem.ItemName,
      },
      (callback) => {
        // console.log(callback);
        if (props.Dep.dep === dep.dep_name) {
          return alert(
            `We're sorry we can't send this item to the same department you are on "${props.Dep.dep}"`
          );
        }

        var data = {
          _type: "tranfer",
          value: qnt.value,
          selected: selectedItem,
          to: dep.dep_name,
          from: props.Dep.dep,
          multi: callback,
          state: "send",
          isCleared: true,
        };

        appDb.HandelProducts(data, (callback) => {});
        setOpenTrans(false);
      }
    );
  };

  const search = (event, item) => {
    if (item !== null)
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "searchedProduct", id: item },
        (receiveCallback) => {
          console.log(receiveCallback);
          
          setPurchase({ ...purchase, data: receiveCallback });
        }
      );
    else
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "all_P" },
        (receiveCallback) => {
          if (receiveCallback.productsList.length > 50) setRowsPerPage(100);
          setPurchase({ ...purchase, data: receiveCallback.productsList });
          setMulti({ ...multi, data: receiveCallback.mulitList });
        }
      );
  };

  return (
    <div className={classes.paper}>
      <Autocomplete
        id="combo-box-demo"
        options={purchaseSearchList.data}
        getOptionLabel={(option) => option.ItemName}
        onChange={search}
        renderInput={(params) => (
          <TextField {...params} label="Search products" variant="outlined" />
        )}
      />
      <div
        style={{
          overflow: "auto",
          paddingLeft: 3,
          paddingRight: 3,
          paddingTop: 3,
        }}
      >
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={purchase.data.length}
            />
            <TableBody>
              {stableSort(purchase.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.ItemName);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  if (!row.isMaster)
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={labelId + row.ItemName}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row)}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Typography>{row.ItemName}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography>{row.group}</Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>
                            <Currency
                              locale="en"
                              quantity={row.sallingprice}
                              symbol="K"
                            />
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>
                            <Currency
                              locale="en"
                              quantity={row.buyingPrice}
                              symbol="K"
                            />
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Supplier
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={values.supplier}
                              fullWidth
                              onChange={(e) => {
                                HandleQutChange(
                                  e.target.value,
                                  row,
                                  index,
                                  "supplier"
                                );
                              }}
                            >
                              {Suppliers.map((supplier) => (
                                <MenuItem
                                  key={supplier.supplierKey}
                                  value={supplier.SupplierName}
                                >
                                  {supplier.SupplierName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>

                        <TableCell align="right">
                          <input
                            style={{ width: 50 }}
                            disabled={isItemSelected ? false : true}
                            defaultValue={isItemSelected ? 0 : null}
                            onInput={(e) => {
                              HandleQutChange(e.target.value, row, index, "qt");
                            }}
                            type="number"
                          />
                        </TableCell>

                        <TableCell align="right">
                          <input
                            style={{ width: 50 }}
                            disabled={isItemSelected ? false : true}
                            defaultValue={isItemSelected ? 0 : null}
                            onInput={(e) => {
                              HandleQutChange(
                                e.target.value,
                                row,
                                index,
                                "cost"
                              );
                            }}
                            type="number"
                          />
                        </TableCell>

                        <TableCell align="right">
                          <input
                            style={{ width: 50 }}
                            disabled={isItemSelected ? false : true}
                            defaultValue={isItemSelected ? 0 : null}
                            onInput={(e) => {
                              HandleQutChange(
                                e.target.value,
                                row,
                                index,
                                "price"
                              );
                            }}
                            type="number"
                          />
                        </TableCell>
                      </TableRow>
                    );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={purchase.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Invoice Number"
          variant="outlined"
          onChange={(e) => {
            handleChangeSupplier(e);
          }}
        />
      </div>
      <div style={{ display: "flex", marginTop: 7 }}>
        <Button
          disabled={selected.length !== 0 ? false : true}
          variant="contained"
          color="primary"
          onClick={handlePurchase}
        >
          Purchase Selected
        </Button>
        {/* <Button
              onClick={CloseOpenPurchase}
              variant="contained"
              color="secondary"
              style={{ marginLeft: 10 }}
            >
              Close
            </Button> */}
      </div>

      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={OpenTrans}
          className={classes.modal}
        >
          <Paper
            square
            elevation={12}
            style={{ width: 400, height: 260, padding: 20 }}
          >
            <div style={{ marginTop: 15 }}>
              <Typography variant="h6">
                Transfer{" "}
                <span style={{ color: "green" }}>{selectedItem.ItemName}</span>
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: 150, marginTop: 10 }}>
                <Typography>Tranfer to </Typography>
              </div>
              <FormControl style={{ width: "100%" }}>
                {/* <InputLabel id="demo-simple-select-helper-label">
                  Select Department
                </InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dep}
                  displayEmpty
                  onChange={handleDepChange}
                >
                  {Departments.map((list, index) => (
                    <MenuItem key={index} value={list}>
                      {list.dep_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop: 20 }}>
              <TextField
                label="Number of items"
                type="number"
                value={qnt.value}
                onChange={(e) => setqnt({ ...qnt, value: e.target.value })}
                id="outlined-margin-dense"
                // defaultValue={qnt.value}
                helperText="The default value is the total number of this items"
                margin="dense"
                variant="outlined"
              />
            </div>
            <div style={{ marginTop: 15 }}>
              <Button
                onClick={() => submit()}
                variant="contained"
                color="primary"
              >
                Done
              </Button>
              <Button
                onClick={() => setOpenTrans(false)}
                variant="contained"
                color="secondary"
                style={{ marginLeft: 5 }}
              >
                Cancel
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Dep: state.Dep,
    LoadTabel: state.LoadTabel,
    LoggedUsers: state.LoggedUsers,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaneRender);
