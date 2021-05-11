const React = require("react");
import { Button, Divider, TextField, Typography } from "@material-ui/core";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import appDb from "../../../redux/dataBase";

const moment = require("moment");
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

const columns = [
  {
    id: "date",
    label: "As At Date",
    minWidth: 170,
    align: "left",
  },
  { id: "name", label: "Product Name", minWidth: 170 },
  { id: "OpenBalance", label: "Open Balance", minWidth: 100 },
  {
    id: "CloseBalance",
    label: "Close Balance",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "QuantitySold",
    label: "Quantity Sold",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const index = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState({ data: [] });
  const [DefaultDate, setDefaultDate] = React.useState({
    startDate: 0,
    endDate: 0,
  });
  const [DefaultTime, setDefaultTime] = React.useState({
    startTime: 0,
    endTime: 0,
  });

  React.useEffect(() => {
    handleGetSaleData({
      startDate: parseInt(DateNumInput),
      endDate: parseInt(DateNumInput),
    });
    setDefaultDate({
      ...DefaultDate,
      startDate: parseInt(DateNumInput),
      endDate: parseInt(DateNumInput),
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onOpenChange = (dateValue, type) => {
    const dateSplit = dateValue.target.value.split("-");
    const DateValue = `${dateSplit[0]}${dateSplit[1]}${dateSplit[2]}`;

    setDefaultDate({ ...DefaultDate, [type]: DateValue });
  };

  const onTimeChange = (TimeValue, type) => {
    setDefaultTime({ ...DefaultTime, [type]: TimeValue.target.value });
  };

  const sliptTimeRange = () => {
    if (DefaultTime.startTime !== 0 && DefaultTime.endTime !== 0) {
      const startTimeSplit = DefaultTime.startTime.split(":");
      const startTimeValue = `${startTimeSplit[0]}${startTimeSplit[1]}`;

      const endTimeSplit = DefaultTime.endTime.split(":");
      const endTimeValue = `${endTimeSplit[0]}${endTimeSplit[1]}`;

      return {
        startTimeSet: parseInt(startTimeValue),
        endTimeSet: parseInt(endTimeValue),
      };
    } else
      return {
        startTimeSet: 0,
        endTimeSet: 0,
      };
  };

  const handleGetSaleData = (prop) => {
    appDb.HandelProducts(
      {
        _type: "getBalancesReports",
        startDate: prop.startDate,
        endDate: prop.endDate,
      },
      (callback) => {
        setRows({ ...rows, data: callback });
      }
    );
  };

  const saveCSV = () => {
    ipcRenderer.send("save_csv", {
      type: "MaterialsList",
      data: rows.data,
      header: [
        {
          id: "Date",
          title: "As At Date",
        },
        { id: "name", title: "Product Name" },
        { id: "OpenBalance", title: "Open Balance" },
        {
          id: "CloseBalance",
          title: "Close Balance",
        },
        {
          id: "QuantitySold",
          title: "Quantity Sold",
        },
      ],
    });
  };

  return (
    <div
      style={{
        padding: 10,
        height: "90vh",
        width: "90vw",
        backgroundColor: props.Theme.theme === "light" ? "#F1F1F1" : "#3b3b3b",
      }}
    >
      <div style={{ padding: 10, display: "flex" }}>
        <Icon
          name="calculator"
          color="teal"
          circular
          inverted={props.Theme.theme === "light" ? false : true}
        />
        <Typography style={{ marginLeft: 10 }} variant="h6">
          Open Close Balances Reports
        </Typography>
      </div>
      <Divider />
      <div style={{ padding: 10 }}>
        <div
          style={{
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
          {/* 
          <div style={{ marginLeft: 10 }}>
            <TextField
              id="time"
              label="Time Date"
              type="time"
              defaultValue={moment().format("HH:mm")}
              onChange={(event) => onTimeChange(event, "startTime")}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ marginLeft: 30 }}>
            <TextField
              id="time"
              label="Time To"
              type="time"
              defaultValue={moment().format("HH:mm")}
              onChange={(event) => onTimeChange(event, "endTime")}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div> */}
          <div>
            <Button
              variant="outlined"
              style={{ marginLeft: 15, marginTop: 10 }}
              onClick={() => {
                handleGetSaleData({
                  startDate: DefaultDate.startDate,
                  endDate: DefaultDate.endDate,
                });
              }}
            >
              Submit
            </Button>
          </div>
          <div style={{ marginLeft: 10 }}>
            <Button
              variant="outlined"
              style={{ marginLeft: 15, marginTop: 10 }}
              onClick={() => {
                saveCSV();
              }}
            >
              Export to excel
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <div style={{ marginTop: 15 }}>
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
                        key={row.idKey}
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
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
