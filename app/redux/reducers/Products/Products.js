"use strict";
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
// import { getDatafilePath } from "../../dataBase/store/path";
var dataBase_1 = require("../../dataBase");
var store_1 = require("../../store");
var Purchases_1 = require("../reports/Purchases");
var licenseKey = require("license-key-gen");
var Alert = require("electron-alert");
var moment = require("moment");
var uuidv1 = require("uuid/v1");
var alert = new Alert();
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
var DateNumInput = "" + year + month + date;
// let defaultPath = getDatafilePath;
// const ConfigPath = defaultPath + "/dataFiles/Products/config.json";
// const FolderPath = defaultPath + "/dataFiles/Products/";
var SocketIds = [];
function CreateId() {
    return uuidv1();
}
exports.GetData = function (props, hook, callback) {
    // console.log(props);
    hook
        .select()
        .from(props.table)
        .where(props.id, props.value)
        .then(function (data) {
        callback({
            data: data,
        });
    });
};
var GetDataAll = function (props, hook, callback) {
    hook
        .select()
        .from(props.table)
        .then(function (data) {
        callback({
            data: data,
        });
    });
};
var AutoCreateCategory = function (props, hook, callback) { };
var InsertProduct = function (props, hook, callback) {
    // dbhook("products")
    //               .insert({
    //                 productKey: uuidv1(),
    //                 group: props.group.id,
    //                 category: recipe,
    //                 ItemName: props.name,
    //                 barcode1:"" ,
    //                 barcode2:"",
    //                 barcode3:'',
    //                 barcode4:"",
    //                 barcode5:"",
    //                 branches: props.branch,
    //                 supplier: props.ProductSupplier.supplierKey
    //                   ? props.ProductSupplier.supplierKey
    //                   : "",
    //                 ingredient: props.ingredient,
    //                 sallingprice: isMulity ? 0 : props.portion[0].price,
    //                 initalPrice: isMulity ? 0 : props.portion[0].price,
    //                 buyingPrice: props.buyingPrice,
    //                 qnt: 1,
    //                 multiplier: 0,
    //                 alertOut: isMulity ? 0 : props.portion[0].alertOut,
    //                 amountInstore: props.productQt,
    //                 sync: false,
    //                 expiryDate:
    //                   props.expiryDate !== "" ? props.expiryDate : "not set",
    //                 isExpired: false,
    //                 isMaster: props.MasterState,
    //                 isInstore: true,
    //                 isTaxEnabled: props.tax,
    //                 // isTaxEnabled: Tabcallback.data[0].isTaxEnabled,
    //                 isMulity,
    //               })
    //               .then(function () {
    //                 const data = {
    //                   type: "new",
    //                   productName: props.name,
    //                   group: props.group.id,
    //                   sellingPrice: props.portion[0].price,
    //                   sellingPriceOld: props.portion[0].price,
    //                   buyingPrice: props.buyingPrice,
    //                   buyingPriceOld: props.buyingPrice,
    //                   supplier: props.ProductSupplier.supplierKey
    //                     ? props.ProductSupplier.supplierKey
    //                     : "",
    //                   quantity: props.productQt,
    //                   invoiceNumber: props.invoice,
    //                   EventDate: moment().format("MM/DD/YYYY"),
    //                   dateRange: parseInt(DateNumInput),
    //                   time: moment().format("LT"),
    //                 };
    //                 Purchases(dbhook, data, (callback) => {});
    //                 if (isMulity) {
    //                   props.portion.map((data) => {
    //                     dbhook("mulitProducts")
    //                       .insert({
    //                         id: uuidv1(),
    //                         productName: props.name,
    //                         sallingprice: parseInt(data.price),
    //                         initalPrice: parseInt(data.price),
    //                         qnt: 1,
    //                         barcode1: data.barcode1,
    //                         barcode2: data.barcode2,
    //                         barcode3: data.barcode3,
    //                         barcode4: data.barcode4,
    //                         barcode5: data.barcode5,
    //                         alertOut: parseInt(data.alertOut),
    //                         amountInstore: 0,
    //                         isInstore: true,
    //                         isTaxEnabled: props.tax,
    //                       })
    //                       .then((result) => {})
    //                       .catch((err) => {});
    //                   });
    //                   sendCallback({
    //                     isSet: true,
    //                     productKey,
    //                     type: "add",
    //                   });
    //                 } else {
    //                   sendCallback({
    //                     isSet: true,
    //                     productKey,
    //                     type: "add",
    //                   });
    //                 }
    //               });
};
exports.HandelNewProducts = function (props, dbhook, sendCallback) { return __awaiter(_this, void 0, void 0, function () {
    var isMulity, multi, recipe, productKey, recipe, productKey, _a, alltabs, allproductsList, allmulitList, socketId, newArr4_1, newArr5_1, newArr6_1, tabs, categorylist, productsList, mulitList, productsList, newArr_1, newArr2_1, newArr3_1, Products, promises, num, MaterialPromises, bulkuploadPromises;
    var _this = this;
    return __generator(this, function (_b) {
        isMulity = false;
        multi = [];
        // console.log(props);
        switch (props._type) {
            case "set":
                recipe = props.recipe === "" ? props.group.group : props.recipe;
                productKey = CreateId();
                if (props.portion.length !== 1)
                    isMulity = true;
                exports.GetData({ table: "Tabs", id: "tabname", value: props.group.group }, dbhook, function (Tabcallback) {
                    // console.log(Tabcallback.data[0].isTaxEnabled);
                    if (Tabcallback.data.length === 0) {
                        dbhook("Tabs")
                            .insert({
                            id: uuidv1(),
                            tabname: props.group.group,
                            branch: props.branch,
                            background: props.group.colors.backgroundColor,
                            color: props.group.colors.textColor,
                            buttonType: "default",
                            isInstore: true,
                            isTaxEnabled: props.tax,
                        })
                            .then(function () {
                            var _this = this;
                            exports.GetData({ table: "products", id: "ItemName", value: props.name }, dbhook, function (callback) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (callback.data.length === 0) {
                                        dbhook("products")
                                            .insert({
                                            productKey: uuidv1(),
                                            group: props.group.id,
                                            category: recipe,
                                            ItemName: props.name,
                                            barcode1: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode1,
                                            barcode2: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode2,
                                            barcode3: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode3,
                                            barcode4: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode4,
                                            barcode5: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode5,
                                            branches: props.branche,
                                            supplier: props.ProductSupplier.supplierKey
                                                ? props.ProductSupplier.supplierKey
                                                : "",
                                            ingredient: props.ingredient,
                                            sallingprice: isMulity ? 0 : props.portion[0].price,
                                            initalPrice: isMulity ? 0 : props.portion[0].price,
                                            buyingPrice: props.buyingPrice,
                                            qnt: 1,
                                            multiplier: 0,
                                            alertOut: isMulity ? 0 : props.portion[0].alertOut,
                                            amountInstore: props.productQt,
                                            sync: false,
                                            expiryDate: props.expiryDate !== ""
                                                ? props.expiryDate
                                                : "not set",
                                            isExpired: false,
                                            isMaster: props.MasterState,
                                            isInstore: true,
                                            isTaxEnabled: props.tax,
                                            isMulity: isMulity,
                                        })
                                            .then(function () {
                                            var data = {
                                                type: "new",
                                                productName: props.name,
                                                group: props.group.id,
                                                sellingPrice: props.portion[0].price,
                                                sellingPriceOld: props.portion[0].price,
                                                buyingPrice: props.buyingPrice,
                                                buyingPriceOld: props.buyingPrice,
                                                supplier: props.ProductSupplier.supplierKey
                                                    ? props.ProductSupplier.supplierKey
                                                    : "",
                                                quantity: props.productQt,
                                                invoiceNumber: props.invoice,
                                                EventDate: moment().format("MM/DD/YYYY"),
                                                dateRange: parseInt(DateNumInput),
                                                time: moment().format("LT"),
                                            };
                                            Purchases_1.Purchases(dbhook, data, function (callback) { });
                                            if (isMulity) {
                                                props.portion.map(function (data) {
                                                    dbhook("mulitProducts")
                                                        .insert({
                                                        id: uuidv1(),
                                                        productName: props.name,
                                                        sallingprice: parseInt(data.price),
                                                        initalPrice: parseInt(data.price),
                                                        qnt: 1,
                                                        barcode1: data.barcode1,
                                                        barcode2: data.barcode2,
                                                        barcode3: data.barcode3,
                                                        barcode4: data.barcode4,
                                                        barcode5: data.barcode5,
                                                        alertOut: parseInt(data.alertOut),
                                                        amountInstore: 0,
                                                        isInstore: true,
                                                        isTaxEnabled: props.tax,
                                                    })
                                                        .then(function (result) {
                                                        // console.log(result);
                                                    })
                                                        .catch(function (err) {
                                                        // console.log(err);
                                                    });
                                                });
                                                sendCallback({
                                                    isSet: true,
                                                    productKey: productKey,
                                                    type: "add",
                                                });
                                            }
                                            else {
                                                sendCallback({
                                                    isSet: true,
                                                    productKey: productKey,
                                                    type: "add",
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        alert("This Product already exist");
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                        });
                    }
                    else {
                        exports.GetData({ table: "products", id: "ItemName", value: props.name }, dbhook, function (callback) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (callback.data.length === 0) {
                                    dbhook("products")
                                        .insert({
                                        productKey: uuidv1(),
                                        group: props.group.id,
                                        category: recipe,
                                        ItemName: props.name,
                                        barcode1: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode1,
                                        barcode2: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode2,
                                        barcode3: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode3,
                                        barcode4: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode4,
                                        barcode5: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode5,
                                        branches: props.branch,
                                        supplier: props.ProductSupplier.supplierKey
                                            ? props.ProductSupplier.supplierKey
                                            : "",
                                        ingredient: props.ingredient,
                                        sallingprice: isMulity ? 0 : props.portion[0].price,
                                        initalPrice: isMulity ? 0 : props.portion[0].price,
                                        buyingPrice: props.buyingPrice,
                                        qnt: 1,
                                        multiplier: 0,
                                        alertOut: isMulity ? 0 : props.portion[0].alertOut,
                                        amountInstore: props.productQt,
                                        sync: false,
                                        expiryDate: props.expiryDate !== "" ? props.expiryDate : "not set",
                                        isExpired: false,
                                        isMaster: props.MasterState,
                                        isInstore: true,
                                        isTaxEnabled: props.tax,
                                        // isTaxEnabled: Tabcallback.data[0].isTaxEnabled,
                                        isMulity: isMulity,
                                    })
                                        .then(function () {
                                        var data = {
                                            type: "new",
                                            productName: props.name,
                                            group: props.group.id,
                                            sellingPrice: props.portion[0].price,
                                            sellingPriceOld: props.portion[0].price,
                                            buyingPrice: props.buyingPrice,
                                            buyingPriceOld: props.buyingPrice,
                                            supplier: props.ProductSupplier.supplierKey
                                                ? props.ProductSupplier.supplierKey
                                                : "",
                                            quantity: props.productQt,
                                            invoiceNumber: props.invoice,
                                            EventDate: moment().format("MM/DD/YYYY"),
                                            dateRange: parseInt(DateNumInput),
                                            time: moment().format("LT"),
                                        };
                                        Purchases_1.Purchases(dbhook, data, function (callback) { });
                                        if (isMulity) {
                                            props.portion.map(function (data) {
                                                dbhook("mulitProducts")
                                                    .insert({
                                                    id: uuidv1(),
                                                    productName: props.name,
                                                    sallingprice: parseInt(data.price),
                                                    initalPrice: parseInt(data.price),
                                                    qnt: 1,
                                                    barcode1: data.barcode1,
                                                    barcode2: data.barcode2,
                                                    barcode3: data.barcode3,
                                                    barcode4: data.barcode4,
                                                    barcode5: data.barcode5,
                                                    alertOut: parseInt(data.alertOut),
                                                    amountInstore: 0,
                                                    isInstore: true,
                                                    isTaxEnabled: props.tax,
                                                })
                                                    .then(function (result) { })
                                                    .catch(function (err) { });
                                            });
                                            sendCallback({
                                                isSet: true,
                                                productKey: productKey,
                                                type: "add",
                                            });
                                        }
                                        else {
                                            sendCallback({
                                                isSet: true,
                                                productKey: productKey,
                                                type: "add",
                                            });
                                        }
                                    });
                                }
                                else {
                                    // alert("This Product already exist");
                                }
                                return [2 /*return*/];
                            });
                        }); });
                    }
                });
                break;
            case "addToWareHouse":
                recipe = props.recipe === "" ? props.group.group : props.recipe;
                productKey = CreateId();
                if (props.portion.length !== 1)
                    isMulity = true;
                exports.GetData({ table: "Tabs", id: "tabname", value: props.group.group }, dbhook, function (Tabcallback) {
                    // console.log(Tabcallback.data[0].isTaxEnabled);
                    if (Tabcallback.data.length === 0) {
                        dbhook("Tabs")
                            .insert({
                            id: uuidv1(),
                            tabname: props.group.group,
                            branch: props.branch,
                            background: props.group.colors.backgroundColor,
                            color: props.group.colors.textColor,
                            buttonType: "default",
                            isInstore: true,
                            isTaxEnabled: props.tax,
                        })
                            .then(function () {
                            var _this = this;
                            exports.GetData({ table: "warehouse", id: "ItemName", value: props.name }, dbhook, function (callback) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (callback.data.length === 0) {
                                        dbhook("warehouse")
                                            .insert({
                                            productKey: uuidv1(),
                                            group: props.group.id,
                                            category: recipe,
                                            ItemName: props.name,
                                            barcode1: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode1,
                                            barcode2: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode2,
                                            barcode3: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode3,
                                            barcode4: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode4,
                                            barcode5: props.portion.length !== 1
                                                ? ""
                                                : props.portion[0].barcode5,
                                            branches: props.branche,
                                            supplier: props.ProductSupplier.supplierKey,
                                            sallingprice: isMulity ? 0 : props.portion[0].price,
                                            initalPrice: isMulity ? 0 : props.portion[0].price,
                                            buyingPrice: props.buyingPrice,
                                            qnt: 1,
                                            multiplier: 0,
                                            alertOut: isMulity ? 0 : props.portion[0].alertOut,
                                            amountInstore: props.productQt,
                                            sync: false,
                                            expiryDate: props.expiryDate !== ""
                                                ? props.expiryDate
                                                : "not set",
                                            isExpired: false,
                                            isMaster: props.MasterState,
                                            isInstore: true,
                                            isTaxEnabled: props.tax,
                                            isMulity: isMulity,
                                        })
                                            .then(function () {
                                            var data = {
                                                type: "new",
                                                productName: props.name,
                                                group: props.group.id,
                                                sellingPrice: props.portion[0].price,
                                                sellingPriceOld: props.portion[0].price,
                                                buyingPrice: props.buyingPrice,
                                                buyingPriceOld: props.buyingPrice,
                                                supplier: props.ProductSupplier.supplierKey,
                                                quantity: props.productQt,
                                                invoiceNumber: props.invoice,
                                                EventDate: moment().format("MM/DD/YYYY"),
                                                dateRange: parseInt(DateNumInput),
                                                time: moment().format("LT"),
                                            };
                                            Purchases_1.Purchases(dbhook, data, function (callback) { });
                                            if (isMulity) {
                                                props.portion.map(function (data) {
                                                    dbhook("mulitProducts")
                                                        .insert({
                                                        id: uuidv1(),
                                                        productName: props.name,
                                                        sallingprice: parseInt(data.price),
                                                        initalPrice: parseInt(data.price),
                                                        qnt: 1,
                                                        barcode1: data.barcode1,
                                                        barcode2: data.barcode2,
                                                        barcode3: data.barcode3,
                                                        barcode4: data.barcode4,
                                                        barcode5: data.barcode5,
                                                        alertOut: parseInt(data.alertOut),
                                                        amountInstore: 0,
                                                        isInstore: true,
                                                        isTaxEnabled: props.tax,
                                                    })
                                                        .then(function (result) {
                                                        // console.log(result);
                                                    })
                                                        .catch(function (err) {
                                                        // console.log(err);
                                                    });
                                                });
                                                sendCallback({
                                                    isSet: true,
                                                    productKey: productKey,
                                                    type: "add",
                                                });
                                            }
                                            else {
                                                sendCallback({
                                                    isSet: true,
                                                    productKey: productKey,
                                                    type: "add",
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        alert("This Product already exist");
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                        });
                    }
                    else {
                        exports.GetData({ table: "warehouse", id: "ItemName", value: props.name }, dbhook, function (callback) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (callback.data.length === 0) {
                                    dbhook("warehouse")
                                        .insert({
                                        productKey: uuidv1(),
                                        group: props.group.id,
                                        category: recipe,
                                        ItemName: props.name,
                                        barcode1: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode1,
                                        barcode2: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode2,
                                        barcode3: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode3,
                                        barcode4: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode4,
                                        barcode5: props.portion.length !== 1
                                            ? ""
                                            : props.portion[0].barcode5,
                                        branches: props.branch,
                                        supplier: props.ProductSupplier.supplierKey,
                                        sallingprice: isMulity ? 0 : props.portion[0].price,
                                        initalPrice: isMulity ? 0 : props.portion[0].price,
                                        buyingPrice: props.buyingPrice,
                                        qnt: 1,
                                        multiplier: 0,
                                        alertOut: isMulity ? 0 : props.portion[0].alertOut,
                                        amountInstore: props.productQt,
                                        sync: false,
                                        expiryDate: props.expiryDate !== "" ? props.expiryDate : "not set",
                                        isExpired: false,
                                        isMaster: props.MasterState,
                                        isInstore: true,
                                        isTaxEnabled: props.tax,
                                        // isTaxEnabled: Tabcallback.data[0].isTaxEnabled,
                                        isMulity: isMulity,
                                    })
                                        .then(function () {
                                        var data = {
                                            type: "new",
                                            productName: props.name,
                                            group: props.group.id,
                                            sellingPrice: props.portion[0].price,
                                            sellingPriceOld: props.portion[0].price,
                                            buyingPrice: props.buyingPrice,
                                            buyingPriceOld: props.buyingPrice,
                                            supplier: props.ProductSupplier.supplierKey,
                                            quantity: props.productQt,
                                            invoiceNumber: props.invoice,
                                            EventDate: moment().format("MM/DD/YYYY"),
                                            dateRange: parseInt(DateNumInput),
                                            time: moment().format("LT"),
                                        };
                                        Purchases_1.Purchases(dbhook, data, function (callback) { });
                                        if (isMulity) {
                                            props.portion.map(function (data) {
                                                dbhook("mulitProducts")
                                                    .insert({
                                                    id: uuidv1(),
                                                    productName: props.name,
                                                    sallingprice: parseInt(data.price),
                                                    initalPrice: parseInt(data.price),
                                                    qnt: 1,
                                                    barcode1: data.barcode1,
                                                    barcode2: data.barcode2,
                                                    barcode3: data.barcode3,
                                                    barcode4: data.barcode4,
                                                    barcode5: data.barcode5,
                                                    alertOut: parseInt(data.alertOut),
                                                    amountInstore: 0,
                                                    isInstore: true,
                                                    isTaxEnabled: props.tax,
                                                })
                                                    .then(function (result) { })
                                                    .catch(function (err) { });
                                            });
                                            sendCallback({
                                                isSet: true,
                                                productKey: productKey,
                                                type: "add",
                                            });
                                        }
                                        else {
                                            sendCallback({
                                                isSet: true,
                                                productKey: productKey,
                                                type: "add",
                                            });
                                        }
                                    });
                                }
                                else {
                                    // alert("This Product already exist");
                                }
                                return [2 /*return*/];
                            });
                        }); });
                    }
                });
                break;
            case "sync":
                dbhook("products")
                    .where({ ItemName: props.name })
                    .update({
                    sync: true,
                })
                    .then(function (data) {
                    sendCallback({ isSet: true });
                });
                break;
            case "addServerProducts":
                _a = props.AllProducts, alltabs = _a.alltabs, allproductsList = _a.allproductsList, allmulitList = _a.allmulitList, socketId = _a.socketId;
                if (SocketIds.length === 0) {
                    SocketIds.push(socketId);
                    alltabs.map(function (tab) {
                        exports.GetData({ table: "Tabs", id: "tabname", value: tab.tabname }, dbhook, function (callback) {
                            if (callback.data.length === 0) {
                                dbhook("Tabs")
                                    .insert({
                                    id: tab.id,
                                    tabname: tab.tabname,
                                    background: tab.background,
                                    color: tab.color,
                                    buttonType: "default",
                                    isInstore: tab.isInstore,
                                    isTaxEnabled: true,
                                })
                                    .then(function () { });
                            }
                        });
                    });
                    allproductsList.map(function (productsList) {
                        exports.GetData({
                            table: "products",
                            id: "ItemName",
                            value: productsList.ItemName,
                        }, dbhook, function (callback) {
                            if (callback.data.length === 0) {
                                dbhook("products")
                                    .insert({
                                    productKey: productsList.productKey,
                                    group: productsList.group,
                                    category: productsList.category,
                                    ItemName: productsList.ItemName,
                                    barcode1: productsList.barcode1,
                                    barcode2: productsList.barcode2,
                                    barcode3: productsList.barcode3,
                                    barcode4: productsList.barcode4,
                                    barcode5: productsList.barcode5,
                                    sallingprice: productsList.sallingprice,
                                    initalPrice: productsList.initalPrice,
                                    qnt: productsList.qnt,
                                    multiplier: 0,
                                    alertOut: productsList.alertOut,
                                    amountInstore: productsList.amountInstore,
                                    sync: true,
                                    isInstore: false,
                                    isTaxEnabled: true,
                                    isMulity: productsList.isMulity,
                                })
                                    .then(function () { });
                            }
                        });
                    });
                    allmulitList.map(function (multiproductsList) {
                        exports.GetData({
                            table: "mulitProducts",
                            id: "productName",
                            value: multiproductsList.productName,
                        }, dbhook, function (callback) {
                            if (callback.data.length === 0) {
                                dbhook("mulitProducts")
                                    .insert({
                                    id: multiproductsList.id,
                                    productName: multiproductsList.productName,
                                    sallingprice: multiproductsList.sallingprice,
                                    initalPrice: multiproductsList.initalPrice,
                                    qnt: 1,
                                    barcode1: multiproductsList.barcode1,
                                    barcode2: multiproductsList.barcode2,
                                    barcode3: multiproductsList.barcode3,
                                    barcode4: multiproductsList.barcode4,
                                    barcode5: multiproductsList.barcode5,
                                    alertOut: multiproductsList.alertOut,
                                    amountInstore: multiproductsList.amountInstore,
                                    isInstore: false,
                                    isTaxEnabled: true,
                                })
                                    .then(function (result) {
                                    // console.log(result);
                                });
                            }
                        });
                    });
                }
                sendCallback({ isSet: true });
                break;
            case "barcodeScen":
                dbhook
                    .select()
                    .from("products")
                    .where("barcode1", props.value)
                    .orWhere("barcode2", props.value)
                    .orWhere("barcode3", props.value)
                    .orWhere("barcode4", props.value)
                    .orWhere("barcode5", props.value)
                    .then(function (data) {
                    if (data.length !== 0) {
                        // console.log(data);
                        if (data[0].isExpired) {
                            sendCallback({
                                from: "main_expired",
                                data: [],
                            });
                        }
                        else
                            sendCallback({
                                from: "main",
                                data: data,
                            });
                    }
                    else {
                        dbhook
                            .select()
                            .from("mulitProducts")
                            .where("barcode1", props.value)
                            .orWhere("barcode2", props.value)
                            .orWhere("barcode3", props.value)
                            .orWhere("barcode4", props.value)
                            .orWhere("barcode5", props.value)
                            .then(function (data) {
                            sendCallback({
                                from: "mulit",
                                data: data,
                            });
                        });
                    }
                });
                break;
            case "invReduction":
                // console.log(props);
                if (props.isExpired)
                    dbhook("products")
                        .where({ productKey: props.items.productKey })
                        .update({
                        amountInstore: 0,
                        isExpired: true,
                        isInstore: false,
                    })
                        .then(function (data) { });
                else
                    dbhook("products")
                        .where({ productKey: props.items.productKey })
                        .update({
                        amountInstore: props.items.amountInstore - parseInt(props.items.damaged),
                    })
                        .then(function (data) { });
                // GetData(
                //   {
                //     table: "products",
                //     id: "productKey",
                //     value: props.damaged,
                //   },
                //   dbhook,
                //   (callback) => {
                //     if (callback.data.length !== 0)
                //       dbhook("products")
                //         .where({ ItemName: props.data.selectedItem.ItemName })
                //         .update({
                //           amountInstore:
                //             callback.data[0].amountInstore - parseInt(props.data.value),
                //         })
                //         .then(function (data) {
                //         });
                //   }
                // );
                sendCallback({
                    isSet: true,
                });
                break;
            case "getPOSList":
                newArr4_1 = [];
                newArr5_1 = [];
                newArr6_1 = [];
                switch (props.layoutType) {
                    case "tabs":
                        dbhook
                            .select()
                            .from("Tabs")
                            .where({ branch: props.branch })
                            .then(function (data) {
                            var resultData = data.map(function (list) {
                                if (!list.isExpired)
                                    newArr5_1.push(list);
                                return newArr5_1;
                            });
                            sendCallback({
                                data: resultData,
                            });
                        });
                        break;
                    case "TabList":
                        dbhook
                            .select()
                            .from("TabList")
                            .where({ groupId: props.groupId })
                            .then(function (data) {
                            var resultData = data.map(function (list) {
                                if (!list.isExpired)
                                    newArr6_1.push(list);
                                return newArr6_1;
                            });
                            sendCallback({
                                data: resultData,
                            });
                        });
                        break;
                    case "ProductsList":
                        // console.log(props);
                        dbhook
                            .select()
                            .from("products")
                            .where({ category: props.category })
                            .then(function (data) {
                            var resultData = data.map(function (list) {
                                if (!list.isExpired)
                                    newArr4_1.push(list);
                                return newArr4_1;
                            });
                            sendCallback({
                                data: resultData,
                            });
                        });
                        break;
                    case "warehouseList":
                        // console.log(props);
                        dbhook
                            .select()
                            .from("warehouse")
                            .leftJoin("branches", "warehouse.branches", "branches.brancheId")
                            .leftJoin("suppliers", "warehouse.supplier", "suppliers.supplierKey")
                            .leftJoin("group", "warehouse.group", "group.id")
                            .then(function (data) {
                            var resultData = data.map(function (list) {
                                if (!list.isExpired)
                                    newArr4_1.push(list);
                                return newArr4_1;
                            });
                            sendCallback({
                                data: resultData,
                            });
                        });
                        break;
                    case "searcheWarehouseList":
                        // console.log(props);
                        dbhook
                            .select()
                            .from("warehouse")
                            .where({ productKey: props.id.productKey })
                            .leftJoin("branches", "warehouse.branches", "branches.brancheId")
                            .leftJoin("suppliers", "warehouse.supplier", "suppliers.supplierKey")
                            .leftJoin("group", "warehouse.group", "group.id")
                            .then(function (data) {
                            var resultData = data.map(function (list) {
                                if (!list.isExpired)
                                    newArr4_1.push(list);
                                return newArr4_1;
                            });
                            sendCallback({
                                data: resultData,
                            });
                        });
                        break;
                    case "mulitList":
                        dbhook
                            .select()
                            .from("mulitProducts")
                            .where({ productName: props.name })
                            .then(function (data) {
                            sendCallback({
                                data: data,
                            });
                        });
                        break;
                    case "all_P":
                        tabs = [];
                        categorylist = [];
                        productsList = [];
                        mulitList = [];
                        dbhook
                            .select()
                            .from("Tabs")
                            .then(function (data) {
                            tabs = data;
                            dbhook
                                .select()
                                .from("TabList")
                                .then(function (data) {
                                categorylist = data;
                                dbhook
                                    .select()
                                    .from("products")
                                    .leftJoin("group", "products.group", "group.id")
                                    .then(function (data) {
                                    // productsList = data;
                                    data.map(function (list) {
                                        if (!list.isExpired) {
                                            productsList.push(list);
                                        }
                                    });
                                    dbhook
                                        .select()
                                        .from("mulitProducts")
                                        .then(function (data) {
                                        mulitList = data;
                                        sendCallback({
                                            tabs: tabs,
                                            categorylist: categorylist,
                                            productsList: productsList,
                                            mulitList: mulitList,
                                        });
                                    });
                                });
                            });
                        });
                        break;
                    case "getGrouped":
                        productsList = [];
                        dbhook
                            .from("products")
                            .leftJoin("branches", "products.branches", "branches.brancheId")
                            .leftJoin("suppliers", "products.supplier", "suppliers.supplierKey")
                            .leftJoin("group", "products.group", "group.id")
                            .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var proList, productResult;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        proList = data.map(function (mainlist) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                if (!mainlist.isExpired) {
                                                    // console.log(mainlist);
                                                    productsList.push(mainlist);
                                                }
                                                return [2 /*return*/, productsList];
                                            });
                                        }); });
                                        return [4 /*yield*/, Promise.all(proList)];
                                    case 1:
                                        productResult = _a.sent();
                                        sendCallback({
                                            productResult: productResult,
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        // dbhook
                        //   .select()
                        //   .from("Tabs")
                        //   .then(async function (data) {
                        //     tabs = data;
                        //     const proList = tabs.map(async (list) => {
                        //       GetData(
                        //         {
                        //           table: "products",
                        //           id: "group",
                        //           value: list.tabname,
                        //         },
                        //         dbhook,
                        //         (reciveCallback) => {
                        //           reciveCallback.data.map((mainlist) => {
                        //             if (!mainlist.isExpired) {
                        //               productsList.push(mainlist);
                        //             }
                        //           });
                        //         }
                        //       );
                        //       return productsList;
                        //     });
                        //     const productResult = await Promise.all(proList);
                        //     sendCallback({
                        //       productResult,
                        //     });
                        //   });
                        break;
                    case "all_purcheased":
                        newArr_1 = [];
                        newArr2_1 = [];
                        // console.log(props);
                        if (props.branch)
                            dbhook
                                .select()
                                .from("products")
                                // .where({ branches: props.branch })
                                // .andWhere({ branches: props.branch })
                                .then(function (data) {
                                // console.log(data);
                                var dataList = data.map(function (list) {
                                    if (!list.isExpired)
                                        newArr_1.push(list);
                                    return newArr_1;
                                });
                                sendCallback(dataList);
                            });
                        else if (props.branch)
                            dbhook
                                .select()
                                .from("products")
                                .where({ branches: props.branch })
                                // .andWhere({ branches: props.branch })
                                .then(function (data) {
                                var dataList = data.map(function (list) {
                                    if (!list.isExpired)
                                        newArr2_1.push(list);
                                    return newArr2_1;
                                });
                                sendCallback(dataList);
                            });
                        break;
                    case "searchedProduct":
                        newArr3_1 = [];
                        dbhook
                            .select()
                            .from("products")
                            .where({ productKey: props.id.productKey })
                            .leftJoin("group", "products.group", "group.id")
                            .then(function (data) {
                            // console.log(data);
                            var dataList = data.map(function (list) {
                                if (!list.isExpired)
                                    newArr3_1.push(list);
                                return newArr3_1;
                            });
                            sendCallback(dataList[0]);
                            // sendCallback(data);
                        });
                        break;
                    default:
                        break;
                }
                break;
            case "edit":
                if (props.portion.length === 1) {
                    console.log(props);
                    dbhook("products")
                        .where({ productKey: props.data.productKey })
                        .update({
                        ItemName: props.name,
                        barcode1: props.portion[0].barcode1,
                        barcode2: props.portion[0].barcode2,
                        barcode3: props.portion[0].barcode3,
                        barcode4: props.portion[0].barcode4,
                        barcode5: props.portion[0].barcode5,
                        sallingprice: props.portion[0].price,
                        initalPrice: props.portion[0].price,
                        alertOut: props.portion[0].alertOut,
                        supplier: props.ProductSupplier,
                        amountInstore: props.productQt,
                        buyingPrice: props.buyingPrice,
                        branches: props.branch,
                        category: props.group.group,
                        group: props.group.id,
                        isTaxEnabled: props.tax,
                    })
                        .then(function (data) {
                        return sendCallback({
                            isSet: true,
                            type: "update",
                            data: { type: "product_update" },
                        });
                    });
                }
                else {
                    dbhook("products")
                        .where({ productKey: props.data.productKey })
                        .update({
                        ItemName: props.name,
                    })
                        .then(function () {
                        dbhook
                            .select()
                            .from("mulitProducts")
                            .where({ productName: props.name })
                            .then(function (data) {
                            return __awaiter(this, void 0, void 0, function () {
                                var updater, updaterReturns;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(data.length === props.portion.length)) return [3 /*break*/, 2];
                                            updater = data.map(function (list) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    props.portion.map(function (dataprops) {
                                                        // console.log(dataprops);
                                                        if (dataprops.id === list.id)
                                                            dbhook("mulitProducts")
                                                                .where({ id: list.id })
                                                                .update({
                                                                productName: props.name,
                                                                barcode1: dataprops.barcode1,
                                                                barcode2: dataprops.barcode2,
                                                                barcode3: dataprops.barcode3,
                                                                barcode4: dataprops.barcode4,
                                                                barcode5: dataprops.barcode5,
                                                                sallingprice: dataprops.price,
                                                                initalPrice: dataprops.price,
                                                                alertOut: dataprops.alertOut,
                                                            })
                                                                .then(function () { });
                                                        return true;
                                                    });
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                            return [4 /*yield*/, Promise.all(updater)];
                                        case 1:
                                            updaterReturns = _a.sent();
                                            if (updaterReturns)
                                                return [2 /*return*/, sendCallback({
                                                        isSet: true,
                                                        type: "update",
                                                        data: { type: "product_update" },
                                                    })];
                                            return [3 /*break*/, 3];
                                        case 2:
                                            dbhook("mulitProducts")
                                                .where({ productName: props.name })
                                                .del()
                                                .then(function () {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var loopEnd, updater, updaterReturns;
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                loopEnd = 0;
                                                                updater = props.portion.map(function (dataprops) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        loopEnd++;
                                                                        dbhook("mulitProducts")
                                                                            .insert({
                                                                            id: uuidv1(),
                                                                            productName: props.name,
                                                                            sallingprice: dataprops.price,
                                                                            initalPrice: dataprops.price,
                                                                            qnt: 1,
                                                                            barcode1: dataprops.barcode1,
                                                                            barcode2: dataprops.barcode2,
                                                                            barcode3: dataprops.barcode3,
                                                                            barcode4: dataprops.barcode4,
                                                                            barcode5: dataprops.barcode5,
                                                                            alertOut: dataprops.alertOut,
                                                                            amountInstore: data[0].amountInstore,
                                                                            isInstore: data[0].isInstore,
                                                                            isTaxEnabled: data[0].isTaxEnabled,
                                                                        })
                                                                            .then(function (result) { });
                                                                        if (loopEnd === props.portion.length) {
                                                                            return [2 /*return*/, true];
                                                                        }
                                                                        return [2 /*return*/];
                                                                    });
                                                                }); });
                                                                return [4 /*yield*/, Promise.all(updater)];
                                                            case 1:
                                                                updaterReturns = _a.sent();
                                                                if (updaterReturns)
                                                                    return [2 /*return*/, sendCallback({
                                                                            isSet: true,
                                                                            type: "update",
                                                                            data: { type: "product_update" },
                                                                        })];
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                });
                                            });
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    });
                }
                break;
            case "WareHouseEdit":
                if (props.portion.length === 1) {
                    dbhook("warehouse")
                        .where({ productKey: props.data.productKey })
                        .update({
                        ItemName: props.name,
                        barcode1: props.portion[0].barcode1,
                        barcode2: props.portion[0].barcode2,
                        barcode3: props.portion[0].barcode3,
                        barcode4: props.portion[0].barcode4,
                        barcode5: props.portion[0].barcode5,
                        sallingprice: props.portion[0].price,
                        initalPrice: props.portion[0].price,
                        alertOut: props.portion[0].alertOut,
                        supplier: props.ProductSupplier,
                        amountInstore: props.productQt,
                        buyingPrice: props.buyingPrice,
                        branches: props.branch,
                        category: props.group,
                        isTaxEnabled: props.tax,
                    })
                        .then(function (data) {
                        return sendCallback({
                            isSet: true,
                            type: "update",
                            data: { type: "product_update" },
                        });
                    });
                }
                else {
                    dbhook("warehouse")
                        .where({ productKey: props.data.productKey })
                        .update({
                        ItemName: props.name,
                    })
                        .then(function () {
                        dbhook
                            .select()
                            .from("mulitProducts")
                            .where({ productName: props.name })
                            .then(function (data) {
                            return __awaiter(this, void 0, void 0, function () {
                                var updater, updaterReturns;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(data.length === props.portion.length)) return [3 /*break*/, 2];
                                            updater = data.map(function (list) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    props.portion.map(function (dataprops) {
                                                        // console.log(dataprops);
                                                        if (dataprops.id === list.id)
                                                            dbhook("mulitProducts")
                                                                .where({ id: list.id })
                                                                .update({
                                                                productName: props.name,
                                                                barcode1: dataprops.barcode1,
                                                                barcode2: dataprops.barcode2,
                                                                barcode3: dataprops.barcode3,
                                                                barcode4: dataprops.barcode4,
                                                                barcode5: dataprops.barcode5,
                                                                sallingprice: dataprops.price,
                                                                initalPrice: dataprops.price,
                                                                alertOut: dataprops.alertOut,
                                                            })
                                                                .then(function () { });
                                                        return true;
                                                    });
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                            return [4 /*yield*/, Promise.all(updater)];
                                        case 1:
                                            updaterReturns = _a.sent();
                                            if (updaterReturns)
                                                return [2 /*return*/, sendCallback({
                                                        isSet: true,
                                                        type: "update",
                                                        data: { type: "product_update" },
                                                    })];
                                            return [3 /*break*/, 3];
                                        case 2:
                                            dbhook("mulitProducts")
                                                .where({ productName: props.name })
                                                .del()
                                                .then(function () {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var loopEnd, updater, updaterReturns;
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                loopEnd = 0;
                                                                updater = props.portion.map(function (dataprops) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        loopEnd++;
                                                                        dbhook("mulitProducts")
                                                                            .insert({
                                                                            id: uuidv1(),
                                                                            productName: props.name,
                                                                            sallingprice: dataprops.price,
                                                                            initalPrice: dataprops.price,
                                                                            qnt: 1,
                                                                            barcode1: dataprops.barcode1,
                                                                            barcode2: dataprops.barcode2,
                                                                            barcode3: dataprops.barcode3,
                                                                            barcode4: dataprops.barcode4,
                                                                            barcode5: dataprops.barcode5,
                                                                            alertOut: dataprops.alertOut,
                                                                            amountInstore: data[0].amountInstore,
                                                                            isInstore: data[0].isInstore,
                                                                            isTaxEnabled: data[0].isTaxEnabled,
                                                                        })
                                                                            .then(function (result) { });
                                                                        if (loopEnd === props.portion.length) {
                                                                            return [2 /*return*/, true];
                                                                        }
                                                                        return [2 /*return*/];
                                                                    });
                                                                }); });
                                                                return [4 /*yield*/, Promise.all(updater)];
                                                            case 1:
                                                                updaterReturns = _a.sent();
                                                                if (updaterReturns)
                                                                    return [2 /*return*/, sendCallback({
                                                                            isSet: true,
                                                                            type: "update",
                                                                            data: { type: "product_update" },
                                                                        })];
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                });
                                            });
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    });
                }
                break;
            case "warehouseDelete":
                // console.log(props);
                dbhook("warehouse")
                    .where({ productKey: props.selected.productKey })
                    .del()
                    .then(function (data) {
                    return sendCallback({
                        isSet: true,
                        data: {
                            type: "delete",
                            recipe: props.selected.category,
                            group: props.selected.group,
                            productKey: props.selected.ItemName,
                        },
                    });
                });
                break;
            case "delete":
                // console.log(props);
                dbhook("products")
                    .where({ productKey: props.selected.productKey })
                    .del()
                    .then(function (data) {
                    if (props.serverdelete) {
                        // console.log("serverdelete");
                        if (store_1.default.getState().SocketConn.isConn)
                            store_1.default
                                .getState()
                                .SocketConn.socket.emit("DELETEPRODUCT", props);
                    }
                    return sendCallback({
                        isSet: true,
                        name: name,
                        data: {
                            type: "delete",
                            recipe: props.selected.category,
                            group: props.selected.group,
                            productKey: props.selected.ItemName,
                        },
                    });
                });
                break;
            case "warehouseListDelete":
                // console.log(props);
                props.selectedRows.map(function (list) {
                    dbhook("warehouse")
                        .where({ productKey: list.productKey })
                        .del()
                        .then(function (data) { });
                });
                sendCallback({});
                break;
            case "LoadWarehouseList":
                dbhook()
                    .select()
                    .from("ProductTransfers")
                    .whereBetween("dateRange", [props.startDate, props.endDate])
                    .leftJoin("users", "ProductTransfers.user", "users.id")
                    .leftJoin("branches", "ProductTransfers.branch", "branches.brancheId")
                    .then(function (data) {
                    sendCallback(data);
                });
                break;
            case "getWarehouseListById":
                Products = [];
                promises = props.selectedRows.map(function (list) {
                    return new Promise(function (resolve, reject) {
                        dbhook()
                            .select()
                            .from("warehouse")
                            .where({ productKey: list })
                            .then(function (data) {
                            Products.push(data[0]);
                            resolve(Products);
                            // return Products;
                        });
                    });
                });
                Promise.all(promises).then(function (data) {
                    sendCallback(data[0]);
                });
                // const productResult = await Promise.all(proList);
                // console.log(Products);
                break;
            case "PurchaseWarehouseListById":
                if (props.productsList)
                    props.productsList.map(function (list) {
                        var amount = list.amountInstore + parseInt(list.transfer);
                        dbhook("warehouse")
                            .where({ productKey: list.productKey })
                            .update({
                            amountInstore: amount,
                        })
                            .then(function (data) { });
                    });
                sendCallback({});
                break;
            case "TransferWarehouseListById":
                if (props.productsList)
                    props.productsList.map(function (list) {
                        if (list.transfer) {
                            var amount = list.amountInstore - parseInt(list.transfer);
                            dbhook("warehouse")
                                .where({ productKey: list.productKey })
                                .update({
                                amountInstore: amount,
                            })
                                .then(function (data) {
                                exports.GetData({
                                    table: "products",
                                    id: "ItemName",
                                    value: list.ItemName,
                                }, dbhook, function (reciveCallback) {
                                    if (reciveCallback.data.length === 0) {
                                        exports.GetData({
                                            table: "Tabs",
                                            id: "tabname",
                                            value: list.category,
                                        }, dbhook, function (reciveCallback2) {
                                            if (reciveCallback2.data.length === 0) {
                                                // console.log(reciveCallback2);
                                                dbhook("Tabs")
                                                    .insert({
                                                    id: reciveCallback2.id,
                                                    tabname: reciveCallback2.tabname,
                                                    branch: reciveCallback2.branch,
                                                    background: reciveCallback2.background,
                                                    color: reciveCallback2.color,
                                                    buttonType: "default",
                                                    isInstore: true,
                                                    isTaxEnabled: reciveCallback2.isTaxEnabled,
                                                })
                                                    .then(function () {
                                                    dbhook("products")
                                                        .insert({
                                                        productKey: list.productKey,
                                                        group: list.group,
                                                        category: list.category,
                                                        ItemName: list.ItemName,
                                                        barcode1: list.barcode1,
                                                        barcode2: list.barcode2,
                                                        barcode3: list.barcode3,
                                                        barcode4: list.barcode4,
                                                        barcode5: list.barcode5,
                                                        branches: list.branches,
                                                        supplier: list.supplier,
                                                        sallingprice: list.sallingprice,
                                                        initalPrice: list.initalPrice,
                                                        buyingPrice: list.buyingPrice,
                                                        qnt: list.qnt,
                                                        multiplier: list.multiplier,
                                                        alertOut: list.alertOut,
                                                        amountInstore: list.transfer,
                                                        sync: list.sync,
                                                        expiryDate: list.expiryDate,
                                                        isExpired: list.isExpired,
                                                        isMaster: list.isMaster,
                                                        isInstore: list.isInstore,
                                                        isTaxEnabled: list.isTaxEnabled,
                                                        isMulity: list.isMulity,
                                                    })
                                                        .then(function () {
                                                        if (list.isMulity)
                                                            dbhook("mulitProducts")
                                                                .insert({
                                                                id: uuidv1(),
                                                                productName: list.ItemName,
                                                                sallingprice: list.sallingprice,
                                                                initalPrice: list.sallingprice,
                                                                qnt: list.qnt,
                                                                barcode1: list.barcode1,
                                                                barcode2: list.barcode2,
                                                                barcode3: list.barcode3,
                                                                barcode4: list.barcode4,
                                                                barcode5: list.barcode5,
                                                                alertOut: list.alertOut,
                                                                amountInstore: list.transfer,
                                                                isInstore: list.isTaxEnabled,
                                                                isTaxEnabled: list.isMulity,
                                                            })
                                                                .then(function (result) {
                                                                // console.log(result);
                                                            })
                                                                .catch(function (err) {
                                                                // console.log(err);
                                                            });
                                                        dbhook("ProductTransfers")
                                                            .insert({
                                                            idKey: uuidv1(),
                                                            ItemName: list.ItemName,
                                                            transfered: parseInt(list.transfer),
                                                            date: moment().format("LLLL"),
                                                            time: moment().format("LT"),
                                                            user: list.user.userLogged.id,
                                                            branch: list.branches,
                                                            dateRange: parseInt(DateNumInput),
                                                        })
                                                            .then(function (result) {
                                                            // console.log(result);
                                                        });
                                                    });
                                                });
                                            }
                                            else {
                                                // console.log(reciveCallback2);
                                                dbhook("products")
                                                    .insert({
                                                    productKey: list.productKey,
                                                    group: list.group,
                                                    category: list.category,
                                                    ItemName: list.ItemName,
                                                    barcode1: list.barcode1,
                                                    barcode2: list.barcode2,
                                                    barcode3: list.barcode3,
                                                    barcode4: list.barcode4,
                                                    barcode5: list.barcode5,
                                                    branches: list.branches,
                                                    supplier: list.supplier,
                                                    sallingprice: list.sallingprice,
                                                    initalPrice: list.initalPrice,
                                                    buyingPrice: list.buyingPrice,
                                                    qnt: list.qnt,
                                                    multiplier: list.multiplier,
                                                    alertOut: list.alertOut,
                                                    amountInstore: list.transfer,
                                                    sync: list.sync,
                                                    expiryDate: list.expiryDate,
                                                    isExpired: list.isExpired,
                                                    isMaster: list.isMaster,
                                                    isInstore: list.isInstore,
                                                    isTaxEnabled: list.isTaxEnabled,
                                                    isMulity: list.isMulity,
                                                })
                                                    .then(function () {
                                                    if (list.isMulity)
                                                        dbhook("mulitProducts")
                                                            .insert({
                                                            id: uuidv1(),
                                                            productName: list.ItemName,
                                                            sallingprice: list.sallingprice,
                                                            initalPrice: list.sallingprice,
                                                            qnt: list.qnt,
                                                            barcode1: list.barcode1,
                                                            barcode2: list.barcode2,
                                                            barcode3: list.barcode3,
                                                            barcode4: list.barcode4,
                                                            barcode5: list.barcode5,
                                                            alertOut: list.alertOut,
                                                            amountInstore: list.transfer,
                                                            isInstore: list.isTaxEnabled,
                                                            isTaxEnabled: list.isMulity,
                                                        })
                                                            .then(function (result) {
                                                            // console.log(result);
                                                        });
                                                    dbhook("ProductTransfers")
                                                        .insert({
                                                        idKey: uuidv1(),
                                                        ItemName: list.ItemName,
                                                        transfered: parseInt(list.transfer),
                                                        date: moment().format("LLLL"),
                                                        time: moment().format("LT"),
                                                        user: list.user.userLogged.id,
                                                        branch: list.branches,
                                                        dateRange: parseInt(DateNumInput),
                                                    })
                                                        .then(function (result) {
                                                        // console.log(result);
                                                    });
                                                });
                                            }
                                        });
                                        // console.log(props);
                                    }
                                    else {
                                        var productAmount = reciveCallback.data[0].amountInstore +
                                            parseInt(list.transfer);
                                        dbhook("products")
                                            .where({ ItemName: list.ItemName })
                                            .update({
                                            amountInstore: productAmount,
                                        })
                                            .then(function (data) {
                                            dbhook("ProductTransfers")
                                                .insert({
                                                idKey: uuidv1(),
                                                ItemName: list.ItemName,
                                                transfered: parseInt(list.transfer),
                                                date: moment().format("LLLL"),
                                                time: moment().format("LT"),
                                                user: list.user.userLogged.id,
                                                branch: list.branches,
                                                dateRange: parseInt(DateNumInput),
                                            })
                                                .then(function (result) {
                                                // console.log(result);
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                sendCallback({});
                break;
            case "Add_filter":
                props.taxMapping.map(function (list) {
                    // console.log(list);
                    dbhook("Tabs")
                        .where({ tabname: list.tabname })
                        .update({
                        isTaxEnabled: false,
                    })
                        .then(function (data) {
                        dbhook("products")
                            .where({ group: list.tabname })
                            .update({
                            isTaxEnabled: false,
                        })
                            .then(function (data) {
                            exports.GetData({
                                table: "products",
                                id: "group",
                                value: list.tabname,
                            }, dbhook, function (reciveCallback) {
                                exports.GetData({
                                    table: "mulitProducts",
                                    id: "productName",
                                    value: reciveCallback.data[0].ItemName,
                                }, dbhook, function (reciveMultCallback) {
                                    // console.log(reciveMultCallback);
                                    reciveMultCallback.data.map(function (list) {
                                        dbhook("mulitProducts")
                                            .where({
                                            productName: list.productName,
                                        })
                                            .update({
                                            isTaxEnabled: false,
                                        })
                                            .then(function (data) { });
                                    });
                                });
                            });
                        });
                    });
                });
                sendCallback({
                    isSet: true,
                    type: "Add_filter",
                });
                break;
            case "remove_filter":
                props.TaxMappingOut.map(function (list) {
                    // console.log(list);
                    dbhook("Tabs")
                        .where({ tabname: list.tabname })
                        .update({
                        isTaxEnabled: true,
                    })
                        .then(function (data) {
                        dbhook("products")
                            .where({ group: list.tabname })
                            .update({
                            isTaxEnabled: true,
                        })
                            .then(function (data) {
                            exports.GetData({
                                table: "products",
                                id: "group",
                                value: list.tabname,
                            }, dbhook, function (reciveCallback) {
                                exports.GetData({
                                    table: "mulitProducts",
                                    id: "productName",
                                    value: reciveCallback.data[0].ItemName,
                                }, dbhook, function (reciveMultCallback) {
                                    // console.log(reciveMultCallback);
                                    reciveMultCallback.data.map(function (list) {
                                        dbhook("mulitProducts")
                                            .where({
                                            productName: list.productName,
                                        })
                                            .update({
                                            isTaxEnabled: true,
                                        })
                                            .then(function (data) { });
                                    });
                                });
                            });
                        });
                    });
                });
                sendCallback({
                    isSet: true,
                });
                break;
            case "add_to_store":
                // if (configureStore.getState().SocketConn.isConn) {
                //   configureStore
                //     .getState()
                //     .SocketConn.socket.emit("UPDATEIVENTORY", props);
                // }
                props.purchaseSelected.map(function (nodes) {
                    dbhook("products")
                        .where({ productKey: nodes.productKey })
                        .update({
                        amountInstore: nodes.quantity
                            ? nodes.amountInstore + nodes.quantity
                            : nodes.amountInstore,
                        sallingprice: nodes.sellingPriceNew,
                        initalPrice: nodes.sellingPriceNew,
                        buyingPrice: nodes.costPrice,
                        isInstore: true,
                    })
                        .then(function (data) {
                        dbhook("Tabs")
                            .where({ tabname: nodes.group })
                            .update({
                            isInstore: true,
                        })
                            .then(function (data) {
                            dbhook("mulitProducts")
                                .where({ productName: nodes.ItemName })
                                .update({
                                amountInstore: nodes.quantity
                                    ? nodes.amountInstore + nodes.quantity
                                    : nodes.amountInstore,
                                isInstore: true,
                            })
                                .then(function (data) { });
                        });
                        // dbhook
                        //   .select()
                        //   .from("openTables")
                        //   .then(list => {
                        // console.log(list)
                        // let data = []
                        // list.map(savedList => {
                        //   savedList.list.data.map(innerList => {
                        //     innerList.amountInstore = nodes.quantity ?
                        //       innerList.amountInstore + nodes.quantity : innerList.amountInstore
                        //     data.push(innerList)
                        //     dbhook('openTables')
                        //       .where({ name: savedList.name }) 
                        //       .update({
                        //         list: { data: data }
                        //       })
                        //       .then(()=>{
                        //       })
                        //   })
                        // })
                        // console.log(list)
                        // })
                    });
                });
                props.mulitSelected.map(function (list) {
                    dbhook("mulitProducts")
                        .where({ id: list.id })
                        .update({
                        amountInstore: list.quantity
                            ? list.amountInstore + list.quantity
                            : list.amountInstore + 1,
                        isInstore: true,
                    })
                        .then(function (data) { });
                });
                // console.log(props);
                // console.log(props.mulitSelected);
                sendCallback({
                    isSet: true,
                    type: "add_to_store",
                    data: {
                        name: props.purchaseSelected[0].ItemName,
                        number: props.purchaseSelected.length,
                    },
                });
                break;
            case "remove_from_store":
                // console.log(props);
                dbhook("products")
                    .where({ productKey: props.oldData.productKey })
                    .update({
                    amountInstore: 0,
                    isInstore: false,
                })
                    .then(function (data) {
                    var _this = this;
                    exports.GetData({ table: "products", id: "group", value: props.oldData.group }, dbhook, function (callback) { return __awaiter(_this, void 0, void 0, function () {
                        var state, isProductsInstore, results;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    state = false;
                                    isProductsInstore = callback.data.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (product.isInstore)
                                                state = true;
                                            return [2 /*return*/, state];
                                        });
                                    }); });
                                    return [4 /*yield*/, Promise.all(isProductsInstore)];
                                case 1:
                                    results = _a.sent();
                                    if (!results[0]) {
                                        dbhook("Tabs")
                                            .where({ tabname: props.oldData.group })
                                            .update({
                                            isInstore: false,
                                        })
                                            .then(function (data) { });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return sendCallback({
                        isSet: true,
                        name: name,
                        data: {
                            type: "removed from store",
                        },
                    });
                });
                break;
            case "reduce_store":
                num = 0;
                console.log(props.data);
                props.data.map(function (list) {
                    if (list.isMulity) {
                        num++;
                        exports.GetData({
                            table: "products",
                            id: "ItemName",
                            value: list.ItemName,
                        }, dbhook, function (callback) {
                            console.log(callback);
                            dbhook("products")
                                .where({ ItemName: list.ItemName })
                                .update({
                                amountInstore: callback.data[0].amountInstore - num,
                            })
                                .then(function (data) {
                                dbhook("mulitProducts")
                                    .where({ productName: list.ItemName })
                                    .update({
                                    amountInstore: callback.data[0].amountInstore - num,
                                })
                                    .then(function (data) { });
                            });
                        });
                    }
                    else {
                        dbhook("products")
                            .where({ productKey: list.productKey })
                            .then(function (productsList) {
                            dbhook("products")
                                .where({ productKey: list.productKey })
                                .update({
                                amountInstore: productsList[0].amountInstore - list.qnt
                            })
                                .then(function (data) {
                                dbhook
                                    .select()
                                    .from("products")
                                    .then(function (dataList) {
                                    dataList.map(function (productList) {
                                        dbhook
                                            .select()
                                            .from("balancesReports")
                                            .where({ DateRange: parseInt(DateNumInput) })
                                            .andWhere({ name: list.ItemName })
                                            .then(function (Data) {
                                            // console.log(Data);
                                            if (Data.length !== 0)
                                                dbhook("balancesReports")
                                                    .where({ DateRange: parseInt(DateNumInput) })
                                                    .andWhere({ name: list.ItemName })
                                                    .update({
                                                    CloseBalance: productList.amountInstore,
                                                    QuantitySold: Data[0].OpenBalance - productList.amountInstore,
                                                })
                                                    .then(function () { });
                                            else
                                                dbhook("balancesReports")
                                                    .where({ DateRange: parseInt(DateNumInput) })
                                                    .andWhere({ name: productList.ItemName })
                                                    .update({
                                                    CloseBalance: productList.amountInstore,
                                                })
                                                    .then(function () { });
                                        });
                                    });
                                });
                            });
                        });
                    }
                });
                break;
            case "tranfer":
                switch (props.state) {
                    case "send":
                        if (store_1.default.getState().SocketConn.isConn) {
                            store_1.default
                                .getState()
                                .SocketConn.socket.emit("SEND_TRANSTION", props);
                        }
                        break;
                    case "delivery":
                        exports.GetData({
                            table: "products",
                            id: "ItemName",
                            value: props.data.selected.ItemName,
                        }, dbhook, function (callback) {
                            dbhook("products")
                                .where({ ItemName: props.data.selected.ItemName })
                                .update({
                                amountInstore: callback.data[0].amountInstore - parseInt(props.value),
                            })
                                .then(function () {
                                var trans = {
                                    name: props.data.selected.ItemName,
                                    quantity: props.data.value,
                                    date: moment().format("LLLL"),
                                    time: moment().format("LT"),
                                    state: "sent",
                                    from: props.data.from,
                                    to: props.data.to,
                                };
                                dbhook("inventory_transfer")
                                    .insert(trans)
                                    .then(function () {
                                    if (store_1.default.getState().SocketConn.isConn) {
                                        store_1.default
                                            .getState()
                                            .SocketConn.socket.emit("INVENTORY_TRANSFER", trans);
                                    }
                                    sendCallback({
                                        name: props.data.selected.ItemName,
                                        isSet: true,
                                    });
                                });
                            });
                        });
                        break;
                    case "recived":
                        // console.log(props);
                        exports.GetData({ table: "Tabs", id: "tabname", value: props.data.selected.group }, dbhook, function (callback) {
                            if (callback.data.length === 0) {
                                dbhook("Tabs")
                                    .insert({
                                    id: uuidv1(),
                                    tabname: props.data.selected.group,
                                    background: "#3b3b3b",
                                    color: "#fff",
                                    buttonType: "default",
                                    isInstore: true,
                                    isTaxEnabled: true,
                                })
                                    .then(function (result) {
                                    dbhook("products")
                                        .insert({
                                        productKey: props.data.selected.productKey,
                                        group: props.data.selected.group,
                                        category: props.data.selected.category,
                                        ItemName: props.data.selected.ItemName,
                                        barcode1: props.data.selected.barcode1,
                                        barcode2: props.data.selected.barcode2,
                                        barcode3: props.data.selected.barcode3,
                                        barcode4: props.data.selected.barcode4,
                                        barcode5: props.data.selected.barcode5,
                                        sallingprice: props.data.selected.sallingprice,
                                        initalPrice: props.data.selected.initalPrice,
                                        qnt: props.data.selected.qnt,
                                        multiplier: 0,
                                        alertOut: props.data.selected.alertOut,
                                        amountInstore: parseInt(props.data.value),
                                        sync: props.data.selected.sync,
                                        isInstore: true,
                                        isTaxEnabled: props.data.selected.isTaxEnabled,
                                        isMulity: props.data.selected.isMulity,
                                    })
                                        .then(function () {
                                        if (props.data.selected.isMulity) {
                                            props.data.data.multi.data.map(function (data) {
                                                dbhook("mulitProducts")
                                                    .insert({
                                                    id: data.id,
                                                    productName: data.productName,
                                                    sallingprice: data.sallingprice,
                                                    initalPrice: data.initalPrice,
                                                    qnt: data.qnt,
                                                    barcode1: data.barcode1,
                                                    barcode2: data.barcode2,
                                                    barcode3: data.barcode3,
                                                    barcode4: data.barcode4,
                                                    barcode5: data.barcode5,
                                                    alertOut: data.alertOut,
                                                    amountInstore: parseInt(props.data.value),
                                                    isInstore: true,
                                                })
                                                    .then(function (result) {
                                                    dbhook("inventory_transfer")
                                                        .insert({
                                                        name: props.data.selected.ItemName,
                                                        quantity: props.data.value,
                                                        date: moment().format("LLLL"),
                                                        time: moment().format("LT"),
                                                        state: "recived",
                                                        from: props.data.from,
                                                        to: props.data.to,
                                                    })
                                                        .then(function () {
                                                        sendCallback({
                                                            isSet: true,
                                                        });
                                                    });
                                                });
                                            });
                                        }
                                        else {
                                            dbhook("inventory_transfer")
                                                .insert({
                                                name: props.data.selected.ItemName,
                                                quantity: props.data.value,
                                                date: moment().format("LLLL"),
                                                time: moment().format("LT"),
                                                state: "recived",
                                                from: props.data.from,
                                                to: props.data.to,
                                            })
                                                .then(function () {
                                                sendCallback({
                                                    isSet: true,
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                            else {
                                dbhook("Tabs")
                                    .where({ tabname: props.data.selected.group })
                                    .update({
                                    isInstore: true,
                                })
                                    .then(function (data) { });
                                exports.GetData({
                                    table: "products",
                                    id: "ItemName",
                                    value: props.data.selected.ItemName,
                                }, dbhook, function (callback) {
                                    // console.log(callback);
                                    if (callback.data.length !== 0) {
                                        dbhook("products")
                                            .where({ ItemName: props.data.selected.ItemName })
                                            .update({
                                            amountInstore: callback.data[0].amountInstore +
                                                parseInt(props.data.value),
                                            sync: true,
                                            isInstore: true,
                                        })
                                            .then(function () {
                                            dbhook("inventory_transfer")
                                                .insert({
                                                name: props.data.selected.ItemName,
                                                quantity: props.data.value,
                                                date: moment().format("LLLL"),
                                                time: moment().format("LT"),
                                                state: "recived",
                                                from: props.data.from,
                                                to: props.data.to,
                                            })
                                                .then(function () {
                                                sendCallback({
                                                    isSet: true,
                                                });
                                            });
                                        });
                                    }
                                    else {
                                        dbhook("products")
                                            .insert({
                                            productKey: props.data.selected.productKey,
                                            group: props.data.selected.group,
                                            category: props.data.selected.category,
                                            ItemName: props.data.selected.ItemName,
                                            barcode1: props.data.selected.barcode1,
                                            barcode2: props.data.selected.barcode2,
                                            barcode3: props.data.selected.barcode3,
                                            barcode4: props.data.selected.barcode4,
                                            barcode5: props.data.selected.barcode5,
                                            sallingprice: props.data.selected.sallingprice,
                                            initalPrice: props.data.selected.initalPrice,
                                            qnt: props.data.selected.qnt,
                                            multiplier: 0,
                                            alertOut: props.data.selected.alertOut,
                                            amountInstore: parseInt(props.data.value),
                                            sync: props.data.selected.sync,
                                            isInstore: true,
                                            isTaxEnabled: props.data.selected.isTaxEnabled,
                                            isMulity: props.data.selected.isMulity,
                                        })
                                            .then(function () {
                                            if (props.data.selected.isMulity) {
                                                props.data.data.multi.data.map(function (data) {
                                                    dbhook("mulitProducts")
                                                        .insert({
                                                        id: data.id,
                                                        productName: data.productName,
                                                        sallingprice: data.sallingprice,
                                                        initalPrice: data.initalPrice,
                                                        qnt: data.qnt,
                                                        barcode1: data.barcode1,
                                                        barcode2: data.barcode2,
                                                        barcode3: data.barcode3,
                                                        barcode4: data.barcode4,
                                                        barcode5: data.barcode5,
                                                        alertOut: data.alertOut,
                                                        amountInstore: parseInt(props.data.value),
                                                        isInstore: true,
                                                    })
                                                        .then(function (result) {
                                                        dbhook("inventory_transfer")
                                                            .insert({
                                                            name: props.data.selected.ItemName,
                                                            quantity: props.data.value,
                                                            date: moment().format("LLLL"),
                                                            time: moment().format("LT"),
                                                            state: "recived",
                                                            from: props.data.from,
                                                            to: props.data.to,
                                                        })
                                                            .then(function () {
                                                            sendCallback({
                                                                isSet: true,
                                                            });
                                                        });
                                                    });
                                                    "";
                                                });
                                            }
                                            else {
                                                dbhook("inventory_transfer")
                                                    .insert({
                                                    name: props.data.selected.ItemName,
                                                    quantity: props.data.value,
                                                    date: moment().format("LLLL"),
                                                    time: moment().format("LT"),
                                                    state: "recived",
                                                    from: props.data.from,
                                                    to: props.data.to,
                                                })
                                                    .then(function () {
                                                    sendCallback({
                                                        isSet: true,
                                                    });
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                        break;
                }
                break;
            case "backUp":
                // console.log(props);
                props.data.tabs.map(function (tablist) {
                    exports.GetData({
                        table: "Tabs",
                        id: "tabname",
                        value: tablist.tabname,
                    }, dbhook, function (callback) {
                        if (callback.data.length === 0) {
                            dbhook("Tabs")
                                .insert({
                                id: tablist.id,
                                tabname: tablist.tabname,
                                background: tablist.background,
                                color: tablist.color,
                                buttonType: tablist.buttonType,
                                isInstore: tablist.isInstore,
                                isTaxEnabled: tablist.isTaxEnabled,
                            })
                                .then(function (result) { });
                        }
                    });
                });
                props.data.productsList.map(function (productslist) {
                    exports.GetData({
                        table: "products",
                        id: "ItemName",
                        value: productslist.ItemName,
                    }, dbhook, function (callback) {
                        if (callback.data.length === 0) {
                            dbhook("products")
                                .insert({
                                productKey: productslist.productKey,
                                group: productslist.group,
                                category: productslist.category,
                                ItemName: productslist.ItemName,
                                barcode1: productslist.barcode1,
                                barcode2: productslist.barcode2,
                                barcode3: productslist.barcode3,
                                barcode4: productslist.barcode4,
                                barcode5: productslist.barcode5,
                                sallingprice: productslist.sallingprice,
                                initalPrice: productslist.initalPrice,
                                qnt: productslist.qnt,
                                multiplier: 0,
                                alertOut: productslist.alertOut,
                                amountInstore: productslist.amountInstore,
                                sync: true,
                                isInstore: productslist.isInstore,
                                isTaxEnabled: productslist.isTaxEnabled,
                                isMulity: productslist.isMulity,
                            })
                                .then(function (result) {
                                if (productslist.isMulity) {
                                    props.data.mulitList.map(function (multlist) {
                                        dbhook("mulitProducts")
                                            .insert({
                                            id: multlist.id,
                                            productName: multlist.productName,
                                            sallingprice: multlist.sallingprice,
                                            initalPrice: multlist.initalPrice,
                                            qnt: multlist.qnt,
                                            barcode1: multlist.barcode1,
                                            barcode2: multlist.barcode2,
                                            barcode3: multlist.barcode3,
                                            barcode4: multlist.barcode4,
                                            barcode5: multlist.barcode5,
                                            alertOut: multlist.alertOut,
                                            amountInstore: multlist.amountInstore,
                                            isInstore: multlist.isInstore,
                                        })
                                            .then(function (result) {
                                            sendCallback({
                                                isSet: true,
                                            });
                                        });
                                    });
                                }
                                else {
                                    sendCallback({
                                        isSet: true,
                                    });
                                }
                            });
                        }
                    });
                });
                break;
            case "stockReturn":
                dataBase_1.default.HandelReports({ invoiceNumber: props, _type: "cancel_ticket" }, function (reciveCallback) {
                    var num = parseInt(props.amount);
                    dbhook("products")
                        .where({ productKey: props.selectedItem.productKey })
                        .update({
                        amountInstore: props.selectedItem.amountInstore + num,
                    })
                        .then(function () {
                        sendCallback(true);
                    });
                });
                break;
            case "setRecipe":
                exports.GetData({
                    table: "ingredients",
                    id: "recipeName",
                    value: props.name,
                }, dbhook, function (callback) {
                    if (callback.data.length === 0)
                        dbhook("ingredients")
                            .insert({
                            idKey: uuidv1(),
                            recipeName: props.name,
                            ingredients: props.List,
                        })
                            .then(function () {
                            sendCallback(true);
                        });
                    else
                        dbhook("ingredients")
                            .where({ recipeName: props.name })
                            .update({
                            recipeName: props.name,
                            ingredients: props.List,
                        })
                            .then(function () {
                            sendCallback(true);
                        });
                });
                break;
            case "GetRecipe":
                dbhook
                    .select()
                    .from("ingredients")
                    .then(function (data) {
                    sendCallback(data);
                });
                break;
            case "DeleteRecipe":
                // console.log(props);
                dbhook("ingredients")
                    .where({ idKey: props.item.idKey })
                    .del()
                    .then(function (data) {
                    sendCallback(data);
                });
                break;
            case "setMaterials":
                MaterialPromises = props.List.data.map(function (list) {
                    return new Promise(function (resolve, reject) {
                        exports.GetData({
                            table: "materials",
                            id: "materialName",
                            value: list.name,
                        }, dbhook, function (callback) {
                            // console.log(callback.data);
                            var materialKey = uuidv1();
                            if (callback.data.length === 0)
                                dbhook("materials")
                                    .insert({
                                    idKey: materialKey,
                                    materialName: list.name,
                                    measuredBy: list.measuredBy.title,
                                    quantity: list.ogQty,
                                    DateEntered: moment().format("MM/DD/YYYY"),
                                })
                                    .then(function () {
                                    dbhook("materialsReport")
                                        .insert({
                                        idKey: materialKey,
                                        materialName: list.name,
                                        measuredBy: list.measuredBy.title,
                                        quantityStarted: list.ogQty,
                                        quantityOpening: list.ogQty,
                                        quantityClosing: list.ogQty,
                                        DateEntered: moment().format("MM/DD/YYYY"),
                                        DateEnded: "",
                                        DateUpdated: "",
                                        DateRange: parseInt(DateNumInput),
                                    })
                                        .then(function () {
                                        resolve(true);
                                    });
                                });
                            else {
                                dbhook("materials")
                                    .where({ idKey: callback.data[0].idKey })
                                    .update({
                                    quantity: callback.data[0].quantity + parseInt(list.ogQty),
                                })
                                    .then(function () {
                                    dbhook("materialsReport")
                                        .where({ idKey: callback.data[0].idKey })
                                        .update({
                                        quantityOpening: callback.data[0].quantity + parseInt(list.ogQty),
                                        DateUpdated: moment().format("MM/DD/YYYY"),
                                        DateRange: parseInt(DateNumInput),
                                    })
                                        .then(function () {
                                        resolve(true);
                                    });
                                });
                            }
                        });
                    });
                });
                Promise.all(MaterialPromises).then(function (data) {
                    sendCallback(data);
                });
                break;
            case "editMaterials":
                // console.log(props);
                dbhook("materials")
                    .where({ idKey: props.List.data[0].id })
                    .update({
                    materialName: props.List.data[0].name,
                    measuredBy: props.List.data[0].measuredBy,
                    quantity: props.List.data[0].ogQty,
                })
                    .then(function () {
                    sendCallback(true);
                });
                break;
            case "GetMaterials":
                dbhook
                    .select()
                    .from("materials")
                    .then(function (data) {
                    sendCallback(data);
                });
                break;
            case "DeleteMaterial":
                // console.log(props);
                dbhook("materials")
                    .where({ idKey: props.item.idKey })
                    .del()
                    .then(function (data) {
                    sendCallback(data);
                });
                break;
            case "setOpeningMaterials":
                // console.log(props);
                dbhook
                    .select()
                    .from("materials")
                    .then(function (data) {
                    data.map(function (list) {
                        dbhook("materialsReport")
                            .where({ idKey: list.idKey })
                            .update({
                            quantityOpening: list.quantity,
                        })
                            .then(function () { });
                    });
                });
                // resolve(true);
                break;
            case "getMaterialsReports":
                // console.log(props);
                dbhook
                    .select()
                    .from("materialsReport")
                    .whereBetween("DateRange", [props.startDate, props.endDate])
                    .then(function (data) {
                    sendCallback(data);
                });
                break;
            case "getBalancesReports":
                dbhook
                    .select()
                    .from("balancesReports")
                    .whereBetween("DateRange", [props.startDate, props.endDate])
                    .then(function (data) {
                    // console.log(data);
                    sendCallback(data);
                });
                break;
            case "setOpeningBalancesReports":
                // console.log(props);
                try {
                    dbhook
                        .select()
                        .from("products")
                        .then(function (Maindata) {
                        // console.log(Maindata);
                        if (Maindata.length !== 0)
                            dbhook
                                .select()
                                .from("balancesReports")
                                .where({ DateRange: parseInt(DateNumInput) })
                                .then(function (data) {
                                // console.log(data);
                                if (data.length === 0) {
                                    var balancesList = Maindata.map(function (list) {
                                        return new Promise(function (resolve, reject) {
                                            dbhook("balancesReports")
                                                .insert({
                                                idKey: uuidv1(),
                                                name: list.ItemName,
                                                date: moment().format("MM/DD/YYYY"),
                                                DateRange: parseInt(DateNumInput),
                                                OpenBalance: list.amountInstore,
                                                CloseBalance: 0,
                                                QuantitySold: 0,
                                            })
                                                .then(function (dataRe) {
                                                resolve(dataRe);
                                            });
                                        });
                                    });
                                    Promise.all(balancesList).then(function (data__) {
                                        sendCallback(data__);
                                    });
                                }
                                else {
                                    sendCallback(false);
                                }
                            });
                        else
                            sendCallback(true);
                    });
                }
                catch (error) {
                    sendCallback(false);
                }
                break;
            case "get_license_config":
                dbhook
                    .select()
                    .from("licenseKey")
                    .then(function (data) {
                    sendCallback(data);
                });
                break;
            case "validateLicense":
                dbhook
                    .select()
                    .from("department_config")
                    .then(function (data) {
                    if (data.length !== 0) {
                        var userInfo = {
                            company: data[0].dep_name,
                            city: data[0].city,
                            phone: data[0].phone,
                            year: year,
                        };
                        var licenseData = {
                            info: userInfo,
                            prodCode: "LEN100120",
                            appVersion: "1.5",
                            osType: "IOS8",
                        };
                        try {
                            var license_1 = licenseKey.validateLicense(licenseData, props.Licence);
                            if (license_1.message === "ok")
                                dbhook
                                    .select()
                                    .from("licenseKey")
                                    .then(function (licenseKeyData) {
                                    if (licenseKeyData.length === 0) {
                                        dbhook("licenseKey")
                                            .insert({
                                            licenseKey: props.Licence,
                                        })
                                            .then(function () {
                                            sendCallback(license_1);
                                        });
                                    }
                                    else {
                                        dbhook("licenseKey")
                                            .update({ licenseKey: props.Licence })
                                            .then(function () {
                                            sendCallback(license_1);
                                        });
                                    }
                                });
                            else
                                sendCallback(license_1);
                        }
                        catch (err) {
                            sendCallback(err);
                            console.log(err);
                        }
                    }
                    else {
                        sendCallback({ message: "ok" });
                    }
                });
                break;
            case "bulkUpload":
                bulkuploadPromises = props.data.map(function (list) {
                    return new Promise(function (resolve, reject) {
                        exports.GetData({
                            table: "products",
                            id: "ItemName",
                            value: list.Product,
                        }, dbhook, function (ProductCallback) {
                            if (ProductCallback.data.length === 0) {
                                exports.GetData({
                                    table: "Tabs",
                                    id: "tabname",
                                    value: list.Category,
                                }, dbhook, function (TabCallback) {
                                    if (TabCallback.data.length === 0) {
                                        dbhook("Tabs")
                                            .insert({
                                            id: uuidv1(),
                                            tabname: list.Category,
                                            branch: list.Branch,
                                            background: "#3b3b3b",
                                            color: "#fff",
                                            buttonType: "default",
                                            isInstore: true,
                                            isTaxEnabled: false,
                                        })
                                            .then(function () {
                                            exports.GetData({
                                                table: "group",
                                                id: "group",
                                                value: list.Category,
                                            }, dbhook, function (GroupCallback) {
                                                console.log(GroupCallback);
                                                dbhook("products")
                                                    .insert({
                                                    productKey: uuidv1(),
                                                    group: GroupCallback.data[0].id,
                                                    category: list.Category,
                                                    ItemName: list.Product,
                                                    barcode1: "",
                                                    barcode2: "",
                                                    barcode3: "",
                                                    barcode4: "",
                                                    barcode5: "",
                                                    branches: list.Branch,
                                                    supplier: list.Supplier,
                                                    ingredient: "",
                                                    sallingprice: list.Selling_Price,
                                                    initalPrice: list.Selling_Price,
                                                    buyingPrice: list.Buying_Price,
                                                    qnt: list.Quantity,
                                                    multiplier: 0,
                                                    alertOut: 1,
                                                    amountInstore: list.Quantity,
                                                    sync: false,
                                                    expiryDate: "not set",
                                                    isExpired: false,
                                                    isMaster: false,
                                                    isInstore: true,
                                                    isTaxEnabled: false,
                                                    isMulity: isMulity,
                                                })
                                                    .then(function () {
                                                    var data = {
                                                        type: "new",
                                                        productName: list.Product,
                                                        group: list.Category,
                                                        sellingPrice: list.Selling_Price,
                                                        sellingPriceOld: list.Selling_Price,
                                                        buyingPrice: list.Buying_Price,
                                                        buyingPriceOld: list.Buying_Price,
                                                        supplier: list.Supplier,
                                                        quantity: list.Quantity,
                                                        invoiceNumber: "",
                                                        EventDate: moment().format("MM/DD/YYYY"),
                                                        dateRange: parseInt(DateNumInput),
                                                        time: moment().format("LT"),
                                                    };
                                                    Purchases_1.Purchases(dbhook, data, function (callback) { });
                                                    resolve(true);
                                                });
                                            });
                                        });
                                    }
                                    else {
                                        exports.GetData({
                                            table: "group",
                                            id: "group",
                                            value: list.Category,
                                        }, dbhook, function (GroupCallback) {
                                            // console.log(list);
                                            dbhook("products")
                                                .insert({
                                                productKey: uuidv1(),
                                                group: GroupCallback.data[0].id,
                                                category: list.Category,
                                                ItemName: list.Product,
                                                barcode1: "",
                                                barcode2: "",
                                                barcode3: "",
                                                barcode4: "",
                                                barcode5: "",
                                                branches: list.Branch,
                                                supplier: list.Supplier,
                                                ingredient: "",
                                                sallingprice: list.Selling_Price,
                                                initalPrice: list.Selling_Price,
                                                buyingPrice: list.Buying_Price,
                                                qnt: 1,
                                                multiplier: 0,
                                                alertOut: 1,
                                                amountInstore: list.Quantity,
                                                sync: false,
                                                expiryDate: "not set",
                                                isExpired: false,
                                                isMaster: false,
                                                isInstore: true,
                                                isTaxEnabled: false,
                                                isMulity: isMulity,
                                            })
                                                .then(function () {
                                                var data = {
                                                    type: "new",
                                                    productName: list.Product,
                                                    group: list.Category,
                                                    sellingPrice: list.Selling_Price,
                                                    sellingPriceOld: list.Selling_Price,
                                                    buyingPrice: list.Buying_Price,
                                                    buyingPriceOld: list.Buying_Price,
                                                    supplier: list.Supplier,
                                                    quantity: list.Quantity,
                                                    invoiceNumber: "",
                                                    EventDate: moment().format("MM/DD/YYYY"),
                                                    dateRange: parseInt(DateNumInput),
                                                    time: moment().format("LT"),
                                                };
                                                Purchases_1.Purchases(dbhook, data, function (callback) { });
                                                resolve(true);
                                            });
                                        });
                                    }
                                });
                            }
                            else {
                                exports.GetData({
                                    table: "group",
                                    id: "group",
                                    value: list.Category,
                                }, dbhook, function (GroupCallback) {
                                    dbhook("products")
                                        .where({ ItemName: list.Product })
                                        .update({
                                        group: GroupCallback.data[0].id,
                                        category: list.Category,
                                        ItemName: list.Product,
                                        branches: list.Branch,
                                        supplier: list.Supplier,
                                        sallingprice: list.Selling_Price,
                                        initalPrice: list.Selling_Price,
                                        buyingPrice: list.Buying_Price,
                                        qnt: 1,
                                        amountInstore: parseInt(list.Quantity) +
                                            parseInt(ProductCallback.data[0].amountInstore),
                                    })
                                        .then(function () {
                                        resolve(true);
                                    });
                                });
                            }
                        });
                    });
                });
                Promise.all(bulkuploadPromises).then(function (data) {
                    sendCallback(data);
                });
                break;
            default:
                break;
        }
        return [2 /*return*/];
    });
}); };
//# sourceMappingURL=Products.js.map