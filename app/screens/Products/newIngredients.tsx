const React = require("react");
import {
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { Icon, Label, Button } from "semantic-ui-react";
import { Header, Image, Table } from "semantic-ui-react";
import Input from "@material-ui/core/Input";

import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import ExposureIcon from "@material-ui/icons/Exposure";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";

import appDb from "../../redux/dataBase";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const Currency = require("react-currency-formatter");
const convert = require("convert-units");
const uuidv1 = require("uuid/v1");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NewIngredients = (props) => {
  const [MainCategory, setMainCategory] = React.useState([]);
  const [unityList, setUnityList] = React.useState({
    mas: [
      {
        title: "Kilogram (kg)",
        pre: "kg",
        type: "Mass",
      },
      {
        title: "Microgram (mcg)",
        pre: "mcg",
        type: "Mass",
      },
      {
        title: "Gram (g)",
        pre: "g",
        type: "Mass",
      },
      {
        title: "Ounce (oz)",
        pre: "oz",
        type: "Mass",
      },
      {
        title: "Pound (lb)",
        pre: "lb",
        type: "Mass",
      },
      {
        title: "Megatonne (mt)",
        pre: "mt",
        type: "Mass",
      },
      {
        title: "Tea spoon (t)",
        pre: "t",
        type: "Mass",
      },
    ],
    volume: [
      {
        title: "Cubic Millimeter (mm3)",
        pre: "mm3",
        type: "Volume",
      },
      {
        title: "Cubic Centimeter (cm3)",
        pre: "cm3",
        type: "Volume",
      },
      {
        title: "Milliliter (ml)",
        pre: "ml",
        type: "Volume",
      },
      {
        title: "Litre (l)",
        pre: "l",
        type: "Volume",
      },
      {
        title: "kiloliter (kl)",
        pre: "kl",
        type: "Volume",
      },
      {
        title: "Cubic Meter (m3)",
        pre: "m3",
        type: "Volume",
      },
      {
        title: "Cubic Kilometer (km3)",
        pre: "km3",
        type: "Volume",
      },
      {
        title: "Tea Spoon (tsp)",
        pre: "tsp",
        type: "Volume",
      },
      {
        title: "Table Spoon (Tbs)",
        pre: "Tbs",
        type: "Volume",
      },
      {
        title: "Cubic Inch (in3)",
        pre: "in3",
        type: "Volume",
      },
      {
        title: "Fluid Ounce (fl-oz)",
        pre: "fl-oz",
        type: "Volume",
      },
      {
        title: "Cup (cup)",
        pre: "cup",
        type: "Volume",
      },
      {
        title: "PNT (pnt)",
        pre: "pnt",
        type: "Volume",
      },
      {
        title: "QT (qt)",
        pre: "qt",
        type: "Volume",
      },
      {
        title: "Gallon (gal)",
        pre: "gal",
        type: "Volume",
      },
      {
        title: "Cubic Feet (ft3)",
        pre: "ft3",
        type: "Volume",
      },
      {
        title: "Cubic Yard (yd3)",
        pre: "yd3",
        type: "Volume",
      },
    ],
  });
  const [List, setList] = React.useState({ data: [] });
  const [selected, setSelected] = React.useState(null);
  const [name, setName] = React.useState("");

  const [convertedFrist, setConvertedFrist] = React.useState("");
  const [convertedLast, setConvertedLast] = React.useState("");

  const [convertedFristUnity, setConvertedFristUnity] = React.useState("");
  const [convertedLastUnity, setConvertedLastUnity] = React.useState("");

  const [Converted, setConverted] = React.useState();
  const [UnityDrop, setUnityDrop] = React.useState("");

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [LoadOnce, setLoadOnce] = React.useState(true);
  const [BackButton, setBackButton] = React.useState(false);
  const [state, setState] = React.useState({ data: [] });

  React.useEffect(() => {
    if (LoadOnce)
      appDb.HandelProducts({ _type: "GetMaterials" }, (reciveCallback) => {
        setState({ ...state, data: reciveCallback });
        setLoadOnce(false);
      });

    if (props.data)
      if (props.type === "edit") {
        // console.log(props);

        let tempArr = [];
        tempArr = List.data;

        setBackButton(true);
        setName(props.data.data.recipeName);

        props.data.data.ingredients.data.map((ingredient) => {
          tempArr.push({
            id: ingredient.id,
            name: ingredient.name,
            material: ingredient.material,
            ogQty: ingredient.ogQty,
            Qty: ingredient.Qty,
            convertTo: "",
            newMeasuerment: ingredient.newMeasuerment,
            pricePer: "",
          });
        });

        setList({ ...List, data: tempArr });
      } else {
        setBackButton(false);
      }
  }, [props]);

  // const search = (event, item) => {
  //   if (item !== null) {
  //     setName(item.ItemName);
  //     setSelected(item);
  //   }
  // };

  const addMaterials = () => {
    let tempArr = [];
    tempArr = List.data;

    tempArr.push({
      id: uuidv1(),
      name: "",
      material: "",
      ogQty: 0,
      Qty: 0,
      convertTo: "",
      newMeasuerment: "",
      pricePer: "",
    });

    setList({ ...List, data: tempArr });
  };

  const handleRemove = (e) => {
    let tempArr = [];
    tempArr = List.data;

    const filter = tempArr.findIndex((x) => x.id === e.id);
    tempArr.splice(filter, 1);

    setList({ ...List, data: tempArr });
  };

  const covertor = () => {
    var result = convert(1).from("cup").to("Tbs");

    setConverted(result);
    // console.log(result);
  };

  const handleOnChange = (e) => {
    let tempArr = [];
    tempArr = List.data;

    tempArr[e.index][e.title] = e.e.target.value;
    setList({ ...List, data: tempArr });
    // setName(e.target.value);
  };

  const handleOnNameChange = (e) => {
    setName(e.target.value);
  };

  const handleOnDropChange = (e) => {
    let tempArr = [];
    tempArr = List.data;

    if (e.type === "material") {
      tempArr[e.index].material = e.value;
      setList({ ...List, data: tempArr });
    } else {
      tempArr[e.index].newMeasuerment = e.value;
      setList({ ...List, data: tempArr });
    }
  };

  const handleSubmit = () => {
    const data = {
      name,
      List,
      _type: "setRecipe",
    };

    appDb.HandelProducts(data, (reciveCallback) => {
      setList({ ...List, data: [] });

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
    });
  };

  const handleOnFristDropChange = (event, newValue) => {
    setConvertedFristUnity(newValue.title);
  };

  const handleOnLastDropChange = (event, newValue) => {
    setConvertedLastUnity(newValue.title);
  };

  const handleOnFristNumChange = (e) => {
    var result = convert(parseInt(e.target.value))
      .from(convertedFristUnity)
      .to(convertedLastUnity);
    // console.log(result);

    setConvertedFrist(result);
  };

  const handleOnLastNumChange = (e) => {
    var result = convert(parseInt(e.target.value))
      .from(convertedLastUnity)
      .to(convertedFristUnity);
    // console.log(result);
    setConvertedLast(result);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "95%",
      }}
    >
      <div>
        <Button
          onClick={() =>
            props.dispatchEvent({
              type: "SETINGREDIENTSSTATE",
              state: {
                changeView: "showList",
                data: props.IngredientsData.state.data,
              },
            })
          }
          circular
          color="black"
          icon="arrow alternate circle left outline"
        />
      </div>
      <div style={{ width: "100%", height: "95%", overflow: "auto" }}>
        <div style={{ padding: 10 }}>
          <div style={{ display: "flex" }}>
            <TextField
              id="standard-basic"
              variant="outlined"
              label="Recipe Name"
              style={{ width: 300 }}
              name="name"
              value={name}
              onChange={handleOnNameChange}
            />
          </div>

          <div style={{ width: "100%", height: "40%", overflow: "auto" }}>
            <div>
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  height: "98%",
                  overflow: "auto",
                  paddingTop: 10,
                  marginBottom: 10,
                }}
              >
                <Typography variant="h6">{name}</Typography>

                <div style={{ marginLeft: 10 }}>
                  <Button onClick={addMaterials} variant="outlined">
                    {" "}
                    Add Ingredients / Materials{" "}
                  </Button>
                </div>
              </div>
              <Divider />
              <div style={{ marginTop: 10 }}>
                <Table
                  inverted={props.Theme.theme === "light" ? false : true}
                  basic="very"
                  celled
                  collapsing
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        Ingredients / Materials
                      </Table.HeaderCell>

                      <Table.HeaderCell>Unit Of Measurement</Table.HeaderCell>
                      <Table.HeaderCell>
                        Amount Used (Quantity)
                      </Table.HeaderCell>

                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {List.data.map((listItems, index) => {
                      // console.log(listItems);
                      // console.log(state.data);

                      var temp1Index = unityList.volume.findIndex(
                        (item) => item.title === listItems.newMeasuerment.title
                      );

                      var temp2Index = unityList.mas.findIndex(
                        (item) => item.title === listItems.newMeasuerment.title
                      );

                      var tempIndex = state.data.findIndex(
                        (item) =>
                          item.materialName === listItems.material.materialName
                      );

                      var masIndex = unityList.mas.findIndex(
                        (item) => item.title === listItems.material.measuredBy
                      );

                      var volumeIndex = unityList.volume.findIndex(
                        (item) => item.title === listItems.material.measuredBy
                      );

                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <Autocomplete
                              id="combo-box-demo"
                              options={state.data}
                              getOptionLabel={(option) => option.materialName}
                              defaultValue={state.data[tempIndex]}
                              onChange={(e, newValue) => {
                                handleOnDropChange({
                                  type: "material",
                                  value: newValue,
                                  index: index,
                                });
                                setUnityDrop(newValue.newValue);
                              }}
                              style={{ width: 250 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Material"
                                  variant="outlined"
                                  helperText={
                                    props.type === "edit"
                                      ? `Default value is ${listItems.material.materialName}`
                                      : `Measured in ${
                                          listItems.material.measuredBy ===
                                          undefined
                                            ? ""
                                            : listItems.material.measuredBy
                                        }`
                                  }
                                />
                              )}
                            />
                          </Table.Cell>

                          <Table.Cell>
                            <Typography variant="h6">
                              {listItems.material.measuredBy}
                            </Typography>
                          </Table.Cell>

                          <Table.Cell>
                            <TextField
                              id="standard-basic"
                              type="number"
                              label="Quantity"
                              name="OgQuantity"
                              defaultValue={listItems.Qty}
                              onChange={(e) =>
                                handleOnChange({ title: "Qty", index, e })
                              }
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <div style={{ display: "flex" }}>
                              {/* <IconButton
                                onClick={handleOpen}
                                aria-label="delete"
                              >
                                <ExposureIcon style={{ color: "teal" }} />
                              </IconButton> */}

                              {/* Modal */}
                              <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                // onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                  timeout: 500,
                                }}
                              >
                                <Fade in={open}>
                                  <div className={classes.paper}>
                                    <h2 id="transition-modal-title">
                                      Unity Converter
                                    </h2>
                                    <div
                                      style={{
                                        padding: 10,
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            paddingBottom: 10,
                                            // borderWidth: 1,
                                            // borderStyle: "solid",
                                            // borderTopColor: "#A1A1A1",
                                            // borderLeftColor: "#A1A1A1",
                                            // borderRightColor: "#A1A1A1",
                                            // borderBottomColor: "transparent",
                                          }}
                                        >
                                          <TextField
                                            id="standard-basic"
                                            type="number"
                                            label="Quantity"
                                            name="OgQuantity"
                                            onChange={handleOnFristNumChange}
                                          />
                                        </div>
                                        <Autocomplete
                                          id="combo-box-demo"
                                          options={unityList}
                                          groupBy={(option) => option.type}
                                          getOptionLabel={(option) =>
                                            option.title
                                          }
                                          onChange={handleOnFristDropChange}
                                          style={{ width: 250 }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Unity Measurement"
                                              variant="outlined"
                                            />
                                          )}
                                        />
                                        <div style={{ userSelect: "all" }}>
                                          <Typography>
                                            <Typography variant="h6">
                                              {convertedFristUnity}{" "}
                                              {convertedLast}
                                            </Typography>
                                          </Typography>
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          marginTop: 25,
                                          padding: 10,
                                          textAlign: "center",
                                        }}
                                      >
                                        <div>=</div>
                                        <div style={{ marginTop: 15 }}>
                                          {" "}
                                          Convert To{" "}
                                        </div>
                                      </div>
                                      <div>
                                        <div
                                          style={{
                                            paddingBottom: 10,
                                            // borderWidth: 1,
                                            // borderStyle: "solid",
                                            // borderTopColor: "#A1A1A1",
                                            // borderLeftColor: "#A1A1A1",
                                            // borderRightColor: "#A1A1A1",
                                            // borderBottomColor: "transparent",
                                          }}
                                        >
                                          <TextField
                                            id="standard-basic"
                                            type="number"
                                            label="Quantity"
                                            name="OgQuantity"
                                            value={convertedLast}
                                            onChange={handleOnLastNumChange}
                                          />
                                        </div>
                                        <Autocomplete
                                          id="combo-box-demo"
                                          options={unityList}
                                          groupBy={(option) => option.type}
                                          getOptionLabel={(option) =>
                                            option.title
                                          }
                                          onChange={handleOnLastDropChange}
                                          style={{ width: 250 }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Unity Measurement"
                                              variant="outlined"
                                            />
                                          )}
                                        />
                                        <div style={{ userSelect: "all" }}>
                                          <Typography variant="h6">
                                            {convertedLastUnity}{" "}
                                            {convertedFrist}
                                          </Typography>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <Button
                                        variant="contained"
                                        color="black"
                                        onClick={handleClose}
                                      >
                                        Close
                                      </Button>
                                    </div>
                                  </div>
                                </Fade>
                              </Modal>
                              {/* End Modal */}

                              <IconButton
                                onClick={() =>
                                  handleRemove({ id: listItems.id, index })
                                }
                                aria-label="delete"
                              >
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: 10 }}>
        <Button onClick={handleSubmit} variant="contained" color="black">
          Save Ingredients
        </Button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    IngredientsData: state.IngredientsReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewIngredients);
