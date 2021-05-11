const React = require("react");
import { connect } from "react-redux";
import {
  Button,
  IconButton,
  ListItemSecondaryAction,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { toast } from "react-toastify";
import InboxIcon from "@material-ui/icons/Inbox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import appDb from "../../redux/dataBase";
import GroupList from "./GroupList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    maxHeight: 360,
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

const index = (props) => {
  const classes = useStyles();
  const [addNew, setAddnew] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [groupList, setGroupList] = React.useState({ data: [] });
  const [name, setName] = React.useState("");
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    Loaddata();
  }, []);

  const Loaddata = () => {
    appDb.HandlePrinterGroups({ _type: "get" }, (callback) => {
      setGroupList({ ...groupList, data: callback });
    });
  };

  return (
    <div style={{ padding: 20, width: "100%" }}>
      <div style={{ width: "80%", margin: "auto" }}>
        <Paper style={{ width: "100%", padding: 10, display: "flex" }}>
          <Typography>Settings</Typography>
          <div style={{ marginLeft: 20 }}>
            {edit ? (
              <div>
               
                <Button onClick={() => setEdit(false)} variant="outlined">
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setAddnew(true)} variant="outlined">
                Add New Group
              </Button>
            )}
          </div>
        </Paper>
        <div style={{ marginTop: 15 }}>
          {edit ? (
            <div>
              <GroupList selected={selected} />
            </div>
          ) : (
            <div className={classes.root}>
              <List component="nav" aria-label="main mailbox folders">
                {groupList.data.map((group, index) => {
                  return (
                    <ListItem
                      onClick={() => {
                        setSelected(group);

                        setEdit(true);
                      }}
                      key={index}
                      button
                    >
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={group.group} />
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={() =>
                            appDb.HandlePrinterGroups(
                              { _type: "delete", idKey: group.idKey },
                              (callback) => {
                                Loaddata();
                              }
                            )
                          }
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          )}

          {addNew ? (
            <div style={{ display: "flex", marginTop: 10 }}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  if (name !== "")
                    appDb.HandlePrinterGroups(
                      { _type: "set", name: name },
                      (callback) => {
                        setName("");
                        Loaddata();
                        setAddnew(false);
                      }
                    );
                  else
                    toast(`Name is already set`, {
                      position: "top-right",
                      autoClose: 5000,
                      type: "error",
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                }}
                style={{ marginLeft: 20 }}
              >
                Save Group
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
