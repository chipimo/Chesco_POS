import React = require("react");
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { Paper, TextField, Typography } from "@material-ui/core";
import TableChartIcon from "@material-ui/icons/TableChart";
import appDb from "../../../redux/dataBase";
import { toast } from "react-toastify";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50vw",
    height: "60vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: 10,
  },
  toolBar: {
    width: "100%",
    height: 30,
    textAlign: "center",
  },
  buttonLayout: {
    width: "100%",
    height: "100%",
    overflow: "auto",
    padding: theme.spacing(2, 4, 3),
  },
  buttonStyle: {
    width: "30%",
    height: 105,
    margin: 6,
  },
}));

const TableLayout = (props) => {
  const classes = useStyles();
  const [mainTables, setMainTables] = React.useState([]);
  const [tableName, setTableName] = React.useState("");
  const [tableNameError, setTableNameError] = React.useState("");

  const handleChange = (event) => {
    setTableName(event.target.value);
    setTableNameError("");
  };

  const onSubmit = () => {
    if (tableName == "") setTableNameError("Table Name can't be empty");
    else {
      // console.log(props);

      if (tableName !== "")
        appDb.HandleTables(
          {
            _type: "setMyTabes",
            user: props.User.userLogged.userName,
            table: tableName,
            date: moment().format("DD-MMM-YYYY"),
            time: moment().format("LTS"),
            total: props.total,
            qty: 1,
            product_list: { data: props.data.items },
          },
          (callback) => {
            // console.log(callback);

            props.dispatchEvent({
              type: "SETCOUNT",
              count: callback.length,
            });

            props.dispatchEvent({
              type: "SETSTATE",
              state: 'clearCartList',
            });

            // props.dispatchEvent({
            //   type: "TABLESET",
            //   state: true,
            //   table_name: tableName,
            // });

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

      props.dispatchEvent({
        type: "SETTABLEACTIONS",
        ActionType: "close_table_drawer",
      });
    }
  };

  React.useEffect(() => {
    LoadGroup();
  }, [props.MytablesReducer.count]);

  // Load all groups
  const LoadGroup = () => {
    let ArryTables = [];

    appDb.HandleTables({ _type: "get" }, (reciveCallback1) => {
      // console.log(reciveCallback1);
      setMainTables(reciveCallback1.data);

      // appDb.HandleTables({ _type: "getMyTabes" }, (reciveCallback2) => {
      //   console.log(reciveCallback2);

      //   if (reciveCallback2.data.length !== 0) {
      //     const TableLength = reciveCallback2.data.length;
      //     let TableList = reciveCallback1.data;

      //     reciveCallback2.data.map((list) => {
      //       const index = TableList.findIndex((x) => x.table === list.name);
      //       TableList.splice(index, 1);
      //     });

      //     setMainTables(TableList);
      //   } else {
      //     setMainTables(reciveCallback1.data);
      //   }

      // });
    });
  };

  return (
    <div className={classes.paper}>
      <Paper square className={classes.toolBar}>
        <Typography variant="h5">Tables</Typography>
      </Paper>

      <div className={classes.buttonLayout}>
        <div style={{ height: "90%" }}>
          {mainTables.map((list, index) => (
            <Button
              startIcon={<TableChartIcon />}
              style={{
                backgroundColor: list.colors.backgroundColor,
                color: list.colors.textColor,
              }}
              onClick={() => {
                props.dispatchEvent({
                  type: "TABLESET",
                  state: true,
                  table_name: list.table,
                });
              }}
              className={classes.buttonStyle}
              key={index}
            >
              {list.table}
            </Button>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                props.dispatchEvent({
                  type: "SETTABLEACTIONS",
                  ActionType: "close_table_drawer",
                })
              }
            >
              Close
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              label="Custom table name"
              id="outlined-size-small"
              variant="outlined"
              size="small"
              value={tableName}
              onChange={handleChange}
              helperText={tableNameError}
              error={tableNameError !== "" ? true : false}
            />
            <Button onClick={onSubmit} variant="outlined">
              Save table Name
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    User: state.User,
    MytablesReducer: state.MytablesReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout);
