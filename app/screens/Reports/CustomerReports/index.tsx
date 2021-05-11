const React = require("react");
import { connect } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Customers from "../../Customers";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import appDb from "../../../redux/dataBase";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Currency = require("react-currency-formatter");

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

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
  { id: "ItemName", label: "Product Name", minWidth: 170 },
  { id: "qnt", label: "Qty", minWidth: 100 },
  {
    id: "initalPrice",
    label: "Price",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

export const index = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState({
    row: [],
  });
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [state, setState] = React.useState({
    columns: [],
    data: [],
  });
  const [customer, setCustomer] = React.useState("");
  const [DefaultDate, setDefaultDate] = React.useState({
    startDate: "",
    endDate: "",
  });
  const [TotalMain, setTotalMain] = React.useState(0);

  const onOpenChange = (dateValue, type) => {
    const dateSplit = dateValue.target.value.split("-");
    const DateValue = `${dateSplit[0]}${dateSplit[1]}${dateSplit[2]}`;

    setDefaultDate({ ...DefaultDate, [type]: DateValue });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const search = (event, item) => {};

  React.useEffect(() => {
    appDb.HandleCustomers({ _type: "get" }, (reciveCallback) => {
      setState({
        data: reciveCallback.customers,
      });
      // console.log(reciveCallback.customers);
    });
  }, []);

  const handleListItemClick = (event, index, list) => {
    // console.log(list.id);

    setSelectedIndex(index);
    setCustomer(list.id);

    handleGetSaleData({
      startDate: parseInt(DateNumInput),
      endDate: parseInt(DateNumInput),
      customer: list.id,
    });
  };

  const handleGetSaleData = (prop) => {
    appDb.HandelReports(
      {
        _type: "get_sales_byCustmore",
        startDate: prop.startDate,
        endDate: prop.endDate,
        customer: prop.customer,
      },
      (callback) => {
        var tempArrData = [];
        var total = 0;

        callback.data.map((list) => {
          total = total + list.GrandTotal;

          list.TicketList.list.map((items) => {
            items.user = list.userName;
            items.time = list.time;
            items.branch = list.branche;

            tempArrData.push(items);
          });
        });

        setTotalMain(total);
        setTableData({ ...tableData, row: tempArrData });
      }
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div style={{ width: "85vw" }}>
      <AppBar position="static" color="default" style={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Customer Records" {...a11yProps(0)} />
          <Tab label="Customer Transactions" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <div value={value} index={0} dir={theme.direction}>
          <Customers />
        </div>

        <div value={value} index={1} dir={theme.direction}>
          <div style={{ width: "100%", display: "flex", padding: 15 }}>
            <div style={{ width: "30%" }}>
              <div>
                <Typography variant="h6">Select customer</Typography>
              </div>
              <div>
                <div style={{ width: 200 }}>
                  <Autocomplete
                    options={state.data}
                    getOptionLabel={(option) => option.name}
                    id="debug"
                    onChange={search}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Customers..."
                        margin="normal"
                      />
                    )}
                  />
                </div>
              </div>
              <Divider />
              <List
                style={{ maxHeight: "50vh", overflow: "auto" }}
                component="nav"
                aria-label="main mailbox folders"
              >
                {state.data.map((list, index) => (
                  <ListItem
                    key={index + list.id}
                    button
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index, list)}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={list.name} />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </div>

            <div style={{ width: "65%", padding: 10 }}>
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
                      handleGetSaleData({
                        customer: customer,
                        startDate: parseInt(DefaultDate.startDate),
                        endDate: parseInt(DefaultDate.endDate),
                      });
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <Divider />
              <Paper style={{ marginTop: 6 }}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column, index) => (
                          <TableCell
                            key={column.id + index}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.row
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              {columns.map((column, index) => {
                                const value = row[column.id];
                                if (column.id === "total")
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                    >
                                      <Currency
                                        locale="en"
                                        quantity={row.qnt * row.initalPrice}
                                        symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
                                      />
                                    </TableCell>
                                  );

                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format &&
                                    typeof value === "number" ? (
                                      <Currency
                                        locale="en"
                                        quantity={value}
                                        symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
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
                    paddingRight: 15,
                  }}
                >
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">
                    <Currency locale="en" quantity={TotalMain} symbol={props.UseCurrency.currencyInUse.currency.symbol_native} />
                  </Typography>
                </Paper>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={tableData.row.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            </div>
          </div>
        </div>
      </SwipeableViews>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    UseCurrency: state.UseCurrencyReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
