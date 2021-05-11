import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React = require("react");
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import { toast } from "react-toastify";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import appDb from "../../redux/dataBase";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox />),
  Check: forwardRef((props, ref) => <Check />),
  Clear: forwardRef((props, ref) => <Clear />),
  Delete: forwardRef((props, ref) => <DeleteOutline />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight />),
  Edit: forwardRef((props, ref) => <Edit />),
  Export: forwardRef((props, ref) => <SaveAlt />),
  Filter: forwardRef((props, ref) => <FilterList />),
  FirstPage: forwardRef((props, ref) => <FirstPage />),
  LastPage: forwardRef((props, ref) => <LastPage />),
  NextPage: forwardRef((props, ref) => <ChevronRight />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft />),
  ResetSearch: forwardRef((props, ref) => <Clear />),
  Search: forwardRef((props, ref) => <Search />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn />),
};

function Supplires(props) {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Supplier Name",
        field: "SupplierName",
      },
      {
        title: "Supplier Address",
        field: "address",
      },
      {
        title: "Supplier Contact",
        field: "contact",
        // lookup: { 1: "Admistrator", 0: "User" },
      },
    ],
    data: [],
  });

  const [values, setValues] = React.useState({
    SupplierName: "",
    SupplierAddress: "",
    SupplierContact: "",
  });

  const [errors, setErrors] = React.useState({
    SupplierNameError: "",
    SupplierAddressError: "",
    SupplierContactError: "",
  });

  React.useEffect(() => {
    GetSuppliers();
  }, []);

  const GetSuppliers = () => {
    appDb.HandleSuppliers({ type: "get" }, (callback) => {
      // console.log(callback);
      setState({ ...state, data: callback });
    });
  };

  const handleTextChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "SupplierName")
      setErrors({ ...errors, SupplierNameError: "" });
    if (prop === "SupplierAddress")
      setErrors({ ...errors, SupplierAddressError: "" });
    if (prop === "SupplierContact")
      setErrors({ ...errors, SupplierContactError: "" });
  };

  const handleSubmit = () => {
    if (values.SupplierName === "")
      return setErrors({
        ...errors,
        SupplierNameError: "Supplier Name can't be empty",
      });
    if (values.SupplierAddress === "")
      return setErrors({
        ...errors,
        SupplierAddressError: "Supplier Address can't be empty",
      });
    if (values.SupplierContact === "")
      return setErrors({
        ...errors,
        SupplierContactError: "Supplier Address can't be empty",
      });

    appDb.HandleSuppliers(
      {
        type: "set",
        SupplierName: values.SupplierName,
        SupplierAddress: values.SupplierAddress,
        SupplierContact: values.SupplierContact,
      },
      (callback) => {
        if (callback.isSet) {
          setValues({
            ...values,
            SupplierName: "",
            SupplierContact: "",
            SupplierAddress: "",
          });

          GetSuppliers();

          toast(`Successfully Added`, {
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
      }
    );
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <div style={{ marginLeft: 20, marginTop: 20, width: "100%" }}>
        <Typography variant="h6" style={{ paddingBottom: 20 }}>
          Supplier List
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          padding: 10,
        }}
      >
        <Paper
          style={{
            height: "100%",
            width: "70%",
            margin: "auto",
            padding: 20,
          }}
        >
          {props.User.userLogged.prevarges === "1" ? (
            <MaterialTable
              icons={tableIcons}
              title="Suppliers List "
              columns={state.columns}
              data={state.data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    appDb.HandleSuppliers(
                      { type: "edit", newData },
                      (callback) => {
                        setTimeout(() => {
                          resolve();
                          if (oldData) {
                            setState((prevState) => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return { ...prevState, data };
                            });
                          }
                        }, 600);
                      }
                    );
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    appDb.HandleSuppliers(
                      { type: "delete", oldData },
                      (callback) => {
                        setTimeout(() => {
                          resolve();
                          setState((prevState) => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                          });
                        }, 600);
                      }
                    );
                  }),
              }}
            />
          ) : (
            <MaterialTable
              icons={tableIcons}
              title="Suppliers List "
              columns={state.columns}
              data={state.data}
            />
          )}
        </Paper>
        <Paper
          style={{
            width: "30%",
            height: "100%",
            backgroundColor:
              props.Theme.theme === "light" ? "#EBEBEB" : "#2B2B2B",
            padding: 15,
          }}
        >
          <div>
            <Typography variant="h6">Add New Supplier</Typography>
          </div>
          <div style={{ marginTop: 20 }}>
            <TextField
              style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              name="SupplierName"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleTextChange("SupplierName")}
              value={values.SupplierName}
              id="SupplierName"
              label="Supplier Name"
              error={errors.SupplierNameError === "" ? false : true}
              helperText={errors.SupplierNameError}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <MoneyIcon />
              //     </InputAdornment>
              //   ),
              // }}
            />
            <div style={{ height: 10 }} />
            <TextField
              style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              name="SupplierAddress"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleTextChange("SupplierAddress")}
              value={values.SupplierAddress}
              id="SupplierAddress"
              label="Supplier Address"
              error={errors.SupplierAddressError === "" ? false : true}
              helperText={errors.SupplierAddressError}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <MoneyIcon />
              //     </InputAdornment>
              //   ),
              // }}
            />
            <div style={{ height: 10 }} />
            <TextField
              style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              name="SupplierContact"
              type="text"
              variant="outlined"
              fullWidth
              onChange={handleTextChange("SupplierContact")}
              value={values.SupplierContact}
              id="SupplierContact"
              label="Supplier Contact "
              error={errors.SupplierContactError === "" ? false : true}
              helperText={errors.SupplierContactError}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <MoneyIcon />
              //     </InputAdornment>
              //   ),
              // }}
            />
            <div style={{ marginTop: 10 }}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                style={{}}
              >
                Create
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplires);
