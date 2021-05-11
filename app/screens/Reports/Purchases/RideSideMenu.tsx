import React = require("react");
import { connect } from "react-redux";
import { Typography, Paper, TextField, Button } from "@material-ui/core";
import appDb from "../../../redux/dataBase";
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
import SaveIcon from "@material-ui/icons/PictureAsPdf";

const moment = require("moment");
const { ipcRenderer } = require("electron");

const _ = require("lodash");
var check = moment(new Date());
var monthString = check.format("MMM"); // => ('January','February.....)

const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>
const DateNumInput = `${year}${month}${date}`; // combining to format for defaultValue or value attribute of material <TextField>

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

const RideSideMenu = (props) => {
  const [purchaseList, setPurchaseList] = React.useState({ data: [] });
  const [selectedDate, setSelectedDate] = React.useState({ value: moment() });
  const [DefaultDate, setDefaultDate] = React.useState({
    startDate: "",
    endDate: "",
  });
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Product Name ",
        field: "productName",
      },
      {
        title: "Category",
        field: "group",
      },
      {
        title: "Ivoice Number",
        field: "invoiceNumber",
      },
      {
        title: "Supplier",
        field: "SupplierName",
      },
      {
        title: "Date",
        field: "EventDate",
      },
      {
        title: "Time",
        field: "time",
      },
      {
        title: "Buying Price",
        field: "buyingPrice",
      },
      {
        title: "Old Buying Price",
        field: "buyingPriceOld",
      },
      {
        title: "Quantity",
        field: "quantity",
      },
    ],
    data: [],
  });
  var NodeId = 0;

  React.useEffect(() => {
    appDb.Get_Purchases(
      {
        _type: "get_purchases",
        startDate: parseInt(DateNumInput),
        endDate: parseInt(DateNumInput),
      },
      (reciveCallback) => {
        setTimeout(() => {
          setState({ ...state, data: reciveCallback });
        }, 300);
      }
    );
  }, []);

  const onSubmit = () => {
    appDb.Get_Purchases(
      {
        _type: "get_purchases",
        startDate: parseInt(DefaultDate.startDate),
        endDate: parseInt(DefaultDate.endDate),
      },
      (reciveCallback) => {
        setTimeout(() => {
          setState({ ...state, data: reciveCallback });
        }, 300);
      }
    );
  };

  const onOpenChange = (dateValue, type) => {
    const dateSplit = dateValue.target.value.split("-");
    const DateValue = `${dateSplit[0]}${dateSplit[1]}${dateSplit[2]}`;

    setDefaultDate({ ...DefaultDate, [type]: DateValue });
  };

  return (
    <div style={{ width: "90%", height: "70vh" }}>
      <div
        style={{ width: "100%", padding: 10, height: "66vh", overflow: "auto" }}
      >
        <div
          style={{
            height: 50,
            position: "fixed",
            zIndex: 400,
            // backgroundColor: "#3b3b3b",
            display: "flex",
          }}
        >
          <div>
            <TextField
              id="date"
              label="From Date"
              type="date"
              defaultValue={materialDateInput}
              onChange={(event) => onOpenChange(event, "startDate")}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ marginLeft: 30 }}>
            <TextField
              id="date"
              label="Date To"
              type="date"
              defaultValue={materialDateInput}
              onChange={(event) => onOpenChange(event, "endDate")}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <Button
              variant="outlined"
              style={{ marginLeft: 15, marginTop: 10 }}
              onClick={() => onSubmit()}
            >
              Submit
            </Button>
          </div>
          <div>

          <Button
            style={{ marginLeft: 10 }}
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={() => {
              ipcRenderer.send("save_csv", {
                type: "Purchases",
                header: [
                  {
                    title: "Product Name ",
                    id: "productName",
                  },
                  {
                    title: "Category",
                    id: "group",
                  },
                  {
                    title: "Ivoice Number",
                    id: "invoiceNumber",
                  },
                  {
                    title: "Supplier",
                    id: "SupplierName",
                  },
                  {
                    title: "Date",
                    id: "date",
                  },
                  {
                    title: "Time",
                    id: "time",
                  },
                  {
                    title: "Buying Price",
                    id: "buyingPrice",
                  },
                  {
                    title: "Old Buying Price",
                    id: "buyingPriceOld",
                  },
                  {
                    title: "Quantity",
                    id: "quantity",
                  },
                ],

                data: state.data,
              });
            }}
          >
            Export to excel file
          </Button>
          </div>
        </div>
        <div style={{ marginTop: 60 }}>
          <MaterialTable
            icons={tableIcons}
            title="Purchases List "
            columns={state.columns}
            data={state.data}
          />
        </div>
      </div>
      {/* <Paper style={{ width: "25%", padding: 10 }}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {purchaseList.data.map((mainNode, index) => (
            <TreeItem
              key={index}
              nodeId={`${NodeId++}`}
              label={`Year-${mainNode.year}`}
            >
              {mainNode.months.map((subNode, innerIndex) => (
                <TreeItem
                  key={innerIndex}
                  nodeId={`${NodeId++}`}
                  label={subNode.month}
                >
                  {subNode.days.map((list, daysIndex) => (
                    <TreeItem
                      key={daysIndex}
                      nodeId={`${NodeId++}`}
                      label={`${list.day} ${list.list.length}`}
                      onClick={() => {
                        setState({ ...state, data: list.list });
                      }}
                    />
                  ))}
                </TreeItem>
              ))}
            </TreeItem>
          ))}
        </TreeView> */}
      {/* </Paper> */}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RideSideMenu);
