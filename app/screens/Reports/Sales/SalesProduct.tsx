import React = require("react");
import {
  Button,
  Checkbox,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import appDb from "../../../redux/dataBase";

const Currency = require("react-currency-formatter");
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
const DateNumInput = `${year}${month}${date}`;

const SalesProduct = (props) => {
  const [MainCategory, setMainCategory] = React.useState([]);
  const [MainProductList, setMainProductList] = React.useState([]);
  const [selected, setSeleted] = React.useState({
    name: "",
    number: "",
    date: "",
    User: "",
    time: "",
    Branch: "",
    list: { list: [] },
    paid: 0,
    total: 0,
    invoiceNumber: "",
  });
  const [state, setState] = React.useState({
    active: null,
    selectedItem: {},
    amount: 0,
    reason: "",
  });
  const [DefaultTime, setDefaultTime] = React.useState({
    startTime: "",
    endTime: "",
  });
  const [Totals, setTotals] = React.useState({
    ProfitLoss: 0,
    totalValue: 0,
  });

  const [error, setError] = React.useState(false);

  React.useEffect(() => {

    handleGetSaleData({
      date: "monthString",
      Datetype: "Month",
      startDate: props.startDate,
      endDate: props.endDate,
      startTime: props.startTime,
      endTime: props.endTime,
    });
  }, [props]);

  const handleGetSaleData = (prop) => {
    appDb.HandelReports(
      {
        _type: "get_sales_tickets_byDateRange",
        startTime: prop.startTime,
        endTime: prop.endTime,
        startDate: prop.startDate,
        endDate: prop.endDate,
      },
      (callback) => {
        // console.log(callback);
        var Total_Profit = 0;
        var Total_value = 0;

        var tempArrData = [];

        callback.data.map((list) => {
          list.TicketList.list.map((items) => {
            items.user = list.userName;
            items.time = list.time;
            items.branch = list.branche;

            Total_Profit =
              items.initalPrice * items.qnt -
              items.buyingPrice * items.qnt +
              Total_Profit;
            Total_value = items.initalPrice * items.qnt + Total_value;

            tempArrData.push(items);
          });
        });

        setTotals({
          ...Totals,
          ProfitLoss: Total_Profit,
          totalValue: Total_value,
        });
        setMainProductList(tempArrData);
      }
    );
  };

  
  return (
    <div
      style={{
        width: "70vw",
        padding: 20,
        display: "flex",
      }}
    >
      <div>
        <Paper style={{ width: "70vw", margin: "auto" }}>
          <div style={{}}>
            <div style={{ marginLeft: 10 }}>
              <Button
                onClick={() => {
                  ipcRenderer.send("save_csv", {
                    type: "Filtered_Product_List",
                    header: [
                      {
                        id: "ItemName",
                        title: "Product Sold",
                      },
                      {
                        id: "user",
                        title: "Sold by",
                      },
                      {
                        id: "branch",
                        title: "Branch",
                      },
                      {
                        id: "time",
                        title: "Time",
                      },
                      {
                        id: "qnt",
                        title: "Quantity sold",
                      },
                      {
                        id: "buyingPrice",
                        title: "Cost Price",
                      },
                      {
                        id: "initalPrice",
                        title: "Selling Price",
                      },
                    ],
                    data: MainProductList,
                  });
                }}
                color="primary"
                variant="outlined"
              >
                Export to Excel file
              </Button>
            </div>
            <Divider />
            <div
              style={{
                marginLeft: 10,
                marginTop: 10,
                width: "100%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#5A5A5A",
              }}
            >
              <div>
                <Divider />
                <div style={{ height: "100%" }}>
                  <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                      <TableHead
                        style={{
                          backgroundColor:
                            props.Theme.theme === "light" ? "#ccc" : "#000000",
                        }}
                      >
                        <TableRow>
                          <TableCell>Product Sold</TableCell>
                          <TableCell align="right">Sold by</TableCell>
                          <TableCell>Branch</TableCell>
                          <TableCell>Time</TableCell>
                          <TableCell align="right">Quantity sold</TableCell>
                          <TableCell align="right">Cost Price</TableCell>
                          <TableCell align="right">Selling Price</TableCell>
                          <TableCell align="right">
                            Profit Loss Margin
                          </TableCell>
                          <TableCell align="right">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {MainProductList.map((row, index) => (
                          <TableRow
                            style={{
                              backgroundColor:
                                props.Theme.theme === "light"
                                  ? "#EDEDED"
                                  : "#424242",
                            }}
                            key={index}
                          >
                            <TableCell component="th" scope="row">
                              {row.ItemName}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.user}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.branch}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.time}
                            </TableCell>
                            <TableCell align="right">{row.qnt}</TableCell>
                            <TableCell align="right">
                              <Typography>
                                <Currency
                                  locale="en"
                                  quantity={row.buyingPrice}
                                  symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
                                />
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                <Currency
                                  locale="en"
                                  quantity={row.initalPrice}
                                  symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
                                />
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                style={{
                                  backgroundColor:
                                    row.initalPrice * row.qnt -
                                      row.buyingPrice <
                                    -1
                                      ? "#EF8E60"
                                      : "#84A475",
                                  padding: 7,
                                }}
                              >
                                <Currency
                                  locale="en"
                                  quantity={
                                    row.initalPrice * row.qnt -
                                    row.buyingPrice * row.qnt
                                  }
                                  symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
                                />
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                <Currency
                                  locale="en"
                                  quantity={row.initalPrice * row.qnt}
                                  symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
                                />
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Paper
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: 10,
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <Typography variant="h6" style={{}}>
                          Total Profit Margin:{"  "}
                          <Currency
                            locale="en"
                            quantity={Totals.ProfitLoss}
                            symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
                          />
                        </Typography>
                        <Typography variant="h6" style={{ marginLeft: 10 }}>
                          Total:{"  "}
                          <Currency
                            locale="en"
                            quantity={Totals.totalValue}
                            symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
                          />
                        </Typography>
                      </div>
                    </Paper>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    UseCurrency: state.UseCurrencyReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesProduct);
