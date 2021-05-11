import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography, Grid, Modal, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import appDb from "../../redux/dataBase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "100%",
    padding: 15,
    height: "83vh",
    overflow: "auto",
  },
  table: {
    width: "100%",
    borderColor: "#aaaaaa",
    borderStyle: "solid",
    borderWidth: 1,
    borderCollapse: "collapse",
  },
  tableCol: {
    width: 200,
    borderColor: "#aaaaaa",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: {
    width: 200,
    borderColor: "#aaaaaa",
    borderStyle: "solid",
    borderWidth: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const index = (props) => {
  const classes = useStyles();
  const [colors, setColor] = React.useState({
    backgroundColor: "#3b3b3b",
    textColor: "#fff",
  });

  const [values, setValues] = React.useState({
    TableName: "",
  });
  const [errors, setErrors] = React.useState({
    tableError: "",
  });
  const [mainTables, setMainTables] = React.useState([]);
  // Edit Mood
  const [isInEditMood, setIsInEditMood] = React.useState(false);
  const [toEdit, setToEdit] = React.useState({ tableName: "" });

  // React Effect
  React.useEffect(() => {
    LoadGroup();
  }, [props]);

  // Load all groups
  const LoadGroup = () => {
    appDb.HandleTables({ _type: "get" }, (reciveCallback) => {
      setMainTables(reciveCallback.data);
    });
  };

  const handleTextChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "TableName") setErrors({ ...errors, tableError: "" });
  };

  const handelColorChange = (type, InputColor) => {
    setColor({ ...colors, [type]: InputColor });
  };

  const handelSubmit = () => {
    if (values.TableName === "")
      return setErrors({ ...errors, tableError: "Name Should not be empty" });

    var Data = {
      _type: "set",
      table: values.TableName,
      colors,
    };

    appDb.HandleTables(Data, (callback) => {
      if (callback.isSet) {
        setValues({ ...values, TableName: "" });

        appDb.HandleTables({ _type: "get" }, (reciveCallback) => {
          setMainTables(reciveCallback.data);
        });

        toast(`Successfully Added ${values.TableName} `, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast(`"${values.TableName}" Table already exists`, {
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
    });
  };

  const handelSubmitEdit = () => {
    appDb.HandleTables(
      { _type: "editTable", group: toEdit, value: values.TableName },
      (reciveCallback) => {
        LoadGroup();

        if (reciveCallback.done)
          toast(`Successfully edited category name `, {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        else
          toast(`Error!! Failed to edit category name `, {
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
    );
  };

  return (
    <div
      className={classes.paper}
      style={{
        backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
        color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
      }}
    >
      <Typography variant="h5">Table Settings</Typography>
      <div style={{ paddingBottom: 20, paddingTop: 12 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="TableName"
              variant="outlined"
              required
              fullWidth
              value={values.TableName}
              onChange={handleTextChange("TableName")}
              id="TableName"
              label="Table Name"
              // color="secondary"
              error={errors.tableError === "" ? false : true}
              helperText={
                isInEditMood ? "You're in edit mood" : errors.tableError
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ display: "flex" }}>
              <div>
                <Typography>Button Color</Typography>
                <input
                  onChange={(e) => {
                    handelColorChange("backgroundColor", e.target.value);
                  }}
                  type="color"
                />
              </div>
              <div style={{ marginLeft: 15 }}>
                <Typography>Button Text Color</Typography>
                <input
                  onChange={(e) => {
                    handelColorChange("textColor", e.target.value);
                  }}
                  type="color"
                />
              </div>

              <div
                style={{
                  marginLeft: 15,
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                  borderWidth: 1,
                  padding: 15,
                }}
              >
                Button Preview
                <div>
                  <Button
                    style={{
                      // width: 150,
                      backgroundColor: colors.backgroundColor,
                      color: colors.textColor,
                    }}
                  >
                    <Typography style={{ width: "100%" }}>
                      {values.TableName}
                    </Typography>
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 10,
        }}
      >
        <div>
          <Button
            disabled={isInEditMood}
            style={{ marginLeft: 10 }}
            variant="contained"
            color="primary"
            onClick={() => handelSubmit()}
          >
            Save
          </Button>
          <Button
            disabled={!isInEditMood}
            style={{ marginLeft: 10 }}
            variant="contained"
            color="primary"
            onClick={() => handelSubmitEdit()}
          >
            Save Edited
          </Button>
          <Button
            disabled={!isInEditMood}
            style={{ marginLeft: 10 }}
            variant="contained"
            color="secondary"
            onClick={() => {
              setIsInEditMood(false);
              setValues({ ...values, TableName: "" });
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <table
          style={{
            width: "70%",
            borderColor: "#ccc",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <thead>
            <tr>
              <th className={classes.tableCol}>Action</th>
              <th className={classes.tableCol}>Tables</th>
              {/* <th className={classes.tableCol}>Recipes</th> */}
            </tr>
          </thead>
          <tbody>
            {mainTables.map((list, index) => (
              <tr key={index}>
                {props.User.userLogged.prevarges === "1" ? (
                  <td className={classes.tableRow}>
                    <button
                      style={{
                        backgroundColor: "#5A342E",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        appDb.HandleTables(
                          { _type: "delete", table: list },
                          (callback) => {
                            LoadGroup();

                            toast("Successfully deleted !", {
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
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: 10, cursor: "pointer" }}
                      onClick={() => {
                        setIsInEditMood(true);
                        setToEdit({ ...toEdit, tableName: list.table });
                        setValues({ ...values, TableName: list.table });
                      }}
                    >
                      Edit Table
                    </button>
                  </td>
                ) : null}
                <td className={classes.tableRow}>{list.table}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Cart: state.Cart,
    Theme: state.Theme,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
