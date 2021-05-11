import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  inline: {
    display: "inline",
  },
  list_root: {
    width: "100%",
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginTop: 2,
  },
  list_light: {
    width: "100%",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#E3E3E3",
    },
  },
  list_dark: {
    width: "100%",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#6B6B6B",
    },
  },
  mainList: {
    height: "70vh",
    width: "100%",
    overflow: "auto",
  },
}));

const SuppliresSideView = (props) => {
  const classes = useStyles();
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    props.dispatchEvent({
      type: "CHANGEVIEW",
      view: "supplires",
      title: "Supplires List",
    });
  }, []);

  const handleSelected = (id) => {
    setActive(id);

    switch (id) {
      case 0:
        props.dispatchEvent({
          type: "CHANGEVIEW",
          view: "supplires",
          title: "Supplires List",
        });

        break;
      case 1:
        props.dispatchEvent({
          type: "CHANGEVIEW",
          view: "supplires_payments",
          title: "Supplires Payments",
        });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <ul className={classes.list_root}>
        <div
          className={
            props.Theme.theme === "light"
              ? classes.list_light
              : classes.list_dark
          }
        >
          <li
            onClick={() => handleSelected(0)}
            style={{
              padding: 6,
              backgroundColor:
                active === 0
                  ? props.Theme.theme === "light"
                    ? "#F78A09"
                    : "#212121"
                  : "transparent",
              color: active === 0 ? "#fff" : "#1D1D1D",
            }}
          >
            <Typography
              style={{
                color:
                  props.Theme.theme === "light"
                    ? active === 0
                      ? "#fff"
                      : "#1D1D1D"
                    : "#fff",
              }}
            >
              Suppliers List
            </Typography>
          </li>
        </div>
        {/* <div
          className={
            props.Theme.theme === "light"
              ? classes.list_light
              : classes.list_dark
          }
        >
          <li
            onClick={() => handleSelected(1)}
            style={{
              padding: 6,
              backgroundColor:
                active === 1
                  ? props.Theme.theme === "light"
                    ? "#F78A09"
                    : "#212121"
                  : "transparent",
              color: active === 1 ? "#fff" : "#1D1D1D",
            }}
          >
            <Typography
              style={{
                color:
                  props.Theme.theme === "light"
                    ? active === 1
                      ? "#fff"
                      : "#1D1D1D"
                    : "#fff",
              }}
            >
              Suppliers Payments
            </Typography>
          </li>
        </div> */}
      </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(SuppliresSideView);
