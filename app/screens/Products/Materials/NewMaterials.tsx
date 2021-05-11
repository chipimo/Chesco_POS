const React = require("react");
import {
  Divider,
  Typography,
  InputLabel,
  FormControl,
  Input,
  TextField,
  IconButton,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { Button, Header, Table, Icon } from "semantic-ui-react";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";

import appDb from "../../../redux/dataBase";

const uuidv1 = require("uuid/v1");

const NewMaterials = (props) => {
  const [List, setList] = React.useState({ data: [] });
  const [unityList, setUnityList] = React.useState([
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
  ]);

  React.useEffect(() => {
    if (props.type) {
      let tempArr = [];
      tempArr = List.data;

      tempArr.push({
        id: props.data.data.idKey,
        name: props.data.data.materialName,
        measuredBy: props.data.data.measuredBy,
        Qty: props.data.data.quantity,
        ogQty: props.data.data.quantity,
      });

      setList({ ...List, data: tempArr });
    }
  }, []);

  const addMaterials = () => {
    let tempArr = [];
    tempArr = List.data;

    tempArr.push({
      id: uuidv1(),
      name: "",
      measuredBy: "",
      Qty: 0,
      ogQty: 0,
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

  const handleOnChange = (e) => {
    let tempArr = [];
    tempArr = List.data;

    tempArr[e.index][e.title] = e.e.target.value;
    setList({ ...List, data: tempArr });
    // setName(e.target.value);
  };

  const handleOnDropChange = (e) => {
    let tempArr = [];
    tempArr = List.data;

    if (e.type === "quantityFrist") {
      tempArr[e.index].measuredBy = e.value;
      setList({ ...List, data: tempArr });
    } else {
      tempArr[e.index].newMeasuerment = e.value;
      setList({ ...List, data: tempArr });
    }
  };

  const handleSubmit = () => {
    const data = {
      List,
      _type: props.type ? "editMaterials" : "setMaterials",
    };

    appDb.HandelProducts(data, (callback) => {
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

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        {props.type ? (
          <Typography variant="h6">Edit Material</Typography>
        ) : (
          <Typography variant="h6">New Material</Typography>
        )}
      </div>
      <Divider />
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Button
          disabled={props.type ? true : false}
          onClick={addMaterials}
          color="black"
        >
          Add Table Row
        </Button>
      </div>
      <Divider />
      <div style={{ marginTop: 10 }}>
        <div style={{ maxHeight: "90%", overflow: "auto" }}>
          <Table
            inverted={props.Theme.theme === "light" ? false : true}
            basic="very"
            celled
            collapsing
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell> Materials Name</Table.HeaderCell>
                <Table.HeaderCell>Measured by</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {List.data.map((listItems, index) => {
                // console.log(listItems);

                var tempIndex = unityList.findIndex(
                  (item) => item.title === listItems.measuredBy
                );

                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Icon color="red" name="box" />
                        <Header.Content>
                          <FormControl>
                            <InputLabel htmlFor="standard-adornment-password">
                              Enter Ingredient Name
                            </InputLabel>
                            <Input
                              onChange={(e) =>
                                handleOnChange({
                                  title: "name",
                                  index,
                                  e,
                                })
                              }
                              id="standard-adornment-password"
                              defaultValue={listItems.name}
                            />
                          </FormControl>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Autocomplete
                        id="combo-box-demo"
                        options={unityList}
                        groupBy={(option) => option.type}
                        getOptionLabel={(option) => option.title}
                        defaultValue={unityList[tempIndex]}
                        onChange={(e, newValue) =>
                          handleOnDropChange({
                            type: "quantityFrist",
                            value: newValue,
                            index: index,
                          })
                        }
                        style={{ width: 250 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Unity Measurement"
                            variant="outlined"
                            helperText={
                              props.type === "edit"
                                ? `Default value is ${listItems.measuredBy}`
                                : ""
                            }
                          />
                        )}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <TextField
                        id="standard-basic"
                        type="number"
                        label="Quantity"
                        name="OgQuantity"
                        defaultValue={listItems.ogQty}
                        onChange={(e) =>
                          handleOnChange({ title: "ogQty", index, e })
                        }
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <IconButton
                        onClick={() =>
                          handleRemove({ id: listItems.id, index })
                        }
                        aria-label="delete"
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
        <div style={{ marginTop: 10 }}>
          <Divider />
        </div>
        <div style={{ marginTop: 10 }}>
          <Button onClick={handleSubmit} color="black">
            Save Materials
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewMaterials);
