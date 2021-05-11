import React = require("react");
import { connect } from "react-redux";
import { Button, Divider, TextField, Typography } from "@material-ui/core";
import { Icon } from "semantic-ui-react";

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import SwipeableViews from "react-swipeable-views";
import {
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import appDb from "../../redux/dataBase";
import { useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const { parse, stringify } = require("envfile");
const fs = require("fs");

const sourcePath = "../../../.env";
let sourceObject = {};

const electron = require("electron");
const { ipcRenderer } = require("electron");

const remote = electron.remote;

const win = remote.getCurrentWindow();

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    display: "flex",
  },
}));

// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles({
  root: {
    position: "relative",
  },
  top: {
    color: "#eef3fd",
  },
  bottom: {
    color: "#6798e5",
    animationDuration: "550ms",
    marginTop: 20,
  },
});

// ispiered by facebook
function FacebookProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
        {...props}
      />
    </div>
  );
}

const DialPad = (props) => {
  const history = useHistory();
  const classes = useStyles();
  var [pin, setPin] = React.useState("");
  var [name, setName] = React.useState("");
  var [compInfo, setCompInfo] = React.useState({
    brancheName: "",
    street: "",
    city: "",
    province: "",
    phone: "",
    appId: "",
  });
  const [showPassword, setshowPassword] = React.useState(false);
  const [isSet, setIsSet] = React.useState(false);
  const [serverEnvIsSet, setServerEnvIsSet] = React.useState(false);
  const inputRef = React.useRef();
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [envData, setEnvData] = React.useState({
    db_host: "",
    db_port: "",
    db_name: "",
    db_user: "",
    db_pass: "",
  });
  const [layoutName, setlayoutName] = React.useState("default");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (input) => {
    setPin(input);
  };

  const OnKeyPress = (key) => {
    console.log(key);

    // console.log(key);
  };

  const progressRef = React.useRef(() => { });

  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };

    setTimeout(() => {
      setIsSet(true);
    }, 5300);
    document.addEventListener("keydown", handleKeyDown, false);

    appDb.TestDbConnection((callback) => {
      handleChangeIndex(1);
      setServerEnvIsSet(true);
      // console.log(callback);
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, []);

  const handleKeyDownEnter = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleSaveServerEnv = (type) => {
    if (type === "useLocal") {
      fs.appendFile(
        ".env",
        `
        DB_NAME=chesco_pos
        DB_PORT=5432
        DB_HOST=localhost
        DB_USER=postgres 
        DB_PASS=root`,

        function (err) {
          if (err) throw err;
          handleClickOpen();
          const timer = setInterval(() => {
            progressRef.current();
          }, 500);

          setServerEnvIsSet(true);
          handleChangeIndex(1);
          setTimeout(() => {
            ipcRenderer.send("relaunch", {});
          }, 6000);
        }
      );
    } else {
      fs.appendFile(
        ".env",
        `
          DB_NAME=${envData.db_name}
          DB_PORT=${envData.db_port}
          DB_HOST=${envData.db_host}
          DB_USER=${envData.db_user} 
          DB_PASS=${envData.db_pass}`,

        function (err) {
          if (err) throw err;
          handleClickOpen();
          const timer = setInterval(() => {
            progressRef.current();
          }, 500);

          setServerEnvIsSet(true);
          handleChangeIndex(1);
          setTimeout(() => {
            ipcRenderer.send("relaunch", {});
          }, 6000);
        }
      );
    }
  };

  const handleEnvTextChange = (type, event) => {
    setEnvData({ ...envData, [type]: event.target.value });
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleKeyDown = (event) => {
    inputRef.current.focus();
    if (event.key === "Enter") {
      handleSubmit();
    } else if (event.key === "Backspace") {
      pin = pin.slice(0, -1);
      setPin(pin);
    } else if (event.key === "Delete") {
      pin = "";
      setPin(pin);
    } else if (
      event.key === "Alt" ||
      event.key === "Tab" ||
      event.key === "Control" ||
      event.key === "Shift" ||
      event.key === "CapsLock"
    ) {
    } else {
      pin = pin + event.key;
      setPin(pin);
    }
  };

  const handleClick = (value) => {
    pin = pin + value;
    setPin(pin);
  };

  const clear = () => {
    pin = "";
    setPin(pin);
  };

  const handleSave = () => {
    appDb.HandleDepartments({ type: "set", compInfo }, (reciveCallback) => {
      if (reciveCallback.isSet) {
        setIsSet(true);
        props.dispatchEvent({
          type: "SETCONFIG",
          isSet: true,
          config: reciveCallback.department[0],
        });
      }
    });
  };

  const handleSubmit = () => {
    appDb.HandleLogIn({ pin, name }, (reciveCallback) => {
      // console.log(reciveCallback);

      if (reciveCallback.isLoggedIn) {
        props.dispatchEvent({
          type: "LOGIN",
          userLogged: reciveCallback.config,
        });
        setTimeout(() => {
          history.push("/home");
        }, 400);
      } else {
        toast(
          `User not found or Account does not exist. Please contact the Adminstrtor`,
          {
            position: "top-right",
            autoClose: 5000,
            type: "error",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );

        props.dispatchEvent({
          type: "SHOW_NETIVE_NOTIFICATION",
          payload: {
            type: "error",
            title: "Invalid Pin",
            message:
              "User not found or Account does not exist. Please contact the Adminstrtor",
            state: "msgBox",
            detail: "",
            data: {},
          },
        });
        props.dispatchEvent({
          type: "DISMISS_NETIVE_NOTIFY",
        });
      }
    });
  };

  const handleChange = (event) => {
    // console.log(event);
    setCompInfo({ ...compInfo, [event.target.name]: event.target.value });
  };

  const handleTextChange = (event) => {
    setName(event.target.value);
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ width: "100%", marginTop: 25 }}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Optimum please wait while we restart your app"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This will help us to apply all the database configuring. Please wait
            this won't take long
          </DialogContentText>
          <div>
            <LinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
            />
          </div>
        </DialogContent>
      </Dialog>

      {props.Config.isSet ? (
        <div>
          <div>
            <FormControl className={classes.textField} variant="outlined">
              {/* <div>
              <TextField 
                required 
                 id="standard-required" 
                 label="User Name" 
                 variant="outlined"
                 value={name}
                 name="name"
                 color={props.Theme.theme === "light" ? "primary" : "secondary"}
                 fullWidth
                 onChange={handleTextChange}
                 />
            </div> */}
              <div style={{ marginTop: 7 }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                {/* <TextField 
                required 
                id="outlined-adornment-password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={pin}
                disabled={props.Config.isSet ? false : true}
                fullWidth
                label="Password"
                color={props.Theme.theme === "light" ? "primary" : "secondary"}
                 name="name"
                 onChange={handleKeyDown}
              /> */}
                <OutlinedInput
                  autoFocus
                  inputRef={inputRef}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={pin}
                  disabled={props.Config.isSet ? false : true}
                  fullWidth
                  label="ENTER PIN"
                  color={
                    props.Theme.theme === "light" ? "primary" : "secondary"
                  }
                  // onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </div>
            </FormControl>
          </div>
          {/* row 1 */}

          {/* <ThemeProvider theme=''> */}
          {/* <Keyboard
            theme={"hg-theme-default myTheme1"}
            layoutName={layoutName}
            onChange={onChange}
            onKeyPress={OnKeyPress}
          /> */}
          {/* </ThemeProvider> */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("1")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">1</Typography>
            </Button>
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("2")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">2</Typography>
            </Button>
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("3")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">3</Typography>
            </Button>
          </div>

          {/* row 2 */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("4")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">4</Typography>
            </Button>
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("5")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">5</Typography>
            </Button>
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("6")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">6</Typography>
            </Button>
          </div>

          {/* row 3 */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("7")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">7</Typography>
            </Button>
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("8")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">8</Typography>
            </Button>
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("9")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">9</Typography>
            </Button>
          </div>

          {/* row 4 */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={() => {
                handleKeyDown({ key: "Delete" });
                // clear();
              }}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">X</Typography>
            </Button>
            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={(v) => handleClick("0")}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">0</Typography>
            </Button>

            <Button
              disabled={props.Config.isSet ? false : true}
              onClick={() => handleSubmit()}
              style={{
                width: "12vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">Login</Typography>
            </Button>

            {/* <Button
              onClick={() => win.close()}
              disabled={props.Config.isSet ? false : true}
              style={{
                width: "10vw",
                backgroundColor:
                  props.Theme.theme === "light" ? "#fff" : "#212121",
                height: "9vh",
                borderRadius: 0,
              }}
              variant="outlined"
            >
              <Typography variant="h5">
                <Icon name="power off" />
              </Typography>
            </Button> */}
          </div>
          <div
            style={{
              width: "100%",
              marginTop: 10,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {/* <div>
            <Typography>Admin PIN 1234</Typography>
            <Typography>Change PIN will hide this hint</Typography>
          </div> */}
            <div style={{ marginTop: 6 }}>
              <Button
                onClick={() => win.close()}
                disabled={props.Config.isSet ? false : true}
                style={{
                  width: "10vw",
                  backgroundColor:
                    props.Theme.theme === "light" ? "#fff" : "#212121",
                  height: "9vh",
                  borderRadius: 0,
                }}
                variant="outlined"
              >
                <Typography variant="h5">
                  <Icon name="power off" />
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {isSet ? (
            <div>
              <div style={{ marginTop: "40%" }}>
                <Typography>Setup New Company</Typography>
              </div>

              <div style={{ marginTop: 20 }}>
                <FormControl className={classes.textField} variant="outlined">
                  <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <div
                      value={value}
                      index={0}
                      dir={theme.direction}
                      style={{ padding: 6 }}
                    >
                      <Divider />
                      Remote server setup
                      <div style={{ marginTop: 10 }}>
                        <TextField
                          id="standard-basic"
                          label="Server Host"
                          color="secondary"
                          name=" db_host"
                          value={envData.db_host}
                          onChange={(event) =>
                            handleEnvTextChange("db_host", event)
                          }
                        />
                        <TextField
                          type="number"
                          id="standard-basic"
                          label="Post Number"
                          color="secondary"
                          name="db_port"
                          value={envData.db_port}
                          onChange={(event) =>
                            handleEnvTextChange("db_port", event)
                          }
                        />
                        <TextField
                          id="standard-basic"
                          label="Db Name"
                          color="secondary"
                          name="db_name"
                          value={envData.db_name}
                          onChange={(event) =>
                            handleEnvTextChange("db_name", event)
                          }
                        />
                        <TextField
                          id="standard-basic"
                          label="Db Username"
                          color="secondary"
                          name="db_user"
                          value={envData.db_user}
                          onChange={(event) =>
                            handleEnvTextChange("db_user", event)
                          }
                        />
                        <TextField
                          id="standard-basic"
                          label="Db Password"
                          color="secondary"
                          name="db_pass"
                          value={envData.db_pass}
                          onChange={(event) =>
                            handleEnvTextChange("db_pass", event)
                          }
                        />
                      </div>
                      <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <Button
                          onClick={() => handleSaveServerEnv("useLocal")}
                          variant="contained"
                          color="primary"
                          style={{ marginTop: 20, width: "70%" }}
                        >
                          Use Local host db
                        </Button>
                      </div>
                      <Divider />
                    </div>

                    <div value={value} index={1} dir={theme.direction}>
                      <div>
                        <div>Company Name</div>
                        <OutlinedInput
                          type="text"
                          value={compInfo.brancheName}
                          name="brancheName"
                          fullWidth
                          label="BRANCHE"
                          color={
                            props.Theme.theme === "light"
                              ? "primary"
                              : "secondary"
                          }
                          onChange={handleChange}
                          labelWidth={70}
                        />
                      </div>
                      <div>
                        <div>Street</div>
                        <OutlinedInput
                          type="text"
                          value={compInfo.street}
                          name="street"
                          fullWidth
                          label="street"
                          color={
                            props.Theme.theme === "light"
                              ? "primary"
                              : "secondary"
                          }
                          onChange={handleChange}
                          labelWidth={70}
                        />
                      </div>
                      <div>
                        <div>City</div>
                        <OutlinedInput
                          type="text"
                          value={compInfo.city}
                          name="city"
                          fullWidth
                          label="city"
                          color={
                            props.Theme.theme === "light"
                              ? "primary"
                              : "secondary"
                          }
                          onChange={handleChange}
                          labelWidth={70}
                        />
                      </div>
                      <div>
                        <div>Province</div>
                        <OutlinedInput
                          type="text"
                          value={compInfo.province}
                          name="province"
                          fullWidth
                          label="province"
                          color={
                            props.Theme.theme === "light"
                              ? "primary"
                              : "secondary"
                          }
                          onChange={handleChange}
                          labelWidth={70}
                        />
                      </div>
                      <div>
                        <div>Phone Number</div>
                        <OutlinedInput
                          type="text"
                          value={compInfo.phone}
                          name="phone"
                          fullWidth
                          label="phone"
                          color={
                            props.Theme.theme === "light"
                              ? "primary"
                              : "secondary"
                          }
                          onChange={handleChange}
                          labelWidth={70}
                        />
                      </div>
                      {/* <div>
                        <div>App Id</div>
                        <OutlinedInput
                          type="text"
                          value={compInfo.appId}
                          name="appId"
                          fullWidth
                          label="appId"
                          color={
                            props.Theme.theme === "light"
                              ? "primary"
                              : "secondary"
                          }
                          onChange={handleChange}
                          labelWidth={70}
                        />
                      </div> */}
                    </div>
                  </SwipeableViews>
                </FormControl>
              </div>
              <div>
                {serverEnvIsSet ? (
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, width: "70%" }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    onClick={handleSaveServerEnv}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20, width: "70%" }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <FacebookProgress />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    Config: state.Config,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialPad);
