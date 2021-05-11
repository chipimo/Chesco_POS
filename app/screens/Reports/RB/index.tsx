import React = require("react");
import { connect } from "react-redux";
import {
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles"; // web.cjs is required for IE 11 support
import appDb from "../../../redux/dataBase";
import TableCell from "@material-ui/core/TableCell";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import SaveIcon from "@material-ui/icons/PictureAsPdf";

import Tickets from "../../Tickets";
import SalesProduct from "../Sales/SalesProduct";

const Currency = require("react-currency-formatter");
const moment = require("moment");
const { ipcRenderer } = require("electron");

const _ = require("lodash");
var check = moment(new Date());
var monthString = check.format("MMMM"); // => ('January','February.....)

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

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const initialState = {
  mouseX: null,
  mouseY: null,
};

const index = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState({ value: moment() });

  const [SalesList, setSalesList] = React.useState({ data: [] });
  const [Dep, setDep] = React.useState("Deparment");
  const [Header, setHeader] = React.useState({
    date: "",
    day: "",
    totalInvoices: "",
  });

  const [Totals, setTotals] = React.useState({
    GrandTotal: 0,
    Discount: 0,
    Balance: 0,
    Taxtotal: 0,
  });

  const [Departments, SetDepartments] = React.useState([]);
  const [Months, SetMonths] = React.useState([]);
  const [defaultMonth, setdefaultMonth] = React.useState("");
  const [showFiltered, setShowFiltered] = React.useState(false);
  const [SalesProductsList, setSalesProductsList] = React.useState(false);

  const [reportType, setReportType] = React.useState(2);

  const [DefaultDate, setDefaultDate] = React.useState({
    startDate: 0,
    endDate: 0,
  });
  const [DefaultTime, setDefaultTime] = React.useState({
    startTime: 0,
    endTime: 0,
  });

  const [dateString, setDateString] = React.useState({
    startDate: '',
    endDate: ''
  })

  React.useEffect(() => {
    setDep(props.Dep.dep);
    // console.log(props.Dep);
    setdefaultMonth(monthString);
    setDateString({ ...dateString, startDate: moment().format("LL"), endDate: moment().format("LL") })

    setDefaultDate({
      ...DefaultDate,
      startDate: parseInt(DateNumInput),
      endDate: parseInt(DateNumInput),
    });

    setDefaultTime({
      ...DefaultTime,
      startTime: sliptTimeRange().startTimeSet,
      endTime: sliptTimeRange().endTimeSet,
    });

    handleGetSaleData({
      date: monthString,
      Datetype: "Month",
      dep: props.Dep.dep,
      startDate: parseInt(DateNumInput),
      endDate: parseInt(DateNumInput),
      time: sliptTimeRange(),
    });
  }, []);

  const handleGetSaleData = (prop) => {
    // console.log(prop);

    appDb.HandelReports(
      {
        _type: "get_sales_tickets_byDateRange",
        startTime: DefaultTime.startTime,
        endTime: DefaultTime.endTime,
        startDate: parseInt(prop.startDate),
        endDate: parseInt(prop.endDate),
      },
      (callback) => {
        appDb.HandelReports(
          {
            _type: "get_sales",
            data: prop.dep,
            dateType: prop.Datetype,
            date: prop.date,
            startDate: prop.startDate,
            endDate: prop.endDate,
            startTime: prop.time.startTimeSet,
            endTime: prop.time.endTimeSet,
          },
          (totalsCallback) => {
            // console.log(callback);

            setHeader({
              ...Header,
              date: prop.date,
              totalInvoices: callback.data.length,
            });

            const tempData = [];
            let cash_sale = 0;
            let card_sale = 0;
            let tax = 0;
            let tatolsales = 0;
            let Date = "";
            let SrNo = "";

            callback.data.map((data) => {
              if (data.PaymentType === "Cash")
                cash_sale = data.GrandTotal + cash_sale;
              else card_sale = data.GrandTotal + card_sale;
              tax = parseInt(data.totalTax) + tax;
              Date = data.Date;
            });

            totalsCallback.data.map((srno) => {
              SrNo = srno.SrNo;
            });

            tempData.push({
              CashSales: cash_sale,
              CardSales: card_sale,
              GrandTotal: cash_sale + card_sale,
              totalTaxFinal: tax,
              Date,
              SrNo,
              Department: props.User.userLogged.branche,
            });
            setSalesList({ ...SalesList, data: tempData });
          }
        );
      }
    );
  };

  const savePdf = () => {
    ipcRenderer.send("save_pdf", { type: "trx", SalesList, dep: Dep });
  };

  const onOpenChange = (dateValue, type) => {

    if (type === 'startDate') {
      var d = moment(dateValue.target.value).format("LL")
      setDateString({ ...dateString, startDate: d })
    } else {
      var endD = moment(dateValue.target.value).format("LL")
      setDateString({ ...dateString, endDate: endD })
    }

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

  return (
    <div style={{ width: "84vw", display: "flex" }}>
      <div
        style={{
          width: "100%",
          height: "84vh",
          // backgroundColor: "#424242",
          padding: 7,
          marginTop: 4,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: 50,
            position: "fixed",
            zIndex: 400,
            // backgroundColor: "#3b3b3b",
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
          </div>
          <div>
            <Button
              variant="outlined"
              style={{ marginLeft: 15, marginTop: 10 }}
              onClick={() => {
                handleGetSaleData({
                  startDate: DefaultDate.startDate,
                  endDate: DefaultDate.endDate,
                  time: sliptTimeRange(),
                });
              }}
            >
              Submit
            </Button>
          </div>
        </div>
        <Divider />

        <div style={{ marginTop: 60 }}>
          <TableContainer component={Paper}>
            <Typography style={{ marginTop: 5, marginBottom: 5 }}>
              {SalesProductsList
                ? "Filtered Sales Products List"
                : showFiltered
                  ? "Filtered Invoice List"
                  : "Sales pay day"}
            </Typography>

            <Button
              style={{ marginLeft: 25 }}
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={() => savePdf()}
            >
              Save As Pdf
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              variant="outlined"
              disabled={SalesProductsList ? true : showFiltered ? true : false}
              startIcon={<SaveIcon />}
              onClick={() => {
                props.dispatchEvent({ type: "SalesDay", data: SalesList.data });
              }}
            >
              Export to excel file
            </Button>
            <Button
              onClick={() => {
                setSalesProductsList(false);
                if (showFiltered) setShowFiltered(false);
                else setShowFiltered(true);
              }}
              style={{ marginLeft: 10 }}
              variant="outlined"
            >
              {showFiltered
                ? "Show Sales Per day"
                : "Show Filtered Sales Invoice List"}
            </Button>
            <Button
              disabled={props.User.userLogged.prevarges === "1" ? false : true}
              onClick={() => {
                if (SalesProductsList) setSalesProductsList(false);
                else setSalesProductsList(true);
              }}
              style={{ marginLeft: 10 }}
              variant="outlined"
            >
              Show Filtered Sales Products List
            </Button>

            {SalesProductsList ? (
              <div>
                <SalesProduct
                  startTime={sliptTimeRange().startTimeSet}
                  endTime={sliptTimeRange().endTimeSet}
                  startDate={DefaultDate.startDate}
                  endDate={DefaultDate.endDate}

                />
              </div>
            ) : (
              <div>
                {showFiltered ? (
                  <div>
                    <Tickets
                      ViewType="reports"
                      startTime={sliptTimeRange().startTimeSet}
                      endTime={sliptTimeRange().endTimeSet}
                      startDate={DefaultDate.startDate}
                      endDate={DefaultDate.endDate}
                      dateString={dateString}
                    />
                  </div>
                ) : (
                  <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Invoice No</TableCell>
                        {/* <TableCell align="left">Branch</TableCell> */}
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="right">Cash sales</TableCell>
                        <TableCell align="right">Card sales</TableCell>
                        {/* <TableCell align="right">Credit</TableCell> */}
                        <TableCell align="right">Tax</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {SalesList.data.map((row) => (
                        <StyledTableRow key={row.SrNo}>
                          <Typography style={{ marginLeft: 15 }}>
                            {props.User.userLogged.branche}
                            {row.SrNo}
                          </Typography>
                          {/* <TableCell align="left">
                    </TableCell> */}
                          {/* <TableCell align="left">
                            <Typography>{row.Department}</Typography>
                          </TableCell> */}
                          <TableCell align="left">
                            <Typography>{row.Date}</Typography>
                          </TableCell>

                          <TableCell align="right">
                            <Typography>
                              <Currency
                                locale="en"
                                quantity={row.CashSales}
                                symbol="K"
                              />
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>
                              <Currency
                                locale="en"
                                quantity={row.CardSales}
                                symbol="K"
                              />
                            </Typography>
                          </TableCell>
                          {/* <TableCell align="right">
                            <Typography>
                              <Currency
                                locale="en"
                                quantity={row.Balance}
                                symbol="K"
                              />
                            </Typography>
                          </TableCell> */}
                          <TableCell align="right">
                            <Typography>
                              <Currency
                                locale="en"
                                quantity={row.totalTaxFinal}
                                symbol="K"
                              />
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>
                              <Currency
                                locale="en"
                                quantity={row.GrandTotal}
                                symbol="K"
                              />
                            </Typography>
                          </TableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Dep: state.Dep,
    User: state.User,
    SocketConn: state.SocketConn,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
