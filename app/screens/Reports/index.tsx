import React = require("react");
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import StockList from "./StockList";
import Inventory from "./Inventory";
import Purchases from "./Purchases";
import RB from "./RB";
import Returns from "./Returns";
import Expenses from "./Expenses/Expenses";
import Mytables from "../Pos/TablesViews/Mytables";
import ProfitLoss from "./ProfitLoss";
import Expired from "./Expired";
import AccountsReport from "./AccountsReport";
import PurchasesReturns from "./PurchasesReturns";
import CustomerReports from "./CustomerReports";
import ReStockLevels from "./ReStockLevels";
import TransferReports from "./TransferReports";
import Materials from "./Materials"
import Balances from "./Balances";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "84vh",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 170,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const index = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selected, setSelected] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelected(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs "
        className={classes.tabs}
      >
        <Tab
          label="Sales Report"
          {...a11yProps(0)}
          style={{
            backgroundColor: selected === 0 ? "#0A56D9" : "transparent",
            color:
              selected === 0
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Stock Purchase"
          {...a11yProps(1)}
          style={{
            backgroundColor: selected === 1 ? "#0A56D9" : "transparent",
            color:
              selected === 1
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Stock List"
          {...a11yProps(2)}
          style={{
            backgroundColor: selected === 2 ? "#0A56D9" : "transparent",
            color:
              selected === 2
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Stock Returns"
          {...a11yProps(3)}
          style={{
            backgroundColor: selected === 3 ? "#0A56D9" : "transparent",
            color:
              selected === 3
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Expenses"
          {...a11yProps(4)}
          style={{
            backgroundColor: selected === 4 ? "#0A56D9" : "transparent",
            color:
              selected === 4
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Served Tables"
          {...a11yProps(5)}
          style={{
            backgroundColor: selected === 5 ? "#0A56D9" : "transparent",
            color:
              selected === 5
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Profit Loss"
          {...a11yProps(6)}
          style={{
            backgroundColor: selected === 6 ? "#0A56D9" : "transparent",
            color:
              selected === 6
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Damages Reports"
          {...a11yProps(7)}
          style={{
            backgroundColor: selected === 7 ? "#0A56D9" : "transparent",
            color:
              selected === 7
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Customer Reports"
          {...a11yProps(8)}
          style={{
            backgroundColor: selected === 8 ? "#0A56D9" : "transparent",
            color:
              selected === 8
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Low Stock"
          {...a11yProps(9)}
          style={{
            backgroundColor: selected === 9 ? "#0A56D9" : "transparent",
            color:
              selected === 9
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Transfer Reports"
          {...a11yProps(10)}
          style={{
            backgroundColor: selected === 10 ? "#0A56D9" : "transparent",
            color:
              selected === 10
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Materials Reports"
          {...a11yProps(11)}
          style={{
            backgroundColor: selected === 11 ? "#0A56D9" : "transparent",
            color:
              selected === 11
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
        <Tab
          label="Balances Reports"
          {...a11yProps(12)}
          style={{
            backgroundColor: selected === 12 ? "#0A56D9" : "transparent",
            color:
              selected === 12
                ? "#fff"
                : props.Theme.theme === "light"
                ? "#3b3b3b"
                : "#ccc",
          }}
        />
      </Tabs>
      {/* <TabPanel value={value} index={0}>
        <WorkPeriod />
      </TabPanel> */}
      {/* <TabPanel value={value} index={1}>
        <Sales />
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <RB />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Purchases />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StockList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Returns />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Expenses type="reports" />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <div style={{ width: "80vw" }}>
          <Mytables />
        </div>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <div style={{ width: "80vw", padding: 10 }}>
          <ProfitLoss />
        </div>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Expired />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <CustomerReports />
      </TabPanel>
      {/* <TabPanel value={value} index={8}> 
        <AccountsReport />
      </TabPanel> */}
      {/* <TabPanel value={value} index={9}>
        <DamagesReport />
      </TabPanel> */}
      <TabPanel value={value} index={9}>
        <ReStockLevels />
      </TabPanel>
      <TabPanel value={value} index={10}>
        <TransferReports />
      </TabPanel>
      <TabPanel value={value} index={11}>
        <Materials />
      </TabPanel>
      <TabPanel value={value} index={12}>
        <Balances />
      </TabPanel>
      {/* <TabPanel value={value} index={9}>
        <PurchasesReturns />
      </TabPanel> */}
      {/* <TabPanel value={value} index={2}>
      </TabPanel> */}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SalesReports: state.SalesReports,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
