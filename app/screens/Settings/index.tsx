import React = require("react");
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Icon } from "semantic-ui-react";
import SideList from "../Products/SideList";
import ProductList from "../Products/List";
import InvSideView from "../Inventory/InvSideView";
import Price_List_Editor from "../Products/Price_List_Editor";
import Product_Groups from "../Products/Product_Groups";
// import Tax_Template from "../Products/Tax_Template";
import Inventory from "../Inventory";
import EndOfDayRecords from "../Inventory/EndOfDayRecords";
import AccountsSideList from "../Accounts/LeftSide";
import Users from "../Users";
import UsersSideList from "../Users/UsersSideList";
import InvReduction from "../Inventory/InvReduction";
import PrinterSetting from "../Printer";
import PrinterSideView from "../Printer/SideView";
import BackUpSideView from "../BackUp/SideView";
import BackUpSettings from "../BackUp";
import SuppliresSideView from "../Supplires/SideView";
import Supplires from "../Supplires";
import SuppliresPayments from "../Supplires/SuppliresPayments";
import TableSideView from "../Tables/TableSideView";
import Tables from "../Tables";
import Damages from "../Products/Damages";
import InventoryMain from "../InventoryMain";
import InventoryMainSideView from "../InventoryMain/InventoryMainSideView";
import Bulkupload from "../Products/Bulkupload";
import WareHouseStore from "../WareHouseStore";
import WareHouseSide from "../WareHouseStore/WareHouseSide";
import Ingredients from "../Products/Ingredients";
import DbSideView from "../DbSettings/DbSideView";
import DbSettings from "../DbSettings";
import PaymentModes from "../PaymentModes";
import PaymentSide from "../PaymentModes/PaymentSide";
import Currency from "../Currency";
import CurrencySide from "../Currency/CurrencySide";
import SideNote from "../SideNote";
import OrderSettings from "../OrderSettings";

const SideSwitchView = (props) => {
  switch (props.view) {
    case "products":
      return <SideList />;
      break;
    case "inventory":
      return <InvSideView />;
      break;
    case "accounts":
      return <AccountsSideList />;
      break;
    case "users":
      return <UsersSideList />;
      break;
    case "printer":
      return <PrinterSideView />;
      break;
    case "backup":
      return <BackUpSideView />;
      break;
    case "supplires":
      return <SuppliresSideView />;
      break;
    case "tables":
      return <TableSideView />;
      break;
    case "inventoryMainSide":
      return <InventoryMainSideView />;
      break;
    case "warehoseSide":
      return <WareHouseSide />;
      break;
    case "dbsettings_side":
      return <DbSideView />;
      break;
    case "paymentMode_side":
      return <PaymentSide />;
      break;
    case "currrencySide":
      return <CurrencySide />;
      break;

    default:
      return null;
      break;
  }
};

const MainSwitchView = (props) => {
  switch (props.view) {
    case "product_list":
      return <ProductList />;
      break;
    case "Price_List_Editor":
      return <Price_List_Editor />;
      break;
    case "Product_Groups":
      return <Product_Groups />;
      break;
    case "Damages":
      return <Damages />;
      break;
    case "Bulkupload":
      return <Bulkupload />;
      break;
    case "ingredients":
      return <Ingredients />;
      break;
    case "inventory_list":
      return <Inventory />;
    case "inventory_reduction":
      return <InvReduction />;
      break;
    case "end_of_day_records":
      return <EndOfDayRecords />;
      break;
    case "users_list":
      return <Users />;
      break;
    case "printer":
      return <PrinterSetting />;
      break;
    case "backup":
      return <BackUpSettings />;
      break;
    case "supplires":
      return <Supplires />;
      break;
    case "supplires_payments":
      return <SuppliresPayments />;
      break;
    case "tables":
      return <Tables />;
      break;
    case "inventoryMain":
      return <InventoryMain />;
      break;
    case "warehouse":
      return <WareHouseStore />;
      break;
    case "dbsettings":
      return <DbSettings />;
      break;
    case "paymentMode":
      return <PaymentModes />;
      break;
    case "currrency":
      return <Currency />;
      break;
    case "sideNote":
      return <SideNote />;
      break;
    case "OrderSettings":
      return <OrderSettings />;
      break;

    default:
      return null;
      break;
  }
};

const index = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(100);
  const [view, setView] = React.useState("");

  React.useEffect(() => {
    if (props.SettingViews.view === "product_list") setView("products");
    else if (props.SettingViews.view === "users_list") setView("users");
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 0) {
      setView("products");
    } else if (index === 1) {
      setView("inventory");
    } else if (index === 2) {
      setView("accounts");
    } else if (index === 3) {
      setView("users");
    } else if (index === 4) {
      setView("printer");
    } else if (index === 5) {
      setView("backup");
    } else if (index === 6) {
      setView("supplires");
    } else if (index === 7) {
      setView("tables");
    } else if (index === 8) {
      setView("inventoryMainSide");
    } else if (index === 9) {
      setView("warehoseSide");
    } else if (index === 10) {
      setView("dbsettings_side");
    } else if (index === 11) {
      setView("paymentMode_side");
    } else if (index === 12) {
      setView("currrencySide");
    }
  };

  return (
    <div
      style={{
        width: "99.5%",
        height: "85vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "15%",
          borderWidth: 1,
          borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
          borderStyle: "solid",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: 5,
          }}
        >
          <Typography>{props.SettingViews.title}</Typography>
        </div>
        <Divider />
        <div style={{ height: "30vh", overflow: "auto" }}>
          <SideSwitchView view={view} />
        </div>
        <div style={{ height: "50vh", overflow: "auto" }}>
          <List component="nav" aria-label="main mailbox folders">
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 0
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="box"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 0
                        ? "#F78A09"
                        : "#040302"
                      : "#fff",
                }}
                primary="Products"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 1
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="clone"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 1
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Purchase Stock"
              />
            </ListItem>
            {/* <Divider />

            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 2
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="settings"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 2
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Settings"
              />
            </ListItem> */}
            <Divider />

            <ListItem
              disabled={props.User.userLogged.prevarges === "1" ? false : true}
              style={{ height: 38 }}
              button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 3
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="users"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 3
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Users"
              />
            </ListItem>

            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 4
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="print"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 4
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Printer"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 5
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="sync"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 5
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="BackUp"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 6
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="truck"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 6
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Suppliers"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 7}
              onClick={(event) => handleListItemClick(event, 7)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 7
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="table"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 7
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Tables"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 8}
              onClick={(event) => handleListItemClick(event, 8)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 8
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="copy outline"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 8
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Inventory"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 9}
              onClick={(event) => handleListItemClick(event, 9)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 9
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="home"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 9
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Warehouse"
              />
            </ListItem>
            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 10}
              onClick={(event) => handleListItemClick(event, 10)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 10
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="database"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 10
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }} 
                primary="Db Settings"
              />
            </ListItem>

            <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 11}
              onClick={(event) => handleListItemClick(event, 11)}
            >
              <ListItemIcon>  
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 11
                          ? "#A45C06"
                          : "#040302"  
                        : "#fff",
                  }}
                  name="money"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 11
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Payment Modes"
              />
            </ListItem>
            {/* <Divider />
            <ListItem
              style={{ height: 38 }}
              button
              selected={selectedIndex === 12}
              onClick={(event) => handleListItemClick(event, 12)}
            >
              <ListItemIcon>
                <Icon
                  style={{
                    color:
                      props.Theme.theme === "light"
                        ? selectedIndex === 12
                          ? "#A45C06"
                          : "#040302"
                        : "#fff",
                  }}
                  name="money bill alternate outline"
                />
              </ListItemIcon>
              <ListItemText
                style={{
                  color:
                    props.Theme.theme === "light"
                      ? selectedIndex === 12
                        ? "#A45C06"
                        : "#040302"
                      : "#fff",
                }}
                primary="Currency"
              />
            </ListItem> */}

            <Divider />
          </List>
        </div>
      </div>
      <div
        style={{
          width: "84.5vw",
          height: "100%",
          borderWidth: 1,
          overflow: "auto !important",
          borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
          borderStyle: "solid",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
          }}
        >
          <MainSwitchView view={props.SettingViews.view} />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Theme: state.Theme,
    SettingViews: state.SettingViews,
    User: state.User,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
