const React = require("react");
import { Box, Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { Icon, Button } from "semantic-ui-react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NewIngredients from "./newIngredients";
import IngredientsList from "./IngredientsList";
import MaterialsList from "./Materials/MaterialsList";
import NewMaterials from "./Materials/NewMaterials";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Ingredients = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (props.IngredientsData.changeState)
      if (props.IngredientsData.state.changeView === "editIngre") {
        handleChangeIndex(2);
        props.dispatchEvent({
          type: "CLEARINGREDIENTSSTATE",
          state: {
            changeView: "none",
            data: props.IngredientsData.state.data,
          },
        });
      } else if (props.IngredientsData.state.changeView === "showList") {
        handleChangeIndex(0);
        props.dispatchEvent({
          type: "CLEARINGREDIENTSSTATE",
          state: {
            changeView: "none",
            data: props.IngredientsData.state.data,
          },
        });
      }

    if (props.MaterialsData.state.changeView === "newMaterial") {
      handleChangeIndex(4);
      props.dispatchEvent({
        type: "CLEARMATERIALSSTATE",
        state: {
          changeView: "none",
          data: {},
        },
      });
    }
    else if (props.MaterialsData.state.changeView === "showMaterailsList") {
      handleChangeIndex(3);
      props.dispatchEvent({
        type: "CLEARMATERIALSSTATE",
        state: {
          changeView: "none",
          data: props.MaterialsData.state.data,
        },
      });
    }
    else if (props.MaterialsData.state.changeView === "editMaterial") {
      handleChangeIndex(5);
      props.dispatchEvent({
        type: "CLEARMATERIALSSTATE",
        state: {
          changeView: "none",
          data: props.MaterialsData.state.data,
        },
      });
    }
  }, [props]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "95%",
        overflow: "auto",
        backgroundColor: props.Theme.theme === "light" ? "#F1F1F1" : "#2C2C2C",
      }}
    >
      <Paper style={{ padding: 10, display: "flex" }}>
        <div>
          <Icon circular inverted name="food" color="teal" />
        </div>
        <Typography style={{ marginLeft: 10 }} variant="h6">
          Recipes
        </Typography>
      </Paper>
      <div>
        <div style={{ display: "flex", marginTop: 10 }}>
          <Button.Group size="large">
            <Button
              toggle
              active={value === 0 ? true : false}
              onClick={() => handleChangeIndex(0)}
            >
              Recipes List
            </Button>
            <Button.Or />
            <Button
              toggle
              active={value === 1 ? true : false}
              onClick={() => handleChangeIndex(1)}
            >
              Add New Recipes
            </Button>
            <Button.Or />
            <Button
              toggle
              active={value === 3 ? true : false}
              onClick={() => handleChangeIndex(3)}
            >
              Materials
            </Button>
          </Button.Group>
        </div>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <IngredientsList />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <NewIngredients type="new" />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <NewIngredients type="edit" data={props.IngredientsData.state} />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <MaterialsList />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <NewMaterials />
          </TabPanel>
          <TabPanel value={value} index={5} dir={theme.direction}>
            <NewMaterials type="edit" data={props.MaterialsData.state} />
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    IngredientsData: state.IngredientsReducer,
    MaterialsData: state.MaterialsReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);
