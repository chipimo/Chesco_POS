import React = require("react");
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import appDb from "../../redux/dataBase";
import Row from "./Row";
import { Typography, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Calendar from "ciqu-react-calendar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

const { ipcRenderer } = require("electron");
const Currency = require("react-currency-formatter");
const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 8000,
    backgroundColor: "#fff",
    color: "#3b3b3b",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const index = (props) => {
  const [state, setState] = React.useState({
    columns: [],
    data: [],
  });
  const [productsList, setProductsList] = React.useState({
    data: [],
  });
  const [productInfo, setProductInfo] = React.useState({
    date: "",
    cashier: "",
    compInfo: {},
  });
  const [ProductTotalSales, setProductTotalSales] = React.useState(0);
  const [ProductTotalDiscount, setProductTotalDiscount] = React.useState(0);
  const [TotalSales, setTotalSales] = React.useState(0);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState({ value: moment() });
  const [users, setUsers] = React.useState([]);
  const [totalsList, settotalsList] = React.useState(null);
  const [totalCash, settotalCash] = React.useState(0);
  const [GrossTotalSales, setGrossTotalSales] = React.useState(0);
  const [totalCard, settotalCard] = React.useState(0);
  const [totalOthers, settotalOthers] = React.useState(0);

  const onPrintFile = () => {
    // console.log(totalsList);

    if (state.data.length !== 0)
      ipcRenderer.send("do_print_saleReports", {
        data: totalsList,
        productsList,
        TotalSales,
        currency: props.UseCurrency.currencyInUse.currency.symbol_native,
        productInfo,
      });
  };

  const onChange = (value, inputValue) => {
    // console.log(value.format("MM/DD/YYYY"));
    appDb.HandelReports(
      { _type: "get_sales_tickets_byDate", date: value.format("MM/DD/YYYY") },
      (reciveCallback) => {
        // console.log(reciveCallback.data);

        const card = [];
        const cash = [];
        const split = [];
        const others = [];

        let CashGrandTotal = 0;
        let CasDiscount = 0;
        let CashBalance = 0;

        let CardGrandTotal = 0;
        let CardDiscount = 0;
        let CardBalance = 0;

        reciveCallback.data.map((tickts) => {
          if (tickts.PaymentType === "Card") {
            card.push(tickts);
          } else if (tickts.PaymentType === "Cash") {
            cash.push(tickts);
          } else if (tickts.PaymentType === "split") {
            split.push(tickts);
          } else {
            others.push(tickts);
          }
        });

        const data = { card, cash, split, others };
        settotalsList(data);

        card.map((list) => {
          CardGrandTotal = list.GrandTotal + CardGrandTotal;
          CardDiscount = list.Discount + CardDiscount;
          CardBalance = list.Balance + CardBalance;
        });

        split.map((split) => {
          CardGrandTotal = split.Card_slipt + CardGrandTotal;
          CashGrandTotal = split.Cash_slipt + CashGrandTotal;
        });

        cash.map((list) => {
          CashGrandTotal = list.GrandTotal + CashGrandTotal;
          CasDiscount = list.Discount + CasDiscount;
          CashBalance = list.Balance + CashBalance;
        });

        settotalCard(CardGrandTotal);
        settotalCash(CashGrandTotal);

        setProductsList({ ...productsList, data: [] });

        reciveCallback.data.sort(compare)

        setState({
          ...state,
          data: reciveCallback.data,
        });

        var totals = 0;
        var GrossTotals = 0;

        reciveCallback.data.map((items) => {
          totals = items.GrandTotal + totals;
          GrossTotals = items.GrandTotal + GrossTotals + items.Discount;

          items.TicketList.list.map((productlist) => {
            productsList.data.push(productlist);
            setProductsList({ ...productsList, data: productsList.data });
          });
        });

        setTotalSales(totals);
        setGrossTotalSales(GrossTotals);
      }
    );
    setSelectedDate({ ...selectedDate, value: value });
  };

  const onOpenChange = (status) => {
    // console.log("open status: " + status);
  };

  const disabledDate = (currentDate, inputValue) => {
    return false;
  };

  const compare = (a, b) => {
    return b.timeRange - a.timeRange
  }

  React.useEffect(() => {
    appDb.HandleGetUser((callback) => {
      setUsers(callback);
    });

    if (props.ViewType === "reports")
      appDb.HandelReports(
        {
          _type: "get_sales_tickets_byDateRange",
          startTime: props.startTime,
          endTime: props.endTime,
          startDate: parseInt(props.startDate),
          endDate: parseInt(props.endDate),
        },
        (reciveCallback) => {
          // console.log(reciveCallback.data);\

          const card = [];
          const cash = [];
          const split = [];
          const others = [];

          let CashGrandTotal = 0;
          let CasDiscount = 0;
          let CashBalance = 0;

          let CardGrandTotal = 0;
          let CardDiscount = 0;
          let CardBalance = 0;

          reciveCallback.data.map((tickts) => {
            if (tickts.PaymentType === "Card") {
              card.push(tickts);
            } else if (tickts.PaymentType === "Cash") {
              cash.push(tickts);
            } else if (tickts.PaymentType === "split") {
              split.push(tickts);
            } else {
              others.push(tickts);
            }
          });

          const data = { card, cash, split, others };
          settotalsList(data);

          card.map((list) => {
            CardGrandTotal = list.GrandTotal + CardGrandTotal;
            CardDiscount = list.Discount + CardDiscount;
            CardBalance = list.Balance + CardBalance;
          });

          split.map((split) => {
            CardGrandTotal = split.Card_slipt + CardGrandTotal;
            CashGrandTotal = split.Cash_slipt + CashGrandTotal;
          });

          cash.map((list) => {
            CashGrandTotal = list.GrandTotal + CashGrandTotal;
            CasDiscount = list.Discount + CasDiscount;
            CashBalance = list.Balance + CashBalance;
          });

          settotalCard(CardGrandTotal);
          settotalCash(CashGrandTotal);

          var totals = 0;
          var GrossTotals = 0;
          var productTotals = 0;
          var productdiscount = 0;
          // var productListArry = [];
          var tempArry = [];

          reciveCallback.data.sort(compare)

          setState({
            ...state,
            data: reciveCallback.data,
          });

          // console.log(reciveCallback.data);

          reciveCallback.data.map((items) => {
            totals = items.GrandTotal + totals;
            GrossTotals = items.GrandTotal + GrossTotals + items.Discount;
            productdiscount = items.Discount + productdiscount;

            setProductInfo({
              ...productInfo,
              cashier: items.userName,
              date: `${props.dateString.startDate} - ${props.dateString.endDate}`,
              compInfo: props.Dep,
            });

            items.TicketList.list.map((productlist) => {
              productTotals = productlist.initalPrice + productTotals;
              tempArry.push(productlist);
            });
          });

          setProductsList({ ...productsList, data: tempArry });
          setProductTotalSales(productTotals);
          setProductTotalDiscount(productdiscount);
          setTotalSales(totals);
          setGrossTotalSales(GrossTotals);
        }
      );
    else
      appDb.HandelReports(
        {
          _type: "get_sales_tickets_byCasher",
          user: { id: props.User.userLogged.id },
          startDate: parseInt(DateNumInput),
          endDate: parseInt(DateNumInput),
        },
        (reciveCallback) => {
          // console.log(reciveCallback.data);

          const card = [];
          const cash = [];
          const split = [];
          const others = [];

          let CashGrandTotal = 0;
          let CasDiscount = 0;
          let CashBalance = 0;

          let CardGrandTotal = 0;
          let CardDiscount = 0;
          let CardBalance = 0;

          reciveCallback.data.map((tickts) => {
            if (tickts.PaymentType === "Card") {
              card.push(tickts);
            } else if (tickts.PaymentType === "Cash") {
              cash.push(tickts);
            } else if (tickts.PaymentType === "split") {
              split.push(tickts);
            } else {
              others.push(tickts);
            }
          });

          const data = { card, cash, split, others };
          settotalsList(data);
          // console.log(data);

          card.map((list) => {
            CardGrandTotal = list.GrandTotal + CardGrandTotal;
            CardDiscount = list.Discount + CardDiscount;
            CardBalance = list.Balance + CardBalance;
          });

          split.map((split) => {
            CardGrandTotal = split.Card_slipt + CardGrandTotal;
            CashGrandTotal = split.Cash_slipt + CashGrandTotal;
          });

          cash.map((list) => {
            CashGrandTotal = list.GrandTotal + CashGrandTotal;
            CasDiscount = list.Discount + CasDiscount;
            CashBalance = list.Balance + CashBalance;
          });

          settotalCard(CardGrandTotal);
          settotalCash(CashGrandTotal);

          var totals = 0;
          var GrossTotals = 0;

          var productTotals = 0;
          var productdiscount = 0;
          // var productListArry = [];
          var tempArry = [];


          reciveCallback.data.sort(compare)
          // console.log(reciveCallback.data);

          setState({
            ...state,
            data: reciveCallback.data,
          });

          reciveCallback.data.map((items) => {
            totals = items.GrandTotal + totals;
            GrossTotals = items.GrandTotal + GrossTotals + items.Discount;
            productdiscount = items.Discount + productdiscount;
            // console.log(items);
            setProductInfo({
              ...productInfo,
              cashier: items.userName,
              date: items.Date,
              compInfo: props.Dep,
            });

            items.TicketList.list.map((productlist) => {
              productTotals = productlist.initalPrice + productTotals;
              tempArry.push(productlist);
            });
          });

          setProductsList({ ...productsList, data: tempArry });
          setProductTotalSales(productTotals);
          setProductTotalDiscount(productdiscount);
          setTotalSales(totals);
          setGrossTotalSales(GrossTotals);
        }
      );
  }, [props]);

  return (
    <div
      style={{
        padding: 6,
        paddingLeft: 27,
        paddingRight: 27,
        height: "86vh",
        overflow: "auto",
      }}
    >
      <div style={{ display: "flex" }}>
        {props.ViewType !== "reports" ? (
          <div style={{ height: 30, width: 220 }}>
            <Calendar
              onChange={onChange}
              value={selectedDate.value}
              allowClear={true}
              disabled={false}
              placeholder={"please input date"}
              format={"MM/DD/YYYY"}
              className={classes.container}
              onOpenChange={onOpenChange}
              disabledDate={disabledDate}
            />
          </div>
        ) : null}

        {props.ViewType === "reports" ? (
          <Autocomplete
            id="combo-box-demo"
            options={users}
            getOptionLabel={(option) => option.userName}
            style={{ width: 300 }}
            onChange={(event, newData) => {
              appDb.HandelReports(
                {
                  _type: "get_sales_tickets_byCasher",
                  user: newData,
                  startDate: parseInt(props.startDate),
                  endDate: parseInt(props.endDate),
                },
                (reciveCallback) => {
                  const card = [];
                  const cash = [];
                  const split = [];
                  const others = [];

                  let CashGrandTotal = 0;
                  let CasDiscount = 0;
                  let CashBalance = 0;

                  let CardGrandTotal = 0;
                  let CardDiscount = 0;
                  let CardBalance = 0;

                  reciveCallback.data.map((tickts) => {
                    if (tickts.PaymentType === "Card") {
                      card.push(tickts);
                    } else if (tickts.PaymentType === "Cash") {
                      cash.push(tickts);
                    } else if (tickts.PaymentType === "split") {
                      split.push(tickts);
                    } else {
                      others.push(tickts);
                    }
                  });

                  const data = { card, cash, split, others };
                  settotalsList(data);
                  // console.log(data);

                  card.map((list) => {
                    CardGrandTotal = list.GrandTotal + CardGrandTotal;
                    CardDiscount = list.Discount + CardDiscount;
                    CardBalance = list.Balance + CardBalance;
                  });

                  split.map((split) => {
                    CardGrandTotal = split.Card_slipt + CardGrandTotal;
                    CashGrandTotal = split.Cash_slipt + CashGrandTotal;
                  });

                  cash.map((list) => {
                    CashGrandTotal = list.GrandTotal + CashGrandTotal;
                    CasDiscount = list.Discount + CasDiscount;
                    CashBalance = list.Balance + CashBalance;
                  });

                  settotalCard(CardGrandTotal);
                  settotalCash(CashGrandTotal);

                  var totals = 0;
                  var GrossTotals = 0;
                  var productTotals = 0;
                  var productdiscount = 0;
                  // var productListArry = [];
                  var tempArry = [];

                  reciveCallback.data.sort(compare)

                  setState({
                    ...state,
                    data: reciveCallback.data,
                  });

                  reciveCallback.data.map((items) => {
                    totals = items.GrandTotal + totals;
                    GrossTotals =
                      items.GrandTotal + GrossTotals + items.Discount;
                    productdiscount = items.Discount + productdiscount;
                    // console.log(items);

                    setProductInfo({
                      ...productInfo,
                      cashier: items.userName,
                      date: items.Date,
                    });

                    items.TicketList.list.map((productlist) => {
                      productTotals = productlist.initalPrice + productTotals;
                      tempArry.push(productlist);
                    });
                  });

                  setProductsList({
                    ...productsList,
                    data: tempArry,
                  });
                  setProductTotalSales(productTotals);
                  setProductTotalDiscount(productdiscount);
                  setTotalSales(totals);
                  setGrossTotalSales(GrossTotals);
                }
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="filter by cashier"
                variant="outlined"
              />
            )}
          />
        ) : null}

        <div style={{ marginLeft: 10 }}>
          <Button onClick={onPrintFile} color="primary" variant="outlined">
            Print Report
          </Button>
        </div>

        <div style={{ marginLeft: 10 }}>
          <Button
            onClick={() => {
              ipcRenderer.send("save_csv", {
                type: "FilteredInvoiceList",
                header: [
                  {
                    id: "Date",
                    title: "Date",
                  },
                  {
                    id: "TotalQt",
                    title: "Quantity Sold",
                  },
                  {
                    id: "Balance",
                    title: "Description",
                  },
                  {
                    id: "PaymentType",
                    title: "Payment",
                  },
                  {
                    id: "GrandTotal",
                    title: "Cash sale",
                  },
                  {
                    id: "Discount",
                    title: "Discount",
                  },
                  {
                    id: "Cash_slipt",
                    title: "Cash split",
                  },
                  {
                    id: "Card_slipt",
                    title: "Card split",
                  },
                ],
                data: state.data,
              });
            }}
            color="primary"
            variant="outlined"
          >
            Export to Excel file
          </Button>
        </div>
      </div>
      <TableContainer style={{ maxHeight: "75vh" }} component={Paper}>
        <Table stickyHeader size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Print</Typography>
              </TableCell>
              <TableCell>
                <Typography>Date</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>Time</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>Quantity Sold </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>Description</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>Payment</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Cash sale</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Discount</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Cash split</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Card split</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>More</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((row, index) => (
              <Row key={row.id + index} row={row} />
            ))}
            <TableRow
              style={{
                backgroundColor:
                  props.Theme.theme === "light" ? "#ccc" : "#303030",
              }}
            >
              <TableCell align="right">
                <Divider />
              </TableCell>
              <TableCell align="right">
                <Divider />
              </TableCell>
              <TableCell align="right">
                <Divider />
              </TableCell>
              <TableCell align="right">
                <Divider />
              </TableCell>

              <TableCell align="right"></TableCell>

              <TableCell align="left">
                <Divider />
                <Typography>Grand Total: </Typography>
                <Divider />
              </TableCell>

              <TableCell align="right">
                <Typography variant="h6">
                  <Currency locale="en" quantity={GrossTotalSales} symbol="K" />
                </Typography>
                <Divider />
                <Divider />
              </TableCell>

              <TableCell align="right">
                <Divider />
                {/* <Typography>Total Discount:</Typography> */}
                <Typography variant="h6">
                  <Currency
                    locale="en"
                    quantity={ProductTotalDiscount}
                    symbol="K"
                  />
                </Typography>
                <Divider />
              </TableCell>

              <TableCell align="right">
                <Divider />
                <Divider />
              </TableCell>

              <TableCell align="right">
                <Divider />
                <Typography variant="h6">Total:</Typography>
                <Divider />
              </TableCell>

              <TableCell align="right">
                <Typography style={{ color: "red" }} variant="h5">
                  <Currency locale="en" quantity={TotalSales} symbol="K" />
                </Typography>

                <Divider />
                <Divider />
                <Divider />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}
      >
        <div>
          <Typography variant="h6">
            Total Cash :
            <Currency locale="en" quantity={totalCash} symbol="K" />
          </Typography>
          <Typography variant="h6">
            Total Card :
            <Currency locale="en" quantity={totalCard} symbol="K" />
          </Typography>
          {totalsList !== null ? (
            <div>
              {totalsList.others.map((t) => {
                return (
                  <Typography variant="h6">
                    Total {t.PaymentType} :
                    <Currency
                      locale="en"
                      quantity={t.GrandTotal - t.Discount - t.Balance}
                      symbol="K"
                    />
                  </Typography>
                );
              })}
            </div>
          ) : null}
          <Typography style={{ color: "red" }} variant="h5">
            Total sales :
            <Currency locale="en" quantity={TotalSales} symbol="K" />
          </Typography>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Dep: state.Dep,
    User: state.User,
    UseCurrency: state.UseCurrencyReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
