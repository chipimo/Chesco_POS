import React = require("react");
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import appDb from "../../redux/dataBase";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const index = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [state, setState] = React.useState({ data: [] });
  const [List, setList] = React.useState({ data: [] });
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState("");
  const [editId, setEditId] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    LoadData();
  }, []);

  const LoadData = () => {
    appDb.HandleExtra({ _type: "get", state }, (callback) => {
      setList({ ...List, data: callback });
    });
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const HandleAdd = (id) => {
    var infor = state.data;
    // if(state.data.length===1)
    infor.push({ id: state.data.length, value: "" });
    setState({ ...state, data: infor });
  };

  const HandleRemove = (id) => {};

  const onSave = (id) => {
    // console.log(state);
    appDb.HandleExtra({ _type: "set", state }, (callback) => {
      setState({ ...state, data: [] });
      appDb.HandleExtra({ _type: "get", state }, (callback) => {
        setList({ ...List, data: callback });
      });
    });
  };

  const HandleonChange = (e, id) => {
    var infor = (state.data[id].value = e.target.value);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <TextField
        id="standard-basic"
        label="Extra Massage"
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
      />
      <Button
        style={{ marginTop: 10, marginBottom: 10 }}
        onClick={() => {
          appDb.HandleExtra(
            { _type: "edit", value: edit, idKey: editId },
            (callback) => {
              LoadData();
              setOpen(false)
            }
          );
        }}
      >
        Save Changes
      </Button>
    </div>
  );

  return (
    <div style={{ padding: 10 }}>
      <Paper>
        <div style={{ marginTop: 10, marginBottom: 10 }}>Extra Massage</div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "30%", padding: 10 }}>
            {/* <List component="nav" aria-label="secondary mailbox folders"> */}
            <ul style={{ listStyle: "none" }}>
              {List.data.map((items, x) => {
                return (
                  <div>
                    <ListItem>
                      <ListItemText primary={items.msg} />
                      <ListItemSecondaryAction>
                        <div style={{ display: "flex" }}>
                          <IconButton
                            onClick={() => {
                              handleOpen();
                              setEdit(items.msg);
                              setEditId(items.idKey);
                            }}
                            edge="end"
                            aria-label="delete"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              appDb.HandleExtra(
                                { _type: "delete", idKey: items.idKey },
                                (callback) => {
                                  LoadData();
                                }
                              );
                            }}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                );
              })}
            </ul>
            {/* </List> */}
          </div>
          <div style={{ width: "65%", padding: 10 }}>
            <div style={{ padding: 10 }}>
              <Button disabled={open} variant="outlined" onClick={HandleAdd}>
                Add new extra massage
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant="outlined"
                onClick={onSave}
              >
                Save
              </Button>
            </div>
            <div style={{ display: "block" }}>
              {state.data.map((item, index) => {
                return (
                  <div key={index}>
                    <TextField
                      id="standard-basic"
                      label="Extra Massage"
                      onChange={(e) => HandleonChange(e, index)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
