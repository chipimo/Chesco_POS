"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var Box_1 = require("@material-ui/core/Box");
var core_2 = require("@material-ui/core");
var Clear_1 = require("@material-ui/icons/Clear");
var react_toastify_1 = require("react-toastify");
var ArrowRight_1 = require("@material-ui/icons/ArrowRight");
var MutiList_1 = require("./MutiList/MutiList");
var dataBase_1 = require("../../../redux/dataBase");
var react_barcode_reader_1 = require("react-barcode-reader");
var uuidv4 = require("uuid/v4");
function CreatId() {
    return uuidv4();
}
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (React.createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "full-width-tabpanel-" + index, "aria-labelledby": "full-width-tab-" + index }, other), value === index && (React.createElement(Box_1.default, { p: 1 },
        React.createElement(core_1.Typography, null, children)))));
}
function a11yProps(index) {
    return {
        id: "full-width-tab-" + index,
        "aria-controls": "full-width-tabpanel-" + index,
    };
}
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: "43vw",
            minWidth: "43vw",
        },
        tabs: {
            borderRight: "1px solid " + theme.palette.divider,
            width: 140,
            backgroundColor: theme.palette.background.paper,
        },
        tab: {
            height: 70,
            backgroundColor: "transparent",
            marginBottom: 10,
            border: "none",
            fontSize: 25,
            cursor: "pointer",
            outline: "none",
        },
        image: (_a = {
                position: "relative",
                height: 200,
                margin: 10
            },
            _a[theme.breakpoints.down("xs")] = {
                width: "100% !important",
                height: 100,
            },
            _a["&:hover, &$focusVisible"] = {
                zIndex: 1,
                "& $imageBackdrop": {
                    opacity: 1,
                },
                "& $imageMarked": {
                    opacity: 0,
                },
                "& $imageTitle": {
                    border: "4px solid currentColor",
                },
            },
            _a),
        focusVisible: {},
        imageButton: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.common.white,
        },
        imageSrc: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
        },
        imageBackdrop: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.palette.common.black,
            opacity: 0.8,
            transition: theme.transitions.create("opacity"),
        },
        imageTitle: {
            position: "relative",
        },
        imageMarked: {
            height: 3,
            width: 18,
            backgroundColor: theme.palette.common.white,
            position: "absolute",
            bottom: -2,
            left: "calc(50% - 9px)",
            transition: theme.transitions.create("opacity"),
        },
        rootSearch: {
            display: "flex",
            alignItems: "center",
            width: 400,
            margin: "auto",
            marginBottom: 2,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
        searchBar: {
            outline: "none",
            border: "none",
            width: 400,
        },
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    });
});
var lightTheme = styles_1.createMuiTheme({
    palette: {
        type: "light",
    },
});
exports.index = function (props) {
    var classes = useStyles();
    var theme = styles_1.useTheme();
    var inputRef = React.useRef();
    var _a = React.useState([]), tabsList = _a[0], setTabsList = _a[1];
    var _b = React.useState(false), IsScanned = _b[0], setIsScanned = _b[1];
    var _c = React.useState([]), productsList = _c[0], setProductsList = _c[1];
    var _d = React.useState(0), value = _d[0], setValue = _d[1];
    var _e = React.useState(false), openMulti = _e[0], setOpenMulti = _e[1];
    var _f = React.useState(false), barcode = _f[0], setBarcode = _f[1];
    var _g = React.useState([]), multi = _g[0], setMulti = _g[1];
    var _h = React.useState(""), shotbarcode = _h[0], setshotbarcode = _h[1];
    var _j = React.useState(""), selectedTab = _j[0], setselectedTab = _j[1];
    var _k = React.useState("default"), layoutName = _k[0], setlayoutName = _k[1];
    var _l = React.useState({
        checkedA: true,
        checkedB: true,
    }), state = _l[0], setState = _l[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    var handleBarcodeChange = function (event) {
        setBarcode(event.target.checked);
    };
    var handleChangeIndex = function (index) {
        setValue(index);
    };
    React.useEffect(function () {
        if (props.TicketSearch.isSet) {
            handleSelect(props.TicketSearch.item);
            props.dispatchEvent({
                type: "TICKTSEARCHPRODUCT",
                payload: {
                    item: props.TicketSearch.item,
                    isSet: false,
                },
            });
        }
        if (props.Model.toClose === "mulit") {
            props.dispatchEvent({ type: "HANDELCLEAR" });
            handleCloseMulti();
        }
        if (props.Cart.refreshCart)
            handleTabChange(selectedTab);
        var data = [];
        dataBase_1.default.HandelProducts({
            _type: "getPOSList",
            layoutType: "tabs",
            branch: props.User.userLogged.department,
        }, function (receiveCallback) {
            setTimeout(function () {
                receiveCallback.data[0].map(function (tablist) {
                    if (tablist.isInstore)
                        data.push(tablist);
                });
                setTabsList(data);
            }, 100);
        });
    }, [props]);
    var handleTabChange = function (event) {
        setselectedTab(event);
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "ProductsList", category: event }, function (receiveCallback) {
            setTimeout(function () {
                var data = [];
                receiveCallback.data[0].map(function (list) {
                    if (list.amountInstore !== 0) {
                        if (!list.isMaster)
                            data.push(list);
                    }
                });
                setProductsList(data);
            }, 100);
        });
    };
    var handleProducts = function (event) {
        dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "ProductsList", category: event }, function (receiveCallback) {
            setTimeout(function () {
                setProductsList(receiveCallback.data[0]);
            }, 100);
        });
    };
    var handleSelect = function (data) {
        // console.log(data);
        if (!data.isMulity) {
            props.dispatchEvent({
                type: "ADDTOCART",
                payload: {
                    items: data,
                },
            });
        }
        else {
            dataBase_1.default.HandelProducts({ _type: "getPOSList", layoutType: "mulitList", name: data.ItemName }, function (callback) {
                // console.log(callback.data.sort((a, b) => a - b));
                var data = callback.data[0].sort(function (a, b) { return a - b; });
                setMulti(data);
                handleOpenMulti();
            });
        }
    };
    var onChange = function (input) {
        // console.log("Input changed", input);
    };
    var handleError = function (err) { };
    var handleOnKeyPress = function (key) {
        // console.log(key);
        if (key !== "Enter") {
            shotbarcode = shotbarcode + key;
            setshotbarcode(shotbarcode);
        }
        if (key === "Enter") {
            handleScan(shotbarcode);
            inputRef.current.focus();
        }
        if (key === "Backspace") {
            shotbarcode = shotbarcode.slice(0, -1);
            setshotbarcode(shotbarcode);
        }
        // console.log(key);
    };
    var handleKeyPress = function (event) {
        if (event.key === "Enter") {
            // console.log("enter press here! ");
        }
    };
    var handleScan = function (data) {
        if (!IsScanned) {
            setIsScanned(true);
            setTimeout(function () {
                setIsScanned(false);
            }, 100);
            dataBase_1.default.HandelProducts({ _type: "barcodeScen", value: data }, function (callback) {
                if (callback.data.length !== 0) {
                    if (callback.from === "main_expired") {
                        react_toastify_1.toast("This product has already expired", {
                            position: "top-right",
                            autoClose: 5000,
                            type: "error",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else {
                        if (callback.from === "main") {
                            props.dispatchEvent({
                                type: "ADDTOCART",
                                payload: {
                                    items: callback.data[0],
                                },
                            });
                        }
                        else {
                            var itemData = {
                                ItemName: callback.data[0].productName,
                                productKey: CreatId(),
                                sallingprice: callback.data[0].sallingprice,
                                initalPrice: callback.data[0].sallingprice,
                                isTaxEnabled: false,
                                quantity: 1,
                                amountInstore: callback.data[0].amountInstore,
                                qnt: callback.data[0].qnt,
                                isAddedToCart: false,
                                istaxed: "yes",
                            };
                            props.dispatchEvent({
                                type: "ADDTOCART",
                                payload: {
                                    items: itemData,
                                },
                            });
                        }
                    }
                }
                else {
                    react_toastify_1.toast("No product found with this barcode \"" + shotbarcode + "\"", {
                        position: "top-right",
                        autoClose: 5000,
                        type: "error",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // <Notification />
                }
                setshotbarcode("");
                // console.log(callback.data);
            });
        }
        setshotbarcode("");
        // console.log(data);
    };
    var handleOpenMulti = function () {
        setOpenMulti(true);
    };
    var handleCloseMulti = function () {
        setOpenMulti(false);
    };
    var onKeyPress = function (button) {
        if (button === "{shift}" || button === "{lock}")
            handleShift();
    };
    var search = function (event, item) {
        handleSelect(item);
    };
    var handleShift = function () {
        var layoutNameValue = layoutName;
        if (layoutNameValue === "default") {
            setlayoutName("shift");
        }
        else {
            setlayoutName("default");
        }
    };
    return (React.createElement(core_2.Paper, { style: { width: "89vw", height: "99%", overflow: "auto" } },
        React.createElement("div", { style: {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                height: "100%",
            }, onClick: handleKeyPress },
            React.createElement("div", { style: {
                    width: "12vw",
                    height: "100%",
                    overflow: "auto",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "transparent",
                    borderRightColor: props.Theme.theme === "light" ? "#929292" : "#424242",
                } }, tabsList.map(function (tabs, index) { return (React.createElement(core_2.Button, { key: tabs.key + index, disabled: props.TicketToPrint.active ? true : false, className: classes.tab, onClick: function () {
                    handleTabChange(tabs.tabname);
                }, style: {
                    width: "10.6vw",
                    backgroundColor: tabs.background,
                    color: tabs.color,
                    cursor: props.TicketToPrint.active ? "default" : "pointer",
                } },
                React.createElement(core_1.Typography, { style: {
                        width: "10.6vw",
                        textOverflow: "ellipsis",
                        fontSize: 11,
                    } }, tabs.tabname))); })),
            barcode ? (React.createElement(react_barcode_reader_1.default, { onError: handleError, onKeyDetect: function (event) {
                    handleOnKeyPress(event.key);
                } })) : (React.createElement(react_barcode_reader_1.default, { onError: handleError, onScan: handleScan })),
            React.createElement("div", { style: {
                    width: "77vw",
                    height: "100%",
                    backgroundColor: props.Theme.theme === "light" ? "#DFDFDF" : "#202020",
                } },
                React.createElement("div", { style: {
                        width: "100%",
                        height: "93%",
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: "transparent",
                        display: "flex",
                        justifyContent: "space-between",
                    } },
                    React.createElement("div", { className: classes.root },
                        React.createElement("div", { style: { width: "100%", height: "90%", overflow: "auto" } }, props.TicketToPrint.active ? null : (React.createElement("div", null, productsList.map(function (tabPanelList, index) {
                            if (!tabPanelList.isMaster)
                                return (React.createElement(core_2.Button, { key: tabPanelList.productKey + index, 
                                    // disabled={tabPanelList.amountInstore === 0 ? true : false}
                                    onClick: function () {
                                        if (tabPanelList.amountInstore === 0) {
                                            react_toastify_1.toast("\"" + tabPanelList.ItemName + " is out of stock\"", {
                                                position: "top-right",
                                                autoClose: 5000,
                                                type: "error",
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                            return;
                                        }
                                        handleSelect(tabPanelList);
                                    }, style: {
                                        width: "30%",
                                        height: "100%",
                                        margin: 6,
                                        overflow: "hidden",
                                        textAlign: "center",
                                        backgroundColor: tabPanelList.amountInstore === 0
                                            ? "#0E0205"
                                            : "#0E0E0E",
                                    } },
                                    React.createElement(core_1.Typography, { style: {
                                            width: "10.6vw",
                                            textOverflow: "ellipsis",
                                            fontSize: 11,
                                            color: tabPanelList.amountInstore === 0
                                                ? "#6E7D79"
                                                : "#fff",
                                        } }, tabPanelList.ItemName)));
                        })))))),
                React.createElement("div", { style: { padding: 10, display: "flex" } },
                    React.createElement(core_1.Typography, { style: {
                            marginTop: 10,
                            color: props.Theme.theme === "light" ? "#3b3b3b" : "#AAAAAA",
                        }, variant: "caption" }, "Keyboad Event"),
                    React.createElement(ArrowRight_1.default, { style: {
                            marginTop: 10,
                            color: props.Theme.theme === "light" ? "#3b3b3b" : "#AAAAAA",
                        } }),
                    React.createElement(core_1.Typography, { variant: "caption", style: { marginLeft: 10, marginTop: 10 } }, shotbarcode),
                    React.createElement("div", { style: { marginLeft: 40 } },
                        React.createElement(core_1.FormControlLabel, { control: React.createElement(core_1.Switch, { checked: barcode, onChange: handleBarcodeChange, name: "checkedB", color: "primary" }), label: "Manual Barcodes" })))),
            React.createElement("div", null,
                React.createElement(core_2.Modal, { "aria-labelledby": "simple-modal-title", "aria-describedby": "simple-modal-description", open: openMulti, className: classes.modal, onClose: handleCloseMulti },
                    React.createElement(core_2.Paper, { style: { height: "55vh", width: "50%" } },
                        React.createElement("div", { style: {
                                marginTop: 10,
                                marginRight: 10,
                                display: "flex",
                                justifyContent: "space-between",
                            } },
                            React.createElement("div", { style: { marginLeft: 10 } },
                                React.createElement(core_1.Typography, { variant: "h5", style: { color: "#aaaaaa" } }, "Select Price")),
                            React.createElement(core_2.IconButton, { onClick: handleCloseMulti },
                                React.createElement(Clear_1.default, null))),
                        React.createElement("div", { style: { width: "100%" } },
                            React.createElement(MutiList_1.default, { multi: multi }))))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        SocketConn: state.SocketConn,
        Cart: state.Cart,
        Model: state.Model,
        TicketToPrint: state.TicketToPrint,
        TicketSearch: state.TicketSearch,
        User: state.User,
        Dep: state.Dep,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(exports.index);
//# sourceMappingURL=index.js.map