import React = require("react");
import { Button, Divider, Paper, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { Header, Image, Table } from "semantic-ui-react";
import appDb from "../../../redux/dataBase";

const Currency = require("react-currency-formatter");

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

const index = (props) => {
  const [DefaultDate, setDefaultDate] = React.useState({
    startDate: "",
    endDate: "",
  });
  const [TotalSales, setTotalSales] = React.useState(0);
  const [TotalExpenses, setTotalExpenses] = React.useState(0);
  const [TotalBuyPrice, setTotalBuyPrice] = React.useState(0);
  const [TotalNet, setTotalNet] = React.useState(0);

  React.useEffect(() => {
    handleGetSaleData({
      startDate: parseInt(DateNumInput),
      endDate: parseInt(DateNumInput),
    });
  }, [props]);

  const handleGetSaleData = (prop) => {
    var tempTotal = 0;
    var tempExpenses = 0;
    var tempBuyPrices = 0;

    appDb.HandelReports(
      {
        _type: "get_sales_tickets",
        startDate: prop.startDate,
        endDate: prop.endDate,
      },
      (callback) => {
        // console.log(callback); 
        callback.data.map((list) => {
          // console.log(list)
          tempTotal =
            list.GrandTotal - list.Balance + tempTotal;

          list.TicketList.list.map((ticket) => {
            tempBuyPrices =
              ticket.buyingPrice * ticket.qnt + tempBuyPrices;
          });
        });

        // console.log(TotalSales - TotalExpenses - TotalBuyPrice);

        setTotalSales(tempTotal);
        setTotalBuyPrice(tempBuyPrices);
        setTotalNet(TotalSales - TotalExpenses - TotalBuyPrice);
      }
    );

    appDb.HandelReports(
      {
        _type: "get_expenses",
        startDate: prop.startDate,
        endDate: prop.endDate,
      },
      (callback) => {
        callback.data.map((expenses) => {
          tempExpenses = expenses.cost + tempExpenses;
        });

        setTotalExpenses(tempExpenses);
      }
    );

    // tempNet = tempTotal - tempExpenses;
    // setTotalNet(tempNet);
  };

  const onOpenChange = (dateValue, type) => {
    const dateSplit = dateValue.target.value.split("-");
    const DateValue = `${dateSplit[0]}${dateSplit[1]}${dateSplit[2]}`;

    setDefaultDate({ ...DefaultDate, [type]: DateValue });
  };

  return (
    <div style={{ width: "100%" }}>
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
                startDate: parseInt(DefaultDate.startDate),
                endDate: parseInt(DefaultDate.endDate),
              });
            }}
          >
            Update Report
          </Button>
        </div>
      </div>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <div style={{ width: "50vw" }}>
        <Table
          basic="very"
          celled
          inverted={props.Theme.theme === "light" ? false : true}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Totals</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Typography variant="h6">Total Expenses</Typography>
              </Table.Cell>
              <Table.Cell>
                <Currency locale="en" quantity={TotalExpenses} symbol="K" />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Typography variant="h6">Total Buying Prices</Typography>
              </Table.Cell>
              <Table.Cell>
                <Currency locale="en" quantity={TotalBuyPrice} symbol="K" />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Typography variant="h6">Total Sales</Typography>
              </Table.Cell>
              <Table.Cell>
                <Currency locale="en" quantity={TotalSales} symbol="K" />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Typography variant="h6">Net Sales</Typography>
              </Table.Cell>
              <Table.Cell>
                <Typography
                  variant="h6"
                  style={{
                    padding: 10,
                    backgroundColor:
                      TotalSales - TotalExpenses - TotalBuyPrice < 1
                        ? "#FF5555"
                        : "#2a7f2a",
                    color: "#FFFFFF",
                  }}
                >
                  <Currency
                    locale="en"
                    quantity={TotalSales - TotalExpenses - TotalBuyPrice}
                    symbol="K"
                  />
                </Typography>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
       
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
