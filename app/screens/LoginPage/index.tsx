import React = require("react");
import { connect } from "react-redux";
import {
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import DialPad from "./DialPad";
import appDb from "../../redux/dataBase";
import Lottie from "react-lottie";
import * as animationData from "../../assets/lottie/505-error.json";
import CircularProgress from "@material-ui/core/CircularProgress";
import useWindowDimensions from "../../components/Icons/WindowSize";
import { Message } from "semantic-ui-react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

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

const index = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [loadingDep, setLoadingDep] = React.useState(true);
  const { height, width } = useWindowDimensions();
  const [LicenseExpired, setLicenseExpired] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      appDb.CheckConfig();
    }, 200);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    setTimeout(() => {
      setLoadingDep(false);
    }, 4500);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor:
          props.Theme.theme === "light" ? "#E5E5E5" : "transparent",
        backgroundImage: `url(./assets/img/backgroundLogin2.png)`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={24}
        style={{
          width: "60%",
          height: height < 780 ? "98%" : height <= 900 ? "92%" : "80%",
          margin: "auto",
          display: "flex",
          overflow: "hidden",
          backgroundColor: "rgba(225,225,225,0.8)",
        }}
      >
        <Paper
          elevation={24}
          style={{
            width: "45%",
            textAlign: "center",
            transition: "all 0.7s",
            backgroundColor:
              props.Theme.theme === "light"
                ? "rgba(225,225,225,0.6)"
                : "rgba(0,0,0,0.5)",
          }}
        >
          {LicenseExpired ? (
            <div>
              <Typography variant="h4" style={{ marginTop: 15 }}>
                License Key
              </Typography>
              <div style={{ marginTop: 10 }}>
                <Message negative>
                  <Message.Header>
                    We're sorry we can't continue{" "}
                  </Message.Header>
                  <p>
                    Your license has expired! Please re-new your license key to
                    continue using the app again
                  </p>
                </Message>
              </div>
              <div style={{ marginTop: 20 }}>
                <Typography>Enter your license key</Typography>
                <div style={{ marginTop: 15 }}>
                  <TextField
                    id="input-with-icon-textfield"
                    label="Your new license key"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div style={{ marginTop: 15 }}>
                  <Button variant="outlined"> Continue</Button>
                </div>

                {/* <div style={{ marginTop: 10 }}>
                  <Message
                    info
                    header="Was this what you wanted?"
                    content="Did you know it's been a while?"
                  />
                </div> */}
              </div>
            </div>
          ) : (
            <div>
              <Typography variant="h4" style={{ marginTop: 5 }}>
                Welcome back
              </Typography>
              <Typography>Login Account </Typography>
              <div style={{ width: "90%", margin: "auto" }}>
                <DialPad />
              </div>
            </div>
          )}
        </Paper>
        <div
          style={{
            textAlign: "center",
            width: "100%",
            padding: 15,
            marginTop: 30,
          }}
        >
          <div>
            <Typography
              variant="h4"
              style={{
                color: "#212121",
              }}
            >
              Welcome to Chesco POS
            </Typography>
            <Typography variant="body1" style={{ color: "#212121" }}>
              Empowering businesses worldwide
            </Typography>
          </div>
          <div style={{ marginTop: 10 }}>
            <Divider />
          </div>
          <div style={{ marginTop: 10 }}>
            <Typography variant="body1" style={{ color: "#212121" }}>
              It all starts here. Flexible for any business yet simple for any
              user. Powerful functionality yet intuitive and quick to learn. The
              powerful software includes all the tools you need - payments,
              digital receipts, open tickets, inventory, reports, and more. It
              is versatile enough to serve every kind of business, from retail
              to bakery. The simple and elegant user interface makes it easy for
              you and your staff to get up and running quickly.
            </Typography>
          </div>
          <div style={{ marginTop: 10 }}></div>
          <div>
            <Typography variant="body1" style={{ color: "#212121" }}>
              support@chesco-tech.com
            </Typography>
            <Typography variant="body1" style={{ color: "#212121" }}>
              www.chescopos.com
            </Typography>
            <Typography variant="body1" style={{ color: "#212121" }}>
              +260975704991
            </Typography>
          </div>
        </div>
      </Paper>
    </Paper>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SocketConn: state.SocketConn,
    Config: state.Config,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
