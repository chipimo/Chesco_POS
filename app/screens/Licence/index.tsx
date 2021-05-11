const React = require("react");
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import { Route, useHistory } from "react-router-dom";
import * as animationData from "../../assets/lottie/42809-driving-license-scanning.json";
import appDb from "../../redux/dataBase";
import { Message } from "semantic-ui-react";

const index = (props) => {
  const history = useHistory();
  const [Licence, setLicence] = React.useState("");
  const [validate, setValidate] = React.useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 10,
        backgroundColor: props.Theme.theme === "light" ? "#F1F1F1" : "#3b3b3b",
      }}
    >
      <div
        style={{
          width: "60%",
          height: "100%",
          marginTop: "20",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Typography>Add Licence Key</Typography>
        <div>
          <Lottie options={defaultOptions} height={250} width={250} />
        </div>
        <div>
          <Paper
            style={{
              width: "80%",
              height: "60%",
              margin: "auto",
              paddingBottom: 20,
            }}
            elevation={8}
          >
            <Typography>Licence Key</Typography>
            <div style={{ marginTop: 20, width: "80%", margin: "auto" }}>
              <TextField
                id="outlined-basic"
                label="Key"
                variant="outlined"
                fullWidth
                value={Licence}
                onChange={(e) => {
                  setLicence(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  appDb.HandelProducts(
                    { _type: "validateLicense", Licence },
                    (callback) => {
                      if (callback.message === "ok") history.push("/");
                      else setValidate(true);
                    }
                  );
                }}
                variant="outlined"
                style={{ marginTop: 10 }}
              >
                Submit
              </Button>
            </div>
          </Paper>

          {validate ? (
            <div style={{ marginTop: 20 }}>
              <Message negative>
                <Message.Header>
                  We're sorry we can't apply this License
                </Message.Header>
                <p>Invalid License</p>
                <p>
                  Call us on +260975704991 for further help with this license
                </p>
              </Message>
            </div>
          ) : null}

          <div style={{ marginTop: 40 }}>
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
        </div>
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
