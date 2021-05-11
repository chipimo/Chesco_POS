import React = require("react");
import { connect } from "react-redux";
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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import appDb from "../../redux/dataBase";
import SelectedListModel from "./SelectedListModel";
import Popper from "@material-ui/core/Popper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, TextField } from "@material-ui/core";
import NewProduct from "../Products/NewProduct";

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
  {
    id: "ItemName",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  { id: "group", numeric: false, disablePadding: false, label: "Category" },
  { id: "branche", numeric: false, disablePadding: false, label: "Branch" },
  {
    id: "isTaxEnabled",
    numeric: false,
    disablePadding: false,
    label: "Tax Status",
  },
  {
    id: "expiryDate",
    numeric: false,
    disablePadding: false,
    label: "Expiration date",
  },
  {
    id: "DaysRem",
    numeric: false,
    disablePadding: false,
    label: "Days remaining",
  },
  {
    id: "amountInstore",
    numeric: true,
    disablePadding: false,
    align: "right",
    label: "Quantity",
  },
  {
    id: "buyingPrice",
    numeric: true,
    align: "right",
    disablePadding: false,
    label: "Buying Price",
  },
  {
    id: "sallingprice",
    numeric: true,
    align: "right",
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
            inputProps={{ "aria-label": "select all desserts" }}
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
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  paper: {
    border: "1px solid",
    width: 250,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  paperMod: {
    position: "absolute",
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  const {
    numSelected,
    selectedRows,
    list,
    dispatcher,
    Model,
    selected,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [openCarMod, setOpenCarMod] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [type, setType] = React.useState("");

  const defaultProps = {
    options: list,
    getOptionLabel: (option) => option.ItemName,
  };

  React.useEffect(() => {
    if (Model.toClose === "transModel") {
      handleCloseMod();
      dispatcher({ type: "HANDELCLEAR" });
    }
    if (Model.toClose === "edit_product") {
      dispatcher({ type: "HANDELCLEAR" });
      handleCloseCartMod();
    }
  }, [props]);

  const handleOpenMod = () => {
    setOpen(true);
  };

  const handleCloseMod = () => {
    setOpen(false);
  };

  const handleOpenCartMod = () => {
    setOpenCarMod(true);
  };

  const handleCloseCartMod = () => {
    setOpenCarMod(false);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const search = (event, item) => {
    if (item !== null)
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "searcheWarehouseList", id: item },
        (receiveCallback) => {
          dispatcher({
            type: "LOADWAREHOUSELIST",
            list: receiveCallback.data[0],
          });
        }
      );
    else
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "warehouseList" },
        (receiveCallback) => {
          if (receiveCallback.data.length !== 0) {
            dispatcher({
              type: "LOADWAREHOUSELIST",
              list: receiveCallback.data[0],
            });
          }
        }
      );
  };

  const handleDelete = () => {
    appDb.HandelProducts(
      {
        _type: "warehouseListDelete",
        selectedRows,
        layoutType: "warehouseListDelete",
      },
      (reciveCallback) => {
        dispatcher({ type: "HANDELCLOSE", toClose: "transModel" });
      }
    );
  };

  const openMenu = Boolean(anchorEl);
  const id = openMenu ? "simple-popper" : undefined;

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
          List
        </Typography>
      )}

      {numSelected > 0 ? (
        <div style={{ display: "flex" }}>
          <Tooltip title="Transfer to Product List">
            <IconButton
              onClick={() => {
                setType("trans");
                handleOpenMod();
              }}
              aria-label="delete"
            >
              <SendIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Restock selected">
            <IconButton
              onClick={() => {
                setType("cart");
                handleOpenMod();
              }}
              aria-label="delete"
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={
              numSelected === 1
                ? "Edit Product"
                : "Editing is disabled for multi-products"
            }
          >
            <IconButton
              onClick={() => {
                handleOpenCartMod();
              }}
              disabled={numSelected === 1 ? false : true}
              aria-label="delete"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete()} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton
            aria-describedby={id}
            type="button"
            onClick={handleClick}
            aria-label="filter list"
          >
            {openMenu ? <CloseIcon /> : <FilterListIcon />}
          </IconButton>
        </Tooltip>
      )}
      <Popper id={id} open={openMenu} anchorEl={anchorEl}>
        <div className={classes.paper}>
          <Autocomplete
            {...defaultProps}
            id="debug"
            debug
            onChange={search}
            renderInput={(params) => (
              <TextField {...params} label="Search..." margin="normal" />
            )}
          />
        </div>
      </Popper>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openCarMod}
        className={classes.modal}
        onClose={handleCloseCartMod}
      >
        <div className={classes.paperMod}>
          <NewProduct saveTo="trans" type="edit" data={{ selected }} />
        </div>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleCloseMod}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paperMod}>
            <SelectedListModel type={type} selectedRows={selectedRows} />
            <div style={{ padding: 10 }}>
              <Button
                onClick={handleCloseMod}
                variant="contained"
                color="secondary"
              >
                Close
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const initialState = {
  mouseX: null,
  mouseY: null,
};

const ListTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [state, setState] = React.useState({
    rows: [],
  });
  const [LoadOnceOff, setLoadOnceOff] = React.useState(true);
  const [OpenProductList, setOpenProductList] = React.useState(false);
  const [menustate, setMenuState] = React.useState(initialState);
  const [multi, SetMulti] = React.useState([]);
  const [isMulti, setisMulti] = React.useState(false);

  const moment = require("moment");

  const Currency = require("react-currency-formatter");

  React.useEffect(() => {
    if (props.Model.toClose === "edit_product") {
      props.dispatchEvent({ type: "HANDELCLEAR" });
      CloseOpenNewProduct();
    } else if (props.LoadTabel.load) {
      LoadProducts();
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    }

    if (props.Model.toClose === "transModel") {
      LoadProducts();
      props.dispatchEvent({ type: "HANDELCLEAR" });
    }

    if (LoadOnceOff) {
      setLoadOnceOff(false);
      LoadProducts();
    }
    // console.log(props);
  }, [props]);

  const LoadProducts = () => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "warehouseList" },
      (receiveCallback) => {
        // console.log(receiveCallback.data[0]);
        if (receiveCallback.data.length !== 0) {
          setState({ ...state, rows: receiveCallback.data[0] });
          props.dispatchEvent({
            type: "LOADWAREHOUSELIST",
            list: receiveCallback.data[0],
          });
        }
        if (receiveCallback.data.length > 50) setRowsPerPage(100);
      }
    );
  };

  const handleClickMenu = (event, data) => {
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
    handleClose();
  };

  const HandelOpenProductList = () => {
    setOpenProductList(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.WareHouseList.list.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const expiryDate = (date_string) => {
    var expiration = moment(date_string).format("YYYY-MM-DD");
    var current_date = moment().format("YYYY-MM-DD");
    var days = moment(expiration).diff(current_date, "days");
    return days;
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.WareHouseList.list.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selectedRows={selected}
          selected={selectedItems}
          dispatcher={props.dispatchEvent}
          Model={props.Model}
          list={props.WareHouseList.list}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.WareHouseList.list.length}
            />
            <TableBody>
              {stableSort(
                props.WareHouseList.list,
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.productKey);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => {
                        handleClick(event, row.productKey);
                        setSelectedItems(row);
                      }}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.productKey}
                      selected={isItemSelected}
                    >
                      <TableCell key={labelId} padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      {headCells.map((column, Innerindex) => {
                        const value = row[column.id];
                        const labelId = `enhanced-table-checkbox-${Innerindex}`;

                        if (column.id === "isTaxEnabled") {
                          if (row.isTaxEnabled)
                            return (
                              <TableCell key={labelId}>
                                <Typography>Is Taxable</Typography>
                              </TableCell>
                            );
                          else
                            return (
                              <TableCell key={labelId}>
                                <Typography>Not Taxable</Typography>
                              </TableCell>
                            );
                        } else if (column.id === "DaysRem") {
                          if (row.expiryDate === "not set")
                            return (
                              <TableCell key={labelId}>
                                <Typography
                                  style={{
                                    backgroundColor:
                                      props.Theme.theme === "light"
                                        ? "#F4B395"
                                        : "#731512",
                                  }}
                                >
                                  not set
                                </Typography>
                              </TableCell>
                            );
                          else if (expiryDate(row.expiryDate) > 30)
                            return (
                              <TableCell key={labelId}>
                                <Typography
                                  style={{
                                    backgroundColor:
                                      props.Theme.theme === "light"
                                        ? "#ADC2A3"
                                        : "#586D4E",
                                  }}
                                >
                                  {expiryDate(row.expiryDate)} Days
                                </Typography>
                              </TableCell>
                            );
                          else if (expiryDate(row.expiryDate) > 0)
                            return (
                              <TableCell key={labelId}>
                                <Typography
                                  style={{
                                    backgroundColor:
                                      props.Theme.theme === "light"
                                        ? "#F4B395"
                                        : "#731512",
                                  }}
                                >
                                  {expiryDate(row.expiryDate)} Days
                                </Typography>
                              </TableCell>
                            );
                          else
                            return (
                              <TableCell key={labelId}>
                                <Typography
                                  style={{
                                    backgroundColor:
                                      props.Theme.theme === "light"
                                        ? "#F4B395"
                                        : "#731512",
                                  }}
                                >
                                  Expired
                                </Typography>
                              </TableCell>
                            );
                        } else {
                          if (column.id === "amountInstore")
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Typography>{row.amountInstore}</Typography>
                              </TableCell>
                            );
                          else
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
                        {row.isMulity ? (
                          <img
                            style={{ width: 25, height: 25 }}
                            src={
                              props.Theme.theme === "light"
                                ? "./assets/icons/icons8_check_all_240px_1.png"
                                : "./assets/icons/icons8_check_all_240px.png"
                            }
                            alt="multi Price"
                          />
                        ) : (
                          <img
                            style={{ width: 20, height: 20 }}
                            src={
                              props.Theme.theme === "light"
                                ? "./assets/icons/icons8_unchecked_checkbox_100px_2.png"
                                : "./assets/icons/icons8_unchecked_checkbox_100px_3.png"
                            }
                            alt="multi Price"
                          />
                        )}
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
          count={props.WareHouseList.list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
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
    User: state.User,
    WareHouseList: state.WareHouseListReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTable);
