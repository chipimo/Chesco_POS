import React = require("react");
import { connect } from "react-redux";
import { Paper, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useLocation, useHistory } from "react-router-dom";
import appDb from "../../redux/dataBase";
import { Icon } from "semantic-ui-react";
import ReStockLevels from "../Reports/ReStockLevels";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const index = (props) => {
  const classes = useStyles();
  const [tab1, setTab1] = React.useState(false);
  const [tab2, setTab2] = React.useState(false);
  const [tab3, setTab3] = React.useState(false);
  const [tab4, setTab4] = React.useState(false);
  const [tab5, setTab5] = React.useState(false);
  const [tab6, setTab6] = React.useState(false);
  const [tab7, setTab7] = React.useState(false);
  const [tab8, setTab8] = React.useState(false);
  const [tab9, setTab9] = React.useState(false);

  // const [LoadingBackUp, setLoadingBackUp] = React.useState(false);

  const [state, setState] = React.useState({
    data: [],
    columns: [
      { title: "Product Name", field: "ItemName" },
      { title: "Quantity", field: "amountInstore" },
      { title: "Reorder Level", field: "alertOut" },
    ],
  });

  React.useEffect(() => {
    LoadProducts();
  }, []);

  const LoadProducts = () => {
    appDb.HandelProducts(
      { _type: "getPOSList", layoutType: "getGrouped" },
      (receiveCallback) => {
        setTimeout(() => {
          if (receiveCallback.productResult[0]) {
            var tempArr = [];
            receiveCallback.productResult[0].map((product) => {
              if (product.alertOut > product.amountInstore)
                tempArr.push(product);
            });
            setState({ ...state, data: tempArr });
          }
        }, 100);
      }
    );
  };

  const history = useHistory();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        paddingTop: 25,
        paddingLeft: 20,
        paddingRight: 20,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex" }}>
        <Paper
          square
          onClick={() => {
            history.push("/tickets");
          }}
          onMouseEnter={() => {
            setTab1(true);
          }}
          onMouseLeave={() => {
            setTab1(false);
          }}
          elevation={tab1 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 40,
          }}
        >
          <img
            src={"./assets/icons/timetable.png"}
            style={{ width: "25%", margin: "auto" }}
          />
          <Typography
            style={{
              color: "#fff",
              textShadow: "2px 2px 8px #000",
              marginTop: 13,
            }}
            variant="h4"
          >
            Cash Out Reports
          </Typography>
        </Paper>
        <Paper
          square
          onClick={() => {
            // props.WorkPeriod.isStarted ? history.push("/pos") : handleOpen();
            history.push("/pos");
          }}
          onMouseEnter={() => {
            setTab2(true);
          }}
          onMouseLeave={() => {
            setTab2(false);
          }}
          elevation={tab2 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 40,
            marginLeft: 15,
          }}
        >
          <img
            src={
              // props.WorkPeriod.isStarted
              //   ? "./assets/icons/icons8_cash_register_128px_1.png"
              //   : "./assets/icons/icons8_cash_register_128px.png"
              "./assets/icons/icons8_cash_register_128px_1.png"
            }
            style={{ width: "25%", margin: "auto" }}
          />
          <Typography
            style={{
              // color: props.WorkPeriod.isStarted ? "#fff" : "#575757",
              color: "#fff",
              marginTop: 8,
              textShadow: "2px 2px 8px #000",
            }}
            variant="h4"
          >
            Point Of Sale
          </Typography>
        </Paper>
        <Paper
          square
          onClick={() => {
            history.push("/expenses");
          }}
          onMouseEnter={() => {
            setTab3(true);
          }}
          onMouseLeave={() => {
            setTab3(false);
          }}
          elevation={tab3 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            height: "27vh",
            textAlign: "center",
            paddingTop: 40,
            marginLeft: 15,
            cursor: "pointer",
          }}
        >
          <img
            src={"./assets/icons/expense.png"}
            style={{ width: "25%", margin: "auto" }}
          />
          <Typography
            style={{
              marginTop: 10,
              textShadow: "2px 2px 8px #000",
              color: "#fff",
            }}
            variant="h4"
          >
            Expenses
          </Typography>
        </Paper>
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <Paper
          square
          onClick={() => {
            handleOpen();
          }}
          onMouseEnter={() => {
            setTab4(true);
          }}
          onMouseLeave={() => {
            setTab4(false);
          }}
          elevation={tab4 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 40,
          }}
        >
          <Paper
            style={{
              width: 200,
              height: 100,
              margin: "auto",
            }}
          >
            <div style={{ marginTop: 10 }}>
              {state.data.length === 1 ? (
                <Icon
                  style={{ fontSize: 15 }}
                  name="warning sign"
                  color="red"
                />
              ) : (
                <Icon style={{ fontSize: 15 }} name="bullseye" color="green" />
              )}
              <Typography variant="h6">{state.data.length}</Typography>
              {state.data.length === 1 ? (
                <Typography variant="h6">Alert</Typography>
              ) : (
                <Typography variant="h6">Alerts</Typography>
              )}
            </div>
          </Paper>

          <Typography
            style={{
              color: "#fff",
              marginTop: 17,
              textShadow: "2px 2px 8px #000",
            }}
            variant="h4"
          >
            Restock List
          </Typography>
        </Paper>
        <Paper
          onClick={() => {
            history.push("/warehouses");
          }}
          square
          onMouseEnter={() => {
            setTab5(true);
          }}
          onMouseLeave={() => {
            setTab5(false);
          }}
          elevation={tab5 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 40,
            marginLeft: 15,
          }}
        >
          <img
            src={"./assets/img/AbAbgi-warehouse-best-png.png"}
            style={{ width: "25%", margin: "auto" }}
          />
          <Typography
            style={{
              color: "#fff",
              marginTop: 8,
              textShadow: "2px 2px 8px #000",
            }}
            variant="h4"
          >
            Stock Levels
          </Typography>
        </Paper>
        <Paper
          square
          onClick={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? history.push("/departments")
              : props.User.userLogged.prevarges === "2"
              ? history.push("/departments")
              : null;
          }}
          onMouseEnter={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab6(true)
              : props.User.userLogged.prevarges === "2"
              ? setTab6(true)
              : null;
          }}
          onMouseLeave={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab6(false)
              : props.User.userLogged.prevarges === "2"
              ? setTab6(false)
              : null;
          }}
          elevation={tab6 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            cursor:
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "pointer"
                : props.User.userLogged.prevarges === "2"
                ? "pointer"
                : "not-allowed",
            height: "27vh",
            textAlign: "center",
            paddingTop: 40,
            marginLeft: 15,
          }}
        >
          <img
            src={
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "./assets/icons/icons8_unit_240px.png"
                : props.User.userLogged.prevarges === "2"
                ? "./assets/icons/icons8_unit_240px.png"
                : "./assets/icons/icons8_unit_240px_1.png"
            }
            style={{ width: "30%", margin: "auto" }}
          />
          <Typography
            style={{
              color:
                props.User.isLoggedIn === true &&
                props.User.userLogged.prevarges === "1"
                  ? "#fff"
                  : props.User.userLogged.prevarges === "2"
                  ? "#fff"
                  : "#575757",
              marginTop: 10,
              textShadow: "2px 2px 8px #000",
            }}
            variant="h4"
          >
            Company Setup
          </Typography>
        </Paper>
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <Paper
          square
          onClick={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? history.push("/reports")
              : props.User.userLogged.prevarges === "2"
              ? history.push("/reports")
              : null;
          }}
          onMouseEnter={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab7(true)
              : props.User.userLogged.prevarges === "2"
              ? setTab7(true)
              : null;
          }}
          onMouseLeave={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab7(false)
              : props.User.userLogged.prevarges === "2"
              ? setTab7(false)
              : null;
          }}
          elevation={tab7 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            cursor:
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "pointer"
                : props.User.userLogged.prevarges === "2"
                ? "pointer"
                : "not-allowed",
            height: "27vh",
            textAlign: "center",
            paddingTop: 40,
          }}
        >
          <img
            src={
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "./assets/icons/combo_chart.png"
                : props.User.userLogged.prevarges === "2"
                ? "./assets/icons/combo_chart.png"
                : "./assets/icons/icons8_account_200px_2.png"
            }
            style={{ width: "25%", margin: "auto" }}
          />
          <Typography
            style={{
              color:
                props.User.isLoggedIn === true &&
                props.User.userLogged.prevarges === "1"
                  ? "#fff"
                  : props.User.userLogged.prevarges === "2"
                  ? "#fff"
                  : "#575757",
              marginTop: 13,
              textShadow: "2px 2px 8px #000",
            }}
            variant="h4"
          >
            Reports
          </Typography>
        </Paper>
        <Paper
          onClick={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? history.push("/settings")
              : props.User.userLogged.prevarges === "2"
              ? history.push("/settings")
              : null;
          }}
          square
          onMouseEnter={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab8(true)
              : props.User.userLogged.prevarges === "2"
              ? setTab8(true)
              : null;
          }}
          onMouseLeave={() => {
            props.User.isLoggedIn === true &&
            props.User.userLogged.prevarges === "1"
              ? setTab8(false)
              : props.User.userLogged.prevarges === "2"
              ? setTab8(false)
              : null;
          }}
          elevation={tab8 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            cursor:
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "pointer"
                : props.User.userLogged.prevarges === "2"
                ? "pointer"
                : "not-allowed",
            height: "27vh",
            textAlign: "center",
            paddingTop: 20,
            marginLeft: 15,
          }}
        >
          <img
            src={
              props.User.isLoggedIn === true &&
              props.User.userLogged.prevarges === "1"
                ? "./assets/icons/icons8_settings_100px.png"
                : props.User.userLogged.prevarges === "2"
                ? "./assets/icons/icons8_settings_100px.png"
                : "./assets/icons/icons8_settings_100px_2.png"
            }
            style={{ width: "30%", margin: "auto" }}
          />
          <Typography
            style={{
              color:
                props.User.isLoggedIn === true &&
                props.User.userLogged.prevarges === "1"
                  ? "#fff"
                  : props.User.userLogged.prevarges === "2"
                  ? "#fff"
                  : "#575757",
              marginTop: 11,
              textShadow: "2px 2px 8px #000",
            }}
            variant="h4"
          >
            Settings
          </Typography>
        </Paper>
        <Paper
          square
          onClick={() => {
            props.dispatchEvent({
              type: "LOGOUT",
            });
            setTimeout(() => {
              history.push("/");
            }, 400);
          }}
          onMouseEnter={() => {
            setTab9(true);
          }}
          onMouseLeave={() => {
            setTab9(false);
          }}
          elevation={tab9 ? 20 : 2}
          style={{
            background:
              props.Theme.theme === "light"
                ? "radial-gradient(circle, rgba(192,241,254,1) 0%, rgba(0,77,97,1) 100%)"
                : "#212121",
            width: "40vw",
            cursor: "pointer",
            height: "27vh",
            textAlign: "center",
            paddingTop: 40,
            marginLeft: 15,
          }}
        >
          <img
            src={"./assets/icons/icons8_export_52px.png"}
            style={{ width: "25%", margin: "auto" }}
          />
          <Typography
            style={{
              color: "#fff",
              marginTop: 10,
              textShadow: "2px 2px 8px #000",
            }}
            variant="h4"
          >
            Logout
          </Typography>
        </Paper>
      </div>
      {/* Work Period Modal */}
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          className={classes.modal}
          // onClose={handleClose}
        >
          <Paper style={{ padding: 20 }}>
            <ReStockLevels />

            <div style={{ marginTop: 20 }}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
              >
                Close
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    WorkPeriod: state.WorkPeriod,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
