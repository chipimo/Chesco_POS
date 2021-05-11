const React = require("react");
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Button } from "semantic-ui-react";
import appDb from "../../../redux/dataBase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 400,
    padding: 10,
    backgroundColor: theme.palette.background.paper,
  },
}));

const MaterialsList = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1444);
  const [selected, setSelected] = React.useState("");
  const [state, setState] = React.useState({ data: [] });

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  React.useEffect(() => {
    LoadData()
  }, []);
  
  const LoadData = ()=>{
    appDb.HandelProducts({ _type: "GetMaterials" }, (reciveCallback) => {
      setState({ ...state, data: reciveCallback });
    });
  }

  return (
    <div style={{ padding: 10 }}>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Button
          color="black"
          onClick={() =>
            props.dispatchEvent({
              type: "SETNEWSTATE",
              state: {
                changeView: "newMaterial",
                data: {},
              },
            })
          }
        >
          Add New Material
        </Button>
      </div>

      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          {state.data.map((list, index) => {
            return (
              <div>
                <ListItem
                  button
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={list.materialName}
                    secondary={`${list.quantity} ${list.measuredBy} left`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                        onClick={() =>
                          props.dispatchEvent({
                              type: "SETMATERIALSSTATE",
                              state: {
                                changeView: "editMaterial",
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
                          { _type: "DeleteMaterial", item: list },
                          (callback) => {
                            LoadData()
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
                <Divider />
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MaterialsList);
