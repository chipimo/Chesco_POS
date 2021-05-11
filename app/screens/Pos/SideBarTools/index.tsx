import React = require("react");
import { connect } from "react-redux";
import { Badge, Button, Typography } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import TicketNote from "../TicketNote";
import Repair from "../Repair";
import Customers from "../../Customers";
import TableLayout from "../TablesViews/TableLayout";
import Mytables from "../TablesViews/Mytables";
import appDb from "../../../redux/dataBase";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 650,
  },
  tables: {
    width: 750,
  },
  bottom: {
    width: "auto",
    height: 680,
  },
  bottom2: {
    width: "auto",
    height: 680,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const index = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    bottom2: false,
    bottom3: false,
    tables: false,
  });

  const [open, setOpen] = React.useState(false);
  const [openRepair, setOpenRepair] = React.useState(false);

  const toggleDrawer = (side, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  React.useEffect(() => {
    if (props.Model.toClose === "repair") handleCloseRepair();

    appDb.HandleTables({ _type: "getMyTabes" }, (reciveCallback) => {
      props.dispatchEvent({
        type: "SETCOUNT",
        count: reciveCallback.data.length,
      });
    });

    if (props.TableActions.isSet) {
      if (
        props.TableActions.action ===
          "close_left_drawer & open_bottom_drawer" ||
        props.TableActions.action === "close_left_drawer & show edit"
      ) {
        props.dispatchEvent({
          type: "CLEARTABLEACTIONS",
          ActionType: "close_left_drawer & open_bottom_drawer",
        });
        setState({ ...state, tables: false });
        // toggleDrawer("tables", false);
      }
    }

    if (props.TableActions.isSet) {
      if (props.TableActions.action === "close_table_drawer") {
        props.dispatchEvent({
          type: "CLEARTABLEACTIONS",
          ActionType: "close_left_drawer & open_bottom_drawer",
        });
        setOpen(false);
        // toggleDrawer("tables", false);
      }
    }
  }, [props.MytablesReducer.count, props.TableActions.action]);

  const handleOpenRepair = () => {
    setOpenRepair(true);
  };

  const handleCloseRepair = () => {
    setOpenRepair(false);
    if (props.Model.toClose === "repair")
      props.dispatchEvent({ type: "HANDELCLEAR" });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {props.User.userLogged.prevarges === "0" ? (
        <div>
          <Button
            onClick={toggleDrawer("left", true)}
            style={{
              width: "100%",
            }}
            variant="contained"
            color="primary"
          >
            <Typography>Select Customer</Typography>
          </Button>
          <Button
            onClick={handleOpen}
            style={{
              width: "100%",
              marginTop: 10,
            }}
            variant="contained"
            color="primary"
          >
            <Typography>Table Sale</Typography>
          </Button>
        </div>
      ) : null}

      <div style={{ marginTop: 20 }} />
      <Badge badgeContent={props.MytablesReducer.count} color="secondary">
        <Button
          onClick={toggleDrawer("tables", true)}
          style={{
            width: "100%",
            marginTop: 10,
          }}
          variant="contained"
          color="secondary"
        >
          <Typography>My Table</Typography>
        </Button>
      </Badge>

      <div>
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          <div className={classes.list}>
            <Customers />{" "}
          </div>
        </Drawer>

        <Drawer open={state.tables} onClose={toggleDrawer("tables", false)}>
          <div className={classes.tables}>
            <Mytables />
          </div>
        </Drawer>
      </div>

      {/* Ticket note */}
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          className={classes.modal}
          onClose={handleClose}
        >
          <TableLayout />
        </Modal>
      </div>

      {/* Repair */}
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openRepair}
          className={classes.modal}
          // onClose={handleCloseRepair}
        >
          <Repair />
        </Modal>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SocketConn: state.SocketConn,
    Model: state.Model,
    MytablesReducer: state.MytablesReducer,
    TableActions: state.TableActionsReducer,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
