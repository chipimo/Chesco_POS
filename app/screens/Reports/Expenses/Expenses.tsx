import React = require("react");
import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
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
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import appDb from "../../../redux/dataBase";
import { toast } from "react-toastify";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const { ipcRenderer } = require("electron");

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

const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>
const DateNumInput = `${year}${month}${date}`; // combining to format for defaultValue or value attribute of material <TextField>

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
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "Action",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: true,
    label: "Description",
  },
  { id: "cost", numeric: true, disablePadding: false, label: "Cost" },
  { id: "user", numeric: true, disablePadding: false, label: "User" },
  { id: "time", numeric: true, disablePadding: false, label: "Time" },
  { id: "date", numeric: true, disablePadding: false, label: "Date" },
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
            // disabled={props.User.userLogged.prevarges === "2" ? true : false}
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
    <Toolbar className={classes.root}>
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
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Expenses = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [data, setData] = React.useState({
    des: "",
    amount: 0,
    amountEdit: 0,
    desEdit: "",
    id: "",
  });
  const [DefaultDate, setDefaultDate] = React.useState({
    startDate: "",
    endDate: "",
  });

  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleOpen = () => {
    props.User.userLogged.prevarges === "1"
      ? setOpen(true)
      : setOpenError(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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

  const handleOnChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
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

  const handleSubmit = () => {
    const sendData = {
      des: data.des,
      amount: data.amount,
      _type: "expenses",
      user: props.User.userLogged.userName,
      branch:
        props.User.userLogged.branche === null
          ? "all"
          : props.User.userLogged.branche,
      dateRange: parseInt(DateNumInput),
    };

    // console.log(sendData);
    // console.log(props);

    appDb.HandelReports(sendData, (callback) => {
      setData({ ...data, des: "", amount: 0 });

      handleGetSaleData({
        startDate: parseInt(DateNumInput),
        endDate: parseInt(DateNumInput),
      });

      toast(`Add new expense`, {
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
  };

  const handleSubmitEdit = () => {
    const sendData = {
      des: data.desEdit,
      amount: data.amountEdit,
      _type: "edit_expenses",
      id: data.id,
    };
    appDb.HandelReports(sendData, (callback) => {
      setData({ ...data, desEdit: "", amountEdit: 0 });

      handleGetSaleData({
        startDate: parseInt(DateNumInput),
        endDate: parseInt(DateNumInput),
      });

      toast(`Successfully edited`, {
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
  };

  const handleSubmitDelete = (id) => {
    const sendData = {
      id: id,
      _type: "delete_expenses",
    };

    appDb.HandelReports(sendData, (callback) => {
      handleGetSaleData({
        startDate: parseInt(DateNumInput),
        endDate: parseInt(DateNumInput),
      });

      toast(`Successfully Deleted`, {
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
  };

  React.useEffect(() => {
    // console.log(props.User.userLogged.prevarges);
    handleGetSaleData({
      startDate: parseInt(DateNumInput),
      endDate: parseInt(DateNumInput),
    });
    
  }, []);

  const handleGetSaleData = (prop) => {
    appDb.HandelReports(
      {
        _type: "get_expenses",
        startDate: prop.startDate,
        endDate: prop.endDate,
      },
      (callback) => {
        setRows(callback.data);
      }
    );
  };

  const onOpenChange = (dateValue, type) => {
    const dateSplit = dateValue.target.value.split("-");
    const DateValue = `${dateSplit[0]}${dateSplit[1]}${dateSplit[2]}`;

    setDefaultDate({ ...DefaultDate, [type]: DateValue });
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div style={{ padding: 15, width: "80vw" }}>
      <div>
        <Typography variant="h6">Expenses</Typography>
      </div>
      <div style={{ marginTop: 15 }}>
        <Divider />
      </div>

      {props.type === "reports" ? (
        <div style={{ display: "flex" }}>
          <div>
            <TextField
              id="date"
              label="From Date"
              type="date"
              defaultValue={materialDateInput}
              onChange={(event) => onOpenChange(event, "startDate")}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ marginLeft: 30 }}>
            <TextField
              id="date"
              label="Date To"
              type="date"
              defaultValue={materialDateInput}
              onChange={(event) => onOpenChange(event, "endDate")}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button
            variant="outlined"
            style={{ marginLeft: 15, marginTop: 10 }}
            onClick={() => {
              handleGetSaleData({
                startDate: parseInt(DefaultDate.startDate),
                endDate: parseInt(DefaultDate.endDate),
              });
            }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: 15, marginTop: 10 }}
            onClick={() => {
              ipcRenderer.send("save_csv", {
                type: "Expenses",
                header: [
                  {
                    id: "description",
                    title: "Description",
                  },
                  {
                    id: "cost",
                    title: "Cost",
                  },
                  {
                    id: "user",
                    title: "User",
                  },
                  {
                    id: "time",
                    title: "Time",
                  },
                  {
                    id: "date",
                    title: "Date",
                  },
                ],
                data: rows,
              });
            }}
          >
            Export to csv
          </Button>
        </div>
      ) : null}

      <div
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Paper style={{ width: "65%" }}>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar numSelected={selected.length} />
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
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.idKey);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.idKey}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <IconButton
                                disabled={
                                  props.type === "reports"
                                    ? props.User.userLogged.prevarges === "2"
                                      ? true
                                      : false
                                    : true
                                }
                                onClick={() => {
                                  handleSubmitDelete(row.idKey);
                                }}
                                aria-label="delete"
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>

                              {/* <Checkbox
                                onClick={(event) => handleClick(event, row.idKey)}
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              /> */}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                disabled={
                                  props.type === "reports"
                                    ? props.User.userLogged.prevarges === "2"
                                      ? true
                                      : false
                                    : true
                                }
                                onClick={() => {
                                  setData({
                                    ...data,
                                    desEdit: row.description,
                                    amountEdit: row.cost,
                                    id: row.idKey,
                                  });
                                  handleOpen();
                                }}
                                aria-label="delete"
                              >
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.description}
                            </TableCell>
                            <TableCell align="right">{row.cost}</TableCell>
                            <TableCell align="right">{row.user}</TableCell>
                            <TableCell align="right">{row.time}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{ height: (dense ? 33 : 53) * emptyRows }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
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
            {/* {props.User.userLogged.prevarges === "1" ? (
              <Button
                onClick={handleSubmitDelete}
                variant="contained"
                color="primary"
                style={{}}
              >
                Delete Selected items
              </Button>
            ) : null} */}
          </div>
        </Paper>
        <Paper style={{ width: "30%" }}>
          <div style={{ padding: 15 }}>
            <div>
              <Typography variant="h6">Add New Expense</Typography>
            </div>
            <div style={{ marginTop: 15 }}>
              <Divider />
            </div>
            <div style={{ marginTop: 10 }}>
              <TextField
                id="filled-basic"
                rowsMax={4}
                name="des"
                onChange={handleOnChange}
                value={data.des}
                multiline
                label="Expense Description"
                variant="filled"
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <TextField
                id="filled-basic"
                name="amount"
                onChange={handleOnChange}
                value={data.amount}
                type="number"
                label="Expense Amount"
                variant="filled"
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              {/* <Button
                onClick={() => {
                  handleClose();
                  setData({ ...data, desEdit: "", amountEdit: 0 });
                }}
                variant="contained"
                color="secondary"
              >
                Close
              </Button> */}
            </div>
          </div>
        </Paper>
      </div>

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
          <div className={classes.paper2}>
            <div style={{ padding: 15 }}>
              <div>
                <Typography variant="h6">Edit Expense</Typography>
              </div>
              <div style={{ marginTop: 15 }}>
                <Divider />
              </div>
              <div style={{ marginTop: 10 }}>
                <TextField
                  id="filled-basic"
                  rowsMax={4}
                  name="desEdit"
                  onChange={handleOnChange}
                  value={data.desEdit}
                  multiline
                  label="Expense Description"
                  variant="filled"
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <TextField
                  id="filled-basic"
                  name="amountEdit"
                  onChange={handleOnChange}
                  value={data.amountEdit}
                  type="number"
                  label="Expense Amount"
                  variant="filled"
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <Button
                  onClick={handleSubmitEdit}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setData({ ...data, des: "", amount: 0 });
                  }}
                  variant="contained"
                  color="secondary"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openError}
        onClose={() => setOpenError(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper2}>
            <Typography variant="h6">Access denied</Typography>
            <div>You can't perform this action ! 😞</div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    User: state.User,
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
