import {
  ConfigFile,
  UpdateTax,
  UpdateTheme,
  UpdateDepartment,
} from "../reducers/config";
import configureStore from "../store";
import {
  CheckDepartments,
  SetDepartments,
  GetDepartment,
  GetDepartmentsList,
  EditDepartment,
} from "../reducers/departments";
import {
  UserLogIn,
  NewUser,
  GetUsers,
  DeleteUser,
  EditUser,
} from "../reducers/Users/User";
import {
  StartWorkPeriod,
  EndWorkPeriod,
  CheckWorkPeriod,
  WorkPeriodList,
} from "../reducers/WorkPeriod/workPeriod";
import Backup from "./updater";
import {
  SetGroups,
  GetGroups,
  DeleteGroups,
  EditGroup,
} from "../reducers/groups/group";
import { HandelNewProducts, GetData } from "../reducers/Products/Products";
import { Purchases } from "../reducers/inventory/Inventoery";
import { HandleReports } from "../reducers/reports/Reports";
import { CustomersConfig } from "../reducers/customers";
import { InvoiceNumber, quotationNumber } from "../reducers/Invoice";
import { InventoryTransfer } from "../reducers/inventory/InventoryTransfer";
import { financialNumber } from "../reducers/financialReport";
import {
  DeleteBranch,
  EditBranch,
  GetOffLineBranchesList,
  SetOffLineBranchesList,
} from "../reducers/branch/branch";
import {
  DeleteSupplier,
  EditSupppliers,
  GetSuppliers,
  SetSuppliers,
} from "../reducers/suppliers/Suppliers";
import {
  SetTables,
  GetTables,
  DeleteTable,
  SetMyTabes,
  GetMyTabes,
  DeleteTableFromMyTables,
  EditTables,
  AddItemToTables,
  UpdateTables,
  HandleKitchenPrintOut,
  UpdatePrintOuts,
  GetTablesByUserName,
} from "../reducers/Tables";
import { GetPurchases } from "../reducers/reports/Purchases";

const uuidv4 = require("uuid/v4");
const moment = require("moment");
// const pgtools = require("pgtools");
const fs = require("fs-extra");

// const dbObj = fs.readJsonSync("./db.json");

function CreateId() {
  return uuidv4();
}


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

const knex = require("../../../knex");

var Called = false;


// knex()
// .select()
// .from("openPrintouts")
// .then(list=>{
// fs.writeJson('data.json', {data: list})
// })
// let tempData = []

// const dbObj = fs.readJsonSync("data.json");
// console.log(dbObj)

// dbObj.data.map(tempList => {

//   if (tempData.length === 0) {
//     let table = {
//       id: tempList.tableKey,
//       name: tempList.tableName,
//       user: "Staf",
//       date: tempList.date,
//       time: tempList.time,
//       list: {
//         data: [
//           tempList.itemList
//         ]
//       },
//       total: 0,
//       qty: 1,
//     }

//     tempData.push(table)
//   } else {
//     const index = tempData.findIndex((x) => x.name === tempList.tableName);

//     if (index === -1) {
//       let table = {
//         id: tempList.tableKey,
//         name: tempList.tableName,
//         user: "Staf",
//         date: tempList.date,
//         time: tempList.time,
//         list: {
//           data: [
//             tempList.itemList
//           ]
//         },
//         total: 0,
//         qty: 1,
//       }

//       tempData.push(table)
//     } else {
//       tempData[index].list.data.push(tempList.itemList)
//     }

//     // tempData.map((li,index)=>{

//     //   if(li.tableName === tempList.tableName){
//     //     tempList[index].list.data.push(tempList.itemList)
//     //   }else{

//     //     let table = {
//     //       id: tempList.tableKey,
//     //       name: tempList.tableName,
//     //       user: "Staf",
//     //       date:tempList.date,
//     //       time:tempList.time,
//     //       list:{ data: [
//     //         tempList.itemList
//     //       ]},
//     //       total: 0,
//     //       qty:1,
//     //     }

//     //     tempData.push(table)

//     //   }
//     // })

//   }
// })
// tempData.map(i => {

//   knex("openTables")
//     .insert({
//       id: i.id,
//       name: i.name,
//       user: i.user,
//       date: i.date,
//       time: i.time,
//       list: i.list,
//       total: i.total,
//       qty: i.qty,
//     })
//     .then(function () { })
// })
// console.log(tempData)


const CreateTables = () => {
  try {
    knex.schema.hasTable("products").then(function (exists) {
      if (!exists) {
        return (
          knex.schema
            .createTable("Tabs", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("tabname").notNullable();
              table.string("branch").notNullable();
              table.string("background").notNullable();
              table.string("color").notNullable();
              table.string("buttonType").notNullable();
              table.boolean("isInstore").notNullable();
              table.boolean("isTaxEnabled").notNullable();
              table.timestamp("date").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("TabList", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("name").notNullable();
              table.string("groupId").notNullable();
              table.timestamp("date").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("compInventory", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("InventoryName").notNullable();
              table.integer("amount").notNullable();
              table.timestamp("date").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("invNum", function (table) {
              table.string("id").notNullable();
              table.integer("invNumber").notNullable();
            })
            .createTable("qutNum", function (table) {
              table.string("id").notNullable();
              table.integer("qutNumber").notNullable();
            })
            .createTable("damages", function (table) {
              table.string("id").notNullable();
              table.string("ItemName").notNullable();
              table.string("state").notNullable();
              table.string("date").notNullable();
              table.integer("number").notNullable();
              table.integer("sellingPrice").notNullable();
              table.integer("buyingPrice").notNullable();
              table.integer("dateRange").notNullable();
              table.string("productKey").notNullable();
            })
            .createTable("products", function (table) {
              table.increments("key");
              table.string("productKey").notNullable();
              table.string("group").notNullable();
              table.string("category").notNullable();
              table.string("ItemName").notNullable();
              table.string("barcode1").notNullable();
              table.string("barcode2").notNullable();
              table.string("barcode3").notNullable();
              table.string("barcode4").notNullable();
              table.string("barcode5").notNullable();
              table.string("branches").notNullable();
              table.string("supplier");
              table.string("ingredient").notNullable();
              table.integer("sallingprice").notNullable();
              table.integer("buyingPrice").notNullable();
              table.integer("initalPrice").notNullable();
              table.integer("qnt").notNullable();
              table.integer("multiplier").notNullable();
              table.integer("alertOut").notNullable();
              table.integer("amountInstore").notNullable();
              table.boolean("sync").notNullable();
              table.string("expiryDate").notNullable();
              table.boolean("isExpired").notNullable();
              table.boolean("isMaster").notNullable();
              table.boolean("isInstore").notNullable();
              table.boolean("isTaxEnabled").notNullable();
              table.boolean("isMulity").notNullable();
              table.timestamp("date").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("warehouse", function (table) {
              table.increments("key");
              table.string("productKey").notNullable();
              table.string("group").notNullable();
              table.string("category").notNullable();
              table.string("ItemName").notNullable();
              table.string("barcode1").notNullable();
              table.string("barcode2").notNullable();
              table.string("barcode3").notNullable();
              table.string("barcode4").notNullable();
              table.string("barcode5").notNullable();
              table.string("branches").notNullable();
              table.string("supplier").notNullable();
              table.integer("sallingprice").notNullable();
              table.integer("buyingPrice").notNullable();
              table.integer("initalPrice").notNullable();
              table.integer("qnt").notNullable();
              table.integer("multiplier").notNullable();
              table.integer("alertOut").notNullable();
              table.integer("amountInstore").notNullable();
              table.boolean("sync").notNullable();
              table.string("expiryDate").notNullable();
              table.boolean("isExpired").notNullable();
              table.boolean("isMaster").notNullable();
              table.boolean("isInstore").notNullable();
              table.boolean("isTaxEnabled").notNullable();
              table.boolean("isMulity").notNullable();
              table.timestamp("date").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("suppliers", function (table) {
              table.increments("key");
              table.string("supplierKey").notNullable();
              table.string("SupplierName").notNullable();
              table.string("address").notNullable();
              table.string("contact").notNullable();
              table.timestamp("date").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("ProductTransfers", function (table) {
              table.increments("key");
              table.string("idKey").notNullable();
              table.string("ItemName").notNullable();
              table.integer("transfered").notNullable();
              table.string("date").notNullable();
              table.string("time").notNullable();
              table.string("user").notNullable();
              table.string("branch").notNullable();
              table.integer("dateRange").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("expenses", function (table) {
              table.increments("key");
              table.string("idKey").notNullable();
              table.string("description").notNullable();
              table.integer("cost").notNullable();
              table.string("date").notNullable();
              table.string("time").notNullable();
              table.string("user").notNullable();
              table.string("branch").notNullable();
              table.integer("dateRange").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("returns", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("description").notNullable();
              table.string("productName").notNullable();
              table.string("qnt").notNullable();
              table.string("date").notNullable();
              table.string("time").notNullable();
              table.string("sallingprice").notNullable();
              table.string("customer").notNullable();
              table.string("invoiceNumber").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("purchases", function (table) {
              table.increments("key");
              table.string("purchasesKey").notNullable();
              table.string("productName").notNullable();
              table.string("group").notNullable();
              table.string("sellingPrice").notNullable();
              table.string("sellingPriceOld").notNullable();
              table.string("buyingPrice").notNullable();
              table.string("buyingPriceOld").notNullable();
              table.string("supplier").notNullable();
              table.string("quantity").notNullable();
              table.string("invoiceNumber").notNullable();
              table.string("EventDate").notNullable();
              table.integer("dateRange").notNullable();
              table.string("time").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("ingredients", function (table) {
              table.increments("key");
              table.string("idKey").notNullable();
              table.string("recipeName").notNullable();
              table.jsonb("ingredients").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("materials", function (table) {
              table.increments("key");
              table.string("idKey").notNullable();
              table.string("materialName").notNullable();
              table.string("measuredBy").notNullable();
              table.decimal("quantity").notNullable();
              table.string("DateEntered").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("materialsReport", function (table) {
              table.increments("key");
              table.string("idKey").notNullable();
              table.string("materialName").notNullable();
              table.string("measuredBy").notNullable();
              table.decimal("quantityStarted").notNullable();
              table.decimal("quantityOpening").notNullable();
              table.decimal("quantityClosing").notNullable();
              table.string("DateEntered").notNullable();
              table.string("DateEnded").notNullable();
              table.string("DateUpdated").notNullable();
              table.integer("DateRange").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("mulitProducts", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("productName").notNullable();
              table.integer("sallingprice").notNullable();
              table.integer("initalPrice").notNullable();
              table.integer("qnt").notNullable();
              table.string("barcode1").notNullable();
              table.string("barcode2").notNullable();
              table.string("barcode3").notNullable();
              table.string("barcode4").notNullable();
              table.string("barcode5").notNullable();
              table.integer("alertOut").notNullable();
              table.integer("amountInstore").notNullable();
              table.boolean("isInstore").notNullable();
              table.boolean("isTaxEnabled").notNullable();
              table.timestamp("date").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            // ===== End of products ======
            .createTable("inventory", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("name").notNullable();
              table.string("group").notNullable();
              table.string("backgroundColor").notNullable();
              table.string("textColor").notNullable();
              table.string("cartname").notNullable();
              table.string("barcode").notNullable();
              table.string("sallingprice").notNullable();
              table.string("initalPrice").notNullable();
              table.string("qnt").notNullable();
              table.string("alertOut").notNullable();
              table.string("amountInstore").notNullable();
              table.string("department").notNullable();
              table.boolean("isInstore").notNullable();
              table.boolean("isTaxEnabled").notNullable();
              table.boolean("isMulity").notNullable();
              table.timestamp("date").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("inventory_transfer", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("name").notNullable();
              table.string("quantity").notNullable();
              table.string("date").notNullable();
              table.string("time").notNullable();
              table.string("state").notNullable();
              table.string("from").notNullable();
              table.string("to").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("openTables", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("name").notNullable();
              table.string("user").notNullable();
              table.string("date").notNullable();
              table.string("time").notNullable();
              table.jsonb("list").notNullable();
              table.integer("total").notNullable();
              table.integer("qty").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("openPrintouts", function (table) {
              table.increments("key");
              table.string("tableKey").notNullable();
              table.string("tableName").notNullable();
              table.string("item").notNullable();
              table.jsonb("itemList").notNullable();
              table.string("itemKey").notNullable();
              table.string("date").notNullable();
              table.string("time").notNullable();
              table.integer("qty").notNullable();
              table.boolean("isOrder").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("sales_reports_tikets", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("Year").notNullable();
              table.string("Day").notNullable();
              table.string("Month").notNullable();
              table.string("InvoiceNumber").notNullable();
              table.string("tableId").notNullable();
              table.jsonb("TicketList").notNullable();
              table.string("Customer").notNullable();
              table.integer("GrandTotal").notNullable();
              table.integer("AmountPaid").notNullable();
              table.integer("ChangeDue").notNullable();
              table.integer("Balance").notNullable();
              table.integer("RtxGrandTotal").notNullable();
              table.integer("RtxAmountPaid").notNullable();
              table.integer("RtxChangeDue").notNullable();
              table.integer("RtxBalance").notNullable();
              table.integer("Discount").notNullable();
              table.integer("Card_slipt").notNullable();
              table.integer("Cash_slipt").notNullable();
              table.string("Date").notNullable();
              table.string("Datetrack").notNullable();
              table.integer("dateRange").notNullable();
              table.string("Department").notNullable();
              table.string("TotalQt").notNullable();
              table.string("User").notNullable();
              table.string("PaymentType").notNullable();
              table.boolean("isTaxInvoice").notNullable();
              table.boolean("isActive").notNullable();
              table.text("Note").notNullable();
              table.decimal("totalTaxFinal").notNullable();
              table.decimal("totalTax").notNullable();
              table.string("time").notNullable();
              table.integer("timeRange").notNullable();
              table.boolean("isBackedUp").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("sales_reports_totals", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("Year").notNullable();
              table.string("Day").notNullable();
              table.string("Month").notNullable();
              table.integer("SrNo").notNullable();
              table.integer("GrandTotal").notNullable();
              table.integer("AmountPaid").notNullable();
              table.integer("ChangeDue").notNullable();
              table.integer("Balance").notNullable();
              table.integer("Discount").notNullable();
              table.integer("RtxGrandTotal").notNullable();
              table.integer("RtxAmountPaid").notNullable();
              table.integer("RtxChangeDue").notNullable();
              table.integer("RtxBalance").notNullable();
              table.string("Date").notNullable();
              table.string("Datetrack").notNullable();
              table.integer("DateTrackNumber").notNullable();
              table.string("Department").notNullable();
              table.string("totalTaxFinal").notNullable();
              table.string("totalTax").notNullable();
              table.string("time").notNullable();
              table.integer("timeRange").notNullable();
              table.boolean("isBackedUp").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("purchases_reports", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("year").notNullable();
              table.string("month").notNullable();
              table.string("day").notNullable();
              table.jsonb("list").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("work_period", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("year").notNullable();
              table.string("month").notNullable();
              table.string("day").notNullable();
              table.string("week").notNullable();
              table.string("dateStarted").notNullable();
              table.string("dateStartedString").notNullable();
              table.string("dateEnded").notNullable();
              table.string("dateEndedString").notNullable();
              table.string("time").notNullable();
              table.string("timeEnded").notNullable();
              table.string("date").notNullable();
              table.string("note").notNullable();
              table.string("department").notNullable();
              table.string("workedFor").notNullable();
              table.integer("ticket_count").notNullable();
              table.integer("sales_total").notNullable();
              table.boolean("isOpen").notNullable();
              table.timestamp("timestamp").defaultTo(knex.fn.now());
              table.timestamp("modified").defaultTo(knex.fn.now());
            })
            .createTable("accounts", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("Year").notNullable();
            })
            .createTable("branches", function (table) {
              table.increments("key");
              table.string("brancheId").notNullable();
              table.string("company").notNullable();
              table.string("branche").notNullable();
            })
            .createTable("customers", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("email").notNullable();
              table.string("location").notNullable();
              table.string("name").notNullable();
              table.string("phone").notNullable();
            })
            .createTable("group", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("group").notNullable();
              table.string("typeId").notNullable();
              table.jsonb("recipes").notNullable();
              table.jsonb("colors").notNullable();
            })
            .createTable("tables", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("table").notNullable();
              table.jsonb("colors").notNullable();
              table.boolean("isOpen").notNullable();
            })
            .createTable("invoice_number", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("number").notNullable();
            })
            .createTable("users", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("userName").notNullable();
              table.string("pin").notNullable();
              table.string("department").notNullable();
              table.string("prevarges").notNullable();
              table.jsonb("notifications").notNullable();
            })
            .createTable("department_config", function (table) {
              table.increments("key");
              table.string("id").notNullable();
              table.string("dep_name").notNullable();
              table.string("theme").notNullable();
              table.string("phone").notNullable();
              table.string("shopNo").notNullable();
              table.string("road").notNullable();
              table.string("city").notNullable();
              table.string("province").notNullable();
              table.string("appId").notNullable();
              table.string("tpin").notNullable();
              table.string("taxType").notNullable();
              table.integer("taxRat").notNullable();
              table.json("notifications").notNullable();
            })
            .createTable("licenseKey", function (table) {
              table.increments("key");
              table.string("licenseKey").notNullable();
            })
            .createTable("financial_Report_number", function (table) {
              table.increments("key");
              table.integer("number").notNullable();
            })
            .createTable("payments_mode", function (table) {
              table.increments("key");
              table.string("idKey").notNullable();
              table.string("pay_type").notNullable();
            })
            .createTable("currency", function (table) {
              table.increments("key");
              table.string("idKey").notNullable();
              table.jsonb("currency").notNullable();
            })
            .createTable("extraMsg", function (table) {
              table.string("idKey").notNullable();
              table.string("msg").notNullable();
            })
            .createTable("printGroups", function (table) {
              table.string("idKey").notNullable();
              table.string("group").notNullable();
              table.jsonb("list").notNullable();
              table.string("printerIP").notNullable();
            })
            .createTable("balancesReports", function (table) {
              table.increments("key");
              table.string("idKey").notNullable();
              table.string("name").notNullable();
              table.string("date").notNullable();
              table.integer("DateRange").notNullable();
              table.integer("OpenBalance").notNullable();
              table.integer("CloseBalance").notNullable();
              table.integer("QuantitySold").notNullable();
            })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};

CreateTables();

class AppDb {
  // handleUpdates
  private UpdateToServer(props, callback) {
    if (props._type === "set") {
      Backup._UpdateProducts(props, (recivecallback) => { });
    }
    switch (props._data_type) {
      case "sales_reports":
        Backup._UpdateSalesRports(props, (reciveCallback) => {
          callback(reciveCallback);
        });
        break;
      case "products":
        Backup._UpdateProducts(props, (reciveCallback) => {
          callback(reciveCallback);
        });

        break;
      case "add_to_store":
        Backup._UpdateProducts(props, (reciveCallback) => {
          callback(reciveCallback);
        });

        break;

      default:
        break;
    }
  }

  public MakeAlTables() {
    CreateTables()
  }

  public MakeTables() {
    knex.schema
      .createTable("payments_mode", function (table) {
        table.increments("key");
        table.string("idKey").notNullable();
        table.string("pay_type").notNullable();
      })
      .createTable("currency", function (table) {
        table.increments("key");
        table.string("idKey").notNullable();
        table.jsonb("currency").notNullable();
      })
      .createTable("extraMsg", function (table) {
        table.string("idKey").notNullable();
        table.string("msg").notNullable();
      })
      .createTable("printGroups", function (table) {
        table.string("idKey").notNullable();
        table.string("group").notNullable();
        table.jsonb("list").notNullable();
        table.string("printerIP").notNullable();
      })
      .createTable("balancesReports", function (table) {
        table.increments("key");
        table.string("idKey").notNullable();
        table.string("name").notNullable();
        table.string("date").notNullable();
        table.integer("DateRange").notNullable();
        table.integer("OpenBalance").notNullable();
        table.integer("CloseBalance").notNullable();
        table.integer("QuantitySold").notNullable();
      });
  }

  /**
   * TestConnection
   */
  public TestDbConnection(sendCallback) {
    try {
      knex
        .select()
        .from("pg_stat_activity")
        .then(function (config) {
          sendCallback({ connection: true });
        })
        .catch(function (error) {
          sendCallback({ connection: false });
        });
    } catch (error) {
      sendCallback({ connection: false });
    }
  }

  public CreateDb(sendCallback) {
    // pgtools.createdb(DbConfig, "chesco_pos", function (err, res) {
    //   if (err) {
    //     console.error(err);
    //   }
    //   console.log(res);
    // });
    // knex
    //   .raw("CREATE DATABASE chesco_pos")
    //   .then(function () {
    //     CreateTables();
    //     setTimeout(() => {
    //       sendCallback({ db: true });
    //     }, 20000);
    //   })
    //   .catch(function (error) {
    //     sendCallback({ db: false, error });
    //   });
  }

  // Handel department
  public CheckConfig() {
    ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, (callback) => {
      if (callback.config.length !== 0) {
        var data = callback.config;
        setTimeout(() => {
          if (configureStore.getState().SocketConn.isConn)
            configureStore
              .getState()
              .SocketConn.socket.emit("DEP_CONNECTED", data);
          configureStore.dispatch({
            type: "SETDEP",
            dep: data,
          });
          configureStore.dispatch({
            type: "SETCONFIG",
            isSet: true,
            config: callback,
          });
        }, 3500);
      } else {
        configureStore.dispatch({
          type: "SETCONFIG",
          isSet: false,
          config: {},
        });
      }
    });
  }

  public GetConfigfile(sendCallback) {
    ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, (callback) => {
      sendCallback(callback);
    });
  }

  public Get_Purchases(props, sendCallback) {
    GetPurchases(knex, props, (callback) => {
      sendCallback(callback);
    });
  }

  public HandleTables(props, sendCallback) {
    switch (props._type) {
      case "set":
        SetTables(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });

        break;
      case "get":
        GetTables(knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });

        break;
      case "delete":
        DeleteTable(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "setMyTabes":
        SetMyTabes(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "KitchenTable":
        HandleKitchenPrintOut(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "KitchenTableUpdate":
        UpdatePrintOuts(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "getMyTabes":
        GetMyTabes(knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "DeleteTableFromMyTables":
        DeleteTableFromMyTables(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "editTable":
        EditTables(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "addToTable":
        AddItemToTables(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "updateTable":
        UpdateTables(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      case "getOpenTablesByUser":
        GetTablesByUserName(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      default:
        break;
    }
  }

  public HandleBranches(data, sendCallback) {
    switch (data.type) {
      case "set":
        SetOffLineBranchesList(data, knex, (callback) => {
          sendCallback(callback);
        });

        break;
      case "get":
        GetOffLineBranchesList(knex, (callback) => {
          sendCallback(callback);
        });

        break;
      case "edit":
        EditBranch(data, knex, (callback) => {
          sendCallback(callback);
        });

        break;
      case "delete":
        DeleteBranch(data, knex, (callback) => {
          sendCallback(callback);
        });

        break;
      default:
        break;
    }
  }

  public HandleDepartments(props, sendCallback) {
    // console.log(props);

    if (props.type === "check") {
      CheckDepartments("", (callback) => {
        sendCallback(callback);
      });
    } else if (props.type === "set") {
      ConfigFile(
        { type: "set", dataType: "new", data: props },
        knex,
        (callback) => {
          sendCallback(callback);
        }
      );
    } else if (props.type === "create") {
      SetDepartments(props.data, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props.type === "get") {
      GetDepartment(props.data, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props.type === "getAll") {
      GetDepartmentsList(props.data, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props.type === "setSelected") {
      ConfigFile(
        { type: "set", dataType: "selecte", props },
        knex,
        (callback) => {
          sendCallback(callback);
        }
      );
    } else if (props.type === "edit") {
      UpdateDepartment(props, knex, (callback) => {
        sendCallback(callback);
      });
      // EditDepartment(props, (reciveCallback) => {
      //   sendCallback(reciveCallback);
      // });
    } else if (props._type === "EditLocal") {
    }
  }
  // Handel Users
  public HandleLogIn(props, callback) {
    UserLogIn(props, knex, (reciveCallback) => {
      if (reciveCallback) {
        if (reciveCallback.isLoggedIn) {
          var userData = {
            dep: configureStore.getState().Dep,
            config: reciveCallback.config,
          };
          if (configureStore.getState().SocketConn.isConn) {
            configureStore
              .getState()
              .SocketConn.socket.emit("USER_CONNECTED", userData);

            appDb.HandleDep((callback) => {
              var data = {
                id: callback.config[0].id,
                dep_name: callback.config[0].dep_name,
              };
              configureStore
                .getState()
                .SocketConn.socket.emit("UserConnected", data);
            });
          }
        }
        callback(reciveCallback);
      }
    });
  }

  // Handel Users
  public HandleLogOut(props, callback) {
    UserLogIn(props, knex, (reciveCallback) => {
      if (reciveCallback) {
        if (reciveCallback.isLoggedIn)
          if (configureStore.getState().SocketConn.isConn)
            configureStore
              .getState()
              .SocketConn.socket.emit(
                "USER_DISCONNECTED",
                reciveCallback.config
              );
        callback(reciveCallback);
      }
    });
  }

  public HandleNewUser(props, sendCallback) {
    NewUser(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleGetUser(sendCallback) {
    GetUsers(knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleDeleteUser(props, sendCallback) {
    DeleteUser(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleEidtUser(props, sendCallback) {
    EditUser(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  // Handel WorkPeriods
  public HandleWorkperiods(props, callback) {
    if (props._type === "start") {
      StartWorkPeriod(props, knex, (reciveCallback) => {
        if (configureStore.getState().SocketConn.isConn)
          configureStore
            .getState()
            .SocketConn.socket.emit("STARTWORKPEROID", props);
        callback(reciveCallback);
      });
    } else if (props._type === "end") {
      EndWorkPeriod(props, knex, (reciveCallback) => {
        if (configureStore.getState().SocketConn.isConn)
          configureStore
            .getState()
            .SocketConn.socket.emit("ENDWORKPEROID", props);

        callback(reciveCallback);
      });
    } else if (props._type === "check") {
      CheckWorkPeriod(knex, (reciveCallback) => {
        callback(reciveCallback);
      });
    } else if (props._type === "loadList") {
      WorkPeriodList(knex, (reciveCallback) => {
        callback(reciveCallback);
      });
    }
  }
  /**
   * HandleDepConn
   */
  public HandleDep(sendCallback) {
    ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, (callback) => {
      sendCallback(callback);
    });
  }

  // HandleProducts
  public HandelProducts(props, sendCallback) {
    if (props._type === "getServerProducts") {
      if (!Called) {
        Called = true;
        if (configureStore.getState().SocketConn.isConn) {
          configureStore.getState().SocketConn.socket.emit("GETALLPRODUCTS");
          configureStore.getState().SocketConn.socket.emit("GETGROUPS", props);

          configureStore
            .getState()
            .SocketConn.socket.on("GROUPSLIST", (List) => {
              List.data.map((items) => {
                const data = {
                  group: items.group,
                  recipes: [],
                  colors: items.colors,
                };

                SetGroups(data, knex, (getCallback) => { });
              });
            });

          configureStore
            .getState()
            .SocketConn.socket.on("ALLPRODUCTSLIST", (List) => {
              HandelNewProducts(
                { _type: "addServerProducts", AllProducts: List },
                knex,
                (receiveCallback) => {
                  if (receiveCallback) {
                    sendCallback(receiveCallback);

                    if (receiveCallback.isSet) {
                      configureStore.dispatch({
                        type: "LOADTABEL",
                      });
                    }

                    setTimeout(() => {
                      Called = false;
                    }, 10000);
                  }
                }
              );
            });
        }
      }
    } else {
      HandelNewProducts(props, knex, (receiveCallback) => {
        if (receiveCallback) {
          if (receiveCallback.type === "add") {
            var data = { id: receiveCallback.productKey, props };
            Backup._UpdateProducts(data, (receiveBackUpCallback) => { });
          } else if (receiveCallback.type === "add_to_store") {
            Backup._UpdateInventory(props, (receiveBackUpCallback) => { });
          } else if (receiveCallback.type === "Add_filter") {
            Backup._UpdateInventory(props, (receiveBackUpCallback) => { });
          } else if (receiveCallback.type === "remove_filter") {
            Backup._UpdateInventory(props, (receiveBackUpCallback) => { });
          }
          sendCallback(receiveCallback);
          if (receiveCallback.isSet) {
            configureStore.dispatch({
              type: "LOADTABEL",
            });
          }
        }
      });
    }
    // this.UpdateToServer(props, (callback) => {});
  }

  // HandleProducts
  public HandleTaxUpdate(props, sendCallback) {
    UpdateTax(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  // HandleInventory
  public HandleInventory(props, sendCallback) {
    Purchases(props, knex, (reciveCallbak) => {
      sendCallback(reciveCallbak);
    });
  }
 
  // HandleGroup
  public HandelGroup(props, sendCallback) {
    if (props._type === "set") {
      if (configureStore.getState().SocketConn.isConn) {
        configureStore.getState().SocketConn.socket.emit("SETGROUP", props);
      }

      SetGroups(props, knex, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props._type === "get") {
      GetGroups(props, knex, (reciveCallback) => {
        sendCallback(reciveCallback);
      });
    } else if (props._type === "deleteGroup") {
      if (configureStore.getState().SocketConn.isConn) {
        configureStore.getState().SocketConn.socket.emit("DELETEGROUP", props);
      }

      DeleteGroups(props, knex, (callback) => {
        sendCallback(callback);
      });
    } else if (props._type === "editGroup") {
      EditGroup(props, knex, (callbackData) => {
        sendCallback(callbackData);
      });
    }
  }

  // HandleGroup
  public HandelReports(props, sendCallback) {
    HandleReports(props, knex, (recivedCallback) => {
      sendCallback(recivedCallback);
    });

    // this.UpdateToServer(props, (callback) => {
    //   // console.log(callback);
    // });
  }

  // HandleGroup
  public HandleCustomers(props, sendCallback) {
    CustomersConfig(props, knex, (recivedCallback) => {
      sendCallback(recivedCallback);
    });
  }

  // HandleGroup
  public HandleInventoryTransfer(sendCallback) {
    InventoryTransfer(knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleTheme(props, sendCallback) {
    UpdateTheme(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  // Invoice Number
  public HandleinvNumber(props, sendCallback) {
    switch (props._type) {
      case "invo":
        InvoiceNumber(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });

        break;
      case "quot":
        quotationNumber(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });

        break;

      default:
        break;
    }
  }

  public HandlefinancialNumber(props, sendCallback) {
    financialNumber(props, knex, (reciveCallback) => {
      sendCallback(reciveCallback);
    });
  }

  public HandleSuppliers(props, sendCallback) {
    switch (props.type) {
      case "set":
        SetSuppliers(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;
      case "get":
        GetSuppliers(knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;
      case "edit":
        EditSupppliers(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;
      case "delete":
        DeleteSupplier(props, knex, (reciveCallback) => {
          sendCallback(reciveCallback);
        });
        break;

      default:
        break;
    }
  }

  // Server BackUp
  public HandleServerBackUp(props, sendCallback) {
    if (props.tiketsIsDone) {
      GetData(
        {
          table: "sales_reports_totals",
          id: "isBackedUp",
          value: false,
        },
        knex,
        (reciveCallback) => {
          sendCallback(reciveCallback);
        }
      );
    } else {
      GetData(
        {
          table: "sales_reports_tikets",
          id: "isBackedUp",
          value: false,
        },
        knex,
        (reciveCallback) => {
          sendCallback(reciveCallback);
        }
      );
    }
  }

  public HandleCompInventory(props, sendCallback) {
    switch (props.type) {
      case "set":
        knex("compInventory")
          .insert({
            id: CreateId(),
            InventoryName: props.ItemName,
            amount: props.amount,
          })
          .then(function () {
            sendCallback(true);
          });

        break;

      case "get":
        knex
          .select()
          .from("compInventory")
          // .whereBetween("dateRange", [props.startDate, props.endDate])
          .then(function (config) {
            sendCallback(config);
          });

        break;

      case "edit":
        // console.log(props);

        knex("compInventory")
          .where({ id: props.newData.id })
          .update({
            InventoryName: props.newData.InventoryName,
            amount: props.newData.amount,
          })
          .then(function (config) {
            sendCallback(config);
          });

        break;

      case "delete":
        // console.log(props);
        knex("compInventory")
          .where({ id: props.oldData.id })
          .del()
          .then(function (config) {
            sendCallback(config);
          });

        break;

      default:
        break;
    }
  }

  public GetTabelData(props, sendCallback) {
    // console.log(props);

    GetData(
      {
        table: props.table,
        id: props.id,
        value: props.value,
      },
      knex,
      (reciveCallback) => {
        sendCallback(reciveCallback);
      }
    );
  }

  public HandelDamages(props, sendCallback) {
    const ProductFun = this.HandelProducts;

    switch (props.type) {
      case "set":
        props.list.map((items) => {
          ProductFun(
            { _type: "invReduction", items, isExpired: false },
            (callback) => {
              knex("damages")
                .insert({
                  id: CreateId(),
                  ItemName: items.ItemName,
                  state: "Damaged",
                  date: moment().format("LLL"),
                  number: parseInt(items.damaged),
                  sellingPrice: items.sallingprice,
                  buyingPrice: items.buyingPrice,
                  dateRange: parseInt(DateNumInput),
                  productKey: items.productKey,
                })
                .then(function () { });
            }
          );
        });
        sendCallback({ isSet: true });

        break;

      case "get":
        knex
          .select()
          .from("damages")
          .whereBetween("dateRange", [props.startDate, props.endDate])
          .then(function (config) {
            sendCallback(config);
          });

        break;

      case "checkForExpired":
        knex
          .select()
          .from("products")
          .then(function (config) {
            config.map((items) => {
              if (expiryDate(items.expiryDate) <= 0) {
                if (!items.isExpired)
                  ProductFun(
                    { _type: "invReduction", items, isExpired: true },
                    (callback) => {
                      // console.log(`TEST----`);
                      knex("damages")
                        .insert({
                          id: CreateId(),
                          ItemName: items.ItemName,
                          state: "Expired",
                          date: moment().format("LLL"),
                          number: parseInt(items.amountInstore),
                          sellingPrice: items.sallingprice,
                          buyingPrice: items.buyingPrice,
                          dateRange: parseInt(DateNumInput),
                          productKey: items.productKey,
                        })
                        .then(function () { });
                    }
                  );
              }
            });
          });

        break;

      default:
        break;
    }
  }

  public PaymentMode(props, sendCallback) {
    switch (props._type) {
      case "get_payments_mode":
        knex
          .select()
          .from("payments_mode")
          .then(function (config) {
            sendCallback(config);
          });

        break;

      case "set_payments_mode":
        knex("payments_mode")
          .insert({
            idKey: CreateId(),
            pay_type: props.newData.pay_type,
          })
          .then(function () {
            sendCallback(true);
          });
        break;

      case "update_payments_mode":
        knex("payments_mode")
          .where("idKey", props.newData.idKey)
          .update({
            pay_type: props.newData.pay_type,
          })
          .then(function () {
            sendCallback(true);
          });
        break;

      case "delete_payments_mode":
        knex("payments_mode")
          .where("idKey", props.oldData.idKey)
          .del()
          .then(function () {
            sendCallback(true);
          });
        break;

      default:
        break;
    }
  }

  public HandleCurrency(props, sendCallback) {
    switch (props._type) {
      case "getCurrence":
        knex
          .select()
          .from("currency")
          .then(function (currency) {
            if (currency.length === 0) {
              knex("currency")
                .insert({
                  idKey: uuidv4(),
                  currency: {
                    symbol: "ZK",
                    name: "Zambian Kwacha",
                    symbol_native: "ZK",
                    decimal_digits: 0,
                    rounding: 0,
                    code: "ZMK",
                    name_plural: "Zambian kwachas",
                  },
                })
                .then(function () {
                  knex
                    .select()
                    .from("currency")
                    .then(function (currency) {
                      sendCallback(currency);
                    });
                });
            } else {
              sendCallback(currency);
            }
          });
        break;

      case "setCurrence":
        knex
          .select()
          .from("currency")
          .then(function (currency) {
            if (currency.length === 0) {
              knex("currency")
                .insert({
                  idKey: uuidv4(),
                  currency: props.currency,
                })
                .then(function () {
                  sendCallback(true);
                });
            } else {
              knex("currency")
                .update({
                  currency: props.currency,
                })
                .then(function () {
                  sendCallback(true);
                });
            }
          });
        break;

      default:
        break;
    }
  }

  public HandleExtra(props, sendCallback) {
    switch (props._type) {
      case "get":
        knex
          .select()
          .from("extraMsg")
          .then(function (extraMsg) {
            sendCallback(extraMsg);
          });

        break;

      case "set":
        // console.log(props);
        props.state.data.map((list) => {
          knex("extraMsg")
            .insert({
              idKey: uuidv4(),
              msg: list.value,
            })
            .then(function (extraMsg) {
              sendCallback(true);
            });
        });
        break;

      case "delete":
        knex("extraMsg")
          .where("idKey", props.idKey)
          .del()
          .then(function () {
            sendCallback(true);
          });

        break;

      case "edit":
        knex("extraMsg")
          .where("idKey", props.idKey)
          .update({
            msg: props.value,
          })
          .then(function () {
            sendCallback(true);
          });

        break;

      default:
        break;
    }
  }

  public HandlePrinterGroups(props, sendCallback) {
    switch (props._type) {
      case "get":
        knex
          .select()
          .from("printGroups")
          .then(function (data) {
            sendCallback(data);
          });

        break;

      case "getGrounpWithID":
        knex
          .select()
          .from("group")
          .where("typeId", props.id)
          .then(function (data) {
            sendCallback(data);
          });

        break;

      case "getWithOutID":
        knex
          .select()
          .from("group")
          .where("typeId", "not_set")
          .then(function (data) {
            sendCallback(data);
          });

        break;
      case "set":
        knex("printGroups")
          .insert({
            idKey: uuidv4(),
            group: props.name,
            printerIP: "",
            list: { data: [] },
          })
          .then(function (data) {
            sendCallback(true);
          });
        break;
      case "delete":
        knex("printGroups")
          .where("idKey", props.idKey)
          .del()
          .then(function () {
            sendCallback(true);
          });

        break;
      case "edit":
        console.log(props);

        knex("printGroups")
          .where("idKey", props.id)
          .update({
            printerIP: props.printerIP,
            list: { data: props.right },
          })
          .then(function () {
            props.right.map((list) => {
              knex("group")
                .where("group", list)
                .update({
                  typeId: props.id,
                })
                .then(function () {
                  sendCallback(true);
                });
            });
          });

        break;

      default:
        break;
    }
  }
}

const expiryDate = (date_string) => {
  var expiration = moment(date_string).format("YYYY-MM-DD");
  var current_date = moment().format("YYYY-MM-DD");
  var days = moment(expiration).diff(current_date, "days");
  return days;
};

const appDb = new AppDb();
export default appDb;
