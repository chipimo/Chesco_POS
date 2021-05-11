const React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import appDb from "../../redux/dataBase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: 10,
  },
}));

const IngredientsList = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [state, setState] = React.useState({ data: [] });
  const [selected, setSelected] = React.useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  React.useEffect(() => {
    LoadData();
  }, []);

  const LoadData = () => {
    appDb.HandelProducts({ _type: "GetRecipe" }, (reciveCallback) => {
      setState({ ...state, data: reciveCallback });
    });
  };

  return (
    <div>
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {state.data.map((list, index) => {
            return (
              <ListItem
                key={index}
                button
                selected={selected === list.idKey}
                onClick={(event) => setSelected(list.idKey)}
              >
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary={list.recipeName} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() =>
                      props.dispatchEvent({
                        type: "SETINGREDIENTSSTATE",
                        state: {
                          changeView: "editIngre",
                          data: list,
                        },
                      })
                    }
                    edge="end"
                    aria-label="delete"
                  >
                    <EditIcon style={{ color: "teal" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      appDb.HandelProducts(
                        { _type: "DeleteRecipe", item: list },
                        (callback) => {
                          LoadData();
                        }
                      );
                    }}
                    edge="end"
                    aria-label="delete"
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
