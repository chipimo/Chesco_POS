"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Typography_1 = require("@material-ui/core/Typography");
var styles_1 = require("@material-ui/core/styles");
var react_redux_1 = require("react-redux");
var FormControl_1 = require("@material-ui/core/FormControl");
var NativeSelect_1 = require("@material-ui/core/NativeSelect");
var styles_2 = require("@material-ui/core/styles");
var ListItemSecondaryAction_1 = require("@material-ui/core/ListItemSecondaryAction");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var IconButton_1 = require("@material-ui/core/IconButton");
var AddCircle_1 = require("@material-ui/icons/AddCircle");
var Menu_1 = require("@material-ui/core/Menu");
var Button_1 = require("@material-ui/core/Button");
var Delete_1 = require("@material-ui/icons/Delete");
var Add_1 = require("@material-ui/icons/Add");
var RemoveCircle_1 = require("@material-ui/icons/RemoveCircle");
var Drawer_1 = require("@material-ui/core/Drawer");
var Close_1 = require("@material-ui/icons/Close");
var ShoppingCart_1 = require("@material-ui/icons/ShoppingCart");
var core_1 = require("@material-ui/core");
var Modal_1 = require("@material-ui/core/Modal");
var Backdrop_1 = require("@material-ui/core/Backdrop");
var Fade_1 = require("@material-ui/core/Fade");
var TextField_1 = require("@material-ui/core/TextField");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var semantic_ui_react_1 = require("semantic-ui-react");
var Chip_1 = require("@material-ui/core/Chip");
var TableChart_1 = require("@material-ui/icons/TableChart");
var react_toastify_1 = require("react-toastify");
var dataBase_1 = require("../../../redux/dataBase");
var TableLayout_1 = require("../TablesViews/TableLayout");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var More_1 = require("@material-ui/icons/More");
var ipcRenderer = require("electron").ipcRenderer;
var Currency = require("react-currency-formatter");
var moment = require("moment");
var uuidv4 = require("uuid/v4");
function CreatId() {
    return uuidv4();
}
var dateNow = new Date(); // Creating a new date object with the current date and time
var year2 = dateNow.getFullYear(); // Getting current year from the created Date object
var monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
var month2 = // Setting current Month number from current Date object
 monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? "0" + monthWithOffset
    : monthWithOffset;
var date = dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? "0" + dateNow.getUTCDate()
    : dateNow.getUTCDate();
var DateNumInput = "" + year2 + month2 + date;
var check = moment(new Date());
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February.....)
var year = check.format("YYYY");
var time = check.format("LT");
var useStyles = styles_1.makeStyles(function (theme) { return ({
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
}); });
var darkTheme = styles_2.createMuiTheme({
    palette: {
        type: "dark",
    },
});
var index = function (props) {
    var _a = React.useState({
        ticketType: "cash_sale",
        customer: "Walk in customer",
        customerList: [],
    }), state = _a[0], setState = _a[1];
    var _b = React.useState(0), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var _c = React.useState(null), selectedCustomer = _c[0], setselectedCustomer = _c[1];
    var classes = useStyles();
    var _d = React.useState(0), GrandTotal = _d[0], setGrandTotal = _d[1];
    var _e = React.useState(props.Cart.workP_total), RtxTotal = _e[0], setRtxTotal = _e[1];
    var _f = React.useState(null), anchorEl = _f[0], setAnchorEl = _f[1];
    var _g = React.useState(null), anchorEl3 = _g[0], setAnchorEl3 = _g[1];
    var _h = React.useState(null), anchorEl2 = _h[0], setAnchorEl2 = _h[1];
    var _j = React.useState(1), qu = _j[0], setQu = _j[1];
    var _k = React.useState(0), StockInstore = _k[0], setStockInstore = _k[1];
    var _l = React.useState(0), totalTax = _l[0], setTotalTax = _l[1];
    var _m = React.useState(0), totalTaxFinal = _m[0], setTotalTaxFinal = _m[1];
    var _o = React.useState(""), AdminPass = _o[0], setAdminPass = _o[1];
    var _p = React.useState(""), invEn = _p[0], setinvEn = _p[1];
    var _q = React.useState("1"), QtyValueChange = _q[0], setQtyValueChange = _q[1];
    var _r = React.useState(false), Paid = _r[0], isPaid = _r[1];
    var _s = React.useState(false), openTableList = _s[0], setOpenTableList = _s[1];
    var _t = React.useState(false), paymentModeOpen = _t[0], setPaymentModeOpen = _t[1];
    var _u = React.useState(false), amountPaidErr = _u[0], setamountPaidErr = _u[1];
    var _v = React.useState(false), sliptOpen = _v[0], setSliptOpen = _v[1];
    var _w = React.useState(false), openOrdreMdodel = _w[0], setOpenOrdreMdodel = _w[1];
    var _x = React.useState({ data: [] }), List = _x[0], setList = _x[1];
    var _y = React.useState({
        top: false,
        left: false,
        bottom: false,
        bottom2: false,
        right: false,
    }), Drawerstate = _y[0], setDrawerState = _y[1];
    var _z = React.useState({
        amount: 0,
        discount: 0,
        totaltoPay: 0,
        rtxtotaltoPay: 0,
    }), values = _z[0], setValues = _z[1];
    var _0 = React.useState({
        sliptCard: "",
        sliptCash: "",
    }), sliptPayment = _0[0], setSliptPayment = _0[1];
    var _1 = React.useState({}), whatToSave = _1[0], setWhatToSave = _1[1];
    var toggleDrawer = function (side, open) { return function (event) {
        var _a;
        if (event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerState(__assign({}, Drawerstate, (_a = {}, _a[side] = open, _a)));
        // setGrandTotal(props.Cart.total);
        CalculateTotal();
        setValues(__assign({}, values, { totaltoPay: props.Cart.total }));
    }; };
    var _2 = React.useState(false), open = _2[0], setOpen = _2[1];
    var _3 = React.useState(true), loadCustomerOnce = _3[0], setloadCustomerOnce = _3[1];
    var _4 = React.useState(""), AlertMsg = _4[0], setAlertMsg = _4[1];
    var _5 = React.useState(0), ChangeDue = _5[0], setChangeDue = _5[1];
    var _6 = React.useState(0), BalanceDue = _6[0], setBalanceDue = _6[1];
    var _7 = React.useState(0), RtxChangeDue = _7[0], setRtxChangeDue = _7[1];
    var _8 = React.useState(0), RtxBalanceDue = _8[0], setRtxBalanceDue = _8[1];
    var _9 = React.useState([]), payment_mode = _9[0], setPayment_mode = _9[1];
    var _10 = React.useState(true), LoadOnceOff = _10[0], setLoadOnceOff = _10[1];
    var _11 = React.useState(false), editList = _11[0], setEditList = _11[1];
    var _12 = React.useState({
        cashError: false,
        cardError: false,
        paymentError: false,
        paymentErrorMsg: "",
    }), sliptErrors = _12[0], setSliptErrors = _12[1];
    var _13 = React.useState([]), MainCategory = _13[0], setMainCategory = _13[1];
    var _14 = React.useState(""), paymentModeSelected = _14[0], setPaymentModeSelected = _14[1];
    var _15 = React.useState(false), requestPass = _15[0], setRequestPass = _15[1];
    var _16 = React.useState(""), extraMsg = _16[0], setExtraMsg = _16[1];
    var _17 = React.useState(false), openPassDailogRequest = _17[0], setOpenPassDailogRequest = _17[1];
    var _18 = React.useState(null), selectedExtraIndex = _18[0], setSelectedExtraIndex = _18[1];
    var _19 = React.useState(null), selectedExtraItem = _19[0], setSelectedExtraItem = _19[1];
    var handleCloseAlert = function () {
        setOpen(false);
    };
    var _20 = React.useState({
        items: "",
        productKey: "",
        amountInstore: 0,
    }), nodeCall = _20[0], setNodeCall = _20[1];
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleExtraClick = function (event, item, index) {
        setSelectedExtraIndex(index);
        setSelectedExtraItem(item);
        setAnchorEl3(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var handleClick2 = function (event) {
        setAnchorEl2(event.currentTarget);
    };
    var handleClose2 = function () {
        setAnchorEl2(null);
    };
    var handleClose3 = function () {
        setAnchorEl3(null);
    };
    var handleListItemClick = function (event, index) {
        setSelectedIndex(index);
    };
    var applyDiscount = function () {
        var amount = GrandTotal - values.discount;
        setGrandTotal(amount);
    };
    var handlePaidChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        if (prop === "discount") {
            if (event.target.value !== "") {
                var amount = GrandTotal - parseInt(event.target.value);
                var rtxAmount = props.Cart.workP_total - parseInt(event.target.value);
                setValues(__assign({}, values, { totaltoPay: amount, rtxtotaltoPay: rtxAmount, discount: parseInt(event.target.value) }));
                // CalculateTax(amount);
                // setGrandTotal(amount);
                setRtxTotal(props.Cart.workP_total);
            }
            else {
                CalculateTax(GrandTotal);
                setValues(__assign({}, values, { totaltoPay: GrandTotal, rtxtotaltoPay: props.Cart.workP_total, discount: 0 }));
                setRtxTotal(props.Cart.workP_total);
                // setGrandTotal(props.Cart.total);
                CalculateTotal();
            }
        }
        else {
            if (prop === "amount")
                if (event.target.value === "") {
                    setValues(__assign({}, values, { amount: 0 }));
                }
                else {
                    setValues(__assign({}, values, { amount: parseInt(event.target.value) }));
                }
            var Change = parseInt(event.target.value) - GrandTotal;
            var Balance = GrandTotal - parseInt(event.target.value);
            var rtxChange = parseInt(event.target.value) - GrandTotal;
            var rtxBalance = GrandTotal - parseInt(event.target.value);
            if (Change > 0) {
                setChangeDue(Change);
                setRtxChangeDue(rtxChange);
            }
            else {
                setChangeDue(0);
                setRtxChangeDue(0);
            }
            if (Balance > 0) {
                setBalanceDue(Balance);
                setRtxBalanceDue(rtxBalance);
            }
            else {
                setBalanceDue(0);
                setRtxBalanceDue(0);
            }
        }
    }; };
    var handleChange = function (name) { return function (event) {
        var _a;
        setState(__assign({}, state, (_a = {}, _a[name] = event.target.value, _a)));
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
        }
        else {
            state.customerList.map(function (list, index) {
                if (list.id === event.target.value) {
                    setselectedCustomer(list);
                }
            });
        }
    }; };
    var CalculateTotal = function () {
        var tempTotal = 0;
        // console.log(props.Cart.items);
        props.Cart.items.map(function (list) {
            tempTotal = list.qnt * list.initalPrice + tempTotal;
        });
        setGrandTotal(tempTotal);
    };
    React.useEffect(function () {
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
            dataBase_1.default.HandleExtra({ _type: "get", state: state }, function (callback) {
                var dataList = [{ idKey: "noneValue", msg: "None" }];
                callback.map(function (list) {
                    dataList.push(list);
                });
                setList(__assign({}, List, { data: dataList }));
            });
            setLoadOnceOff(false);
            dataBase_1.default.HandelProducts({
                _type: "getPOSList",
                layoutType: "all_purcheased",
                branch: props.User.userLogged.department,
            }, function (receiveCallback) {
                var data = [];
                receiveCallback[0].map(function (list) {
                    if (!list.isMaster)
                        data.push(list);
                });
                setTimeout(function () {
                    setMainCategory(data);
                }, 200);
            });
            dataBase_1.default.PaymentMode({ _type: "get_payments_mode" }, function (receiveCallback) {
                setPayment_mode(receiveCallback);
            });
        }
        if (props.TableActions.isSet) {
            if (props.TableActions.action === "close_left_drawer & open_bottom_drawer") {
                props.dispatchEvent({
                    type: "CLEARTABLEACTIONS",
                    ActionType: "close_left_drawer & open_bottom_drawer",
                });
                setDrawerState(__assign({}, Drawerstate, { bottom: true }));
                // setGrandTotal(props.Cart.total);
                CalculateTotal();
                setValues(__assign({}, values, { totaltoPay: props.Cart.total }));
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
                setValues(__assign({}, values, { totaltoPay: props.Cart.total }));
                setEditList(true);
                // toggleDrawer("tables", false);
            }
        }
        if (props.TableReducer.name !== "" && props.TableReducer.state === true) {
            if (props.TableReducer.name !== "") {
                dataBase_1.default.HandleTables({
                    _type: "setMyTabes",
                    user: props.User.userLogged.userName,
                    table: props.TableReducer.name,
                    date: moment().format("DD-MMM-YYYY"),
                    time: moment().format("LTS"),
                    total: GrandTotal,
                    qty: 1,
                    product_list: { data: props.Cart.items },
                }, function (callback) {
                    RestCartList("");
                    props.dispatchEvent({
                        type: "SETCOUNT",
                        count: callback.length,
                    });
                    react_toastify_1.toast("Table added successfuly", {
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
                props.dispatchEvent({
                    type: "TABLESET",
                    table_name: "",
                });
            }
            else
                react_toastify_1.toast("You have to select table", {
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
    var loadCustomers = function () {
        dataBase_1.default.HandleCustomers({ _type: "get" }, function (reciveCallback) {
            setState(__assign({}, state, { customerList: reciveCallback.customers }));
        });
    };
    var CalculateTax = function (sellingPrice) {
        var tax_rate = props.Tax.tax_rate / 100;
        var totalTaxRate = sellingPrice * tax_rate;
        if (props.Cart.istaxed) {
            setTotalTax(totalTaxRate);
        }
        else if (props.TicketConfig.taxInvoice) {
            setTotalTax(totalTaxRate);
        }
        setTotalTaxFinal(totalTaxRate);
    };
    var handleQchange = function (type) {
        if (type === "add") {
            if (StockInstore === 0) {
                alert("Out of stock");
            }
            else {
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
        }
        else if (type === "remove") {
            props.dispatchEvent({
                type: "REMOVEQU",
                items: nodeCall.items,
                productKey: nodeCall.productKey,
            });
            if (qu >= 2)
                setQu(qu - 1);
            CalculateTax(props.Cart.total);
        }
        else {
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
    var SplitPayment = function (event) {
        var _a;
        setSliptPayment(__assign({}, sliptPayment, (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    // Slipt Payment
    var makeSliptPayment = function () {
        var compValue = parseInt(sliptPayment.sliptCard) + parseInt(sliptPayment.sliptCash);
        if (compValue === GrandTotal) {
            makePayment("Split", "split");
            setSliptOpen(false);
            setSliptErrors(__assign({}, sliptErrors, { paymentErrorMsg: "" }));
        }
        else {
            setSliptErrors(__assign({}, sliptErrors, { paymentErrorMsg: "Split payment total is not amounting to the total cost price (" + values.totaltoPay + "). Please make sure the value is equal" }));
        }
    };
    // Print Order
    var PrintOrder = function () {
        if (props.Cart.items.length != 0) {
            var data = {
                user: props.User.userLogged.userName,
                data: props.Cart.items,
            };
            ipcRenderer.send("do_print_order", data);
        }
    };
    var sliptTimeRange = function () {
        var timeSplit = moment().format("HH:mm").split(":");
        var TimeValue = "" + timeSplit[0] + timeSplit[1];
        return parseInt(TimeValue);
    };
    // End of slipt
    var PaymentProcessor = function (type, en) {
        var toPrint = [];
        props.Cart.items.map(function (items) {
            toPrint.push({
                ItemName: items.ItemName,
                Qty: items.qnt,
                Price: items.sallingprice,
                initalPrice: items.initalPrice,
            });
        });
        if (props.TableToPrintReducer.id !== "")
            dataBase_1.default.HandleTables({ _type: "DeleteTableFromMyTables", id: props.TableToPrintReducer.id }, function (callback) {
                props.dispatchEvent({
                    type: "SETCOUNT",
                    count: callback.data.length,
                });
            });
        if (toPrint.length === 0) {
            return alert("Opps we are sorry we can't process an empty list ! selecte items first");
        }
        toggleDrawer("bottom", false);
        if (en !== "history") {
            if (en !== "quotation") {
                generateInvoiceNumber({ type: "get", table: "invNum" }, function (callback) {
                    var invoice = 1;
                    var id = "";
                    if (callback.length !== 0) {
                        invoice = callback[0].invNumber;
                        id = callback[0].id;
                    }
                    dataBase_1.default.HandelReports({
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
                            RtxGrandTotal: en === "mutiple" ? RtxTotal : props.Cart.workP_total,
                            RtxAmountPaid: en === "mutiple"
                                ? values.rtxtotaltoPay
                                : props.Cart.workP_total,
                            RtxChangeDue: RtxChangeDue,
                            RtxBalance: RtxBalanceDue,
                            Card_slipt: sliptPayment.sliptCard === "" ? 0 : sliptPayment.sliptCard,
                            Cash_slipt: sliptPayment.sliptCash === "" ? 0 : sliptPayment.sliptCash,
                            // Date: moment().format("ddd MMM Do, YYYY"),
                            Date: moment().format("DD-MMM-YYYY"),
                            Datetrack: moment().format("MM/DD/YYYY"),
                            DateTrackNumber: parseInt(DateNumInput),
                            // time: moment().format("LT"),
                            user: props.User.userLogged.id,
                            department: props.User.userLogged.department,
                            company: props.Dep.dep,
                            paymentType: paymentModeSelected !== "" ? paymentModeSelected : en,
                            // isMuti: en,
                            isTaxInvoice: props.TicketConfig.taxInvoice,
                            note: props.TicketNote.note,
                            time: moment().format("HH:mm"),
                            timeRange: sliptTimeRange(),
                            Discount: values.discount,
                            totalTaxFinal: totalTaxFinal,
                            totalTax: totalTax,
                            year: year,
                            day: day,
                            month: month,
                            currency: props.UseCurrency.currencyInUse.currency.symbol_native,
                        },
                    }, function (callback) { });
                    props.dispatchEvent({
                        type: "SAVETICKET",
                        defaultList: props.TicketOut.Tickets,
                        payload: {
                            ticketHeader: en === "quotation"
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
                            RtxGrandTotal: en === "mutiple" ? GrandTotal : props.Cart.workP_total,
                            RtxAmountPaid: en === "mutiple"
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
                            paymentType: paymentModeSelected !== "" ? paymentModeSelected : en,
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
                    generateInvoiceNumber({
                        table: "invNum",
                        type: "set",
                        inv: invoice,
                        id: id,
                    }, function (callback) { });
                });
            }
            else {
                generateQuotationNumber({ type: "get", table: "qutNum" }, function (callback) {
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
                            ticketHeader: en === "quotation" ? "Quotation No" : "Cash Sale Receipt No",
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
                            RtxGrandTotal: en === "mutiple" ? GrandTotal : props.Cart.workP_total,
                            RtxAmountPaid: en === "mutiple"
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
                            paymentType: en === "mutiple" || en === "cash"
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
                            currency: props.UseCurrency.currencyInUse.currency.symbol_native,
                        },
                    });
                    generateInvoiceNumber({
                        table: "qutNum",
                        type: "set",
                        inv: quot,
                        id: id,
                    }, function (callback) { });
                });
            }
        }
        else {
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
                    AmountPaid: en === "cash"
                        ? props.Cart.total
                        : en === "card"
                            ? props.Cart.total
                            : values.totaltoPay,
                    ChangeDue: ChangeDue,
                    Balance: BalanceDue,
                    RtxGrandTotal: en === "mutiple" ? GrandTotal : props.Cart.workP_total,
                    RtxAmountPaid: en === "mutiple" ? values.rtxtotaltoPay : props.Cart.workP_total,
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
        setTimeout(function () {
            setBalanceDue(0);
            setChangeDue(0);
            setRtxBalanceDue(0);
            setRtxChangeDue(0);
            setValues(__assign({}, values, { discount: 0, amount: 0 }));
            RestCartList("");
            if (props.TableActions.isSet)
                dataBase_1.default.HandleTables({ _type: "DeleteTableFromMyTables", id: props.TableActions.id }, function (callback) {
                    dataBase_1.default.HandleTables({ _type: "getMyTabes" }, function (reciveCallback) {
                        props.dispatchEvent({
                            type: "SETCOUNT",
                            count: reciveCallback.data.length,
                        });
                        props.dispatchEvent({
                            type: "CLEARTABLEACTIONS",
                        });
                    });
                });
        }, 900);
        isPaid(true);
        setState(__assign({}, state, { customer: "Walk in customer" }));
    };
    var makePayment = function (type, en) {
        setinvEn(en);
        if (values.discount === 0) {
            PaymentProcessor(type, en);
        }
        else {
            handleClickOpenPassDailogRequest();
        }
    };
    var handlePasswordAuth = function () {
        dataBase_1.default.HandleLogIn({ pin: AdminPass, name: "" }, function (reciveCallback) {
            if (reciveCallback.isLoggedIn) {
                if (reciveCallback.config.prevarges === "1") {
                    PaymentProcessor("type", invEn);
                    closePassDailogPassRequest();
                }
                else
                    setRequestPass(true);
            }
            else
                setRequestPass(true);
        });
        // console.log(props.User);
    };
    var handleClickOpenPassDailogRequest = function () {
        setOpenPassDailogRequest(true);
    };
    var closePassDailogPassRequest = function () {
        setOpenPassDailogRequest(false);
    };
    var generateInvoiceNumber = function (props, sendCallback) {
        if (props.type === "get")
            dataBase_1.default.HandleinvNumber({ type: "get", _type: "invo" }, function (callback) {
                sendCallback(callback.data);
            });
        else if (props.type === "set")
            dataBase_1.default.HandleinvNumber({ type: "set", _type: "invo", inv: props.inv, id: props.id }, function (callback) {
                sendCallback(callback.data);
            });
    };
    var generateQuotationNumber = function (props, sendCallback) {
        if (props.type === "get")
            dataBase_1.default.HandleinvNumber({ type: "get", _type: "quot" }, function (callback) {
                sendCallback(callback.data);
            });
        else if (props.type === "set")
            dataBase_1.default.HandleinvNumber({ type: "set", _type: "quot", inv: props.inv, id: props.id }, function (callback) {
                sendCallback(callback.data);
            });
    };
    // Rest Cart
    var RestCartList = function (data) {
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
    var PrintTicket = function (info) { };
    var handleDelete = function () { };
    var search = function (event, item) {
        if (item.isMulity) {
            props.dispatchEvent({
                type: "TICKTSEARCHPRODUCT",
                payload: {
                    item: item,
                    isSet: true,
                },
            });
        }
        else {
            props.dispatchEvent({
                type: "ADDTOCART",
                payload: {
                    items: item,
                },
            });
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(Dialog_1.default, { open: openPassDailogRequest, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
                React.createElement(DialogTitle_1.default, { id: "form-dialog-title" }, "Admin Password"),
                React.createElement(DialogContent_1.default, null,
                    React.createElement(DialogContentText_1.default, null, "To apply this discount, please enter an administrator password here. We will automatically apply the discount after."),
                    React.createElement(TextField_1.default, { autoFocus: true, margin: "dense", id: "name", name: "passAuth", value: AdminPass, onChange: function (event) {
                            setAdminPass(event.target.value);
                        }, label: "Password", type: "password", color: "secondary", fullWidth: true }),
                    React.createElement("div", null, requestPass ? (React.createElement(semantic_ui_react_1.Message, { negative: true },
                        React.createElement(semantic_ui_react_1.Message.Header, null, "We're sorry we can't apply that discount"),
                        React.createElement("p", null, "The password you entered is invalid"))) : null)),
                React.createElement(DialogActions_1.default, null,
                    React.createElement(Button_1.default, { onClick: closePassDailogPassRequest }, "Cancel"),
                    React.createElement(Button_1.default, { onClick: handlePasswordAuth }, "Submit Password")))),
        React.createElement("div", { style: {
                padding: 2,
                width: "100%",
                backgroundColor: props.TicketConfig.taxInvoice
                    ? "#9A4200"
                    : "#9A4200",
                color: "#fff",
            } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                React.createElement(styles_2.ThemeProvider, { theme: darkTheme },
                    React.createElement("div", { style: { width: 200, marginTop: -29 } },
                        React.createElement(Autocomplete_1.default, { options: MainCategory, getOptionLabel: function (option) { return option.ItemName; }, id: "debug", onChange: search, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "Search Products...", margin: "normal" }))); } }))),
                React.createElement(styles_2.ThemeProvider, { theme: darkTheme },
                    React.createElement(FormControl_1.default, { color: "secondary", className: classes.formControl },
                        React.createElement(NativeSelect_1.default, { value: state.customer, onChange: handleChange("customer"), name: "ticketType", inputProps: { "aria-label": "ticketType" } },
                            React.createElement("option", { value: "customer" }, "Walk in customer"),
                            state.customerList.map(function (customers) {
                                return (React.createElement("option", { key: customers.id, value: customers.id }, customers.name));
                            })))),
                React.createElement("div", { style: { marginTop: 5 } },
                    React.createElement(Chip_1.default, { icon: React.createElement(TableChart_1.default, null), label: props.TableReducer.name, onClick: function () {
                            setOpenTableList(true);
                        }, onDelete: handleDelete, color: "primary" })))),
        React.createElement("div", { style: { height: "63vh" } },
            React.createElement("div", { className: classes.root, style: {
                    height: "48vh",
                    overflow: "auto",
                    backgroundColor: props.Theme.theme === "light" ? "#EEEEEE" : "#0E0E0E",
                } }, props.Cart.items.map(function (items, index) {
                // console.log(items);
                return (React.createElement("div", { key: items.productKey },
                    React.createElement(ListItem_1.default, { style: { padding: 0 }, button: true, selected: selectedIndex === items.productKey, onClick: function (event) {
                            handleListItemClick(event, items.productKey);
                            setStockInstore(items.amountInstore);
                            setQu(items.qnt);
                            setNodeCall({
                                items: props.Cart.items,
                                productKey: items.productKey,
                                amountInstore: items.amountInstore,
                            });
                        } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(IconButton_1.default, { "aria-controls": "simple-menu", "aria-haspopup": "true", onClick: handleClick },
                                React.createElement(AddCircle_1.default, null))),
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(IconButton_1.default, { "aria-controls": "simple-menu", "aria-haspopup": "true", onClick: function (e) { return handleExtraClick(e, items, index); } },
                                React.createElement(More_1.default, null))),
                        React.createElement(ListItemText_1.default, { primary: React.createElement(Typography_1.default, { style: { width: 200 } }, items.ItemName), secondary: React.createElement("div", null,
                                React.createElement("div", null, props.TicketToPrint.active
                                    ? items.qnt === 1
                                        ? "got " + items.qnt + " item"
                                        : "got " + items.qnt + " items"
                                    : "we have added " + items.qnt + " and " + items.amountInstore + " left"),
                                React.createElement("div", { style: { color: "teal" } }, items.extraMsg
                                    ? items.extraMsg !== "None"
                                        ? "Extra Massage: " + items.extraMsg
                                        : null
                                    : null)) }),
                        React.createElement(ListItemSecondaryAction_1.default, null,
                            React.createElement(Typography_1.default, { style: { marginTop: -35, color: "red" }, variant: "h6" },
                                React.createElement(Currency, { locale: "en", quantity: items.initalPrice * items.qnt, symbol: props.UseCurrency.currencyInUse.currency.symbol_native }))))));
            })),
            React.createElement(core_1.Divider, null),
            React.createElement(core_1.Divider, null),
            React.createElement(core_1.Paper, { className: classes.totalsView },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                    React.createElement(Typography_1.default, { style: { color: "#FF5555", marginLeft: 8 }, variant: "h5" }, "Total"),
                    React.createElement(Typography_1.default, { style: { color: "#FF5555", marginRight: 5 }, variant: "h3" },
                        React.createElement(Currency, { locale: "en", quantity: GrandTotal, symbol: props.UseCurrency.currencyInUse.currency.symbol_native }))))),
        React.createElement("div", { style: { paddingBottom: 10 } },
            state.ticketType === "quotation" ? (React.createElement("div", null,
                React.createElement(Button_1.default, { onClick: function () { return makePayment("quotation", "quotation"); }, variant: "contained", className: classes.botton5 },
                    React.createElement(Typography_1.default, null, "Print Out Quotation ")))) : (React.createElement("div", { style: { marginLeft: 5 } },
                editList ? (React.createElement("div", null,
                    React.createElement(Button_1.default, { disabled: props.TicketToPrint.active, onClick: function () {
                            // props.Cart.items
                            dataBase_1.default.HandleTables({
                                _type: "updateTable",
                                user: props.TableToPrintReducer.userName,
                                table: props.TableToPrintReducer.table,
                                product_list: { data: props.Cart.items },
                            }, function (callback) {
                                RestCartList("");
                                react_toastify_1.toast("Table Updated successfuly", {
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
                        }, className: classes.botton4, style: {
                            backgroundColor: props.TicketToPrint.active
                                ? "#CCCED7"
                                : "#9A43A8",
                            width: "55%",
                        } },
                        React.createElement(Typography_1.default, { style: { color: "#fff" } }, "Save to table")))) : (React.createElement("div", null,
                    React.createElement(Button_1.default, { disabled: props.TicketToPrint.active, onClick: toggleDrawer("bottom", true), className: classes.botton4, style: {
                            backgroundColor: props.TicketToPrint.active
                                ? "#CCCED7"
                                : "#9A43A8",
                            width: "55%",
                        } },
                        React.createElement(Typography_1.default, { style: { color: "#fff" } }, "Close sale")),
                    React.createElement(Button_1.default, { disabled: props.TicketToPrint.active, onClick: function () {
                            // PrintOrder();
                            // setOpenOrdreMdodel(true);
                            setWhatToSave(props.Cart);
                            setOpenTableList(true);
                        }, className: classes.botton1, style: {
                            backgroundColor: props.TicketToPrint.active
                                ? "#CCCED7"
                                : "#9A43A8",
                            width: "28%",
                        } },
                        React.createElement(Typography_1.default, { style: { color: "#fff" } }, "Save To Tables")))),
                React.createElement("div", null,
                    React.createElement(Modal_1.default, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openTableList, className: classes.modal },
                        React.createElement(TableLayout_1.default, { data: whatToSave, total: GrandTotal }))),
                React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: openOrdreMdodel, onClose: function () { return setOpenOrdreMdodel(false); }, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                        timeout: 500,
                    } },
                    React.createElement(Fade_1.default, { in: openOrdreMdodel },
                        React.createElement("div", { className: classes.paper },
                            React.createElement("div", { style: { marginTop: 5 } },
                                React.createElement(Typography_1.default, { style: {
                                        color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
                                    }, variant: "h5" }, "Do you want to")),
                            React.createElement("div", { style: { marginTop: 10 } },
                                React.createElement(Button_1.default, { onClick: function () {
                                        setOpenOrdreMdodel(false);
                                    }, variant: "contained" }, "Print out invoice"),
                                React.createElement(Button_1.default, { style: { marginLeft: 5 }, onClick: function () {
                                        setOpenOrdreMdodel(false);
                                        // console.log(props.Cart.items);
                                        if (props.TableReducer.name !== "")
                                            dataBase_1.default.HandleTables({
                                                _type: "setMyTabes",
                                                user: props.User.userLogged.userName,
                                                table: props.TableReducer.name,
                                                date: moment().format("DD-MMM-YYYY"),
                                                time: moment().format("LTS"),
                                                total: props.Cart.total,
                                                qty: 1,
                                                product_list: { data: props.Cart.items },
                                            }, function (callback) {
                                                RestCartList("");
                                                props.dispatchEvent({
                                                    type: "SETCOUNT",
                                                    count: callback.data.length,
                                                });
                                                react_toastify_1.toast("Table added successfuly", {
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
                                        else
                                            react_toastify_1.toast("You have to select table", {
                                                position: "top-right",
                                                autoClose: 5000,
                                                type: "error",
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                    }, variant: "contained" }, "Save to my tables"),
                                React.createElement(Button_1.default, { style: { marginLeft: 8 }, variant: "contained", color: "secondary", onClick: function () { return setOpenOrdreMdodel(false); } }, "cancel"))))),
                React.createElement(Drawer_1.default, { anchor: "bottom", open: Drawerstate.bottom, onClose: toggleDrawer("bottom", false) },
                    React.createElement("div", { className: classes.bottom },
                        React.createElement("div", { style: {
                                marginTop: 10,
                                marginRight: 10,
                                display: "flex",
                                justifyContent: "space-between",
                            } },
                            React.createElement("div", { style: { marginLeft: 20 } },
                                React.createElement(Typography_1.default, { style: { color: "green" }, variant: "h4" }, "Checkout")),
                            React.createElement(IconButton_1.default, { onClick: toggleDrawer("bottom", false) },
                                React.createElement(Close_1.default, null))),
                        React.createElement("div", { style: { padding: 10, display: "flex" } },
                            React.createElement(core_1.Paper, { style: {
                                    width: "40%",
                                    height: "73vh",
                                    overflow: "auto",
                                    backgroundColor: props.Theme.theme === "light" ? "#EEEEEE" : "#212121",
                                } }, props.Cart.items.map(function (items) {
                                return (React.createElement("div", { key: items.productKey },
                                    React.createElement(ListItem_1.default, { button: true, selected: selectedIndex === items.productKey, onClick: function (event) {
                                            handleListItemClick(event, items.productKey);
                                            setStockInstore(parseInt(items.amountInstore));
                                            setQu(items.qnt);
                                            setNodeCall({
                                                items: props.Cart.items,
                                                productKey: items.productKey,
                                                amountInstore: items.amountInstore,
                                            });
                                        } },
                                        React.createElement(ListItemIcon_1.default, null,
                                            React.createElement(ShoppingCart_1.default, null)),
                                        React.createElement(ListItemText_1.default, { primary: React.createElement(Typography_1.default, { variant: "h6" }, items.ItemName), secondary: "we have added " + items.qnt + " and " + items.amountInstore + " left" }))));
                            })),
                            React.createElement("div", { style: {
                                    width: "60%",
                                    padding: 10,
                                } },
                                React.createElement("div", { style: {
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    } },
                                    React.createElement(Typography_1.default, { variant: "h2", style: { color: "#FF8D8D" } }, "Total"),
                                    React.createElement("div", null,
                                        React.createElement(Typography_1.default, { variant: "h2", style: { color: "#FF8D8D" } },
                                            React.createElement(Currency, { locale: "en", quantity: GrandTotal, symbol: props.UseCurrency.currencyInUse.currency
                                                    .symbol_native })),
                                        React.createElement("div", { style: {
                                                width: 300,
                                                backgroundColor: "#494B4A",
                                                height: 2,
                                            } }))),
                                React.createElement("div", { style: {
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                    } },
                                    React.createElement(Typography_1.default, { variant: "h4", style: {
                                            color: props.Theme.theme === "light"
                                                ? "#525453"
                                                : "#EBECEB",
                                            marginLeft: 20,
                                        } }, "Amount Paid"),
                                    React.createElement("div", null,
                                        React.createElement(FormControl_1.default, { fullWidth: true, className: classes.margin, variant: "outlined" },
                                            React.createElement(core_1.InputLabel, { htmlFor: "outlined-adornment-amount" }, "Amount"),
                                            React.createElement(core_1.OutlinedInput, { disabled: values.discount === 0 ? false : true, style: { height: 70, fontSize: 25 }, id: "outlined-adornment-amount", value: values.amount, onChange: handlePaidChange("amount"), error: amountPaidErr, startAdornment: React.createElement(core_1.InputAdornment, { position: "start" }, "K"), labelWidth: 60 })))),
                                React.createElement("div", { style: {
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: 15,
                                    } },
                                    React.createElement(Typography_1.default, { variant: "h4", style: {
                                            color: props.Theme.theme === "light"
                                                ? "#525453"
                                                : "#EBECEB",
                                            marginLeft: 20,
                                        } }, "Discount"),
                                    React.createElement("div", null,
                                        React.createElement(FormControl_1.default, { fullWidth: true, className: classes.margin, variant: "outlined" },
                                            React.createElement(core_1.InputLabel, { htmlFor: "outlined-adornment-discount" }, "Discount"),
                                            React.createElement(core_1.OutlinedInput, { style: { height: 70, fontSize: 25 }, id: "outlined-adornment-discount", value: values.discount, onChange: handlePaidChange("discount"), startAdornment: React.createElement(core_1.InputAdornment, { position: "start" }, props.UseCurrency.currencyInUse.currency
                                                    .symbol_native), labelWidth: 60 })),
                                        React.createElement("div", null,
                                            React.createElement(Button_1.default, { variant: "outlined", onClick: function () {
                                                    applyDiscount();
                                                } }, "Apply discount")))),
                                React.createElement("div", { style: { marginLeft: 20, width: "80%", marginTop: 20 } },
                                    React.createElement("div", { style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                        } },
                                        React.createElement(Typography_1.default, { variant: "h6" }, "Change due:"),
                                        React.createElement(Typography_1.default, { variant: "h6" },
                                            React.createElement(Currency, { locale: "en", quantity: ChangeDue, symbol: props.UseCurrency.currencyInUse.currency
                                                    .symbol_native }))),
                                    React.createElement("div", { style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                        } },
                                        React.createElement(Typography_1.default, { variant: "h6" }, "Grand Total:"),
                                        React.createElement(Typography_1.default, { variant: "h6" },
                                            React.createElement(Currency, { locale: "en", quantity: GrandTotal, symbol: props.UseCurrency.currencyInUse.currency
                                                    .symbol_native }))),
                                    React.createElement("div", { style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                        } },
                                        React.createElement(Typography_1.default, { variant: "h6" }, "Balance due:"),
                                        React.createElement(Typography_1.default, { variant: "h6" },
                                            React.createElement(Currency, { locale: "en", quantity: BalanceDue, symbol: props.UseCurrency.currencyInUse.currency
                                                    .symbol_native })))),
                                React.createElement("div", { style: { marginTop: 50 } },
                                    React.createElement(Button_1.default, { onClick: function (event) {
                                            if (values.amount === 0 && values.discount === 0) {
                                                setamountPaidErr(true);
                                                return;
                                            }
                                            if (values.totaltoPay > values.amount &&
                                                values.discount === 0) {
                                                setamountPaidErr(true);
                                                react_toastify_1.toast("Tendered is less then amount due", {
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
                                            setDrawerState(__assign({}, Drawerstate, { bottom: false }));
                                            makePayment("Cash Payment", "Cash");
                                            // handleClick2(event);
                                        }, style: { height: 70, marginRight: 10 }, variant: "contained", color: "primary" },
                                        React.createElement(Typography_1.default, { variant: "h5" }, "Cash payment")),
                                    React.createElement(Button_1.default, { disabled: props.TicketToPrint.active, onClick: function (event) {
                                            if (values.amount === 0 && values.discount === 0) {
                                                setamountPaidErr(true);
                                                return;
                                            }
                                            if (values.totaltoPay > values.amount) {
                                                setamountPaidErr(true);
                                                return;
                                            }
                                            setDrawerState(__assign({}, Drawerstate, { bottom: false }));
                                            // handleClick2(event);
                                            makePayment("Card Payment", "Card");
                                        }, style: {
                                            backgroundColor: props.TicketToPrint.active
                                                ? "#CCCED7"
                                                : "#0D6FBD",
                                            height: 70,
                                            marginRight: 10,
                                        } },
                                        React.createElement(Typography_1.default, { style: { color: "#fff" }, variant: "h5" }, "Credit Card")),
                                    React.createElement(Button_1.default, { disabled: props.TicketToPrint.active, onClick: function (event) {
                                            setSliptOpen(true);
                                        }, style: {
                                            backgroundColor: props.TicketToPrint.active
                                                ? "#CCCED7"
                                                : "#0D6FBD",
                                            height: 70,
                                            marginRight: 10,
                                        } },
                                        React.createElement(Typography_1.default, { style: { color: "#fff" }, variant: "h5" }, "Split Payment")),
                                    React.createElement(Button_1.default, { disabled: props.TicketToPrint.active, variant: "contained", color: "secondary", onClick: function (event) {
                                            setPaymentModeOpen(true);
                                        }, style: {
                                            height: 70,
                                            marginRight: 10,
                                        } },
                                        React.createElement(Typography_1.default, { style: { color: "#fff" }, variant: "h5" }, "Other Payment Mode")),
                                    React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: paymentModeOpen, onClose: function () { return setPaymentModeOpen(false); }, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                                            timeout: 500,
                                        } },
                                        React.createElement(Fade_1.default, { in: paymentModeOpen },
                                            React.createElement("div", { className: classes.paper2 },
                                                React.createElement(core_1.Divider, null),
                                                React.createElement("div", null, "Payment Mode"),
                                                React.createElement(core_1.Divider, null),
                                                React.createElement("div", { style: { marginTop: 10 } },
                                                    React.createElement(Autocomplete_1.default, { id: "combo-box-demo", options: payment_mode, getOptionLabel: function (option) { return option.pay_type; }, onInputChange: function (event, newInputValue) {
                                                            setPaymentModeSelected(newInputValue);
                                                        }, style: { width: 300 }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "Combo box", variant: "outlined" }))); } })),
                                                React.createElement("div", { style: { marginTop: 10 } },
                                                    React.createElement(Button_1.default, { onClick: function () {
                                                            if (values.amount === 0 &&
                                                                values.discount === 0) {
                                                                setamountPaidErr(true);
                                                                return;
                                                            }
                                                            if (values.totaltoPay > values.amount) {
                                                                setamountPaidErr(true);
                                                                return;
                                                            }
                                                            makePayment("Cash Payment", "mutiple");
                                                        }, variant: "contained", color: "primary" }, "Make Payment"))))),
                                    React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: open, onClose: handleCloseAlert, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                                            timeout: 500,
                                        } },
                                        React.createElement(Fade_1.default, { in: open },
                                            React.createElement("div", { className: classes.paper },
                                                React.createElement(Typography_1.default, { variant: "h6" }, AlertMsg)))),
                                    React.createElement(Modal_1.default, { "aria-labelledby": "transition-modal-title", "aria-describedby": "transition-modal-description", className: classes.modal, open: sliptOpen, onClose: handleCloseAlert, closeAfterTransition: true, BackdropComponent: Backdrop_1.default, BackdropProps: {
                                            timeout: 500,
                                        } },
                                        React.createElement(Fade_1.default, { in: sliptOpen },
                                            React.createElement("div", { className: classes.paper2 },
                                                React.createElement("div", null,
                                                    React.createElement("form", null,
                                                        React.createElement(TextField_1.default, { id: "outlined-basic", label: "Cash Payment", variant: "outlined", name: "sliptCash", fullWidth: true, type: "number", value: sliptPayment.sliptCash, onChange: SplitPayment }),
                                                        React.createElement("div", { style: { marginTop: 15 } }),
                                                        React.createElement(core_1.Divider, null),
                                                        React.createElement(TextField_1.default, { style: { marginTop: 15 }, id: "outlined-basic", label: "Card Payment", variant: "outlined", type: "number", name: "sliptCard", fullWidth: true, value: sliptPayment.sliptCard, onChange: SplitPayment }))),
                                                sliptErrors.paymentErrorMsg != "" ? (React.createElement(semantic_ui_react_1.Message, { error: true, negative: true },
                                                    React.createElement(semantic_ui_react_1.Message.Header, null, "There was some errors with your submission"),
                                                    React.createElement("p", null, sliptErrors.paymentErrorMsg))) : null,
                                                React.createElement("div", { style: { marginTop: 15 } }),
                                                React.createElement(core_1.Divider, null),
                                                React.createElement(Button_1.default, { style: { marginTop: 15 }, variant: "contained", onClick: makeSliptPayment }, "Make payment"),
                                                React.createElement(Button_1.default, { style: { marginLeft: 7, marginTop: 15 }, variant: "contained", color: "primary", onClick: function () { return setSliptOpen(false); } }, "Cancel Sale")))))))),
                    React.createElement(Menu_1.default, { id: "simple-menu", anchorEl: anchorEl2, keepMounted: true, open: Boolean(anchorEl2) },
                        React.createElement("div", { style: {
                                width: 250,
                                height: 100,
                                textAlign: "center",
                                justifyContent: "center",
                            } },
                            React.createElement("div", { style: { marginTop: 40 } },
                                React.createElement(Typography_1.default, { variant: "h6" }, "Payment Successful")),
                            React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: function (event) {
                                    handleClose2();
                                    isPaid(false);
                                    toggleDrawer("bottom", false);
                                }, style: { width: 200 } }, "Okay")))))),
            React.createElement("div", { style: { marginTop: 5, marginBottom: 5, display: "flex" } },
                React.createElement(Button_1.default, { onClick: RestCartList, variant: "contained", style: { marginLeft: 5 }, className: classes.botton4 },
                    React.createElement(Typography_1.default, null, "Cancel Sale")),
                React.createElement(Button_1.default, { onClick: function () {
                        makePayment("history", "history");
                    }, variant: "contained", color: "primary", disabled: props.TicketToPrint.active ? false : true, style: { width: 145 } },
                    React.createElement(Typography_1.default, null, "Print")))),
        React.createElement(Menu_1.default, { id: "simple-menu", anchorEl: anchorEl3, keepMounted: true, open: Boolean(anchorEl3), onClose: handleClose3 },
            React.createElement("div", { style: { padding: 10, width: 200 } }, List.data.map(function (list, index) {
                return (React.createElement(ListItem_1.default, { button: true, key: index, onClick: function (event) {
                        // setExtraMsg(list.msg);
                        if (list.msg === "None")
                            props.Cart.items[selectedExtraIndex].extraMsg = null;
                        else
                            props.Cart.items[selectedExtraIndex].extraMsg = list.msg;
                        handleClose3();
                        // console.log(props.Cart.items[selectedExtraIndex]);
                    } },
                    React.createElement(ListItemText_1.default, { primary: React.createElement(Typography_1.default, { style: { width: 200, color: "#3b3b3" } }, list.msg) })));
            }))),
        React.createElement(Menu_1.default, { id: "simple-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose },
            React.createElement("div", { style: { padding: 10 } },
                React.createElement("div", { style: { display: "flex", marginBottom: 20 } },
                    React.createElement(IconButton_1.default, { onClick: function () { return handleQchange("add"); }, "aria-label": "delete" },
                        React.createElement(Add_1.default, null)),
                    React.createElement(Typography_1.default, { variant: "h5", style: { marginTop: 5 } }, qu),
                    React.createElement(IconButton_1.default, { onClick: function () { return handleQchange("remove"); }, "aria-label": "delete" },
                        React.createElement(RemoveCircle_1.default, null))),
                React.createElement(Button_1.default, { onClick: function () { return handleQchange("delete"); }, variant: "contained", color: "secondary", startIcon: React.createElement(Delete_1.default, null) }, "Delete")))));
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
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map