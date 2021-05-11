import React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Message } from "semantic-ui-react";
import { toast } from "react-toastify";
import InputAdornment from "@material-ui/core/InputAdornment";
import ShoppingCartIcon from "@material-ui/icons/ShoppingBasket";
import MoneyIcon from "@material-ui/icons/MoneyOutlined";
import DescriptionIcon from "@material-ui/icons/Description";

import BarcodeReader from "react-barcode-reader";
import appDb from "../../redux/dataBase";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3, 4, 3),
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
  link: {
    color: "#0078D7",
    textDecoration: "underline",
    marginTop: 20,
    cursor: "pointer",
    "&:hover, &$focusVisible": {
      color: "#002847",
    },
  },
}));

const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>

const NewProduct = (props) => {
  const classes = useStyles();
  const [portionInputs, setPortionInputs] = React.useState({
    data: [],
  });
  const [values, setValues] = React.useState({
    ProductName: "",
    BarCode1: "",
    BarCode2: "",
    BarCode3: "",
    BarCode4: "",
    BarCode5: "",
    alertOut: "",
    amount: "",
    ProductQt: 0,
    buyProduct: 0,
    Groupname: "",
    VAT: false,
    invoice: "",
  });
  const [errors, setErrors] = React.useState({
    nameError: "",
    barCodeError: "",
    alertOutError: "",
    groupError: "",
    Categories: "",
    branchError: "",
    amount: "",
    invoice: "",
  });

  const [mainGroups, setMainGroups] = React.useState([]);
  const [Recipes, setRecipes] = React.useState([]);
  const [selectedRecipe, setSelectedRecipe] = React.useState("");
  const [branches, setBranches] = React.useState({ data: [] });
  const [Loading, setLoading] = React.useState(false);
  const [vatsetup, setVatsetup] = React.useState({
    data: [
      { vat: "VAT inclusive", isAdded: true },
      { vat: "No VAT inclusive", isAdded: false },
    ],
  });
  const [tax, setTax] = React.useState(true);
  const [ProductSupplier, setProductSupplier] = React.useState({});

  const [quantity, setQuantity] = React.useState(0);
  const [branch, setBranch] = React.useState("");

  const [SelectedMainGroups, setSelectedMainGroups] = React.useState({
    group: "",
    id: "",
    colors: {},
  });
  const [Suppliers, SetSuppliers] = React.useState([]);
  const [supplierEdit, SetSupplier] = React.useState({});
  const [expiryDate, setExpiryDate] = React.useState("");
  const [masters, setMasters] = React.useState(false);
  var [shotbarcode, setshotbarcode] = React.useState("");
  const [showMaster, setshowMaster] = React.useState(false);
  const [ProductRecipe, setProductRecipe] = React.useState("not set");
  const [state, setState] = React.useState({ data: [] });

  React.useEffect(() => {
    // console.log("callback");
    appDb.HandleBranches({ type: "get" }, (callback) => {
      setBranches({ ...branches, data: callback });
    });

    appDb.HandleSuppliers({ type: "get" }, (callback) => {
      SetSuppliers(callback);
    });

    appDb.HandelProducts({ _type: "GetRecipe" }, (reciveCallback) => {
      setState({ ...state, data: reciveCallback });
    });

    if (props.type === "edit") {
      setLoading(true);

      setValues({
        ...values,
        ProductName: props.data.selected.ItemName,
        buyProduct: props.data.selected.buyingPrice,
        ProductQt: props.data.selected.amountInstore,
        VAT: props.data.selected.isTaxEnabled,
      });

      setSelectedMainGroups({
        ...SelectedMainGroups,
        group: props.data.selected.group,
      });

      SetSupplier(props.data.selected.supplier);

      setBranch(props.data.selected.branches);

      if (props.data.selected.isMulity) {
        appDb.HandelProducts(
          {
            _type: "getPOSList",
            layoutType: "mulitList",
            name: props.data.selected.ItemName,
          },
          async (receiveCallback) => {
            var loopEnd = 0;
            const dataOutput = receiveCallback.data.map(
              async (datalist, index) => {
                // console.log(datalist);
                loopEnd++;
                handelPortion(datalist.id);
                handelOnTextPartonChage(datalist.barcode1, "barcode1", index);
                handelOnTextPartonChage(datalist.barcode2, "barcode2", index);
                handelOnTextPartonChage(datalist.barcode3, "barcode3", index);
                handelOnTextPartonChage(datalist.barcode4, "barcode4", index);
                handelOnTextPartonChage(datalist.barcode5, "barcode5", index);
                handelOnTextPartonChage(datalist.qnt, "multiplier", index);
                handelOnTextPartonChage(datalist.alertOut, "alertOut", index);
                handelOnTextPartonChage(datalist.sallingprice, "price", index);

                if (loopEnd === receiveCallback.data.length) {
                  return true;
                }
              }
            );

            const reslut = await Promise.all(dataOutput);
            if (reslut) setLoading(false);
          }
        );
      } else {
        handelPortion(false);
        setTimeout(() => {
          handelOnTextPartonChage(props.data.selected.barcode1, "barcode1", 0);
          handelOnTextPartonChage(props.data.selected.barcode2, "barcode2", 0);
          handelOnTextPartonChage(props.data.selected.barcode3, "barcode3", 0);
          handelOnTextPartonChage(props.data.selected.barcode4, "barcode4", 0);
          handelOnTextPartonChage(props.data.selected.barcode5, "barcode5", 0);
          handelOnTextPartonChage(
            props.data.selected.multiplier,
            "multiplier",
            0
          );
          handelOnTextPartonChage(
            parseInt(props.data.selected.alertOut),
            "alertOut",
            0
          );
          handelOnTextPartonChage(props.data.selected.sallingprice, "price", 0);
        }, 300);
      }
    }
    appDb.HandelGroup({ _type: "get" }, (reciveCallback) => {
      var arr = [];
      reciveCallback.data.map((data) => {
        arr.push({
          title: data.group,
          id: data.id,
          recipes: data.recipes,
          colors: data.colors,
        });
      });
      setMainGroups(arr);
    });
  }, []);

  const handleChange = (event) => {
    setMasters(event.target.checked);
  };

  const handleTextChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "ProductName") setErrors({ ...errors, nameError: "" });
    if (prop === "alertOut") setErrors({ ...errors, alertOutError: "" });
    if (prop === "Groupname") setErrors({ ...errors, groupError: "" });
  };

  const handelOnTextPartonChage = async (value, id, index) => {
    switch (id) {
      case "barcode1":
        portionInputs.data[index].barcode1 = value;
        break;
      case "barcode2":
        portionInputs.data[index].barcode2 = value;
        break;
      case "barcode3":
        portionInputs.data[index].barcode3 = value;
        break;
      case "barcode4":
        portionInputs.data[index].barcode4 = value;
        break;
      case "barcode5":
        portionInputs.data[index].barcode5 = value;
        break;
      case "multiplier":
        portionInputs.data[index].multiplier = value;
        break;
      case "alertOut":
        portionInputs.data[index].alertOut = value;
        break;
      case "price":
        portionInputs.data[index].price = value;
        break;

      default:
        break;
    }

    setPortionInputs({
      ...portionInputs,
      data: portionInputs.data,
    });
  };

  const handelDelete = () => {
    var arr = portionInputs.data;

    const filter = arr.findIndex((x) => x.id === 1);
    arr.splice(filter, 1);

    setPortionInputs({
      ...portionInputs,
      data: arr,
    });
  };

  const handelSubmit = () => {
    if (values.ProductName === "")
      return setErrors({ ...errors, nameError: "Name Should not be empty" });
    else if (portionInputs.data.length === 0) return;
    else if (branch === "") 
      return setErrors({
        ...errors,
        branchError: "Branch Should not be empty",
      });
    else if (SelectedMainGroups.group === "")
      return setErrors({
        ...errors,
        Categories: "Categorie Should not be empty",
      });

    var data = {
      name: values.ProductName,
      productQt: values.ProductQt,
      buyingPrice: values.buyProduct,
      branch,
      tax,
      group: SelectedMainGroups,
      recipe: selectedRecipe,
      ProductSupplier,
      expiryDate,
      MasterState: masters,
      invoice: values.invoice,
      portion: portionInputs.data,
      ingredient: ProductRecipe,
      _type:
        props.type === "edit"
          ? "edit"
          : props.type === "addToWareHouse"
          ? "addToWareHouse"
          : "set",
      data: props.type === "edit" ? props.data.selected : null,
    };

    if (props.trans) {
      if (props.trans === "trans") {
        var data2 = {
          name: values.ProductName,
          productQt: values.ProductQt,
          buyingPrice: values.buyProduct,
          branch,
          tax,
          group: SelectedMainGroups,
          recipe: selectedRecipe,
          ProductSupplier,
          expiryDate,
          MasterState: masters,
          invoice: values.invoice,
          portion: portionInputs.data, 
          _type: "WareHouseEdit",
          data: props.type === "edit" ? props.data.selected : null,
        };

        appDb.HandelProducts(data2, (reciveCallback) => {
          toast(`Successfully Updated`, {
            position: "top-right",
            autoClose: 5000,
            type: "success",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          if (props.type === "edit")
            props.dispatchEvent({
              type: "HANDELCLOSE",
              toClose: "edit_product",
            });
          else {
            props.dispatchEvent({
              type: "HANDELCLOSE",
              toClose: "new_product",
            });
          }

          props.dispatchEvent({
            type: "LOADTABEL",
          });
        });
      }
    } else {
      appDb.HandelProducts(data, (reciveCallback) => {
        toast(`Successfully Updated`, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        if (props.type === "edit")
          props.dispatchEvent({
            type: "HANDELCLOSE",
            toClose: "edit_product",
          });
        else {
          props.dispatchEvent({
            type: "HANDELCLOSE",
            toClose: "new_product",
          });
        }

        props.dispatchEvent({
          type: "LOADTABEL",
        });
      });
    }
  };

  const handelPortion = (propId) => {
    var newArr = [];

    newArr = portionInputs.data;
    var input = propId ? propId : `input_${newArr.length}`;
    var id = 0;

    if (newArr.length === 0) {
      newArr.push({
        id: input,
        barcode1: "",
        barcode2: "",
        barcode3: "",
        barcode4: "",
        barcode5: "",
        multiplier: "",
        alertOut: 1,
        price: "",
      });
    } else {
      id = newArr.length;
      newArr.push({
        id: input,
        barcode1: "",
        barcode2: "",
        barcode3: "",
        barcode4: "",
        barcode5: "",
        multiplier: "",
        alertOut: 1,
        price: "",
      });
    }
    setPortionInputs({ ...portionInputs, data: newArr });
  };

  const onOpenChange = (dateValue, type) => {
    setExpiryDate(dateValue.target.value);
  };

  const handleOnKeyPress = (key) => {
    // console.log(key);
    if (key !== "Enter") {
      shotbarcode = shotbarcode + key;
      setshotbarcode(shotbarcode);
    }

    if (key === "Enter") {
      if (shotbarcode === "master") {
        setshowMaster(true);
        setshotbarcode("");
      } else {
        setshotbarcode("");
        setshowMaster(false);
      }
    }
  };

  return (
    <div
      className={classes.paper}
      style={{
        backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
        color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
        height: props.type === "edit" ? 655 : 655,
      }}
    >
      <BarcodeReader
        onKeyDetect={(event) => {
          handleOnKeyPress(event.key);
        }}
      />
      <div style={{ height: 500 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* {props.type === "edit" ? (
              <label>
                Defailt Product Name:{" "}
                <span style={{ color: "red", textDecoration: "underline" }}>
                  {props.data.selected.name}
                </span>{" "}
              </label>
            ) : null} */}
            <TextField
              // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              autoComplete="ProductName"
              name="ProductName"
              variant="outlined"
              required
              fullWidth
              onChange={handleTextChange("ProductName")}
              value={values.ProductName}
              id="ProductName"
              label="Product Name"
              error={errors.nameError === "" ? false : true}
              helperText={errors.nameError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* {props.type === "edit" ? (
              <label>
                Defailt Product Group:{" "}
                <span style={{ color: "red", textDecoration: "underline" }}>
                  {props.data.selected.group}
                </span>
              </label>
            ) : null} */}
            <Autocomplete
              id="controllable-states-demo"
              options={mainGroups}
              onChange={(event, newValue) => {
                console.log(newValue);

                var arr = [];
                setRecipes(arr);
                setSelectedMainGroups({
                  ...SelectedMainGroups,
                  group: newValue.title,
                  id: newValue.id,
                  colors: newValue.colors,
                });
                setErrors({
                  ...errors,
                  Categories: "",
                });
              }}
              getOptionLabel={(option) => option.title}
              style={{
                width: 300,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  variant="outlined"
                  fullWidth
                  value={SelectedMainGroups.group}
                  error={errors.Categories === "" ? false : true}
                  helperText={
                    props.type === "edit"
                      ? `Default Category name: ${SelectedMainGroups.group}`
                      : errors.Categories
                  }
                />
              )}
            />
            <div style={{ marginTop: 20 }}>
              <Autocomplete
                // disabled={props.type === "edit" ? true : false}
                id="combo-box-demo"
                options={branches.data}
                onChange={(event, newValue) => {
                  setBranch(newValue.brancheId);
                  setErrors({
                    ...errors,
                    branchError: "",
                  });
                }}
                getOptionLabel={(option) => option.branche}
                style={{
                  width: 300,
                  // marginTop: props.type === "edit" ? 20 : 0,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branches"
                    variant="outlined"
                    fullWidth
                    error={errors.branchError === "" ? false : true}
                    helperText={
                      props.type === "edit"
                        ? `Default Branch name: ${branch}`
                        : errors.branchError
                    }
                  />
                )}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <TextField
                id="date"
                label="Expiry Date"
                type="date"
                defaultValue={materialDateInput}
                onChange={(event) => onOpenChange(event, "startDate")}
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </Grid>
        </Grid>
        <div style={{ marginTop: 10 }} />
        <Grid item xs={12} sm={6}>
          {/* {props.type === "edit" ? (
            <label>
              Defailt Product Group:{" "}
              <span style={{ color: "red", textDecoration: "underline" }}>
                {props.data.selected.recipes}
              </span>
            </label>
          ) : null} */}
          <div
            style={{
              marginTop: props.type === "edit" ? -175 : -134,
              display: "flex",
              width: "100%",
            }}
          >
            <TextField
              // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              name="ProductQt"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleTextChange("ProductQt")}
              value={values.ProductQt}
              id="ProductQt"
              label="Product Quantity"
              error={errors.nameError === "" ? false : true}
              helperText={errors.nameError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MoneyIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
              name="buyProduct"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleTextChange("buyProduct")}
              value={values.buyProduct}
              id="ProductQt"
              label="Buying Price"
              error={errors.nameError === "" ? false : true}
              helperText={errors.nameError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ShoppingCartIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ marginTop: 20, display: "flex" }}>
            <Autocomplete
              // disabled={props.type === "edit" ? true : false}
              id="combo-box-demo"
              options={vatsetup.data}
              onChange={(event, newValue) => {
                setTax(newValue.isAdded);
              }}
              getOptionLabel={(option) => option.vat}
              style={{
                width: 300,
                // marginTop: props.type === "edit" ? 20 : 0,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="VAT Setup"
                  variant="outlined"
                  fullWidth
                  helperText={
                    props.type === "edit"
                      ? `Default VAT Setup: ${
                          values.VAT ? "VAT inclusive" : "No VAT inclusive"
                        }`
                      : null
                  }
                />
              )}
            />
            <Autocomplete
              // disabled={props.type === "edit" ? true : false}
              defaultValue={{}}
              id="combo-box-demo"
              options={Suppliers}
              onChange={(event, newValue) => {
                setProductSupplier(newValue);
              }}
              getOptionLabel={(option) => option.SupplierName}
              style={{
                width: 300,
                //   marginTop: props.type === "edit" ? 20 : 0,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Supplier Setup"
                  variant="outlined"
                  fullWidth
                  helperText={
                    props.type === "edit"
                      ? `Default Supplier: ${supplierEdit.SupplierName}`
                      : null
                  }
                />
              )}
            />
            <Autocomplete
              // disabled={props.type === "edit" ? true : false}
              defaultValue={{}}
              id="combo-box-demo"
              options={state.data}
              onChange={(event, newValue) => {
                // console.log(newValue);

                if (newValue) setProductRecipe(newValue.idKey);
                else if (!newValue) setProductRecipe("not set");
              }}
              getOptionLabel={(option) => option.recipeName}
              style={{
                width: 300,
                //   marginTop: props.type === "edit" ? 20 : 0,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Set Recipe"
                  variant="outlined"
                  fullWidth
                  helperText="optional"
                />
              )}
            />
          </div>
          <TextField
            style={{ marginTop: 10 }}
            name="invoice"
            type="text"
            variant="outlined"
            fullWidth
            onChange={handleTextChange("invoice")}
            value={values.invoice}
            id="invoice"
            label="Invoice Number"
            error={errors.invoice === "" ? false : true}
            helperText={errors.invoice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            }}
          />
          {showMaster ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={masters}
                  onChange={handleChange}
                  name="masters"
                  color="secondary"
                />
              }
              label="Set This Product Masters"
            />
          ) : null}
        </Grid>
        <div style={{ marginTop: 30 }}>
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                borderColor: "#aaaaaa",
                borderStyle: "solid",
                height: 230,
                borderWidth: 1,
                borderRadius: 3,
                marginTop: 20,
              }}
            >
              <div
                style={{
                  marginTop: -10,
                  backgroundColor:
                    props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
                  marginLeft: 10,
                  width: 97,
                  paddingLeft: 5,
                }}
              >
                <Typography variant="body2">Portion Prices</Typography>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    padding: 10,
                    width: "82%",
                    maxHeight: 210,
                    overflow: "hidden",
                    overflowY: "auto",
                  }}
                >
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th className={classes.tableCol}>BarCode</th>
                        <th className={classes.tableCol}>Alert Out</th>
                        <th className={classes.tableCol}>Selling Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portionInputs.data.map((tablelist, index) => (
                        <tr
                          key={index}
                          // onClick={() => console.log(tablelist)}
                        >
                          <td className={classes.tableRow}>
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode1",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode1}
                              name={tablelist.barcode}
                              placeholder="barcode 1"
                            />
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode2",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode2}
                              name={tablelist.barcode}
                              placeholder="barcode 2"
                            />
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode3",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode}
                              name={tablelist.barcode3}
                              placeholder="barcode 3"
                            />
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode4",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode}
                              name={tablelist.barcode4}
                              placeholder="barcode 4"
                            />
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                outline: "none",
                                width: 200,
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "barcode5",
                                  index
                                );
                              }}
                              type="text"
                              defaultValue={tablelist.barcode}
                              name={tablelist.barcode5}
                              placeholder="barcode 5"
                            />
                          </td>

                          <td className={classes.tableRow}>
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                width: 230,
                                outline: "none",
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "alertOut",
                                  index
                                );
                              }}
                              type="number"
                              defaultValue={tablelist.alertOut}
                              name={tablelist.alertOut}
                              placeholder="alert out"
                            />
                          </td>
                          <td className={classes.tableRow}>
                            <input
                              style={{
                                borderColor: "transparent",
                                borderTopColor: "#aaaaaa",
                                borderStyle: "solid",
                                borderWidth: 1,
                                width: 230,
                                outline: "none",
                                color:
                                  props.Theme.theme === "light"
                                    ? "#3b3b3b"
                                    : "#fff",
                                backgroundColor: "transparent",
                              }}
                              onInput={(e) => {
                                handelOnTextPartonChage(
                                  e.target.value,
                                  "price",
                                  index
                                );
                              }}
                              type="number"
                              defaultValue={tablelist.price}
                              name={tablelist.price}
                              placeholder="selling price"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {props.type !== "edit" ? (
                    <div>
                      {portionInputs.data.length === 0 ? (
                        <div style={{ marginTop: 10 }}>
                          <Message warning>
                            <Message.Header>
                              Atlest add one row in the Portion Table
                            </Message.Header>

                            <Typography>
                              We have to get the Price of the Product this must
                              not be empty. If the Multiplier or Alert Out is
                              left blank it will be set to defult which is 1.
                              Barcode is optional
                            </Typography>
                          </Message>
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {/* {Loading ? (
                    <div style={{ marginTop: 10 }}>
                      <Message warning>
                        <Message.Header>Loading product</Message.Header>

                        <Typography>Please Wait...</Typography>
                      </Message>
                    </div>
                  ) : null} */}
                </div>
                <div
                  style={{
                    width: "15%",
                  }}
                >
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={portionInputs.data < 1 ? false : true}
                      size="small"
                      onClick={() => handelPortion(false)}
                    >
                      Add Portion
                    </Button>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handelDelete()}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 65,
        }}
      >
        <div>
          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            color="primary"
            onClick={() => handelSubmit()}
          >
            Save
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              if (props.type === "edit")
                props.dispatchEvent({
                  type: "HANDELCLOSE",
                  toClose: "edit_product",
                });
              else {
                props.dispatchEvent({
                  type: "HANDELCLOSE",
                  toClose: "new_product",
                });
              }
            }}
            style={{ marginLeft: 10 }}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Cart: state.Cart,
    Theme: state.Theme,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
