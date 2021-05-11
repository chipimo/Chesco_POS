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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var Button_1 = require("@material-ui/core/Button");
var core_1 = require("@material-ui/core");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_toastify_1 = require("react-toastify");
var InputAdornment_1 = require("@material-ui/core/InputAdornment");
var ShoppingBasket_1 = require("@material-ui/icons/ShoppingBasket");
var MoneyOutlined_1 = require("@material-ui/icons/MoneyOutlined");
var Description_1 = require("@material-ui/icons/Description");
var react_barcode_reader_1 = require("react-barcode-reader");
var dataBase_1 = require("../../redux/dataBase");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        padding: theme.spacing(3, 4, 3),
    },
    table: {
        width: "100%",
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
        borderCollapse: "collapse",
    },
    tableCol: {
        width: 200,
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
    },
    tableRow: {
        width: 200,
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        borderWidth: 1,
    },
    link: {
        color: "#0078D7",
        textDecoration: "underline",
        marginTop: 20,
        cursor: "pointer",
        "&:hover, &$focusVisible": {
            color: "#002847",
        },
    },
}); });
var dateNow = new Date(); // Creating a new date object with the current date and time
var year = dateNow.getFullYear(); // Getting current year from the created Date object
var monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
var month = // Setting current Month number from current Date object
 monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? "0" + monthWithOffset
    : monthWithOffset;
var date = dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? "0" + dateNow.getUTCDate()
    : dateNow.getUTCDate();
var materialDateInput = year + "-" + month + "-" + date; // combining to format for defaultValue or value attribute of material <TextField>
var NewProduct = function (props) {
    var classes = useStyles();
    var _a = React.useState({
        data: [],
    }), portionInputs = _a[0], setPortionInputs = _a[1];
    var _b = React.useState({
        ProductName: "",
        BarCode1: "",
        BarCode2: "",
        BarCode3: "",
        BarCode4: "",
        BarCode5: "",
        alertOut: "",
        amount: "",
        ProductQt: 0,
        buyProduct: 0,
        Groupname: "",
        VAT: false,
        invoice: "",
    }), values = _b[0], setValues = _b[1];
    var _c = React.useState({
        nameError: "",
        barCodeError: "",
        alertOutError: "",
        groupError: "",
        Categories: "",
        branchError: "",
        amount: "",
        invoice: "",
    }), errors = _c[0], setErrors = _c[1];
    var _d = React.useState([]), mainGroups = _d[0], setMainGroups = _d[1];
    var _e = React.useState([]), Recipes = _e[0], setRecipes = _e[1];
    var _f = React.useState(""), selectedRecipe = _f[0], setSelectedRecipe = _f[1];
    var _g = React.useState({ data: [] }), branches = _g[0], setBranches = _g[1];
    var _h = React.useState(false), Loading = _h[0], setLoading = _h[1];
    var _j = React.useState({
        data: [
            { vat: "VAT inclusive", isAdded: true },
            { vat: "No VAT inclusive", isAdded: false },
        ],
    }), vatsetup = _j[0], setVatsetup = _j[1];
    var _k = React.useState(true), tax = _k[0], setTax = _k[1];
    var _l = React.useState({}), ProductSupplier = _l[0], setProductSupplier = _l[1];
    var _m = React.useState(0), quantity = _m[0], setQuantity = _m[1];
    var _o = React.useState(""), branch = _o[0], setBranch = _o[1];
    var _p = React.useState({
        group: "",
        id: "",
        colors: {},
    }), SelectedMainGroups = _p[0], setSelectedMainGroups = _p[1];
    var _q = React.useState([]), Suppliers = _q[0], SetSuppliers = _q[1];
    var _r = React.useState({}), supplierEdit = _r[0], SetSupplier = _r[1];
    var _s = React.useState(""), expiryDate = _s[0], setExpiryDate = _s[1];
    var _t = React.useState(false), masters = _t[0], setMasters = _t[1];
    var _u = React.useState(""), shotbarcode = _u[0], setshotbarcode = _u[1];
    var _v = React.useState(false), showMaster = _v[0], setshowMaster = _v[1];
    var _w = React.useState("not set"), ProductRecipe = _w[0], setProductRecipe = _w[1];
    var _x = React.useState({ data: [] }), state = _x[0], setState = _x[1];
    React.useEffect(function () {
        // console.log("callback");
        dataBase_1.default.HandleBranches({ type: "get" }, function (callback) {
            setBranches(__assign({}, branches, { data: callback }));
        });
        dataBase_1.default.HandleSuppliers({ type: "get" }, function (callback) {
            SetSuppliers(callback);
        });
        dataBase_1.default.HandelProducts({ _type: "GetRecipe" }, function (reciveCallback) {
            setState(__assign({}, state, { data: reciveCallback }));
        });
        if (props.type === "edit") {
            setLoading(true);
            setValues(__assign({}, values, { ProductName: props.data.selected.ItemName, buyProduct: props.data.selected.buyingPrice, ProductQt: props.data.selected.amountInstore, VAT: props.data.selected.isTaxEnabled }));
            setSelectedMainGroups(__assign({}, SelectedMainGroups, { group: props.data.selected.group }));
            SetSupplier(props.data.selected.supplier);
            setBranch(props.data.selected.branches);
            if (props.data.selected.isMulity) {
                dataBase_1.default.HandelProducts({
                    _type: "getPOSList",
                    layoutType: "mulitList",
                    name: props.data.selected.ItemName,
                }, function (receiveCallback) { return __awaiter(_this, void 0, void 0, function () {
                    var loopEnd, dataOutput, reslut;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                loopEnd = 0;
                                dataOutput = receiveCallback.data.map(function (datalist, index) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        // console.log(datalist);
                                        loopEnd++;
                                        handelPortion(datalist.id);
                                        handelOnTextPartonChage(datalist.barcode1, "barcode1", index);
                                        handelOnTextPartonChage(datalist.barcode2, "barcode2", index);
                                        handelOnTextPartonChage(datalist.barcode3, "barcode3", index);
                                        handelOnTextPartonChage(datalist.barcode4, "barcode4", index);
                                        handelOnTextPartonChage(datalist.barcode5, "barcode5", index);
                                        handelOnTextPartonChage(datalist.qnt, "multiplier", index);
                                        handelOnTextPartonChage(datalist.alertOut, "alertOut", index);
                                        handelOnTextPartonChage(datalist.sallingprice, "price", index);
                                        if (loopEnd === receiveCallback.data.length) {
                                            return [2 /*return*/, true];
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                                return [4 /*yield*/, Promise.all(dataOutput)];
                            case 1:
                                reslut = _a.sent();
                                if (reslut)
                                    setLoading(false);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else {
                handelPortion(false);
                setTimeout(function () {
                    handelOnTextPartonChage(props.data.selected.barcode1, "barcode1", 0);
                    handelOnTextPartonChage(props.data.selected.barcode2, "barcode2", 0);
                    handelOnTextPartonChage(props.data.selected.barcode3, "barcode3", 0);
                    handelOnTextPartonChage(props.data.selected.barcode4, "barcode4", 0);
                    handelOnTextPartonChage(props.data.selected.barcode5, "barcode5", 0);
                    handelOnTextPartonChage(props.data.selected.multiplier, "multiplier", 0);
                    handelOnTextPartonChage(parseInt(props.data.selected.alertOut), "alertOut", 0);
                    handelOnTextPartonChage(props.data.selected.sallingprice, "price", 0);
                }, 300);
            }
        }
        dataBase_1.default.HandelGroup({ _type: "get" }, function (reciveCallback) {
            var arr = [];
            reciveCallback.data.map(function (data) {
                arr.push({
                    title: data.group,
                    id: data.id,
                    recipes: data.recipes,
                    colors: data.colors,
                });
            });
            setMainGroups(arr);
        });
    }, []);
    var handleChange = function (event) {
        setMasters(event.target.checked);
    };
    var handleTextChange = function (prop) { return function (event) {
        var _a;
        setValues(__assign({}, values, (_a = {}, _a[prop] = event.target.value, _a)));
        if (prop === "ProductName")
            setErrors(__assign({}, errors, { nameError: "" }));
        if (prop === "alertOut")
            setErrors(__assign({}, errors, { alertOutError: "" }));
        if (prop === "Groupname")
            setErrors(__assign({}, errors, { groupError: "" }));
    }; };
    var handelOnTextPartonChage = function (value, id, index) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (id) {
                case "barcode1":
                    portionInputs.data[index].barcode1 = value;
                    break;
                case "barcode2":
                    portionInputs.data[index].barcode2 = value;
                    break;
                case "barcode3":
                    portionInputs.data[index].barcode3 = value;
                    break;
                case "barcode4":
                    portionInputs.data[index].barcode4 = value;
                    break;
                case "barcode5":
                    portionInputs.data[index].barcode5 = value;
                    break;
                case "multiplier":
                    portionInputs.data[index].multiplier = value;
                    break;
                case "alertOut":
                    portionInputs.data[index].alertOut = value;
                    break;
                case "price":
                    portionInputs.data[index].price = value;
                    break;
                default:
                    break;
            }
            setPortionInputs(__assign({}, portionInputs, { data: portionInputs.data }));
            return [2 /*return*/];
        });
    }); };
    var handelDelete = function () {
        var arr = portionInputs.data;
        var filter = arr.findIndex(function (x) { return x.id === 1; });
        arr.splice(filter, 1);
        setPortionInputs(__assign({}, portionInputs, { data: arr }));
    };
    var handelSubmit = function () {
        if (values.ProductName === "")
            return setErrors(__assign({}, errors, { nameError: "Name Should not be empty" }));
        else if (portionInputs.data.length === 0)
            return;
        else if (branch === "")
            return setErrors(__assign({}, errors, { branchError: "Branch Should not be empty" }));
        else if (SelectedMainGroups.group === "")
            return setErrors(__assign({}, errors, { Categories: "Categorie Should not be empty" }));
        var data = {
            name: values.ProductName,
            productQt: values.ProductQt,
            buyingPrice: values.buyProduct,
            branch: branch,
            tax: tax,
            group: SelectedMainGroups,
            recipe: selectedRecipe,
            ProductSupplier: ProductSupplier,
            expiryDate: expiryDate,
            MasterState: masters,
            invoice: values.invoice,
            portion: portionInputs.data,
            ingredient: ProductRecipe,
            _type: props.type === "edit"
                ? "edit"
                : props.type === "addToWareHouse"
                    ? "addToWareHouse"
                    : "set",
            data: props.type === "edit" ? props.data.selected : null,
        };
        if (props.trans) {
            if (props.trans === "trans") {
                var data2 = {
                    name: values.ProductName,
                    productQt: values.ProductQt,
                    buyingPrice: values.buyProduct,
                    branch: branch,
                    tax: tax,
                    group: SelectedMainGroups,
                    recipe: selectedRecipe,
                    ProductSupplier: ProductSupplier,
                    expiryDate: expiryDate,
                    MasterState: masters,
                    invoice: values.invoice,
                    portion: portionInputs.data,
                    _type: "WareHouseEdit",
                    data: props.type === "edit" ? props.data.selected : null,
                };
                dataBase_1.default.HandelProducts(data2, function (reciveCallback) {
                    react_toastify_1.toast("Successfully Updated", {
                        position: "top-right",
                        autoClose: 5000,
                        type: "success",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    if (props.type === "edit")
                        props.dispatchEvent({
                            type: "HANDELCLOSE",
                            toClose: "edit_product",
                        });
                    else {
                        props.dispatchEvent({
                            type: "HANDELCLOSE",
                            toClose: "new_product",
                        });
                    }
                    props.dispatchEvent({
                        type: "LOADTABEL",
                    });
                });
            }
        }
        else {
            dataBase_1.default.HandelProducts(data, function (reciveCallback) {
                react_toastify_1.toast("Successfully Updated", {
                    position: "top-right",
                    autoClose: 5000,
                    type: "success",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                if (props.type === "edit")
                    props.dispatchEvent({
                        type: "HANDELCLOSE",
                        toClose: "edit_product",
                    });
                else {
                    props.dispatchEvent({
                        type: "HANDELCLOSE",
                        toClose: "new_product",
                    });
                }
                props.dispatchEvent({
                    type: "LOADTABEL",
                });
            });
        }
    };
    var handelPortion = function (propId) {
        var newArr = [];
        newArr = portionInputs.data;
        var input = propId ? propId : "input_" + newArr.length;
        var id = 0;
        if (newArr.length === 0) {
            newArr.push({
                id: input,
                barcode1: "",
                barcode2: "",
                barcode3: "",
                barcode4: "",
                barcode5: "",
                multiplier: "",
                alertOut: 1,
                price: "",
            });
        }
        else {
            id = newArr.length;
            newArr.push({
                id: input,
                barcode1: "",
                barcode2: "",
                barcode3: "",
                barcode4: "",
                barcode5: "",
                multiplier: "",
                alertOut: 1,
                price: "",
            });
        }
        setPortionInputs(__assign({}, portionInputs, { data: newArr }));
    };
    var onOpenChange = function (dateValue, type) {
        setExpiryDate(dateValue.target.value);
    };
    var handleOnKeyPress = function (key) {
        // console.log(key);
        if (key !== "Enter") {
            shotbarcode = shotbarcode + key;
            setshotbarcode(shotbarcode);
        }
        if (key === "Enter") {
            if (shotbarcode === "master") {
                setshowMaster(true);
                setshotbarcode("");
            }
            else {
                setshotbarcode("");
                setshowMaster(false);
            }
        }
    };
    return (React.createElement("div", { className: classes.paper, style: {
            backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
            color: props.Theme.theme === "light" ? "#3b3b3b" : "#fff",
            height: props.type === "edit" ? 655 : 655,
        } },
        React.createElement(react_barcode_reader_1.default, { onKeyDetect: function (event) {
                handleOnKeyPress(event.key);
            } }),
        React.createElement("div", { style: { height: 500 } },
            React.createElement(core_1.Grid, { container: true, spacing: 2 },
                React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                    React.createElement(TextField_1.default
                    // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
                    , { 
                        // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
                        autoComplete: "ProductName", name: "ProductName", variant: "outlined", required: true, fullWidth: true, onChange: handleTextChange("ProductName"), value: values.ProductName, id: "ProductName", label: "Product Name", error: errors.nameError === "" ? false : true, helperText: errors.nameError })),
                React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                    React.createElement(Autocomplete_1.default, { id: "controllable-states-demo", options: mainGroups, onChange: function (event, newValue) {
                            console.log(newValue);
                            var arr = [];
                            setRecipes(arr);
                            setSelectedMainGroups(__assign({}, SelectedMainGroups, { group: newValue.title, id: newValue.id, colors: newValue.colors }));
                            setErrors(__assign({}, errors, { Categories: "" }));
                        }, getOptionLabel: function (option) { return option.title; }, style: {
                            width: 300,
                        }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "Categories", variant: "outlined", fullWidth: true, value: SelectedMainGroups.group, error: errors.Categories === "" ? false : true, helperText: props.type === "edit"
                                ? "Default Category name: " + SelectedMainGroups.group
                                : errors.Categories }))); } }),
                    React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(Autocomplete_1.default
                        // disabled={props.type === "edit" ? true : false}
                        , { 
                            // disabled={props.type === "edit" ? true : false}
                            id: "combo-box-demo", options: branches.data, onChange: function (event, newValue) {
                                setBranch(newValue.brancheId);
                                setErrors(__assign({}, errors, { branchError: "" }));
                            }, getOptionLabel: function (option) { return option.branche; }, style: {
                                width: 300,
                            }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "Branches", variant: "outlined", fullWidth: true, error: errors.branchError === "" ? false : true, helperText: props.type === "edit"
                                    ? "Default Branch name: " + branch
                                    : errors.branchError }))); } })),
                    React.createElement("div", { style: { marginTop: 20 } },
                        React.createElement(TextField_1.default, { id: "date", label: "Expiry Date", type: "date", defaultValue: materialDateInput, onChange: function (event) { return onOpenChange(event, "startDate"); }, 
                            // className={classes.textField}
                            InputLabelProps: {
                                shrink: true,
                            } })))),
            React.createElement("div", { style: { marginTop: 10 } }),
            React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                React.createElement("div", { style: {
                        marginTop: props.type === "edit" ? -175 : -134,
                        display: "flex",
                        width: "100%",
                    } },
                    React.createElement(TextField_1.default
                    // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
                    , { 
                        // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
                        name: "ProductQt", type: "number", variant: "outlined", fullWidth: true, onChange: handleTextChange("ProductQt"), value: values.ProductQt, id: "ProductQt", label: "Product Quantity", error: errors.nameError === "" ? false : true, helperText: errors.nameError, InputProps: {
                            startAdornment: (React.createElement(InputAdornment_1.default, { position: "start" },
                                React.createElement(MoneyOutlined_1.default, null))),
                        } }),
                    React.createElement(TextField_1.default
                    // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
                    , { 
                        // style={{ marginTop: props.type === "edit" ? 20 : 0 }}
                        name: "buyProduct", type: "number", variant: "outlined", fullWidth: true, onChange: handleTextChange("buyProduct"), value: values.buyProduct, id: "ProductQt", label: "Buying Price", error: errors.nameError === "" ? false : true, helperText: errors.nameError, InputProps: {
                            startAdornment: (React.createElement(InputAdornment_1.default, { position: "start" },
                                React.createElement(ShoppingBasket_1.default, null))),
                        } })),
                React.createElement("div", { style: { marginTop: 20, display: "flex" } },
                    React.createElement(Autocomplete_1.default
                    // disabled={props.type === "edit" ? true : false}
                    , { 
                        // disabled={props.type === "edit" ? true : false}
                        id: "combo-box-demo", options: vatsetup.data, onChange: function (event, newValue) {
                            setTax(newValue.isAdded);
                        }, getOptionLabel: function (option) { return option.vat; }, style: {
                            width: 300,
                        }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "VAT Setup", variant: "outlined", fullWidth: true, helperText: props.type === "edit"
                                ? "Default VAT Setup: " + (values.VAT ? "VAT inclusive" : "No VAT inclusive")
                                : null }))); } }),
                    React.createElement(Autocomplete_1.default
                    // disabled={props.type === "edit" ? true : false}
                    , { 
                        // disabled={props.type === "edit" ? true : false}
                        defaultValue: {}, id: "combo-box-demo", options: Suppliers, onChange: function (event, newValue) {
                            setProductSupplier(newValue);
                        }, getOptionLabel: function (option) { return option.SupplierName; }, style: {
                            width: 300,
                        }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "Supplier Setup", variant: "outlined", fullWidth: true, helperText: props.type === "edit"
                                ? "Default Supplier: " + supplierEdit.SupplierName
                                : null }))); } }),
                    React.createElement(Autocomplete_1.default
                    // disabled={props.type === "edit" ? true : false}
                    , { 
                        // disabled={props.type === "edit" ? true : false}
                        defaultValue: {}, id: "combo-box-demo", options: state.data, onChange: function (event, newValue) {
                            // console.log(newValue);
                            if (newValue)
                                setProductRecipe(newValue.idKey);
                            else if (!newValue)
                                setProductRecipe("not set");
                        }, getOptionLabel: function (option) { return option.recipeName; }, style: {
                            width: 300,
                        }, renderInput: function (params) { return (React.createElement(TextField_1.default, __assign({}, params, { label: "Set Recipe", variant: "outlined", fullWidth: true, helperText: "optional" }))); } })),
                React.createElement(TextField_1.default, { style: { marginTop: 10 }, name: "invoice", type: "text", variant: "outlined", fullWidth: true, onChange: handleTextChange("invoice"), value: values.invoice, id: "invoice", label: "Invoice Number", error: errors.invoice === "" ? false : true, helperText: errors.invoice, InputProps: {
                        startAdornment: (React.createElement(InputAdornment_1.default, { position: "start" },
                            React.createElement(Description_1.default, null))),
                    } }),
                showMaster ? (React.createElement(core_1.FormControlLabel, { control: React.createElement(core_1.Checkbox, { checked: masters, onChange: handleChange, name: "masters", color: "secondary" }), label: "Set This Product Masters" })) : null),
            React.createElement("div", { style: { marginTop: 30 } },
                React.createElement("div", { style: {
                        width: "100%",
                    } },
                    React.createElement("div", { style: {
                            width: "100%",
                            borderColor: "#aaaaaa",
                            borderStyle: "solid",
                            height: 230,
                            borderWidth: 1,
                            borderRadius: 3,
                            marginTop: 20,
                        } },
                        React.createElement("div", { style: {
                                marginTop: -10,
                                backgroundColor: props.Theme.theme === "light" ? "#F8F8F8" : "#212121",
                                marginLeft: 10,
                                width: 97,
                                paddingLeft: 5,
                            } },
                            React.createElement(core_1.Typography, { variant: "body2" }, "Portion Prices")),
                        React.createElement("div", { style: {
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            } },
                            React.createElement("div", { style: {
                                    padding: 10,
                                    width: "82%",
                                    maxHeight: 210,
                                    overflow: "hidden",
                                    overflowY: "auto",
                                } },
                                React.createElement("table", { className: classes.table },
                                    React.createElement("thead", null,
                                        React.createElement("tr", null,
                                            React.createElement("th", { className: classes.tableCol }, "BarCode"),
                                            React.createElement("th", { className: classes.tableCol }, "Alert Out"),
                                            React.createElement("th", { className: classes.tableCol }, "Selling Price"))),
                                    React.createElement("tbody", null, portionInputs.data.map(function (tablelist, index) { return (React.createElement("tr", { key: index },
                                        React.createElement("td", { className: classes.tableRow },
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode1", index);
                                                }, type: "text", defaultValue: tablelist.barcode1, name: tablelist.barcode, placeholder: "barcode 1" }),
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode2", index);
                                                }, type: "text", defaultValue: tablelist.barcode2, name: tablelist.barcode, placeholder: "barcode 2" }),
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode3", index);
                                                }, type: "text", defaultValue: tablelist.barcode, name: tablelist.barcode3, placeholder: "barcode 3" }),
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode4", index);
                                                }, type: "text", defaultValue: tablelist.barcode, name: tablelist.barcode4, placeholder: "barcode 4" }),
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    outline: "none",
                                                    width: 200,
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "barcode5", index);
                                                }, type: "text", defaultValue: tablelist.barcode, name: tablelist.barcode5, placeholder: "barcode 5" })),
                                        React.createElement("td", { className: classes.tableRow },
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    width: 230,
                                                    outline: "none",
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "alertOut", index);
                                                }, type: "number", defaultValue: tablelist.alertOut, name: tablelist.alertOut, placeholder: "alert out" })),
                                        React.createElement("td", { className: classes.tableRow },
                                            React.createElement("input", { style: {
                                                    borderColor: "transparent",
                                                    borderTopColor: "#aaaaaa",
                                                    borderStyle: "solid",
                                                    borderWidth: 1,
                                                    width: 230,
                                                    outline: "none",
                                                    color: props.Theme.theme === "light"
                                                        ? "#3b3b3b"
                                                        : "#fff",
                                                    backgroundColor: "transparent",
                                                }, onInput: function (e) {
                                                    handelOnTextPartonChage(e.target.value, "price", index);
                                                }, type: "number", defaultValue: tablelist.price, name: tablelist.price, placeholder: "selling price" })))); }))),
                                props.type !== "edit" ? (React.createElement("div", null, portionInputs.data.length === 0 ? (React.createElement("div", { style: { marginTop: 10 } },
                                    React.createElement(semantic_ui_react_1.Message, { warning: true },
                                        React.createElement(semantic_ui_react_1.Message.Header, null, "Atlest add one row in the Portion Table"),
                                        React.createElement(core_1.Typography, null, "We have to get the Price of the Product this must not be empty. If the Multiplier or Alert Out is left blank it will be set to defult which is 1. Barcode is optional")))) : null)) : null),
                            React.createElement("div", { style: {
                                    width: "15%",
                                } },
                                React.createElement("div", null,
                                    React.createElement(Button_1.default, { variant: "contained", color: "primary", disabled: portionInputs.data < 1 ? false : true, size: "small", onClick: function () { return handelPortion(false); } }, "Add Portion")),
                                React.createElement("div", { style: { marginTop: 10 } },
                                    React.createElement(Button_1.default, { variant: "contained", color: "secondary", size: "small", onClick: function () { return handelDelete(); } }, "Delete")))))))),
        React.createElement("div", { style: {
                display: "flex",
                marginTop: 65,
            } },
            React.createElement("div", null,
                React.createElement(Button_1.default, { style: { marginLeft: 10 }, variant: "contained", color: "primary", onClick: function () { return handelSubmit(); } }, "Save")),
            React.createElement("div", null,
                React.createElement(Button_1.default, { onClick: function () {
                        if (props.type === "edit")
                            props.dispatchEvent({
                                type: "HANDELCLOSE",
                                toClose: "edit_product",
                            });
                        else {
                            props.dispatchEvent({
                                type: "HANDELCLOSE",
                                toClose: "new_product",
                            });
                        }
                    }, style: { marginLeft: 10 }, variant: "contained", color: "secondary" }, "Cancel")))));
};
function mapStateToProps(state) {
    return {
        Cart: state.Cart,
        Theme: state.Theme,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewProduct);
//# sourceMappingURL=NewProduct.js.map