// import { getDatafilePath } from "../../dataBase/store/path";
import appDb from "../../dataBase";
import configureStore from "../../store";
import { Purchases } from "../reports/Purchases";
import { SetGroups } from "../groups/group";

const licenseKey = require("license-key-gen");

const Alert = require("electron-alert");
const moment = require("moment");
const uuidv1 = require("uuid/v1");

let alert = new Alert();

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

const DateNumInput = `${year}${month}${date}`;

// let defaultPath = getDatafilePath;
// const ConfigPath = defaultPath + "/dataFiles/Products/config.json";
// const FolderPath = defaultPath + "/dataFiles/Products/";
var SocketIds = [];

function CreateId() {
  return uuidv1();
}

export const GetData = (props, hook, callback) => {
  // console.log(props);
  hook
    .select()
    .from(props.table)
    .where(props.id, props.value)
    .then(function (data) {
      callback({
        data,
      });
    });
};

const GetDataAll = (props, hook, callback) => {
  hook
    .select()
    .from(props.table)
    .then(function (data) {
      callback({
        data,
      });
    });
};

const AutoCreateCategory = (props, hook, callback) => { };

const InsertProduct = (props, hook, callback) => {
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

export const HandelNewProducts = async (props, dbhook, sendCallback) => {
  var isMulity = false;
  var multi = [];

  // console.log(props);

  switch (props._type) {
    case "set":
      var recipe = props.recipe === "" ? props.group.group : props.recipe;
      var productKey = CreateId();
      if (props.portion.length !== 1) isMulity = true;

      GetData(
        { table: "Tabs", id: "tabname", value: props.group.group },
        dbhook,
        (Tabcallback) => {
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
                GetData(
                  { table: "products", id: "ItemName", value: props.name },
                  dbhook,
                  async (callback) => {
                    if (callback.data.length === 0) {
                      dbhook("products")
                        .insert({
                          productKey: uuidv1(),
                          group: props.group.id,
                          category: recipe,
                          ItemName: props.name,
                          barcode1:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode1,
                          barcode2:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode2,
                          barcode3:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode3,
                          barcode4:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode4,
                          barcode5:
                            props.portion.length !== 1
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
                          expiryDate:
                            props.expiryDate !== ""
                              ? props.expiryDate
                              : "not set",
                          isExpired: false,
                          isMaster: props.MasterState,
                          isInstore: true,
                          isTaxEnabled: props.tax,
                          isMulity,
                        })
                        .then(function () {
                          const data = {
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
                          Purchases(dbhook, data, (callback) => { });

                          if (isMulity) {
                            props.portion.map((data) => {
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
                                .then((result) => {
                                  // console.log(result);
                                })
                                .catch((err) => {
                                  // console.log(err);
                                });
                            });

                            sendCallback({
                              isSet: true,
                              productKey,
                              type: "add",
                            });
                          } else {
                            sendCallback({
                              isSet: true,
                              productKey,
                              type: "add",
                            });
                          }
                        });
                    } else {
                      alert("This Product already exist");
                    }
                  }
                );
              });
          } else {
            GetData(
              { table: "products", id: "ItemName", value: props.name },
              dbhook,
              async (callback) => {
                if (callback.data.length === 0) {
                  dbhook("products")
                    .insert({
                      productKey: uuidv1(),
                      group: props.group.id,
                      category: recipe,
                      ItemName: props.name,
                      barcode1:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode1,
                      barcode2:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode2,
                      barcode3:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode3,
                      barcode4:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode4,
                      barcode5:
                        props.portion.length !== 1
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
                      expiryDate:
                        props.expiryDate !== "" ? props.expiryDate : "not set",
                      isExpired: false,
                      isMaster: props.MasterState,
                      isInstore: true,
                      isTaxEnabled: props.tax,
                      // isTaxEnabled: Tabcallback.data[0].isTaxEnabled,
                      isMulity,
                    })
                    .then(function () {
                      const data = {
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
                      Purchases(dbhook, data, (callback) => { });

                      if (isMulity) {
                        props.portion.map((data) => {
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
                            .then((result) => { })
                            .catch((err) => { });
                        });
                        sendCallback({
                          isSet: true,
                          productKey,
                          type: "add",
                        });
                      } else {
                        sendCallback({
                          isSet: true,
                          productKey,
                          type: "add",
                        });
                      }
                    });
                } else {
                  // alert("This Product already exist");
                }
              }
            );
          }
        }
      );

      break;

    case "addToWareHouse":
      // console.log(props);

      var recipe = props.recipe === "" ? props.group.group : props.recipe;
      var productKey = CreateId();
      if (props.portion.length !== 1) isMulity = true;

      GetData(
        { table: "Tabs", id: "tabname", value: props.group.group },
        dbhook,
        (Tabcallback) => {
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
                GetData(
                  { table: "warehouse", id: "ItemName", value: props.name },
                  dbhook,
                  async (callback) => {
                    if (callback.data.length === 0) {
                      dbhook("warehouse")
                        .insert({
                          productKey: uuidv1(),
                          group: props.group.id,
                          category: recipe,
                          ItemName: props.name,
                          barcode1:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode1,
                          barcode2:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode2,
                          barcode3:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode3,
                          barcode4:
                            props.portion.length !== 1
                              ? ""
                              : props.portion[0].barcode4,
                          barcode5:
                            props.portion.length !== 1
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
                          expiryDate:
                            props.expiryDate !== ""
                              ? props.expiryDate
                              : "not set",
                          isExpired: false,
                          isMaster: props.MasterState,
                          isInstore: true,
                          isTaxEnabled: props.tax,
                          isMulity,
                        })
                        .then(function () {
                          const data = {
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
                          Purchases(dbhook, data, (callback) => { });

                          if (isMulity) {
                            props.portion.map((data) => {
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
                                .then((result) => {
                                  // console.log(result);
                                })
                                .catch((err) => {
                                  // console.log(err);
                                });
                            });

                            sendCallback({
                              isSet: true,
                              productKey,
                              type: "add",
                            });
                          } else {
                            sendCallback({
                              isSet: true,
                              productKey,
                              type: "add",
                            });
                          }
                        });
                    } else {
                      alert("This Product already exist");
                    }
                  }
                );
              });
          } else {
            GetData(
              { table: "warehouse", id: "ItemName", value: props.name },
              dbhook,
              async (callback) => {
                if (callback.data.length === 0) {
                  dbhook("warehouse")
                    .insert({
                      productKey: uuidv1(),
                      group: props.group.id,
                      category: recipe,
                      ItemName: props.name,
                      barcode1:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode1,
                      barcode2:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode2,
                      barcode3:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode3,
                      barcode4:
                        props.portion.length !== 1
                          ? ""
                          : props.portion[0].barcode4,
                      barcode5:
                        props.portion.length !== 1
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
                      expiryDate:
                        props.expiryDate !== "" ? props.expiryDate : "not set",
                      isExpired: false,
                      isMaster: props.MasterState,
                      isInstore: true,
                      isTaxEnabled: props.tax,
                      // isTaxEnabled: Tabcallback.data[0].isTaxEnabled,
                      isMulity,
                    })
                    .then(function () {

                      const data = {
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

                      Purchases(dbhook, data, (callback) => { });

                      if (isMulity) {
                        props.portion.map((data) => {
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
                            .then((result) => { })
                            .catch((err) => { });
                        });
                        sendCallback({
                          isSet: true,
                          productKey,
                          type: "add",
                        });
                      } else {
                        sendCallback({
                          isSet: true,
                          productKey,
                          type: "add",
                        });
                      }
                    });
                } else {
                  // alert("This Product already exist");
                }
              }
            );
          }
        }
      );

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
      const {
        alltabs,
        allproductsList,
        allmulitList,
        socketId,
      } = props.AllProducts;
      if (SocketIds.length === 0) {
        SocketIds.push(socketId);

        alltabs.map((tab) => {
          GetData(
            { table: "Tabs", id: "tabname", value: tab.tabname },
            dbhook,
            (callback) => {
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
            }
          );
        });

        allproductsList.map((productsList) => {
          GetData(
            {
              table: "products",
              id: "ItemName",
              value: productsList.ItemName,
            },
            dbhook,
            (callback) => {
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
            }
          );
        });

        allmulitList.map((multiproductsList) => {
          GetData(
            {
              table: "mulitProducts",
              id: "productName",
              value: multiproductsList.productName,
            },
            dbhook,
            (callback) => {
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
                  .then((result) => {
                    // console.log(result);
                  });
              }
            }
          );
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
            } else
              sendCallback({
                from: "main",
                data,
              });
          } else {
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
                  data,
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
            amountInstore:
              props.items.amountInstore - parseInt(props.items.damaged),
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
      const newArr4 = [];
      const newArr5 = [];
      const newArr6 = [];

      switch (props.layoutType) {
        case "tabs":
          dbhook
            .select()
            .from("Tabs")
            .where({ branch: props.branch })
            .then(function (data) {
              const resultData = data.map((list) => {
                if (!list.isExpired) newArr5.push(list);
                return newArr5;
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
              const resultData = data.map((list) => {
                if (!list.isExpired) newArr6.push(list);
                return newArr6;
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
              const resultData = data.map((list) => {
                if (!list.isExpired) newArr4.push(list);
                return newArr4;
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
            .leftJoin(
              "suppliers",
              "warehouse.supplier",
              "suppliers.supplierKey"
            )
            .leftJoin("group", "warehouse.group", "group.id")
            .then(function (data) {
              const resultData = data.map((list) => {
                if (!list.isExpired) newArr4.push(list);
                return newArr4;
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
            .leftJoin(
              "suppliers",
              "warehouse.supplier",
              "suppliers.supplierKey"
            )
            .leftJoin("group", "warehouse.group", "group.id")
            .then(function (data) {
              const resultData = data.map((list) => {
                if (!list.isExpired) newArr4.push(list);
                return newArr4;
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
                data,
              });
            });
          break;
        case "all_P":
          var tabs = [];
          var categorylist = [];
          var productsList = [];
          var mulitList = [];

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
                      data.map((list) => {
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
                            tabs,
                            categorylist,
                            productsList,
                            mulitList,
                          });
                        });
                    });
                });
            });

          break;

        case "getGrouped":
          var productsList = [];

          dbhook
            .from("products")
            .leftJoin("branches", "products.branches", "branches.brancheId")
            .leftJoin("suppliers", "products.supplier", "suppliers.supplierKey")
            .leftJoin("group", "products.group", "group.id")
            .then(async (data) => {
              const proList = data.map(async (mainlist) => {
                if (!mainlist.isExpired) {
                  // console.log(mainlist);
                  productsList.push(mainlist);
                }

                return productsList;
              });

              const productResult = await Promise.all(proList);
              sendCallback({
                productResult,
              });
            });
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
          let newArr = [];
          let newArr2 = [];

          // console.log(props);

          if (props.branch)
            dbhook
              .select()
              .from("products")
              // .where({ branches: props.branch })
              // .andWhere({ branches: props.branch })
              .then(function (data) {
                // console.log(data);
                const dataList = data.map((list) => {
                  if (!list.isExpired) newArr.push(list);
                  return newArr;
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
                const dataList = data.map((list) => {
                  if (!list.isExpired) newArr2.push(list);
                  return newArr2;
                });
                sendCallback(dataList);
              });
          break;
        case "searchedProduct":
          let newArr3 = [];

          dbhook
            .select()
            .from("products")
            .where({ productKey: props.id.productKey })
            .leftJoin("group", "products.group", "group.id")
            .then(function (data) {
              // console.log(data);

              const dataList = data.map((list) => {
                if (!list.isExpired) newArr3.push(list);
                return newArr3;
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
      } else {
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
              .then(async function (data) {
                if (data.length === props.portion.length) {
                  const updater = data.map(async (list) => {
                    props.portion.map((dataprops) => {
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
                  });

                  const updaterReturns = await Promise.all(updater);
                  if (updaterReturns)
                    return sendCallback({
                      isSet: true,
                      type: "update",
                      data: { type: "product_update" },
                    });
                } else {
                  dbhook("mulitProducts")
                    .where({ productName: props.name })
                    .del()
                    .then(async function () {
                      var loopEnd = 0;

                      const updater = props.portion.map(async (dataprops) => {
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
                          .then((result) => { });

                        if (loopEnd === props.portion.length) {
                          return true;
                        }
                      });

                      const updaterReturns = await Promise.all(updater);
                      if (updaterReturns)
                        return sendCallback({
                          isSet: true,
                          type: "update",
                          data: { type: "product_update" },
                        });
                    });
                }

                // sendCallback({
                //   data,
                // });
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
      } else {
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
              .then(async function (data) {
                if (data.length === props.portion.length) {
                  const updater = data.map(async (list) => {
                    props.portion.map((dataprops) => {
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
                  });

                  const updaterReturns = await Promise.all(updater);
                  if (updaterReturns)
                    return sendCallback({
                      isSet: true,
                      type: "update",
                      data: { type: "product_update" },
                    });
                } else {
                  dbhook("mulitProducts")
                    .where({ productName: props.name })
                    .del()
                    .then(async function () {
                      var loopEnd = 0;

                      const updater = props.portion.map(async (dataprops) => {
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
                          .then((result) => { });

                        if (loopEnd === props.portion.length) {
                          return true;
                        }
                      });

                      const updaterReturns = await Promise.all(updater);
                      if (updaterReturns)
                        return sendCallback({
                          isSet: true,
                          type: "update",
                          data: { type: "product_update" },
                        });
                    });
                }

                // sendCallback({
                //   data,
                // });
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
            if (configureStore.getState().SocketConn.isConn)
              configureStore
                .getState()
                .SocketConn.socket.emit("DELETEPRODUCT", props);
          }
          return sendCallback({
            isSet: true,
            name,
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
      props.selectedRows.map((list) => {
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
      var Products = [];

      let promises = props.selectedRows.map((list) => {
        return new Promise(function (resolve, reject) {
          dbhook()
            .select()
            .from("warehouse")
            .where({ productKey: list })
            .then((data) => {
              Products.push(data[0]);

              resolve(Products);
              // return Products;
            });
        });
      });

      Promise.all(promises).then((data) => {
        sendCallback(data[0]);
      });
      // const productResult = await Promise.all(proList);

      // console.log(Products);
      break;

    case "PurchaseWarehouseListById":
      if (props.productsList)
        props.productsList.map((list) => {
          let amount = list.amountInstore + parseInt(list.transfer);

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
        props.productsList.map((list) => {
          if (list.transfer) {
            let amount = list.amountInstore - parseInt(list.transfer);

            dbhook("warehouse")
              .where({ productKey: list.productKey })
              .update({
                amountInstore: amount,
              })
              .then(function (data) {
                GetData(
                  {
                    table: "products",
                    id: "ItemName",
                    value: list.ItemName,
                  },
                  dbhook,
                  (reciveCallback) => {
                    if (reciveCallback.data.length === 0) {
                      GetData(
                        {
                          table: "Tabs",
                          id: "tabname",
                          value: list.category,
                        },
                        dbhook,
                        (reciveCallback2) => {
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
                                        .then((result) => {
                                          // console.log(result);
                                        })
                                        .catch((err) => {
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
                                      .then((result) => {
                                        // console.log(result);
                                      });
                                  });
                              });
                          } else {
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
                                    .then((result) => {
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
                                  .then((result) => {
                                    // console.log(result);
                                  });
                              });
                          }
                        }
                      );

                      // console.log(props);
                    } else {
                      let productAmount =
                        reciveCallback.data[0].amountInstore +
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
                            .then((result) => {
                              // console.log(result);
                            });
                        });
                    }
                  }
                );
              });
          }
        });

      sendCallback({});
      break;

    case "Add_filter":
      props.taxMapping.map((list) => {
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
                GetData(
                  {
                    table: "products",
                    id: "group",
                    value: list.tabname,
                  },
                  dbhook,
                  (reciveCallback) => {
                    GetData(
                      {
                        table: "mulitProducts",
                        id: "productName",
                        value: reciveCallback.data[0].ItemName,
                      },
                      dbhook,
                      (reciveMultCallback) => {
                        // console.log(reciveMultCallback);
                        reciveMultCallback.data.map((list) => {
                          dbhook("mulitProducts")
                            .where({
                              productName: list.productName,
                            })
                            .update({
                              isTaxEnabled: false,
                            })
                            .then(function (data) { });
                        });
                      }
                    );
                  }
                );
              });
          });
      });

      sendCallback({
        isSet: true,
        type: "Add_filter",
      });

      break;
    case "remove_filter":
      props.TaxMappingOut.map((list) => {
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
                GetData(
                  {
                    table: "products",
                    id: "group",
                    value: list.tabname,
                  },
                  dbhook,
                  (reciveCallback) => {
                    GetData(
                      {
                        table: "mulitProducts",
                        id: "productName",
                        value: reciveCallback.data[0].ItemName,
                      },
                      dbhook,
                      (reciveMultCallback) => {
                        // console.log(reciveMultCallback);
                        reciveMultCallback.data.map((list) => {
                          dbhook("mulitProducts")
                            .where({
                              productName: list.productName,
                            })
                            .update({
                              isTaxEnabled: true,
                            })
                            .then(function (data) { });
                        });
                      }
                    );
                  }
                );
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

      props.purchaseSelected.map((nodes) => {
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

      props.mulitSelected.map((list) => {
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
          GetData(
            { table: "products", id: "group", value: props.oldData.group },
            dbhook,
            async (callback) => {
              var state = false;

              const isProductsInstore = callback.data.map(async (product) => {
                if (product.isInstore) state = true;
                return state;
              });

              const results = await Promise.all(isProductsInstore);

              if (!results[0]) {
                dbhook("Tabs")
                  .where({ tabname: props.oldData.group })
                  .update({
                    isInstore: false,
                  })
                  .then(function (data) { });
              }
            }
          );
          return sendCallback({
            isSet: true,
            name,
            data: {
              type: "removed from store",
            },
          });
        });
      break;

    case "reduce_store":
      var num = 0;
      console.log(props.data);

      props.data.map((list) => {
        if (list.isMulity) {
          num++;
          GetData(
            {
              table: "products",
              id: "ItemName",
              value: list.ItemName,
            },
            dbhook,
            (callback) => {
              console.log(callback)

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
            }
          );
        } else {
          dbhook("products")
            .where({ productKey: list.productKey })
            .then(productsList => {

              dbhook("products")
                .where({ productKey: list.productKey })
                .update({
                  amountInstore: productsList[0].amountInstore - list.qnt
                })
                .then(function (data) {

                  dbhook
                    .select()
                    .from("products")
                    .then((dataList) => {
                      dataList.map((productList) => {
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
                                  QuantitySold:
                                    Data[0].OpenBalance - productList.amountInstore,
                                })
                                .then(() => { });
                            else
                              dbhook("balancesReports")
                                .where({ DateRange: parseInt(DateNumInput) })
                                .andWhere({ name: productList.ItemName })
                                .update({
                                  CloseBalance: productList.amountInstore,
                                  // QuantitySold: 0,
                                })
                                .then(() => { });
                          });
                      });
                    });
                });
            })

        }
      });
      break;

    case "tranfer":
      switch (props.state) {
        case "send":
          if (configureStore.getState().SocketConn.isConn) {
            configureStore
              .getState()
              .SocketConn.socket.emit("SEND_TRANSTION", props);
          }

          break;

        case "delivery":
          GetData(
            {
              table: "products",
              id: "ItemName",
              value: props.data.selected.ItemName,
            },
            dbhook,
            (callback) => {
              dbhook("products")
                .where({ ItemName: props.data.selected.ItemName })
                .update({
                  amountInstore:
                    callback.data[0].amountInstore - parseInt(props.value),
                })
                .then(() => {
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
                      if (configureStore.getState().SocketConn.isConn) {
                        configureStore
                          .getState()
                          .SocketConn.socket.emit("INVENTORY_TRANSFER", trans);
                      }
                      sendCallback({
                        name: props.data.selected.ItemName,
                        isSet: true,
                      });
                    });
                });
            }
          );
          break;

        case "recived":
          // console.log(props);
          GetData(
            { table: "Tabs", id: "tabname", value: props.data.selected.group },
            dbhook,
            (callback) => {
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
                  .then((result) => {
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
                          props.data.data.multi.data.map((data) => {
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
                              .then((result) => {
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
                        } else {
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
              } else {
                dbhook("Tabs")
                  .where({ tabname: props.data.selected.group })
                  .update({
                    isInstore: true,
                  })
                  .then(function (data) { });
                GetData(
                  {
                    table: "products",
                    id: "ItemName",
                    value: props.data.selected.ItemName,
                  },
                  dbhook,
                  (callback) => {
                    // console.log(callback);
                    if (callback.data.length !== 0) {
                      dbhook("products")
                        .where({ ItemName: props.data.selected.ItemName })
                        .update({
                          amountInstore:
                            callback.data[0].amountInstore +
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
                    } else {
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
                            props.data.data.multi.data.map((data) => {
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
                                .then((result) => {
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
                              ``;
                            });
                          } else {
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
                  }
                );
              }
            }
          );
          break;
      }

      break;

    case "backUp":
      // console.log(props);
      props.data.tabs.map((tablist) => {
        GetData(
          {
            table: "Tabs",
            id: "tabname",
            value: tablist.tabname,
          },
          dbhook,
          (callback) => {
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
                .then((result) => { });
            }
          }
        );
      });

      props.data.productsList.map((productslist) => {
        GetData(
          {
            table: "products",
            id: "ItemName",
            value: productslist.ItemName,
          },
          dbhook,
          (callback) => {
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
                .then((result) => {
                  if (productslist.isMulity) {
                    props.data.mulitList.map((multlist) => {
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
                        .then((result) => {
                          sendCallback({
                            isSet: true,
                          });
                        });
                    });
                  } else {
                    sendCallback({
                      isSet: true,
                    });
                  }
                });
            }
          }
        );
      });
      break;

    case "stockReturn":
      appDb.HandelReports(
        { invoiceNumber: props, _type: "cancel_ticket" },
        (reciveCallback) => {
          const num = parseInt(props.amount);

          dbhook("products")
            .where({ productKey: props.selectedItem.productKey })
            .update({
              amountInstore: props.selectedItem.amountInstore + num,
            })
            .then(() => {
              sendCallback(true);
            });
        }
      );

      break;

    case "setRecipe":
      GetData(
        {
          table: "ingredients",
          id: "recipeName",
          value: props.name,
        },
        dbhook,
        (callback) => {
          if (callback.data.length === 0)
            dbhook("ingredients")
              .insert({
                idKey: uuidv1(),
                recipeName: props.name,
                ingredients: props.List,
              })
              .then(() => {
                sendCallback(true);
              });
          else
            dbhook("ingredients")
              .where({ recipeName: props.name })
              .update({
                recipeName: props.name,
                ingredients: props.List,
              })
              .then(() => {
                sendCallback(true);
              });
        }
      );

      break;

    case "GetRecipe":
      dbhook
        .select()
        .from("ingredients")
        .then((data) => {
          sendCallback(data);
        });

      break;

    case "DeleteRecipe":
      // console.log(props);
      dbhook("ingredients")
        .where({ idKey: props.item.idKey })
        .del()
        .then((data) => {
          sendCallback(data);
        });

      break;

    case "setMaterials":
      let MaterialPromises = props.List.data.map((list) => {
        return new Promise(function (resolve, reject) {
          GetData(
            {
              table: "materials",
              id: "materialName",
              value: list.name,
            },
            dbhook,
            (callback) => {
              // console.log(callback.data);
              const materialKey = uuidv1();

              if (callback.data.length === 0)
                dbhook("materials")
                  .insert({
                    idKey: materialKey,
                    materialName: list.name,
                    measuredBy: list.measuredBy.title,
                    quantity: list.ogQty,
                    DateEntered: moment().format("MM/DD/YYYY"),
                  })
                  .then(() => {
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
                      .then(() => {
                        resolve(true);
                      });
                  });
              else {
                dbhook("materials")
                  .where({ idKey: callback.data[0].idKey })
                  .update({
                    quantity: callback.data[0].quantity + parseInt(list.ogQty),
                  })
                  .then(() => {
                    dbhook("materialsReport")
                      .where({ idKey: callback.data[0].idKey })
                      .update({
                        quantityOpening:
                          callback.data[0].quantity + parseInt(list.ogQty),
                        DateUpdated: moment().format("MM/DD/YYYY"),
                        DateRange: parseInt(DateNumInput),
                      })
                      .then(() => {
                        resolve(true);
                      });
                  });
              }
            }
          );
        });
      });

      Promise.all(MaterialPromises).then((data) => {
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
        .then(() => {
          sendCallback(true);
        });

      break;

    case "GetMaterials":
      dbhook
        .select()
        .from("materials")
        .then((data) => {
          sendCallback(data);
        });

      break;

    case "DeleteMaterial":
      // console.log(props);

      dbhook("materials")
        .where({ idKey: props.item.idKey })
        .del()
        .then((data) => {
          sendCallback(data);
        });

      break;

    case "setOpeningMaterials":
      // console.log(props);
      dbhook
        .select()
        .from("materials")
        .then((data) => {
          data.map((list) => {
            dbhook("materialsReport")
              .where({ idKey: list.idKey })
              .update({
                quantityOpening: list.quantity,
              })
              .then(() => { });
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
        .then((data) => {
          sendCallback(data);
        });

      break;

    case "getBalancesReports":
      dbhook
        .select()
        .from("balancesReports")
        .whereBetween("DateRange", [props.startDate, props.endDate])
        .then((data) => {
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
          .then((Maindata) => {
            // console.log(Maindata);

            if (Maindata.length !== 0)
              dbhook
                .select()
                .from("balancesReports")
                .where({ DateRange: parseInt(DateNumInput) })
                .then((data) => {
                  // console.log(data);

                  if (data.length === 0) {
                    const balancesList = Maindata.map((list) => {
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
                          .then((dataRe) => {
                            resolve(dataRe);
                          });
                      });
                    });

                    Promise.all(balancesList).then((data__) => {
                      sendCallback(data__);
                    });
                  } else {
                    sendCallback(false);
                  }
                });
            else sendCallback(true);
          });
      } catch (error) {
        sendCallback(false);
      }

      break;

    case "get_license_config":
      dbhook
        .select()
        .from("licenseKey")
        .then((data) => {
          sendCallback(data);
        });

      break;

    case "validateLicense":
      dbhook
        .select()
        .from("department_config")
        .then((data) => {
          if (data.length !== 0) {
            const userInfo = {
              company: data[0].dep_name,
              city: data[0].city,
              phone: data[0].phone,
              year,
            };
            const licenseData = {
              info: userInfo,
              prodCode: "LEN100120",
              appVersion: "1.5",
              osType: "IOS8",
            };

            try {
              const license = licenseKey.validateLicense(
                licenseData,
                props.Licence
              );

              if (license.message === "ok")
                dbhook
                  .select()
                  .from("licenseKey")
                  .then((licenseKeyData) => {
                    if (licenseKeyData.length === 0) {
                      dbhook("licenseKey")
                        .insert({
                          licenseKey: props.Licence,
                        })
                        .then(() => {
                          sendCallback(license);
                        });
                    } else {
                      dbhook("licenseKey")
                        .update({ licenseKey: props.Licence })
                        .then(() => {
                          sendCallback(license);
                        });
                    }
                  });
              else sendCallback(license);
            } catch (err) {
              sendCallback(err);
              console.log(err);
            }
          } else {
            sendCallback({ message: "ok" });
          }
        });
      break;

    case "bulkUpload":
      // console.log(props);

      let bulkuploadPromises = props.data.map((list) => {
        return new Promise(function (resolve, reject) {
          GetData(
            {
              table: "products",
              id: "ItemName",
              value: list.Product,
            },
            dbhook,
            (ProductCallback) => {
              if (ProductCallback.data.length === 0) {
                GetData(
                  {
                    table: "Tabs",
                    id: "tabname",
                    value: list.Category,
                  },
                  dbhook,
                  (TabCallback) => {
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
                          GetData(
                            {
                              table: "group",
                              id: "group",
                              value: list.Category,
                            },
                            dbhook,
                            (GroupCallback) => {
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
                                  isMulity,
                                })
                                .then(function () {
                                  const data = {
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
                                  Purchases(dbhook, data, (callback) => { });

                                  resolve(true);
                                });
                            }
                          );
                        });
                    } else {
                      GetData(
                        {
                          table: "group",
                          id: "group",
                          value: list.Category,
                        },
                        dbhook,
                        (GroupCallback) => {
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
                              isMulity,
                            })
                            .then(function () {
                              const data = {
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
                              Purchases(dbhook, data, (callback) => { });

                              resolve(true);
                            });
                        }
                      );
                    }
                  }
                );
              } else {
                GetData(
                  {
                    table: "group",
                    id: "group",
                    value: list.Category,
                  },
                  dbhook,
                  (GroupCallback) => {
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
                        amountInstore:
                          parseInt(list.Quantity) +
                          parseInt(ProductCallback.data[0].amountInstore),
                      })
                      .then(function () {
                        resolve(true);
                      });
                  }
                );
              }
            }
          );
        });
      });

      Promise.all(bulkuploadPromises).then((data) => {
        sendCallback(data);
      });

      break;

    default:
      break;
  }
};
