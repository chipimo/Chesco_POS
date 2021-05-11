"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Divider_1 = require("@material-ui/core/Divider");
var semantic_ui_react_1 = require("semantic-ui-react");
var SideList_1 = require("../Products/SideList");
var List_2 = require("../Products/List");
var InvSideView_1 = require("../Inventory/InvSideView");
var Price_List_Editor_1 = require("../Products/Price_List_Editor");
var Product_Groups_1 = require("../Products/Product_Groups");
// import Tax_Template from "../Products/Tax_Template";
var Inventory_1 = require("../Inventory");
var EndOfDayRecords_1 = require("../Inventory/EndOfDayRecords");
var LeftSide_1 = require("../Accounts/LeftSide");
var Users_1 = require("../Users");
var UsersSideList_1 = require("../Users/UsersSideList");
var InvReduction_1 = require("../Inventory/InvReduction");
var Printer_1 = require("../Printer");
var SideView_1 = require("../Printer/SideView");
var SideView_2 = require("../BackUp/SideView");
var BackUp_1 = require("../BackUp");
var SideView_3 = require("../Supplires/SideView");
var Supplires_1 = require("../Supplires");
var SuppliresPayments_1 = require("../Supplires/SuppliresPayments");
var TableSideView_1 = require("../Tables/TableSideView");
var Tables_1 = require("../Tables");
var Damages_1 = require("../Products/Damages");
var InventoryMain_1 = require("../InventoryMain");
var InventoryMainSideView_1 = require("../InventoryMain/InventoryMainSideView");
var Bulkupload_1 = require("../Products/Bulkupload");
var WareHouseStore_1 = require("../WareHouseStore");
var WareHouseSide_1 = require("../WareHouseStore/WareHouseSide");
var Ingredients_1 = require("../Products/Ingredients");
var DbSideView_1 = require("../DbSettings/DbSideView");
var DbSettings_1 = require("../DbSettings");
var PaymentModes_1 = require("../PaymentModes");
var PaymentSide_1 = require("../PaymentModes/PaymentSide");
var Currency_1 = require("../Currency");
var CurrencySide_1 = require("../Currency/CurrencySide");
var SideNote_1 = require("../SideNote");
var OrderSettings_1 = require("../OrderSettings");
var SideSwitchView = function (props) {
    switch (props.view) {
        case "products":
            return React.createElement(SideList_1.default, null);
            break;
        case "inventory":
            return React.createElement(InvSideView_1.default, null);
            break;
        case "accounts":
            return React.createElement(LeftSide_1.default, null);
            break;
        case "users":
            return React.createElement(UsersSideList_1.default, null);
            break;
        case "printer":
            return React.createElement(SideView_1.default, null);
            break;
        case "backup":
            return React.createElement(SideView_2.default, null);
            break;
        case "supplires":
            return React.createElement(SideView_3.default, null);
            break;
        case "tables":
            return React.createElement(TableSideView_1.default, null);
            break;
        case "inventoryMainSide":
            return React.createElement(InventoryMainSideView_1.default, null);
            break;
        case "warehoseSide":
            return React.createElement(WareHouseSide_1.default, null);
            break;
        case "dbsettings_side":
            return React.createElement(DbSideView_1.default, null);
            break;
        case "paymentMode_side":
            return React.createElement(PaymentSide_1.default, null);
            break;
        case "currrencySide":
            return React.createElement(CurrencySide_1.default, null);
            break;
        default:
            return null;
            break;
    }
};
var MainSwitchView = function (props) {
    switch (props.view) {
        case "product_list":
            return React.createElement(List_2.default, null);
            break;
        case "Price_List_Editor":
            return React.createElement(Price_List_Editor_1.default, null);
            break;
        case "Product_Groups":
            return React.createElement(Product_Groups_1.default, null);
            break;
        case "Damages":
            return React.createElement(Damages_1.default, null);
            break;
        case "Bulkupload":
            return React.createElement(Bulkupload_1.default, null);
            break;
        case "ingredients":
            return React.createElement(Ingredients_1.default, null);
            break;
        case "inventory_list":
            return React.createElement(Inventory_1.default, null);
        case "inventory_reduction":
            return React.createElement(InvReduction_1.default, null);
            break;
        case "end_of_day_records":
            return React.createElement(EndOfDayRecords_1.default, null);
            break;
        case "users_list":
            return React.createElement(Users_1.default, null);
            break;
        case "printer":
            return React.createElement(Printer_1.default, null);
            break;
        case "backup":
            return React.createElement(BackUp_1.default, null);
            break;
        case "supplires":
            return React.createElement(Supplires_1.default, null);
            break;
        case "supplires_payments":
            return React.createElement(SuppliresPayments_1.default, null);
            break;
        case "tables":
            return React.createElement(Tables_1.default, null);
            break;
        case "inventoryMain":
            return React.createElement(InventoryMain_1.default, null);
            break;
        case "warehouse":
            return React.createElement(WareHouseStore_1.default, null);
            break;
        case "dbsettings":
            return React.createElement(DbSettings_1.default, null);
            break;
        case "paymentMode":
            return React.createElement(PaymentModes_1.default, null);
            break;
        case "currrency":
            return React.createElement(Currency_1.default, null);
            break;
        case "sideNote":
            return React.createElement(SideNote_1.default, null);
            break;
        case "OrderSettings":
            return React.createElement(OrderSettings_1.default, null);
            break;
        default:
            return null;
            break;
    }
};
var index = function (props) {
    var _a = React.useState(100), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var _b = React.useState(""), view = _b[0], setView = _b[1];
    React.useEffect(function () {
        if (props.SettingViews.view === "product_list")
            setView("products");
        else if (props.SettingViews.view === "users_list")
            setView("users");
    }, []);
    var handleListItemClick = function (event, index) {
        setSelectedIndex(index);
        if (index === 0) {
            setView("products");
        }
        else if (index === 1) {
            setView("inventory");
        }
        else if (index === 2) {
            setView("accounts");
        }
        else if (index === 3) {
            setView("users");
        }
        else if (index === 4) {
            setView("printer");
        }
        else if (index === 5) {
            setView("backup");
        }
        else if (index === 6) {
            setView("supplires");
        }
        else if (index === 7) {
            setView("tables");
        }
        else if (index === 8) {
            setView("inventoryMainSide");
        }
        else if (index === 9) {
            setView("warehoseSide");
        }
        else if (index === 10) {
            setView("dbsettings_side");
        }
        else if (index === 11) {
            setView("paymentMode_side");
        }
        else if (index === 12) {
            setView("currrencySide");
        }
    };
    return (React.createElement("div", { style: {
            width: "99.5%",
            height: "85vh",
            display: "flex",
            justifyContent: "space-between",
        } },
        React.createElement("div", { style: {
                width: "15%",
                borderWidth: 1,
                borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
                borderStyle: "solid",
            } },
            React.createElement("div", { style: {
                    width: "100%",
                    padding: 5,
                } },
                React.createElement(core_1.Typography, null, props.SettingViews.title)),
            React.createElement(Divider_1.default, null),
            React.createElement("div", { style: { height: "30vh", overflow: "auto" } },
                React.createElement(SideSwitchView, { view: view })),
            React.createElement("div", { style: { height: "50vh", overflow: "auto" } },
                React.createElement(List_1.default, { component: "nav", "aria-label": "main mailbox folders" },
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 0, onClick: function (event) { return handleListItemClick(event, 0); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 0
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "box" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 0
                                        ? "#F78A09"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Products" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 1, onClick: function (event) { return handleListItemClick(event, 1); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 1
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "clone" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 1
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Purchase Stock" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { disabled: props.User.userLogged.prevarges === "1" ? false : true, style: { height: 38 }, button: true, selected: selectedIndex === 3, onClick: function (event) { return handleListItemClick(event, 3); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 3
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "users" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 3
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Users" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 4, onClick: function (event) { return handleListItemClick(event, 4); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 4
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "print" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 4
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Printer" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 5, onClick: function (event) { return handleListItemClick(event, 5); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 5
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "sync" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 5
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "BackUp" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 6, onClick: function (event) { return handleListItemClick(event, 6); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 6
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "truck" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 6
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Suppliers" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 7, onClick: function (event) { return handleListItemClick(event, 7); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 7
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "table" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 7
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Tables" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 8, onClick: function (event) { return handleListItemClick(event, 8); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 8
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "copy outline" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 8
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Inventory" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 9, onClick: function (event) { return handleListItemClick(event, 9); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 9
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "home" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 9
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Warehouse" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 10, onClick: function (event) { return handleListItemClick(event, 10); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 10
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "database" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 10
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Db Settings" })),
                    React.createElement(Divider_1.default, null),
                    React.createElement(ListItem_1.default, { style: { height: 38 }, button: true, selected: selectedIndex === 11, onClick: function (event) { return handleListItemClick(event, 11); } },
                        React.createElement(ListItemIcon_1.default, null,
                            React.createElement(semantic_ui_react_1.Icon, { style: {
                                    color: props.Theme.theme === "light"
                                        ? selectedIndex === 11
                                            ? "#A45C06"
                                            : "#040302"
                                        : "#fff",
                                }, name: "money" })),
                        React.createElement(ListItemText_1.default, { style: {
                                color: props.Theme.theme === "light"
                                    ? selectedIndex === 11
                                        ? "#A45C06"
                                        : "#040302"
                                    : "#fff",
                            }, primary: "Payment Modes" })),
                    React.createElement(Divider_1.default, null)))),
        React.createElement("div", { style: {
                width: "84.5vw",
                height: "100%",
                borderWidth: 1,
                overflow: "auto !important",
                borderColor: props.Theme.theme === "light" ? "#929292" : "#CECECE",
                borderStyle: "solid",
            } },
            React.createElement("div", { style: {
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                } },
                React.createElement(MainSwitchView, { view: props.SettingViews.view })))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        SettingViews: state.SettingViews,
        User: state.User,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map