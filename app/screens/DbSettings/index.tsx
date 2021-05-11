const React = require("react");
import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import appDb from "../../redux/dataBase";

const db = require("electron-db");
const { ipcRenderer } = require("electron");

const index = (props) => {
  const [state, setState] = React.useState({
    host: "localhost",
    user: "postgres",
    port: 5432,
    database: "chesco_pos",
    password: "root",

    old_host: "localhost",
    old_user: "postgres",
    old_port: 5432,
    old_database: "chesco_pos",
    old_password: "root",
  });

  React.useEffect(() => {
    db.getAll("config", (succ, data) => {
      setState({
        ...state,
        user: data[0].user,
        host: data[0].host,
        password: data[0].password,
        port: data[0].port,
        database: data[0].database,

        old_user: data[0].user,
        old_host: data[0].host,
        old_password: data[0].password,
        old_port: data[0].port,
        old_database: data[0].database,
      });
    });
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    // console.log(state);

    let where = {
      host: state.old_host,
      user: state.old_user,
      port: state.old_port,
      database: state.old_database,
      password: state.old_password,
    };

    let set = {
      host: state.host,
      user: state.user,
      port: state.port,
      database: state.database,
      password: state.password,
    };

    db.updateRow("config", where, set, (succ, msg) => {
      toast(`Db settings updated successfully`, {
        position: "bottom-right",
        autoClose: 5000,
        type: "success",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        ipcRenderer.send("relaunch", {});
      }, 1000);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <Typography variant="h6">Database settings</Typography>
        <Typography style={{ paddingTop: 10 }} variant="h6">
          default database connection:{" "}
          <span style={{ color: "teal" }}>{state.host}</span>
        </Typography>
      </div>
      <Divider />
      <div style={{ marginTop: 10 }}>
        <Paper style={{ padding: 10 }}>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <TextField
              onChange={handleChange}
              name="host"
              value={state.host}
              id="filled-basic"
              label="Server host"
              variant="filled"
            />
          </div>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <TextField
              onChange={handleChange}
              name="user"
              value={state.user}
              id="filled-basic"
              label="User"
              variant="filled"
            />
          </div>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <TextField
              onChange={handleChange}
              name="port"
              value={state.port}
              id="filled-basic"
              label="Port"
              type="number"
              variant="filled"
            />
          </div>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <TextField
              onChange={handleChange}
              name="database"
              value={state.database}
              id="filled-basic"
              label="Database"
              variant="filled"
            />
          </div>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>
            <TextField
              onChange={handleChange}
              name="password"
              value={state.password}
              id="filled-basic"
              label="password"
              variant="filled"
            />
          </div>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            style={{ marginTop: 10 }}
          >
            Save and Restart
          </Button>
        </Paper>
        <div style={{ marginTop: 30 }}>
          <Button
            onClick={() => {
              appDb.MakeAlTables();  
            }}
          >
            Create missing tables    
          </Button>   
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
