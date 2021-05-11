import React = require("react");
import {
  Paper,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import AppBar from "@material-ui/core/AppBar";
import { Clock } from "grommet";
// import { Button } from "@blueprintjs/core";
import { Route, useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";

import SelectionPan from "./screens/SelectionPan";
import LoginPage from "./screens/LoginPage";
import WorkPeriod from "./screens/WorkPeriod";
import Pos from "./screens/Pos";
import Tickets from "./screens/Tickets";
import Accouts from "./screens/Accounts";
import AccountDetails from "./screens/Accounts/AccountDetails";
import Warehouses from "./screens/Warehouses";
import DepartmentView from "./screens/Departments/DepartmentView";
import Reports from "./screens/Reports";
import Settings from "./screens/Settings";
import NewWorkPeriod from "./screens/WorkPeriod/NewWorkPeriod";
import Notifications from "./screens/Notifications";
import appDb from "./redux/dataBase";
import Drawer from "@material-ui/core/Drawer";
import Dep_Notifications from "./screens/Departments/Dep_Notifications";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@material-ui/core/Modal";

import { remote } from "electron";
import useWindowDimensions from "./components/Icons/WindowSize";
import Meuns from "./screens/Meuns";
import Expenses from "./screens/Reports/Expenses/Expenses";
import BarcodeReader from "react-barcode-reader";
import Masters from "./screens/Masters";
import Licence from "./screens/Licence";
import SettingsIcon from "@material-ui/icons/Settings";
import DbSettings from "./screens/DbSettings";

const electron = require("electron");
const mainWindow = remote.getCurrentWindow();
const socketIOClient = require("socket.io-client");
const moment = require("moment");
const socketUrl = "http://localhost:3200";
// const socketUrl = "https://switch-smart.herokuapp.com/";
const { ipcRenderer } = require("electron");

// Moment valz
var date = new Date();
var check = moment(date);
var day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
var month = check.format("MMMM"); // => ('January','February ----)
var year = check.format("YYYY");

// Theme layout
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

// Tool tip
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const Accapp = (props) => {
  const [conn, setConn] = React.useState({ Connected: false });
  const [iSConnecting, setiSConnecting] = React.useState(true);
  const [LoadingBackUp, setLoadingBackUp] = React.useState(false);
  const [OpenSettings, setOpenSettings] = React.useState(false);
  const [Drawerstate, setDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    bottom2: false,
    right: false,
  });
  const [LoadOnce, setLoadOnce] = React.useState(true);
  const { height, width } = useWindowDimensions();
  const history = useHistory();

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: "90vw",
      position: "absolute",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
    },
  }));

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...Drawerstate, [side]: open });
  };

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    des: "",
    amount: 0,
    type: "expenses",
  });
  var [shotbarcode, setshotbarcode] = React.useState("");
  const [showMaster, setshowMaster] = React.useState(false);
  const [showUsers, setShowUsers] = React.useState(false);
  const [sockTaking, setSockTaking] = React.useState(false);
  const [users, setUsers] = React.useState({ data: [] });

  const [themeSet, setThemeSet] = React.useState("light");

  const handleOnKeyPress = (key) => {
    // console.log(key);
    if (key !== "Enter") {
      shotbarcode = shotbarcode + key;
      setshotbarcode(shotbarcode);
    }

    if (key === "Enter") {
      if (shotbarcode === "L") {
        setshowMaster(true);
        setshotbarcode("");
      } else {
        setshotbarcode("");
        // setshowMaster(false);
      }
    }
  };

  const handleOnChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.name });
  };

  const handleSubmit = () => {
    appDb.HandelReports(data, (callback) => {
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

  React.useEffect(() => {
    appDb.HandelProducts({ _type: "get_license_config" }, (callback) => {
      // console.log(callback);

      if (callback.length === 0) history.push("/licence");
      else {
        appDb.HandelProducts(
          { _type: "validateLicense", Licence: callback[0].licenseKey },
          (LicenseCallback) => {
            if (LicenseCallback.message === "ok") history.push("/");
            else history.push("/licence");
          }
        );
      }
    });

    if (LoadOnce) {
      setLoadOnce(false);

      appDb.HandleCurrency({ _type: "getCurrence" }, (reciveCallback) => {
        console.log(reciveCallback[0]);

        props.dispatchEvent({
          type: "SETCURRENCY",
          currency: reciveCallback[0],
        });
      });
      // check for expired stock
      CheckForExpiredStock();

      mainWindow.maximize();

      setTimeout(() => {
        initiSocket();
      }, 3000);

      appDb.HandleTheme({ _type: "getTheme" }, (callback) => {
        props.dispatchEvent({ type: "setTheme", setTheme: "light" });
      });

      appDb.HandleWorkperiods({ _type: "loadList" }, (recivedCallback) => {
        if (recivedCallback)
          recivedCallback.map((list) => {
            if (list.dateEnded === "") {
              var initalData = {
                type: "STARTWORKPERIOD",
                id: list.id,
                dateStarted: list.dateStarted,
                dateStartedString: list.dateStartedString,
                date: list.date,
                time: list.time,
                timeEnded: list.timeEnded,
                dateEnded: list.dateEnded,
                dateEndedString: list.dateEndedString,
                note: list.note,
                userId: list.userId,
                department: list.department,
                departmentInfo: list.departmentInfo,
                workedFor: list.workedFor,
                year: list.year,
                month: list.month,
                week: list.week,
                day: list.day,
              };
              props.dispatchEvent(initalData);
            }
          });

        props.dispatchEvent({
          type: "SETWORKPERIOD",
          data: recivedCallback,
        });
      });
    }
    setOpeningMaterials();
    setOpeningBalance();
    // console.log(props.Updater);

    // To remove just for dev only





  }, []);

  const setOpeningMaterials = () => {
    appDb.HandelProducts({ _type: "setOpeningMaterials" }, (callback) => { });
  };

  const setOpeningBalance = () => {
    // setSockTaking(true);
    appDb.HandelProducts({ _type: "setOpeningBalancesReports" }, (callback) => {
      // console.log("done");
      setSockTaking(false);
    });
  };

  const CheckForExpiredStock = () => {
    appDb.HandelDamages({ type: "checkForExpired" }, (callback) => { });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initiSocket = () => {
    appDb.CheckConfig();
    setConn({ ...conn, Connected: false });

    const socket = socketIOClient(socketUrl);

    socket.on("connect", () => {
      setConn({ ...conn, Connected: true });
      props.dispatchEvent({ type: "CONNECTED", socket: socket });
      // Backup.isOnline();
      // console.log("connection");
    });

    // socket.emit("GETSALESTICKETS", (callback) => {
    //   // console.log(callback);
    // });

    socket.on("SALESREPORTLIST", (callback) => {
      // console.log(callback);
    });

    socket.on("disconnect", () => {
      props.dispatchEvent({ type: "CONNCETIONFAILED" });
    });

    socket.on("USER_LOGIN_REQ", (userData) => {
      // console.log(userData)

      appDb.HandleLogIn(
        { pin: userData.userData, name: "" },
        (reciveCallback) => {
          socket.emit("USER_IS_VERIFYED", reciveCallback);
        }
      );
    });

    socket.emit("GET_LOGGEDIN_USERS", () => { });

    socket.on("GET_USER_SAVED_TABLES", (userData) => {
      appDb.HandleTables(
        { _type: "getOpenTablesByUser", userName: userData.userInfo.userName },
        (tables) => {
          socket.emit("USER_TABLES", {
            tables,
            userName: userData.userInfo.userName,
          });
        }
      );
    });

    socket.on("GET_ALL_TABLENAMES", () => {
      appDb.HandleTables({ _type: "get" }, (reciveCallback1) => {
        socket.emit("ALL_TABLENAMES", reciveCallback1.data);
      });
    });

    socket.on("GET_USER_ALLPRODUCTS", (userData) => {
      appDb.HandelProducts(
        { _type: "getPOSList", layoutType: "getGrouped" },
        (receiveCallback) => {
          socket.emit("ALL_PRODUCTS", receiveCallback.productResult[0]);
        }
      );
    });

    socket.on("BACKUPFILES", (data) => {
      setLoadingBackUp(false);
      // console.log(data);
      appDb.HandelProducts({ _type: "backUp", data }, (callback) => { });
    });

    socket.on("TRANSFER_NOTIFICATION", (data) => {
      // console.log(data);
      var datalist = {
        _type: "tranfer",
        value: data.value,
        selected: data.selected,
        state: "recived",
        isCleared: true,
        data: data,
      };

      appDb.HandelProducts(datalist, (callback) => {
        toast(
          `You Have Recived Product(s) ${data.selected.ItemName} ${data.value}`,
          {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
    });

    socket.on("DELIVERY_NOTIFICATION", (data) => {
      var datalist = {
        _type: "tranfer",
        value: data.value,
        selected: data.selected,
        state: "delivery",
        isCleared: true,
        data: data,
      };

      appDb.HandelProducts(datalist, (callback) => {
        toast(
          `Product(s) ${callback.name} (${data.value}) have been successfuly delivered to ${data.to} `,
          {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
    });

    socket.on("ALL_LOG_USERS", (callback) => {
      props.dispatchEvent({
        type: "UserLoggedIn",
        users: callback.users,
      });
    });

    socket.on("SAVETABLEFROMUSER", (userData) => {
      // console.log(userData);
      appDb.HandleTables(
        {
          _type: "setMyTabes",
          user: userData.user.userInfo.userName,
          table: userData.table,
          date: moment().format("DD-MMM-YYYY"),
          time: moment().format("LTS"),
          total: userData.total,
          qty: 1,
          product_list: { data: userData.cart },
        },
        (callback) => {

          props.dispatchEvent({
            type: "SETCOUNT",
            count: callback.length,
          });

          socket.emit("TABLESAVEDFORUSER", { user: userData.user })
        })
    })

    setTimeout(() => {
      setiSConnecting(false);
    }, 300);
  };

  return (
    <ThemeProvider
      theme={props.Theme.theme === "light" ? lightTheme : darkTheme}
    >
      <ToastContainer />
      <Notifications />
      <BarcodeReader
        onKeyDetect={(event) => {
          handleOnKeyPress(event.key);
        }}
      />
      <Paper
        square
        style={{
          width: "100vw",
          height: height,
          overflow: "hidden !important",
        }}
      >
        {/* Top tool bar */}
        <AppBar elevation={1} position="static" color="default">
          <div
            style={{
              width: "100vw",
              paddingLeft: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", marginTop: 10 }}>
              <div>
                <img
                  style={{ width: 30, marginTop: -2, marginRight: 10 }}
                  src={"./assets/icons/logo.png"}
                />
              </div>
              <div>
                <Typography
                  variant="h6"
                  style={{ color: "#AAAAAA", marginTop: 0 }}
                  color="inherit"
                >
                  Chesco POS
                </Typography>
              </div>
            </div>

            <div style={{ marginRight: 26, display: "flex" }}>
              <div style={{ display: "flex", color: "#888080" }}>
                <div style={{ marginTop: 5, marginRight: 10 }}>
                  <Typography variant="h6">{day},</Typography>
                </div>
                <div style={{ marginTop: 5, marginRight: 10 }}>
                  <Typography variant="h6">
                    {month} {date.getDate()},
                  </Typography>
                </div>
                <div style={{ marginTop: 5, marginRight: 10 }}>
                  <Typography variant="h6">{year}</Typography>
                </div>
                <div style={{ marginTop: 9, marginRight: 20 }}>
                  <Typography variant="h6">
                    <Clock style={{ color: "#888080" }} type="digital" />
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </AppBar>

        {/* Main View */}
        <Paper
          style={{
            width: "100vw",
            height: height < 780 ? "88vh" : height <= 900 ? "90vh" : "92vh",
            minHeight: height < 780 ? "88vh" : height <= 900 ? "90vh" : "92vh",
          }}
        >
          <Route path="/" exact component={LoginPage} />
          <Route path="/home" component={SelectionPan} />
          <Route path="/licence" component={Licence} />
          <Route path="/workperiod/list-file" component={WorkPeriod} />
          <Route path="/workperiod/new-file" component={NewWorkPeriod} />
          <Route path="/pos" component={Pos} />
          <Route path="/tickets">
            <Tickets ViewType="user" />
          </Route>
          <Route path="/accounts" component={Accouts} />
          <Route path="/accounts_details" component={AccountDetails} />
          <Route path="/warehouses" component={Warehouses} />
          <Route path="/departments" component={DepartmentView} />
          <Route path="/reports" component={Reports} />
          <Route path="/expenses">
            <Expenses type="user" />
          </Route>
          <Route path="/settings" component={Settings} />
        </Paper>
        {/* Footer */}

        {/* <div>
          <Paper
            elevation={4}
            style={{
              width: 220,
              height: 200,
              position: "absolute",
              bottom: 10,
              right: 5,
              backgroundColor: "red",
              transition: "transform 400ms ease-in",
              transform: checked ? "translateY(0)" : "translateY(220px)",
            }}
          >
            dddd
          </Paper>
        </div> */}
        <AppBar
          style={{
            borderStyle: "solid",
            height: 50,
            borderWidth: 1,
            zIndex: 20000,
            overflow: "hidden",
            borderColor: "transparent",
            borderTopColor:
              props.Theme.theme === "light" ? "#C6C6C6" : "transparent",
          }}
          position="static"
          color="default"
        >
          <div
            style={{
              marginTop: 5,
              marginRight: 15,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginLeft: 20, display: "flex" }}>
              {/* {iSConnecting ? (
                <div style={{ marginTop: 2, display: "flex" }}>
                  <Icon name="refresh" loading />
                  <Typography style={{ marginTop: -4 }}>
                    Connecting...
                  </Typography>
                </div>
              ) : (
                <div>
                  {props.SocketConn.isConn ? (
                    <div style={{ marginTop: 5, display: "flex" }}>
                      <Icon name="server" color="green" />
                      <Typography style={{ marginTop: -1 }}>
                        Connected*
                      </Typography>
                    </div>
                  ) : (
                    <div style={{ marginTop: 5, display: "flex" }}>
                      <Icon name="server" />
                      <Typography style={{ marginTop: -1 }}>
                        Connection Failed
                      </Typography>
                    </div>
                  )}
                </div>  
              )} */}

              {props.Dep.dep ? (
                <div style={{ display: "flex", marginLeft: 10, marginTop: 5 }}>
                  <Icon name="building" />
                  <Typography>
                    {props.Dep.dep} | {props.User.userLogged.branche}
                  </Typography>
                  <div style={{ marginLeft: 10 }} />
                </div>
              ) : null}

              {sockTaking ? (
                <div style={{ display: "flex" }}>
                  <Icon loading name="sync" />
                  <Typography
                    style={{ marginLeft: 3, marginTop: 5 }}
                    variant="caption"
                  >
                    Runing A Stock Take...
                  </Typography>
                </div>
              ) : null}

              {/* {props.User.isLoggedIn &&
              props.User.userLogged.prevarges === "1" ? (
                <div>
                  <Button
                    onClick={() => {
                      if (props.SocketConn.isConn) {
                        props.SocketConn.socket.emit("GETBACKUP", {
                          dep: props.Dep.dep,
                          _type: "getPOSList",
                          layoutType: "all_P",
                        });
                        setLoadingBackUp(true);
                      }
                    }}
                    disabled={LoadingBackUp}
                    style={{ marginTop: 1 }}
                    startIcon={<SyncIcon />}
                  >
                    Restore BackUp
                  </Button>
                  {LoadingBackUp ? (
                    <div style={{ display: "flex" }}>
                      <Icon loading name="sync" />
                      <Typography
                        style={{ marginLeft: 3, marginTop: 1 }}
                        variant="caption"
                      >
                        Loading BackUp from server...
                      </Typography>
                    </div>
                  ) : null}
                </div>
              ) : null} */}
            </div>

            <div style={{ display: "flex" }}>
              {props.User.isLoggedIn ? (
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: 3, marginRight: 10 }}>
                    <Typography>{props.User.userLogged.userName}</Typography>
                  </div>
                  <div style={{ marginTop: -15 }}>
                    {/* <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Notifications</Typography>
                        </React.Fragment>
                      }
                    >
                      <IconButton
                        onClick={toggleDrawer("bottom", true)}
                        style={{ height: 40, width: 40, marginTop: -3 }}
                      >
                        <Icon style={{ marginTop: -5 }} name="bell outline" />
                      </IconButton>
                    </HtmlTooltip> */}

                    {/* Drawer notify */}
                    <Drawer
                      anchor="bottom"
                      open={Drawerstate.bottom}
                      onClose={toggleDrawer("bottom", false)}
                    >
                      <Dep_Notifications />
                    </Drawer>
                  </div>
                  {/* Menu Button */}
                  <div style={{ marginRight: 10, marginTop: -1 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => {
                        history.push("/home");
                      }}
                    >
                      <Typography>Main Menu</Typography>
                    </Button>
                    {/* <Button
                      type="button"
                      variant="outlined" 
                      style={{ marginRight: 10, marginLeft: 10 }}
                      onClick={handleOpen}  
                    >
                      Menus
                    </Button> */}
                  </div>
                </div>
              ) : null}

              {/* To remove ONLY FOR DEVELOPMENT */}
              {/* <Button
                onClick={() => {
                  history.push("/home");
                }} 
              >
                <Typography>Main Menu</Typography>
              </Button> */}
              {/* End here */}

              {/* <div>   
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    props.SocketConn.socket.emit("GET_LOGGEDIN_USERS");
                    setShowUsers(true);
                  }}
                >
                  Online users
                </Button>
              </div> */}

              <div>
                <div style={{ display: "flex" }}>
                  {!props.Dep.dep ? (
                    <div>
                      <IconButton
                        style={{ width: 30, height: 30 }}
                        onClick={() => {
                          setOpenSettings(true);
                        }}
                      >
                        <SettingsIcon style={{ marginTop: -7 }} />
                      </IconButton>
                    </div>
                  ) : null}

                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          Change Theme Color
                        </Typography>
                        {`default theme:${props.Theme.theme}`}
                      </React.Fragment>
                    }
                  >
                    <IconButton
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor:
                          props.Theme.theme === "light" ? "#212121" : "#ccc",
                      }}
                      onClick={() => {
                        // if (themeSet !== "light") setThemeSet("dark");
                        // else setThemeSet("light");
                        props.dispatchEvent({
                          type: "setTheme",
                          setTheme:
                            props.Theme.theme === "light" ? "dark" : "light",
                        });
                      }}
                    />
                  </HtmlTooltip>
                </div>
              </div>
            </div>
          </div>
        </AppBar>
      </Paper>

      <Drawer
        anchor="bottom"
        open={showMaster}
        onClose={() => setshowMaster(false)}
      >
        <div style={{ height: "40vh" }}>
          <Masters />
        </div>
      </Drawer>

      <Drawer
        anchor="left"
        open={showUsers}
        onClose={() => setShowUsers(false)}
      >
        <div style={{ width: "80vh" }}>
          <Masters />
        </div>
      </Drawer>

      <Modal
        open={OpenSettings}
        onClose={() => setOpenSettings(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper style={{ margin: "auto" }} className={classes.paper}>
          <Paper style={{ width: "100%" }}>
            <DbSettings />
          </Paper>
        </Paper>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper style={{ margin: "auto" }} className={classes.paper}>
          <Paper style={{ width: "100%" }}>
            <Meuns />
          </Paper>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

function mapStateToProps(state) {
  return {
    NetiveNotify: state.NetiveNotify,
    Theme: state.Theme,
    SocketConn: state.SocketConn,
    User: state.User,
    Dep: state.Dep,
    WorkPeriod: state.WorkPeriod,
    Updater: state.Updater,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accapp);
