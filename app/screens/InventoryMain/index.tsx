const React = require("react");
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import appDb from "../../redux/dataBase";

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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const { ipcRenderer } = require("electron");

const index = (props) => {
  const [rows, setRows] = React.useState({ data: [], columns: [] });
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setSate] = React.useState({
    amount: "",
    ItemName: "",
  });
  const [loadOnce, setLoadOnce] = React.useState(false);

  React.useEffect(() => {
    if (!loadOnce) {
      setLoadOnce(true);
      LoadData();
      props.dispatchEvent({ type: "CLEARSTATE" });
    }
    if (props.ActionsReducer.state === "loadInvData") LoadData();
  }, [props]);

  const LoadData = () => {
    appDb.HandleCompInventory({ type: "get" }, (callback) => {
      setRows({
        ...rows,
        data: callback,
        columns: [
          {
            title: "Item Name",
            field: "InventoryName",
          },
          {
            title: "Quantiy",
            field: "amount",
          },
        ],
      });
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleTextChange = (event) => {
    setSate({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ width: "80vw" }}>
      <Paper style={{ width: "100%", padding: 10, display: "flex" }}>
        <Typography variant="h6">Inventory</Typography>
        <div>
          <Button
            onClick={() => {
              ipcRenderer.send("save_csv", {
                type: "inventory",
                data: rows.data,
                header: [
                  { id: "InventoryName", title: "Item Name" },
                  { id: "amount", title: "Quantiy" },
                ],
              });
            }}
            variant="outlined"
            style={{ marginLeft: 5 }}
          >
            Export to excel
          </Button>
        </div>
      </Paper>
      <Paper
        style={{
          width: "95%",
          margin: "auto",
          padding: 15,
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Paper
          style={{
            padding: 10,
            width: "50%",
            height: "65vh",
            overflow: "auto",
          }}
        >
          <Paper className={classes.root}>
            <MaterialTable
              icons={tableIcons}
              title="Inventory"
              columns={rows.columns}
              data={rows.data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    appDb.HandleCompInventory(
                      { type: "edit", newData },
                      (reciveCallback) => {
                        setTimeout(() => {
                          resolve();
                          if (oldData) {
                            setRows((prevState) => {
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
                    appDb.HandleCompInventory(
                      { type: "delete", oldData },
                      (reciveCallback) => {
                        setTimeout(() => {
                          resolve();
                          setRows((prevState) => {
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

            {/* <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
          </Paper>
        </Paper>

        <Paper style={{ padding: 10, width: "45%", height: "25vh" }}>
          <Typography variant="h6" style={{ marginTop: 10 }}>
            Add New Inventory
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              id="outlined-basic"
              label="Item Name"
              variant="outlined"
              name="ItemName"
              onChange={handleTextChange}
              value={state.ItemName}
            />
            <TextField
              name="amount"
              type="number"
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              onChange={handleTextChange}
              value={state.amount}
            />
          </div>
          <div
            style={{
              marginTop: 10,
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                const data = {
                  type: "set",
                  ItemName: state.ItemName,
                  amount: parseInt(state.amount),
                };

                appDb.HandleCompInventory(data, (callback) => {
                  setSate({ ...state, ItemName: "", amount: "" });
                  props.dispatchEvent({
                    type: "SETSTATE",
                    state: "loadInvData",
                  });
                });
              }}
            >
              Save Record
            </Button>
          </div>
        </Paper>
      </Paper>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ActionsReducer: state.ActionsReducer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
