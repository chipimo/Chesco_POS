import React = require("react");
import {
  Button,
  Checkbox,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { toast } from "react-toastify";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ListIcon from "@material-ui/icons/List";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import appDb from "../../../redux/dataBase";

const { ipcRenderer } = require("electron");

const index = (props) => {
  const [MainCategory, setMainCategory] = React.useState([]);
  const [ReturnsList, setReturnsList] = React.useState([]);
  const [selected, setSeleted] = React.useState({
    name: "",
    number: "",
    date: "",
    list: { list: [] },
    paid: 0,
    total: 0,
    invoiceNumber: "",
    Day: "",
    selling: 0,
  });
  const [state, setState] = React.useState({
    active: null,
    selectedItem: {},
    amount: "0",
    reason: "",
  });

  const [error, setError] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [view, setView] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  React.useEffect(() => {
    appDb.HandelReports(
      { _type: "all_get_sales_tickets" },
      (receiveCallback) => {
        setTimeout(() => {
          setMainCategory(receiveCallback.data);
        }, 100);
      }
    );
    HandlleReturnsGet();
  }, []);

  const HandlleReturnsGet = () => {
    appDb.HandelReports({ _type: "get_returns" }, (receiveCallback) => {
      setTimeout(() => {
        setReturnsList(receiveCallback.data);
      }, 100);
    });
  };

  const savePdf = () => {
    ipcRenderer.send("save_pdf", {
      type: "returns",
      data: ReturnsList,
      header: [
        { id: "invoiceNumber", title: "Invoice Number" },
        { id: "productName", title: "Product Name" },
        { id: "qnt", title: "Reurned" },
        { id: "description", title: "Reason" },
        { id: "date", title: "Date" },
        { id: "customer", title: "Customer" },
        { id: "sallingprice", title: "Price" },
      ],
    });
  };

  const ReduceItem = (item) => {
    if (parseInt(state.amount) !== 0) {
      if (state.selectedItem.qnt >= parseInt(state.amount)) {
        const data = {
          _type: "stockReturn",
          invoiceNumber: selected.invoiceNumber,
          selectedItem: state.selectedItem,
          amount: parseInt(state.amount),
          reason: state.reason,
          customer: selected.name,
          list: selected.list,
          paid: selected.paid,
          total: selected.total,
          Day: selected.Day,
          selling: selected.selling,
        };

        appDb.HandelProducts(data, (callback) => {
          HandlleReturnsGet();
          setSeleted({
            ...selected,
            name: "",
            number: "",
            date: "",
            list: { list: [] },
            paid: 0,
            total: 0,
            Day: "",
            selling: 0,
            invoiceNumber: "",
          });

          if (callback)
            toast(`Successfuly returned`, {
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
      } else {
        toast(
          `The number of items can't be more then the number of products on the invoice  `,
          {
            position: "top-right",
            autoClose: 5000,
            type: "error",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } else {
      toast(`Make sure you put a correct amount to reduce`, {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError(true);
    }
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    if (event.target.name === "amount")
      if (event.target.value === "")
        setState({
          ...state,
          [event.target.name]: 0,
        });
      else if (parseInt(event.target.value) > 0)
        setState({
          ...state,
          [event.target.name]: 0,
        });
      else
        setState({
          ...state,
          [event.target.name]: parseInt(event.target.value),
        });

    setState({ ...state, [event.target.name]: event.target.value });
    setError(false);
  };

  const search = (event, item) => {
    if (item !== null) {
      setSeleted({
        ...selected,
        name: item.name,
        date: item.Date,
        list: item.TicketList,
        paid: item.AmountPaid,
        total: item.GrandTotal,
        selling: item.TicketList.list[0].initalPrice,
        Day: item.Day,
        invoiceNumber: item.InvoiceNumber,
      });
    }

    console.log(item);
  };

  return (
    <div
      style={{
        width: "77vw",
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Button variant="outlined" onClick={savePdf}>
          Export to csv
        </Button>
      </div>
      {selectedIndex === 0 ? (
        <Paper
          square
          style={{ width: "70%", height: "80h", padding: 20, marginTop: 6 }}
        >
          <Typography variant="h5">Sales Returns</Typography>
          <Divider style={{ marginTop: 10 }} />
          <div>
            <Paper style={{ width: "100%", margin: "auto", padding: 15 }}>
              <div style={{ marginTop: 10 }}>
                <Autocomplete
                  id="combo-box-demo"
                  options={MainCategory}
                  getOptionLabel={(option) => option.InvoiceNumber}
                  onChange={search}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Invoice"
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "30%",
                  }}
                >
                  <div style={{ marginTop: 10 }}>
                    <TextField
                      type="number"
                      name="amount"
                      onChange={handleChange}
                      id="number-of-items"
                      label="Quantity Returned"
                      variant="filled"
                      error={error}
                      helperText={error ? "Number of items can't be empty" : ""}
                    />
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <TextField
                      type="number"
                      multiline
                      onChange={handleChange}
                      name="reason"
                      rows={4}
                      id="number-of-items"
                      label="Reason for Return"
                      variant="filled"
                    />
                  </div>
                </div>

                <div
                  style={{
                    marginLeft: 10,
                    marginTop: 10,
                    height: "40vh",
                    width: "70%",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#5A5A5A",
                  }}
                >
                  <div
                    style={{
                      marginTop: 10,
                      padding: 5,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ marginRight: 5 }}>{selected.name}</div>
                    <div style={{ marginRight: 5 }}>{selected.number}</div>
                    <div>{selected.date}</div>
                  </div>
                  <div>
                    <Divider />
                    <div style={{ height: "34vh" }}>
                      <TableContainer component={Paper}>
                        <Table
                          size="small"
                          stickyHeader
                          aria-label="simple table"
                        >
                          <TableHead
                            style={{
                              backgroundColor:
                                props.Theme.theme === "light"
                                  ? "#ccc"
                                  : "#000000",
                            }}
                          >
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell>Product Name</TableCell>
                              <TableCell align="right">Qt</TableCell>
                              <TableCell align="right">Price</TableCell>
                              <TableCell align="right">Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selected.list.list.map((row, index) => (
                              <TableRow
                                style={{
                                  backgroundColor:
                                    state.active === index
                                      ? props.Theme.theme === "light"
                                        ? "#F5CDD2"
                                        : "#5E4E53"
                                      : props.Theme.theme === "light"
                                      ? "#ccc"
                                      : "#424242",
                                }}
                                key={index}
                              >
                                <TableCell component="th" scope="row">
                                  <Checkbox
                                    checked={
                                      state.active === index ? true : false
                                    }
                                    onChange={(e) => {
                                      setState({
                                        ...state,
                                        active: index,
                                        selectedItem: row,
                                      });
                                    }}
                                  />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {row.ItemName}
                                </TableCell>
                                <TableCell align="right">{row.qnt}</TableCell>
                                <TableCell align="right">
                                  {row.initalPrice}
                                </TableCell>
                                <TableCell align="right">
                                  {row.initalPrice * row.qnt}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <Divider />
                    <div style={{ marginTop: 5 }}></div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <Button
                  disabled={
                    selected.list.list.length === 0
                      ? true
                      : state.amount === 0
                      ? true
                      : false
                  }
                  style={{ width: 160 }}
                  onClick={ReduceItem}
                  variant="contained"
                  color="secondary"
                >
                  Delete Item
                </Button>
              </div>
            </Paper>
          </div>
        </Paper>
      ) : (
        <Paper square style={{ width: "70%", height: "80h", padding: 20 }}>
          <div style={{ height: "34vh" }}>
            <TableContainer component={Paper}>
              <Table size="small" stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice Number</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Reurned</TableCell>
                    <TableCell align="right">Reason</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Customer</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ReturnsList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.invoiceNumber}
                      </TableCell>
                      <TableCell align="right">{row.productName}</TableCell>
                      <TableCell align="right">{row.qnt}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.customer}</TableCell>
                      <TableCell align="right">{row.sallingprice}</TableCell>
                      <TableCell align="right">
                        {row.sallingprice * row.qnt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      )}

      <Paper style={{ width: "20%", padding: 10 }}>
        <Divider />
        <div>
          <Typography variant="h6">Explorer</Typography>
        </div>

        <div style={{ marginTop: 20 }}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <RemoveShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Return Items" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Returns List" />
            </ListItem>
          </List>
        </div>
      </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(index);
