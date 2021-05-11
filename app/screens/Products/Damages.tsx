import React = require("react");
import { connect } from "react-redux";
import {
  AppBar,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import appDb from "../../redux/dataBase";
import DamagesRow from "./DamagesRow";

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

const materialDateInput = `${year}-${month}-${date}`;
const DateNumInput = `${year}${month}${date}`;

const columns = [
  { id: "ItemName", label: "Product Name", minWidth: 170 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "number",
    label: "Number Damaged",
    minWidth: 170,
    align: "right",
  },
  {
    id: "sellingPrice",
    label: "Selling Price",
    minWidth: 170,
    align: "right",
  },
  {
    id: "buyingPrice",
    label: "Buying Price",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "70vh",
  },
});

const Damages = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoaded, setIsLoad] = React.useState(false);
  const [rows, setRows] = React.useState({ data: [] });
  const [DefaultDate, setDefaultDate] = React.useState({
    startDate: "",
    endDate: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    if (!isLoaded) {
      LoadData({ startDate: DateNumInput, endDate: DateNumInput });
      setIsLoad(true);
    }
    if (props.ActionsReducer.state === "loadDamagesTable") {
      LoadData({ startDate: DateNumInput, endDate: DateNumInput });
      props.dispatchEvent({
        type: "CLEARSTATE",
        state: "",
      });
    }
  }, [props]);

  const LoadData = (prop) => {
    appDb.HandelDamages(
      {
        type: "get",
        startDate: parseInt(prop.startDate),
        endDate: parseInt(prop.endDate),
      },
      (callback) => {
        setRows({ ...rows, data: callback });
      }
    );
  };

  const onOpenChange = (dateValue, type) => {
    const dateSplit = dateValue.target.value.split("-");
    const DateValue = `${dateSplit[0]}${dateSplit[1]}${dateSplit[2]}`;

    setDefaultDate({ ...DefaultDate, [type]: DateValue });
  };

  const handleGetSaleData = () => {
    LoadData({
      startDate: DefaultDate.startDate,
      endDate: DefaultDate.endDate,
    });
  };

  return (
    <div style={{ width: "82vw", margin: "auto" }}>
      <AppBar position="static" color="inherit">
        <Toolbar variant="dense">
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Damages
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div style={{ width: "60%" }}>
          <div
            style={{
              height: 50,
              display: "flex",
            }}
          >
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
            <div>
              <Button
                variant="outlined"
                style={{ marginLeft: 15, marginTop: 10 }}
                onClick={() => {
                  handleGetSaleData();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
          <Paper className={classes.root}>
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
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
        <div style={{ width: "40%", padding: 5, overflow:'auto' }}>
          <div>
            <Typography variant="h6">Add Damaged Product</Typography>
          </div>
          <Paper>
            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <DamagesRow />
                {/* <table style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ width: "100%" }}>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.data.map((list) => (
                      <tr>
                        <td>{list.ItemName}</td>
                        <td>{list.sallingprice}</td>
                        <td>{list.amountInstore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <Button variant="contained" style={{ marginTop: 15 }}>
                    add to damages
                  </Button>
                </div> */}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ActionsReducer: state.ActionsReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Damages);
