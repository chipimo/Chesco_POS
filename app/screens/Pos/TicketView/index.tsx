import React = require("react");
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Paper,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Divider,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Message } from "semantic-ui-react";
import Chip from "@material-ui/core/Chip";
import TableChartIcon from "@material-ui/icons/TableChart";
import { toast } from "react-toastify";
import appDb from "../../../redux/dataBase";
import TableLayout from "../TablesViews/TableLayout";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MoreIcon from "@material-ui/icons/More";

const { ipcRenderer } = require("electron");
const Currency = require("react-currency-formatter");
const moment = require("moment");

const uuidv4 = require("uuid/v4");

function CreatId() {
  return uuidv4();
}

const dateNow = new Date(); // Creating a new date object with the current date and time
const year2 = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month2 = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const DateNumInput = `${year2}${month2}${date}`;

var check = moment(new Date());
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February.....)
var year = check.format("YYYY");
var time = check.format("LT");

const useStyles = makeStyles((theme) => ({
  botton1: {
    width: 70,
    height: 50,
    marginRight: 5,
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#9A43A8",
    "&:hover": {
      backgroundColor: "#BB81C5",
    },
  },
  botton2: {
    width: 120,
    height: 50,
    marginRight: 5,
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#E87D0D",
    "&:hover": {
      backgroundColor: "#BB81C5",
    },
  },
  botton3: {
    width: 120,
    height: 50,
    marginRight: 5,
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#0D6FBD",
    "&:hover": {
      backgroundColor: "#BB81C5",
    },
  },
  botton4: {
    width: 300,
    height: 50,
    marginRight: 20,
    color: "#fff",
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#FF5555",
    "&:hover": {
      backgroundColor: "#FF0000",
    },
  },
  botton5: {
    width: 300,
    height: 50,
    marginRight: 20,
    color: "#fff",
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: "#17A05D",
    "&:hover": {
      backgroundColor: "#64BF93",
    },
  },
  list: {
    width: 950,
  },

  bottom2: {
    width: "auto",
    height: 680,
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    color: "#fff",
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  totalsView: {
    backgroundColor: theme.palette.background.paper,
  },
  bottom: {
    width: "auto",
    height: 680,
  },
  margin: {
    margin: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "30%",
  },
}));

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const index = (props) => {
  const [state, setState] = React.useState({
    ticketType: "cash_sale",
    customer: "Walk in customer",
    customerList: [],
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedCustomer, setselectedCustomer] = React.useState(null);
  const classes = useStyles();
  const [GrandTotal, setGrandTotal] = React.useState(0);
  const [RtxTotal, setRtxTotal] = React.useState(props.Cart.workP_total);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [qu, setQu] = React.useState(1);
  const [StockInstore, setStockInstore] = React.useState(0);
  const [totalTax, setTotalTax] = React.useState(0);
  const [totalTaxFinal, setTotalTaxFinal] = React.useState(0);
  const [AdminPass, setAdminPass] = React.useState("");
  const [invEn, setinvEn] = React.useState("");
  const [QtyValueChange, setQtyValueChange] = React.useState("1");

  const [Paid, isPaid] = React.useState(false);
  const [openTableList, setOpenTableList] = React.useState(false);
  const [paymentModeOpen, setPaymentModeOpen] = React.useState(false);

  const [amountPaidErr, setamountPaidErr] = React.useState(false);
  const [sliptOpen, setSliptOpen] = React.useState(false);
  const [openOrdreMdodel, setOpenOrdreMdodel] = React.useState(false);
  const [List, setList] = React.useState({ data: [] });

  const [Drawerstate, setDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    bottom2: false,
    right: false,
  });
  const [values, setValues] = React.useState({
    amount: 0,
    discount: 0,
    totaltoPay: 0,
    rtxtotaltoPay: 0,
  });
  const [sliptPayment, setSliptPayment] = React.useState({
    sliptCard: "",
    sliptCash: "",
  });

  const [whatToSave, setWhatToSave] = React.useState({});

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...Drawerstate, [side]: open });
    // setGrandTotal(props.Cart.total);
    CalculateTotal();
    setValues({ ...values, totaltoPay: props.Cart.total });
  };
  const [open, setOpen] = React.useState(false);
  const [loadCustomerOnce, setloadCustomerOnce] = React.useState(true);
  const [AlertMsg, setAlertMsg] = React.useState("");
  const [ChangeDue, setChangeDue] = React.useState(0);
  const [BalanceDue, setBalanceDue] = React.useState(0);
  const [RtxChangeDue, setRtxChangeDue] = React.useState(0);
  const [RtxBalanceDue, setRtxBalanceDue] = React.useState(0);
  const [payment_mode, setPayment_mode] = React.useState([]);
  const [LoadOnceOff, setLoadOnceOff] = React.useState(true);
  const [editList, setEditList] = React.useState(false);
  const [sliptErrors, setSliptErrors] = React.useState({
    cashError: false,
    cardError: false,
    paymentError: false,
    paymentErrorMsg: "",
  });
  const [MainCategory, setMainCategory] = React.useState([]);
  const [paymentModeSelected, setPaymentModeSelected] = React.useState("");
  const [requestPass, setRequestPass] = React.useState(false);
  const [extraMsg, setExtraMsg] = React.useState("");
  const [openPassDailogRequest, setOpenPassDailogRequest] = React.useState(
    false
  );

  const [selectedExtraIndex, setSelectedExtraIndex] = React.useState(null);
  const [selectedExtraItem, setSelectedExtraItem] = React.useState(null);

  const handleCloseAlert = () => {
    setOpen(false);
  };

  const [nodeCall, setNodeCall] = React.useState({
    items: "",
    productKey: "",
    amountInstore: 0,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExtraClick = (event, item, index) => {
    setSelectedExtraIndex(index);
    setSelectedExtraItem(item);

    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const applyDiscount = () => {
    var amount = GrandTotal - values.discount;
    setGrandTotal(amount);
  };

  const handlePaidChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

    if (prop === "discount") {
      if (event.target.value !== "") {
        var amount = GrandTotal - parseInt(event.target.value);
        var rtxAmount = props.Cart.workP_total - parseInt(event.target.value);

        setValues({
          ...values,
          totaltoPay: amount,
          rtxtotaltoPay: rtxAmount,
          discount: parseInt(event.target.value),
        });

        // CalculateTax(amount);
        // setGrandTotal(amount);
        setRtxTotal(props.Cart.workP_total);
      } else {
        CalculateTax(GrandTotal);

        setValues({
          ...values,
          totaltoPay: GrandTotal,
          rtxtotaltoPay: props.Cart.workP_total,
          discount: 0,
        });
        setRtxTotal(props.Cart.workP_total);
        // setGrandTotal(props.Cart.total);
        CalculateTotal();
      }
    } else {
      if (prop === "amount")
        if (event.target.value === "") {
          setValues({
            ...values,
            amount: 0,
          });
        } else {
          setValues({
            ...values,
            amount: parseInt(event.target.value),
          });
        }

      var Change = parseInt(event.target.value) - GrandTotal;
      var Balance = GrandTotal - parseInt(event.target.value);
      var rtxChange = parseInt(event.target.value) - GrandTotal;
      var rtxBalance = GrandTotal - parseInt(event.target.value);

      if (Change > 0) {
        setChangeDue(Change);
        setRtxChangeDue(rtxChange);
      } else {
        setChangeDue(0);
        setRtxChangeDue(0);
      }
      if (Balance > 0) {
        setBalanceDue(Balance);
        setRtxBalanceDue(rtxBalance);
      } else {
        setBalanceDue(0);
        setRtxBalanceDue(0);
      }
    }
  };

  const handleChange = (name) => (event) => {
    setState({
      ...state,
      [name]: event.target.value,
    });

    if (name === "ticketType") {
      props.dispatchEvent({
        type: "SETTICKETCONFIG",
        payload: {
          taxInvoice: event.target.value === "tax_invoice" ? true : false,
          quotation: event.target.value === "quotation" ? true : false,
          apply: false,
          price: 0.0,
          note: "",
        },
      });
    } else {
      state.customerList.map((list, index) => {
        if (list.id === event.target.value) {
          setselectedCustomer(list);
        }
      });
    }
  };

  const CalculateTotal = () => {
    var tempTotal = 0;
    // console.log(props.Cart.items);
    props.Cart.items.map((list) => {
      tempTotal = list.qnt * list.initalPrice + tempTotal;
    });

    setGrandTotal(tempTotal);
  };

  React.useEffect(() => {
    if (props.Cart.items) {
      CalculateTotal();
      CalculateTax(props.Cart.total);
    }

    if (loadCustomerOnce) {
      setloadCustomerOnce(false);
      loadCustomers();
    }

    if (props.LoadTabel.load) {
      loadCustomers();
      props.dispatchEvent({ type: "CLEARLOADTABEL" });
    }

    if (LoadOnceOff) {
      appDb.HandleExtra({ _type: "get", state }, (callback) => {
        const dataList = [{ idKey: "noneValue", msg: "None" }];

        callback.map((list) => {
          dataList.push(list);
        });
        setList({ ...List, data: dataList });
      });

      setLoadOnceOff(false);
      appDb.HandelProducts(
        {
          _type: "getPOSList",
          layoutType: "all_purcheased",
          branch: props.User.userLogged.department,
        },
        (receiveCallback) => {
          var data = [];

          receiveCallback[0].map((list) => {
            if (!list.isMaster) data.push(list);
          });
          setTimeout(() => {
            setMainCategory(data);
          }, 200);
        }
      );

      appDb.PaymentMode({ _type: "get_payments_mode" }, (receiveCallback) => {
        setPayment_mode(receiveCallback);
      });
    }

    if (props.TableActions.isSet) {
      if (
        props.TableActions.action === "close_left_drawer & open_bottom_drawer"
      ) {
        props.dispatchEvent({
          type: "CLEARTABLEACTIONS",
          ActionType: "close_left_drawer & open_bottom_drawer",
        });
        setDrawerState({ ...Drawerstate, bottom: true });
        // setGrandTotal(props.Cart.total);
        CalculateTotal();
        setValues({ ...values, totaltoPay: props.Cart.total });
        // toggleDrawer("tables", false);
      }
    }

    if (props.TableActions.isSet) {
      if (props.TableActions.action === "close_left_drawer & show edit") {
        props.dispatchEvent({
          type: "CLEARTABLEACTIONS",
          ActionType: "close_left_drawer & show edit",
        });
        // setGrandTotal(props.Cart.total);
        CalculateTotal();
        setValues({ ...values, totaltoPay: props.Cart.total });
        setEditList(true);
        // toggleDrawer("tables", false);
      }
    }
    if (props.TableReducer.name !== "" && props.TableReducer.state === true) {
      if (props.TableReducer.name !== "") {
        appDb.HandleTables(
          {
            _type: "setMyTabes",
            user: props.User.userLogged.userName,
            table: props.TableReducer.name,
            date: moment().format("DD-MMM-YYYY"),
            time: moment().format("LTS"),
            total: GrandTotal,
            qty: 1,
            product_list: { data: props.Cart.items },
          },
          (callback) => {
            RestCartList("");

            props.dispatchEvent({
              type: "SETCOUNT",
              count: callback.length,
            });

            toast(`Table added successfuly`, {
              position: "top-right",
              autoClose: 5000,
              type: "success",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        );

        props.dispatchEvent({
          type: "TABLESET",
          table_name: "",
        });
      } else
        toast(`You have to select table`, {
          position: "top-right",
          autoClose: 5000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }

    if (props.TableActions.isSet) {
      if (props.TableActions.action === "close_table_drawer") {
        props.dispatchEvent({
          type: "CLEARTABLEACTIONS",
          ActionType: "close_left_drawer & open_bottom_drawer",
        });
        // toggleDrawer("tables", false);
        setOpenTableList(false);
      }
    }

    if (props.Actions.state === "clearCartList") {
      RestCartList("");
      props.dispatchEvent({
        type: "SETSTATE",
        state: "",
      });
    }
  }, [props]);

  const loadCustomers = () => {
    appDb.HandleCustomers({ _type: "get" }, (reciveCallback) => {
      setState({
        ...state,
        customerList: reciveCallback.customers,
      });
    });
  };

  const CalculateTax = (sellingPrice) => {
    var tax_rate = props.Tax.tax_rate / 100;
    var totalTaxRate = sellingPrice * tax_rate;

    if (props.Cart.istaxed) {
      setTotalTax(totalTaxRate);
    } else if (props.TicketConfig.taxInvoice) {
      setTotalTax(totalTaxRate);
    }

    setTotalTaxFinal(totalTaxRate);
  };

  const handleQchange = (type) => {
    if (type === "add") {
      if (StockInstore === 0) {
        alert("Out of stock");
      } else {
        props.dispatchEvent({
          type: "ADDQU",
          items: nodeCall.items,
          productKey: nodeCall.productKey,
          amountInstore: nodeCall.amountInstore,
        });

        setStockInstore(StockInstore - 1);
        setQu(qu + 1);
        CalculateTax(props.Cart.total);
      }
    } else if (type === "remove") {
      props.dispatchEvent({
        type: "REMOVEQU",
        items: nodeCall.items,
        productKey: nodeCall.productKey,
      });

      if (qu >= 2) setQu(qu - 1);
      CalculateTax(props.Cart.total);
    } else {
      props.dispatchEvent({
        type: "DELETEQU",
        items: nodeCall.items,
        productKey: nodeCall.productKey,
      });

      handleClose();
      CalculateTax(props.Cart.total);
    }
  };

  // const handleQchange = (type) => {
  //   if (type === "add") {
  //     if (StockInstore === 0) {
  //       alert("Out of stock");
  //     } else {
  //       props.dispatchEvent({
  //         type: "ADDQU",
  //         items: nodeCall.items,
  //         productKey: nodeCall.productKey,
  //         amountInstore: nodeCall.amountInstore,
  //       });

  //       setStockInstore(StockInstore - 1);
  //       setQu(qu + 1);
  //       CalculateTax(props.Cart.total);
  //     }
  //   } else if (type === "remove") {
  //     props.dispatchEvent({
  //       type: "REMOVEQU",
  //       items: nodeCall.items,
  //       productKey: nodeCall.productKey,
  //     });

  //     if (qu >= 2) setQu(qu - 1);
  //     CalculateTax(props.Cart.total);
  //   } else {
  //     props.dispatchEvent({
  //       type: "DELETEQU",
  //       items: nodeCall.items,
  //       productKey: nodeCall.productKey,
  //     });
  //     setQu(1);
  //     setQtyValueChange("1");
  //     handleClose();
  //     CalculateTax(props.Cart.total);
  //   }
  // };

  // Make Cash payment

  const SplitPayment = (event) => {
    setSliptPayment({
      ...sliptPayment,
      [event.target.name]: event.target.value,
    });
  };

  // Slipt Payment

  const makeSliptPayment = () => {
    const compValue =
      parseInt(sliptPayment.sliptCard) + parseInt(sliptPayment.sliptCash);
    if (compValue === GrandTotal) {
      makePayment("Split", "split");
      setSliptOpen(false);

      setSliptErrors({
        ...sliptErrors,
        paymentErrorMsg: ``,
      });
    } else {
      setSliptErrors({
        ...sliptErrors,
        paymentErrorMsg: `Split payment total is not amounting to the total cost price (${values.totaltoPay}). Please make sure the value is equal`,
      });
    }
  };

  // Print Order

  const PrintOrder = () => {
    if (props.Cart.items.length != 0) {
      const data = {
        user: props.User.userLogged.userName,
        data: props.Cart.items,
      };

      ipcRenderer.send("do_print_order", data);
    }
  };

  const sliptTimeRange = () => {
    const timeSplit = moment().format("HH:mm").split(":");
    const TimeValue = `${timeSplit[0]}${timeSplit[1]}`;

    return parseInt(TimeValue);
  };

  // End of slipt

  const PaymentProcessor = (type, en) => {
    var toPrint = [];

    props.Cart.items.map((items) => {
      toPrint.push({
        ItemName: items.ItemName,
        Qty: items.qnt,
        Price: items.sallingprice,
        initalPrice: items.initalPrice,
      });
    });

    if (props.TableToPrintReducer.id !== "")
      appDb.HandleTables(
        { _type: "DeleteTableFromMyTables", id: props.TableToPrintReducer.id },
        (callback) => {
          props.dispatchEvent({
            type: "SETCOUNT",
            count: callback.data.length,
          });
        }
      );

    if (toPrint.length === 0) {
      return alert(
        "Opps we are sorry we can't process an empty list ! selecte items first"
      );
    }

    toggleDrawer("bottom", false);

    if (en !== "history") {
      if (en !== "quotation") {
        generateInvoiceNumber({ type: "get", table: "invNum" }, (callback) => {
          var invoice = 1;
          var id = "";
          if (callback.length !== 0) {
            invoice = callback[0].invNumber;
            id = callback[0].id;
          }

          appDb.HandelReports(
            {
              _type: "sales",
              _data_type: "sales_reports",
              data: {
                id: CreatId(),
                invoiceNumber: invoice,
                ticketList: props.Cart.items,
                totalQt: props.Cart.totalQt,
                Customer: selectedCustomer ? selectedCustomer.id : "",
                GrandTotal: GrandTotal,
                AmountPaid: en === "card" ? GrandTotal : values.amount,
                ChangeDue: ChangeDue,
                Balance: BalanceDue,
                RtxGrandTotal:
                  en === "mutiple" ? RtxTotal : props.Cart.workP_total,
                RtxAmountPaid:
                  en === "mutiple"
                    ? values.rtxtotaltoPay
                    : props.Cart.workP_total,
                RtxChangeDue: RtxChangeDue,
                RtxBalance: RtxBalanceDue,
                Card_slipt:
                  sliptPayment.sliptCard === "" ? 0 : sliptPayment.sliptCard,
                Cash_slipt:
                  sliptPayment.sliptCash === "" ? 0 : sliptPayment.sliptCash,
                // Date: moment().format("ddd MMM Do, YYYY"),
                Date: moment().format("DD-MMM-YYYY"),
                Datetrack: moment().format("MM/DD/YYYY"),
                DateTrackNumber: parseInt(DateNumInput),
                // time: moment().format("LT"),
                user: props.User.userLogged.id,
                department: props.User.userLogged.department,
                company: props.Dep.dep,
                paymentType:
                  paymentModeSelected !== "" ? paymentModeSelected : en,
                // isMuti: en,
                isTaxInvoice: props.TicketConfig.taxInvoice,
                note: props.TicketNote.note,
                time: moment().format("HH:mm"),
                timeRange: sliptTimeRange(),
                Discount: values.discount,
                totalTaxFinal,
                totalTax,
                year,
                day,
                month,
                currency:
                  props.UseCurrency.currencyInUse.currency.symbol_native,
              },
            },
            (callback) => {}
          );

          props.dispatchEvent({
            type: "SAVETICKET",
            defaultList: props.TicketOut.Tickets,
            payload: {
              ticketHeader:
                en === "quotation"
                  ? "Quotation"
                  : props.TicketConfig.taxInvoice
                  ? "Tax Invoice"
                  : " ITEMS BOUGHT FOR INVOICE NUMBER",
              invoiceNumber: invoice,
              ticketList: props.Cart.items,
              toPrint: toPrint,
              Customer: selectedCustomer ? selectedCustomer.id : "",
              GrandTotal: GrandTotal,
              AmountPaid: en === "card" ? GrandTotal : values.amount,
              ChangeDue: ChangeDue,
              Balance: BalanceDue,
              RtxGrandTotal:
                en === "mutiple" ? GrandTotal : props.Cart.workP_total,
              RtxAmountPaid:
                en === "mutiple"
                  ? values.rtxtotaltoPay
                  : props.Cart.workP_total,
              RtxChangeDue: RtxChangeDue,
              RtxBalance: RtxBalanceDue,
              // Date: moment().format("ddd MMM Do, YYYY"),
              Date: moment().format("DD-MMM-YYYY"),
              time: moment().format("LT"),
              user: props.User.userLogged.userName,
              department: props.Dep.dep,
              state: props.Dep.departmentInfo,
              paymentType:
                paymentModeSelected !== "" ? paymentModeSelected : en,
              // paymentType:
              //   en === "mutiple" || en === "cash"
              //     ? "Cash"
              //     : en === "quotation"
              //     ? "Total"
              //     : "Credit Card",
              isMuti: paymentModeSelected !== "" ? paymentModeSelected : en,
              isTaxInvoice: props.TicketConfig.taxInvoice,
              ticketstate: "",
              company: props.Dep.dep,
              note: props.TicketNote.note,
              Discount: values.discount,
              totalTax: totalTaxFinal,
              taxRate: props.Dep.departmentInfo.taxRat,
              currency: props.UseCurrency.currencyInUse.currency.symbol_native,
            },
          });
          generateInvoiceNumber(
            {
              table: "invNum",
              type: "set",
              inv: invoice,
              id: id,
            },
            (callback) => {}
          );
        });
      } else {
        generateQuotationNumber(
          { type: "get", table: "qutNum" },
          (callback) => {
            var quot = 1;
            var id = "";
            if (callback.length !== 0) {
              quot = callback[0].qutNumber;
              id = callback[0].id;
            }

            props.dispatchEvent({
              type: "SAVETICKET",
              defaultList: props.TicketOut.Tickets,
              payload: {
                ticketHeader:
                  en === "quotation" ? "Quotation No" : "Cash Sale Receipt No",
                invoiceNumber: quot,
                ticketList: props.Cart.items,
                toPrint: toPrint,
                Customer: selectedCustomer.name
                  ? selectedCustomer
                  : { name: "Walk in customer", number: "" },
                GrandTotal: en === "mutiple" ? GrandTotal : props.Cart.total,
                AmountPaid: en === "card" ? GrandTotal : values.amount,
                ChangeDue: ChangeDue,
                Balance: BalanceDue,
                RtxGrandTotal:
                  en === "mutiple" ? GrandTotal : props.Cart.workP_total,
                RtxAmountPaid:
                  en === "mutiple"
                    ? values.rtxtotaltoPay
                    : props.Cart.workP_total,
                RtxChangeDue: RtxChangeDue,
                RtxBalance: RtxBalanceDue,
                // Date: moment().format("ddd MMM Do, YYYY"),
                Date: moment().format("DD-MMM-YYYY"),
                time: moment().format("LT"),
                user: props.User.userLogged.userName,
                department: props.Dep.dep,
                state: props.Dep.departmentInfo,
                paymentType:
                  en === "mutiple" || en === "cash"
                    ? "Cash"
                    : en === "quotation"
                    ? "Total"
                    : "Credit Card",
                isMuti: en,
                isTaxInvoice: props.TicketConfig.taxInvoice,
                ticketstate: "",
                note: props.TicketNote.note,
                Discount: values.discount,
                totalTax: totalTaxFinal,
                taxRate: props.Dep.departmentInfo.taxRat,
                currency:
                  props.UseCurrency.currencyInUse.currency.symbol_native,
              },
            });
            generateInvoiceNumber(
              {
                table: "qutNum",
                type: "set",
                inv: quot,
                id: id,
              },
              (callback) => {}
            );
          }
        );
      }
    } else {
      props.dispatchEvent({
        type: "SAVETICKET",
        defaultList: props.TicketOut.Tickets,
        payload: {
          ticketHeader: "Cash Sale Receipt No",
          invoiceNumber: props.TicketToPrint.invo,
          ticketList: props.Cart.items,
          toPrint: toPrint,
          Customer: selectedCustomer ? selectedCustomer.id : "",
          GrandTotal: en === "mutiple" ? GrandTotal : props.Cart.total,
          AmountPaid:
            en === "cash"
              ? props.Cart.total
              : en === "card"
              ? props.Cart.total
              : values.totaltoPay,
          ChangeDue: ChangeDue,
          Balance: BalanceDue,
          RtxGrandTotal: en === "mutiple" ? GrandTotal : props.Cart.workP_total,
          RtxAmountPaid:
            en === "mutiple" ? values.rtxtotaltoPay : props.Cart.workP_total,
          RtxChangeDue: RtxChangeDue,
          RtxBalance: RtxBalanceDue,
          Date: props.TicketToPrint.Date,
          time: props.TicketToPrint.time,
          ticketstate: "COPY",
          user: props.TicketToPrint.user,
          department: props.Dep.dep,
          state: props.Dep.departmentInfo,
          paymentType: props.TicketToPrint.PaymentType,
          isMuti: en,
          isTaxInvoice: props.TicketConfig.taxInvoice,
          note: props.TicketNote.note,
          Discount: values.discount,
          totalTax: totalTaxFinal,
          taxRate: props.Dep.departmentInfo.taxRat,
          currency: props.UseCurrency.currencyInUse.currency.symbol_native,
        },
      });
    }
    // var invoiceN = generateInvoiceNumber(props.TicketOut.Tickets, "num");
    // var invoiceL = generateInvoiceNumber(props.TicketOut.Tickets, "LL");

    setTimeout(() => {
      setBalanceDue(0);
      setChangeDue(0);
      setRtxBalanceDue(0);
      setRtxChangeDue(0);
      setValues({ ...values, discount: 0, amount: 0 });
      RestCartList("");

      if (props.TableActions.isSet)
        appDb.HandleTables(
          { _type: "DeleteTableFromMyTables", id: props.TableActions.id },
          (callback) => {
            appDb.HandleTables({ _type: "getMyTabes" }, (reciveCallback) => {
              props.dispatchEvent({
                type: "SETCOUNT",
                count: reciveCallback.data.length,
              });

              props.dispatchEvent({
                type: "CLEARTABLEACTIONS",
              });
            });
          }
        );
    }, 900);

    isPaid(true);
    setState({ ...state, customer: "Walk in customer" });
  };

  const makePayment = (type, en) => {
    setinvEn(en);

    if (values.discount === 0) {
      PaymentProcessor(type, en);
    } else {
      handleClickOpenPassDailogRequest();
    }
  };

  const handlePasswordAuth = () => {
    appDb.HandleLogIn({ pin: AdminPass, name: "" }, (reciveCallback) => {
      if (reciveCallback.isLoggedIn) {
        if (reciveCallback.config.prevarges === "1") {
          PaymentProcessor("type", invEn);

          closePassDailogPassRequest();
        } else setRequestPass(true);
      } else setRequestPass(true);
    });

    // console.log(props.User);
  };

  const handleClickOpenPassDailogRequest = () => {
    setOpenPassDailogRequest(true);
  };

  const closePassDailogPassRequest = () => {
    setOpenPassDailogRequest(false);
  };

  const generateInvoiceNumber = (props, sendCallback) => {
    if (props.type === "get")
      appDb.HandleinvNumber({ type: "get", _type: "invo" }, (callback) => {
        sendCallback(callback.data);
      });
    else if (props.type === "set")
      appDb.HandleinvNumber(
        { type: "set", _type: "invo", inv: props.inv, id: props.id },
        (callback) => {
          sendCallback(callback.data);
        }
      );
  };

  const generateQuotationNumber = (props, sendCallback) => {
    if (props.type === "get")
      appDb.HandleinvNumber({ type: "get", _type: "quot" }, (callback) => {
        sendCallback(callback.data);
      });
    else if (props.type === "set")
      appDb.HandleinvNumber(
        { type: "set", _type: "quot", inv: props.inv, id: props.id },
        (callback) => {
          sendCallback(callback.data);
        }
      );
  };

  // Rest Cart

  const RestCartList = (data) => {
    props.dispatchEvent({
      type: "RESTATECART",
      items: nodeCall.items,
      productKey: nodeCall.productKey,
      amountInstore: nodeCall.amountInstore,
    });
    props.dispatchEvent({
      type: "CLEARPRINT",
    });
    setEditList(false);
  };

  const PrintTicket = (info) => {};

  const handleDelete = () => {};

  const search = (event, item) => {
    if (item.isMulity) {
      props.dispatchEvent({
        type: "TICKTSEARCHPRODUCT",
        payload: {
          item: item,
          isSet: true,
        },
      });
    } else {
      props.dispatchEvent({
        type: "ADDTOCART",
        payload: {
          items: item,
        },
      });
    }
  };

  return (
    <div>
      {/* Password Dailog Request */}
      <div>
        <Dialog
          open={openPassDailogRequest}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Admin Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To apply this discount, please enter an administrator password
              here. We will automatically apply the discount after.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="passAuth"
              value={AdminPass}
              onChange={(event) => {
                setAdminPass(event.target.value);
              }}
              label="Password"
              type="password"
              color="secondary"
              fullWidth
            />
            <div>
              {requestPass ? (
                <Message negative>
                  <Message.Header>
                    We're sorry we can't apply that discount
                  </Message.Header>
                  <p>The password you entered is invalid</p>
                </Message>
              ) : null}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closePassDailogPassRequest}>Cancel</Button>
            <Button onClick={handlePasswordAuth}>Submit Password</Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* End of Password Dailog Request */}
      <div
        style={{
          padding: 2,
          width: "100%",
          backgroundColor: props.TicketConfig.taxInvoice
            ? "#9A4200"
            : "#9A4200",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ThemeProvider theme={darkTheme}>
            <div style={{ width: 200, marginTop: -29 }}>
              <Autocomplete
                options={MainCategory}
                getOptionLabel={(option) => option.ItemName}
                id="debug"
                onChange={search}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Products..."
                    margin="normal"
                  />
                )}
              />
            </div>
          </ThemeProvider>

          <ThemeProvider theme={darkTheme}>
            <FormControl color="secondary" className={classes.formControl}>
              <NativeSelect
                value={state.customer}
                onChange={handleChange("customer")}
                name="ticketType"
                inputProps={{ "aria-label": "ticketType" }}
              >
                <option value="customer">Walk in customer</option>
                {state.customerList.map((customers) => {
                  return (
                    <option key={customers.id} value={customers.id}>
                      {customers.name}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </ThemeProvider>

          <div style={{ marginTop: 5 }}>
            <Chip
              icon={<TableChartIcon />}
              label={props.TableReducer.name}
              onClick={() => {
                setOpenTableList(true);
              }}
              onDelete={handleDelete}
              color="primary"
            />
            {/* <Typography>}</Typography> */}
          </div>
        </div>
      </div>
      <div style={{ height: "63vh" }}>
        <div
          className={classes.root}
          style={{
            height: "48vh",
            overflow: "auto",
            backgroundColor:
              props.Theme.theme === "light" ? "#EEEEEE" : "#0E0E0E",
          }}
        >
          {/* <List component="nav" aria-label="main mailbox folders"> */}
          {props.Cart.items.map((items, index) => {
            // console.log(items);

            return (
              <div key={items.productKey}>
                <ListItem
                  style={{ padding: 0 }}
                  button
                  selected={selectedIndex === items.productKey}
                  onClick={(event) => {
                    handleListItemClick(event, items.productKey);
                    setStockInstore(items.amountInstore);
                    setQu(items.qnt);
                    setNodeCall({
                      items: props.Cart.items,
                      productKey: items.productKey,
                      amountInstore: items.amountInstore,
                    });
                  }}
                >
                  <ListItemIcon>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleExtraClick(e, items, index)}
                    >
                      <MoreIcon />
                    </IconButton>
                  </ListItemIcon>
 
                  <ListItemText
                    primary={
                      <Typography style={{ width: 200 }}>
                        {items.ItemName}
                      </Typography>
                    }
                    secondary={
                      <div>
                        <div>
                          {props.TicketToPrint.active
                            ? items.qnt === 1
                              ? `got ${items.qnt} item`
                              : `got ${items.qnt} items`
                            : `we have added ${items.qnt} and ${items.amountInstore} left`}
                        </div>
                        <div style={{ color: "teal" }}>
                          {items.extraMsg
                            ? items.extraMsg !== "None"
                              ? `Extra Massage: ${items.extraMsg}`
                              : null
                            : null}
                        </div>
                      </div>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography
                      style={{ marginTop: -35, color: "red" }}
                      variant="h6"
                    >
                      <Currency
                        locale="en"
                        quantity={items.initalPrice * items.qnt}
                        symbol={
                          props.UseCurrency.currencyInUse.currency.symbol_native
                        }
                      />
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            );
          })}
          {/* </List> */}
        </div>
        <Divider />
        <Divider />
        <Paper className={classes.totalsView}>
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography style={{ marginLeft: 5 }} variant="h6">
              Ticket Total
            </Typography>
            <Typography style={{ marginRight: 5 }} variant="h6">
              <Currency locale="en" quantity={GrandTotal} symbol="K" />
            </Typography>
          </div> */}

          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography style={{ marginLeft: 5 }} variant="h6">
              Tax Total
            </Typography>
            <Typography style={{ marginRight: 5 }} variant="h6">
              <Currency locale="en" quantity={totalTaxFinal} symbol="K" />
            </Typography>
          </div> */}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{ color: "#FF5555", marginLeft: 8 }}
              variant="h5"
            >
              Total
            </Typography>
            <Typography
              style={{ color: "#FF5555", marginRight: 5 }}
              variant="h3"
            >
              <Currency
                locale="en"
                quantity={GrandTotal}
                symbol={props.UseCurrency.currencyInUse.currency.symbol_native}
              />
            </Typography>
          </div>
        </Paper>
      </div>

      {/* close sale buttons */}

      <div style={{ paddingBottom: 10 }}>
        {state.ticketType === "quotation" ? (
          <div>
            <Button
              onClick={() => makePayment("quotation", "quotation")}
              variant="contained"
              className={classes.botton5}
            >
              <Typography>Print Out Quotation </Typography>
            </Button>
          </div>
        ) : (
          <div style={{ marginLeft: 5 }}>
            {editList ? (
              <div>
                <Button
                  disabled={props.TicketToPrint.active}
                  onClick={() => {
                    // props.Cart.items
                    appDb.HandleTables(
                      {
                        _type: "updateTable",
                        user: props.TableToPrintReducer.userName,
                        table: props.TableToPrintReducer.table,
                        product_list: { data: props.Cart.items },
                      },
                      (callback) => {
                        RestCartList("");
                        toast(`Table Updated successfuly`, {
                          position: "top-right",
                          autoClose: 5000,
                          type: "success",
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }
                    );
                  }}
                  className={classes.botton4}
                  style={{
                    backgroundColor: props.TicketToPrint.active
                      ? "#CCCED7"
                      : "#9A43A8",
                    width: "55%",
                  }}
                >
                  <Typography style={{ color: "#fff" }}>
                    Save to table
                  </Typography>
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  disabled={props.TicketToPrint.active}
                  onClick={toggleDrawer("bottom", true)}
                  className={classes.botton4}
                  style={{
                    backgroundColor: props.TicketToPrint.active
                      ? "#CCCED7"
                      : "#9A43A8",
                    width: "55%",
                  }}
                >
                  <Typography style={{ color: "#fff" }}>Close sale</Typography>
                </Button>
                <Button
                  disabled={props.TicketToPrint.active}
                  onClick={() => {
                    // PrintOrder();
                    // setOpenOrdreMdodel(true);
                    setWhatToSave(props.Cart);
                    setOpenTableList(true);
                  }}
                  className={classes.botton1}
                  style={{
                    backgroundColor: props.TicketToPrint.active
                      ? "#CCCED7"
                      : "#9A43A8",
                    width: "28%",
                  }}
                >
                  <Typography style={{ color: "#fff" }}>
                    Save To Tables
                  </Typography>
                </Button>
              </div>
            )}

            {/* Tables List */}

            <div>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={openTableList}
                className={classes.modal}
                // onClose={()}
              >
                <TableLayout data={whatToSave} total={GrandTotal} />
              </Modal>
            </div>

            {/* model for order  */}

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openOrdreMdodel}
              onClose={() => setOpenOrdreMdodel(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openOrdreMdodel}>
                <div className={classes.paper}>
                  <div style={{ marginTop: 5 }}>
                    <Typography
                      style={{
                        color:
                          props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                      }}
                      variant="h5"
                    >
                      Do you want to
                    </Typography>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Button
                      onClick={() => {
                        setOpenOrdreMdodel(false);
                      }}
                      variant="contained"
                    >
                      Print out invoice
                    </Button>
                    <Button
                      style={{ marginLeft: 5 }}
                      onClick={() => {
                        setOpenOrdreMdodel(false);

                        // console.log(props.Cart.items);

                        if (props.TableReducer.name !== "")
                          appDb.HandleTables(
                            {
                              _type: "setMyTabes",
                              user: props.User.userLogged.userName,
                              table: props.TableReducer.name,
                              date: moment().format("DD-MMM-YYYY"),
                              time: moment().format("LTS"),
                              total: props.Cart.total,
                              qty: 1,
                              product_list: { data: props.Cart.items },
                            },
                            (callback) => {
                              RestCartList("");

                              props.dispatchEvent({
                                type: "SETCOUNT",
                                count: callback.data.length,
                              });

                              toast(`Table added successfuly`, {
                                position: "top-right",
                                autoClose: 5000,
                                type: "success",
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              });
                            }
                          );
                        else
                          toast(`You have to select table`, {
                            position: "top-right",
                            autoClose: 5000,
                            type: "error",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                      }}
                      variant="contained"
                    >
                      Save to my tables
                    </Button>

                    <Button
                      style={{ marginLeft: 8 }}
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpenOrdreMdodel(false)}
                    >
                      cancel
                    </Button>
                  </div>
                </div>
              </Fade>
            </Modal>

            {/* end of model order  */}

            <Drawer
              anchor="bottom"
              open={Drawerstate.bottom}
              onClose={toggleDrawer("bottom", false)}
            >
              <div className={classes.bottom}>
                {/* <Customer /> */}
                <div
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ marginLeft: 20 }}>
                    <Typography style={{ color: "green" }} variant="h4">
                      Checkout
                    </Typography>
                  </div>
                  <IconButton onClick={toggleDrawer("bottom", false)}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div style={{ padding: 10, display: "flex" }}>
                  <Paper
                    style={{
                      width: "40%",
                      height: "73vh",
                      overflow: "auto",
                      backgroundColor:
                        props.Theme.theme === "light" ? "#EEEEEE" : "#212121",
                    }}
                  >
                    {/* <List component="nav" aria-label="main mailbox folders"> */}
                    {props.Cart.items.map((items) => {
                      return (
                        <div key={items.productKey}>
                          <ListItem
                            button
                            selected={selectedIndex === items.productKey}
                            onClick={(event) => {
                              handleListItemClick(event, items.productKey);
                              setStockInstore(parseInt(items.amountInstore));

                              setQu(items.qnt);
                              setNodeCall({
                                items: props.Cart.items,
                                productKey: items.productKey,
                                amountInstore: items.amountInstore,
                              });
                            }}
                          >
                            <ListItemIcon>
                              <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="h6">
                                  {items.ItemName}
                                </Typography>
                              }
                              secondary={`we have added ${items.qnt} and ${items.amountInstore} left`}
                            />
                            {/* <ListItemSecondaryAction>
                              <Typography variant="h6">
                                <Currency
                                  locale="en"
                                  quantity={parseInt(items.sallingprice)}
                                  symbol={
                                    props.UseCurrency.currencyInUse.currency
                                      .symbol_native
                                  }
                                />
                              </Typography>
                            </ListItemSecondaryAction> */}
                          </ListItem>
                        </div>
                      );
                    })}
                    {/* </List> */}
                  </Paper>
                  <div
                    style={{
                      width: "60%",
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h2" style={{ color: "#FF8D8D" }}>
                        Total
                      </Typography>
                      <div>
                        <Typography variant="h2" style={{ color: "#FF8D8D" }}>
                          <Currency
                            locale="en"
                            quantity={GrandTotal}
                            symbol={
                              props.UseCurrency.currencyInUse.currency
                                .symbol_native
                            }
                          />
                        </Typography>
                        <div
                          style={{
                            width: 300,
                            backgroundColor: "#494B4A",
                            height: 2,
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          color:
                            props.Theme.theme === "light"
                              ? "#525453"
                              : "#EBECEB",
                          marginLeft: 20,
                        }}
                      >
                        Amount Paid
                      </Typography>
                      <div>
                        <FormControl
                          fullWidth
                          className={classes.margin}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-amount">
                            Amount
                          </InputLabel>
                          <OutlinedInput
                            disabled={values.discount === 0 ? false : true}
                            style={{ height: 70, fontSize: 25 }}
                            id="outlined-adornment-amount"
                            value={values.amount}
                            onChange={handlePaidChange("amount")}
                            error={amountPaidErr}
                            startAdornment={
                              <InputAdornment position="start">
                                K
                              </InputAdornment>
                            }
                            labelWidth={60}
                          />
                        </FormControl>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 15,
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          color:
                            props.Theme.theme === "light"
                              ? "#525453"
                              : "#EBECEB",
                          marginLeft: 20,
                        }}
                      >
                        Discount
                      </Typography>
                      <div>
                        <FormControl
                          fullWidth
                          className={classes.margin}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-discount">
                            Discount
                          </InputLabel>
                          <OutlinedInput
                            style={{ height: 70, fontSize: 25 }}
                            id="outlined-adornment-discount"
                            value={values.discount}
                            onChange={handlePaidChange("discount")}
                            startAdornment={
                              <InputAdornment position="start">
                                {
                                  props.UseCurrency.currencyInUse.currency
                                    .symbol_native
                                }
                              </InputAdornment>
                            }
                            labelWidth={60}
                          />
                        </FormControl>
                        <div>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              applyDiscount();
                            }}
                          >
                            Apply discount
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{ marginLeft: 20, width: "80%", marginTop: 20 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">Change due:</Typography>
                        <Typography variant="h6">
                          <Currency
                            locale="en"
                            quantity={ChangeDue}
                            symbol={
                              props.UseCurrency.currencyInUse.currency
                                .symbol_native
                            }
                          />
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">Grand Total:</Typography>
                        <Typography variant="h6">
                          <Currency
                            locale="en"
                            quantity={GrandTotal}
                            symbol={
                              props.UseCurrency.currencyInUse.currency
                                .symbol_native
                            }
                          />
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">Balance due:</Typography>
                        <Typography variant="h6">
                          <Currency
                            locale="en"
                            quantity={BalanceDue}
                            symbol={
                              props.UseCurrency.currencyInUse.currency
                                .symbol_native
                            }
                          />
                        </Typography>
                      </div>
                    </div>

                    <div style={{ marginTop: 50 }}>
                      <Button
                        onClick={(event) => {
                          if (values.amount === 0 && values.discount === 0) {
                            setamountPaidErr(true);
                            return;
                          }

                          if (
                            values.totaltoPay > values.amount &&
                            values.discount === 0
                          ) {
                            setamountPaidErr(true);
                            toast(`Tendered is less then amount due`, {
                              position: "top-right",
                              autoClose: 5000,
                              type: "error",
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                            return;
                          }

                          setDrawerState({ ...Drawerstate, bottom: false });
                          makePayment("Cash Payment", "Cash");
                          // handleClick2(event);
                        }}
                        style={{ height: 70, marginRight: 10 }}
                        variant="contained"
                        color="primary"
                        // disabled={Paid}
                      >
                        <Typography variant="h5">Cash payment</Typography>
                      </Button>

                      <Button
                        disabled={props.TicketToPrint.active}
                        onClick={(event) => {
                          if (values.amount === 0 && values.discount === 0) {
                            setamountPaidErr(true);
                            return;
                          }

                          if (values.totaltoPay > values.amount) {
                            setamountPaidErr(true);
                            return;
                          }

                          setDrawerState({ ...Drawerstate, bottom: false });
                          // handleClick2(event);
                          makePayment("Card Payment", "Card");
                        }}
                        style={{
                          backgroundColor: props.TicketToPrint.active
                            ? "#CCCED7"
                            : "#0D6FBD",
                          height: 70,
                          marginRight: 10,
                        }}
                      >
                        <Typography style={{ color: "#fff" }} variant="h5">
                          Credit Card
                        </Typography>
                      </Button>

                      <Button
                        disabled={props.TicketToPrint.active}
                        onClick={(event) => {
                          setSliptOpen(true);
                        }}
                        style={{
                          backgroundColor: props.TicketToPrint.active
                            ? "#CCCED7"
                            : "#0D6FBD",
                          height: 70,
                          marginRight: 10,
                        }}
                      >
                        <Typography style={{ color: "#fff" }} variant="h5">
                          Split Payment
                        </Typography>
                      </Button>

                      <Button
                        disabled={props.TicketToPrint.active}
                        variant="contained"
                        color="secondary"
                        onClick={(event) => {
                          setPaymentModeOpen(true);
                        }}
                        style={{
                          height: 70,
                          marginRight: 10,
                        }}
                      >
                        <Typography style={{ color: "#fff" }} variant="h5">
                          Other Payment Mode
                        </Typography>
                      </Button>

                      {/* Payment Mode */}
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={paymentModeOpen}
                        onClose={() => setPaymentModeOpen(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={paymentModeOpen}>
                          <div className={classes.paper2}>
                            <Divider />
                            <div>Payment Mode</div>
                            <Divider />
                            <div style={{ marginTop: 10 }}>
                              <Autocomplete
                                id="combo-box-demo"
                                options={payment_mode}
                                getOptionLabel={(option) => option.pay_type}
                                onInputChange={(event, newInputValue) => {
                                  setPaymentModeSelected(newInputValue);
                                }}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Combo box"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </div>
                            <div style={{ marginTop: 10 }}>
                              <Button
                                onClick={() => {
                                  if (
                                    values.amount === 0 &&
                                    values.discount === 0
                                  ) {
                                    setamountPaidErr(true);
                                    return;
                                  }

                                  if (values.totaltoPay > values.amount) {
                                    setamountPaidErr(true);
                                    return;
                                  }

                                  makePayment("Cash Payment", "mutiple");
                                }}
                                variant="contained"
                                color="primary"
                              >
                                Make Payment
                              </Button>
                            </div>
                          </div>
                        </Fade>
                      </Modal>

                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleCloseAlert}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={open}>
                          <div className={classes.paper}>
                            <Typography variant="h6">{AlertMsg}</Typography>
                          </div>
                        </Fade>
                      </Modal>

                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={sliptOpen}
                        onClose={handleCloseAlert}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={sliptOpen}>
                          <div className={classes.paper2}>
                            <div>
                              <form>
                                <TextField
                                  id="outlined-basic"
                                  label="Cash Payment"
                                  variant="outlined"
                                  name="sliptCash"
                                  fullWidth
                                  type="number"
                                  value={sliptPayment.sliptCash}
                                  onChange={SplitPayment}
                                />
                                <div style={{ marginTop: 15 }} />
                                <Divider />
                                <TextField
                                  style={{ marginTop: 15 }}
                                  id="outlined-basic"
                                  label="Card Payment"
                                  variant="outlined"
                                  type="number"
                                  name="sliptCard"
                                  fullWidth
                                  value={sliptPayment.sliptCard}
                                  onChange={SplitPayment}
                                />
                              </form>
                            </div>
                            {sliptErrors.paymentErrorMsg != "" ? (
                              <Message error negative>
                                <Message.Header>
                                  There was some errors with your submission
                                </Message.Header>
                                <p>{sliptErrors.paymentErrorMsg}</p>
                              </Message>
                            ) : null}

                            <div style={{ marginTop: 15 }} />
                            <Divider />
                            <Button
                              style={{ marginTop: 15 }}
                              variant="contained"
                              onClick={makeSliptPayment}
                            >
                              Make payment
                            </Button>
                            <Button
                              style={{ marginLeft: 7, marginTop: 15 }}
                              variant="contained"
                              color="primary"
                              onClick={() => setSliptOpen(false)}
                            >
                              Cancel Sale
                            </Button>
                          </div>
                        </Fade>
                      </Modal>

                      {/* <Button
                        style={{ height: 70, marginRight: 10 }}
                        variant="contained"
                        color="primary"
                      >
                        <Typography variant="h5">Cheque payment</Typography>
                      </Button> */}
                      {/* <Button
                        style={{ height: 70 }}
                        variant="contained"
                        color="secondary"
                      >
                        <Typography variant="h5">Credit Card</Typography>
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                // onClose={handleClose2}
              >
                <div
                  style={{
                    width: 250,
                    height: 100,
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ marginTop: 40 }}>
                    <Typography variant="h6">Payment Successful</Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      handleClose2();
                      isPaid(false);
                      toggleDrawer("bottom", false);
                    }}
                    style={{ width: 200 }}
                  >
                    Okay
                  </Button>
                </div>
              </Menu>
            </Drawer>
          </div>
        )}

        <div style={{ marginTop: 5, marginBottom: 5, display: "flex" }}>
          <Button
            onClick={RestCartList}
            variant="contained"
            style={{ marginLeft: 5 }}
            className={classes.botton4}
          >
            <Typography>Cancel Sale</Typography>
          </Button>
          <Button
            onClick={() => {
              makePayment("history", "history");
            }}
            variant="contained"
            color="primary"
            disabled={props.TicketToPrint.active ? false : true}
            style={{ width: 145 }}
          >
            <Typography>Print</Typography>
          </Button>
        </div>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl3}
        keepMounted
        open={Boolean(anchorEl3)}
        onClose={handleClose3}
      >
        <div style={{ padding: 10, width: 200 }}>
          {List.data.map((list, index) => {
            return (
              <ListItem
                button
                key={index}
                onClick={(event) => {
                  // setExtraMsg(list.msg);
                  if (list.msg === "None")
                    props.Cart.items[selectedExtraIndex].extraMsg = null;
                  else props.Cart.items[selectedExtraIndex].extraMsg = list.msg;

                  handleClose3();
                  // console.log(props.Cart.items[selectedExtraIndex]);
                }}
              >
                <ListItemText
                  primary={
                    <Typography style={{ width: 200, color: "#3b3b3" }}>
                      {list.msg}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </div>
      </Menu>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ padding: 10 }}>
          <div style={{ display: "flex", marginBottom: 20 }}>
            <IconButton
              onClick={() => handleQchange("add")}
              aria-label="delete"
            >
              <AddIcon />
            </IconButton>
            <Typography variant="h5" style={{ marginTop: 5 }}>
              {qu}
            </Typography>
            <IconButton
              onClick={() => handleQchange("remove")}
              aria-label="delete"
            >
              <RemoveIcon />
            </IconButton>
          </div>

          {/* <div style={{ marginBottom: 8 }}>
            <input
              value={QtyValueChange}
              onChange={(event) => {
                if (parseInt(event.target.value) > 0) {
                  setQtyValueChange(event.target.value);

                  props.dispatchEvent({
                    type: "mnqty",
                    items: nodeCall.items,
                    productKey: nodeCall.productKey,
                    amountInstore: nodeCall.amountInstore,
                    qty: parseInt(event.target.value),
                    oldQty: qu,
                  });
                }
              }}
              placeholder="Qty"
              type="number"
            />
          </div> */}

          <Button
            onClick={() => handleQchange("delete")}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      </Menu>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    TicketConfig: state.TicketConfig,
    Cart: state.Cart,
    Tax: state.Tax,
    Customers: state.Customers,
    TicketToPrint: state.TicketToPrint,
    Theme: state.Theme,
    User: state.User,
    TicketOut: state.TicketOut,
    Dep: state.Dep,
    LoadTabel: state.LoadTabel,
    TicketNote: state.TicketNote,
    TableReducer: state.TableReducer,
    TableToPrintReducer: state.TableToPrintReducer,
    TableActions: state.TableActionsReducer,
    UseCurrency: state.UseCurrencyReducer,
    Actions: state.ActionsReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
