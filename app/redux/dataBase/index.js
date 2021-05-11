"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../reducers/config");
var store_1 = require("../store");
var departments_1 = require("../reducers/departments");
var User_1 = require("../reducers/Users/User");
var workPeriod_1 = require("../reducers/WorkPeriod/workPeriod");
var updater_1 = require("./updater");
var group_1 = require("../reducers/groups/group");
var Products_1 = require("../reducers/Products/Products");
var Inventoery_1 = require("../reducers/inventory/Inventoery");
var Reports_1 = require("../reducers/reports/Reports");
var customers_1 = require("../reducers/customers");
var Invoice_1 = require("../reducers/Invoice");
var InventoryTransfer_1 = require("../reducers/inventory/InventoryTransfer");
var financialReport_1 = require("../reducers/financialReport");
var branch_1 = require("../reducers/branch/branch");
var Suppliers_1 = require("../reducers/suppliers/Suppliers");
var Tables_1 = require("../reducers/Tables");
var Purchases_1 = require("../reducers/reports/Purchases");
var uuidv4 = require("uuid/v4");
var moment = require("moment");
// const pgtools = require("pgtools");
var fs = require("fs-extra");
// const dbObj = fs.readJsonSync("./db.json");
function CreateId() {
    return uuidv4();
}
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
var knex = require("../../../knex");
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
var CreateTables = function () {
    try {
        knex.schema.hasTable("products").then(function (exists) {
            if (!exists) {
                return (knex.schema
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
                }));
            }
        });
    }
    catch (error) {
        console.log(error);
    }
};
CreateTables();
var AppDb = /** @class */ (function () {
    function AppDb() {
    }
    // handleUpdates
    AppDb.prototype.UpdateToServer = function (props, callback) {
        if (props._type === "set") {
            updater_1.default._UpdateProducts(props, function (recivecallback) { });
        }
        switch (props._data_type) {
            case "sales_reports":
                updater_1.default._UpdateSalesRports(props, function (reciveCallback) {
                    callback(reciveCallback);
                });
                break;
            case "products":
                updater_1.default._UpdateProducts(props, function (reciveCallback) {
                    callback(reciveCallback);
                });
                break;
            case "add_to_store":
                updater_1.default._UpdateProducts(props, function (reciveCallback) {
                    callback(reciveCallback);
                });
                break;
            default:
                break;
        }
    };
    AppDb.prototype.MakeAlTables = function () {
        CreateTables();
    };
    AppDb.prototype.MakeTables = function () {
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
    };
    /**
     * TestConnection
     */
    AppDb.prototype.TestDbConnection = function (sendCallback) {
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
        }
        catch (error) {
            sendCallback({ connection: false });
        }
    };
    AppDb.prototype.CreateDb = function (sendCallback) {
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
    };
    // Handel department
    AppDb.prototype.CheckConfig = function () {
        config_1.ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, function (callback) {
            if (callback.config.length !== 0) {
                var data = callback.config;
                setTimeout(function () {
                    if (store_1.default.getState().SocketConn.isConn)
                        store_1.default
                            .getState()
                            .SocketConn.socket.emit("DEP_CONNECTED", data);
                    store_1.default.dispatch({
                        type: "SETDEP",
                        dep: data,
                    });
                    store_1.default.dispatch({
                        type: "SETCONFIG",
                        isSet: true,
                        config: callback,
                    });
                }, 3500);
            }
            else {
                store_1.default.dispatch({
                    type: "SETCONFIG",
                    isSet: false,
                    config: {},
                });
            }
        });
    };
    AppDb.prototype.GetConfigfile = function (sendCallback) {
        config_1.ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, function (callback) {
            sendCallback(callback);
        });
    };
    AppDb.prototype.Get_Purchases = function (props, sendCallback) {
        Purchases_1.GetPurchases(knex, props, function (callback) {
            sendCallback(callback);
        });
    };
    AppDb.prototype.HandleTables = function (props, sendCallback) {
        switch (props._type) {
            case "set":
                Tables_1.SetTables(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "get":
                Tables_1.GetTables(knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "delete":
                Tables_1.DeleteTable(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "setMyTabes":
                Tables_1.SetMyTabes(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "KitchenTable":
                Tables_1.HandleKitchenPrintOut(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "KitchenTableUpdate":
                Tables_1.UpdatePrintOuts(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "getMyTabes":
                Tables_1.GetMyTabes(knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "DeleteTableFromMyTables":
                Tables_1.DeleteTableFromMyTables(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "editTable":
                Tables_1.EditTables(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "addToTable":
                Tables_1.AddItemToTables(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "updateTable":
                Tables_1.UpdateTables(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "getOpenTablesByUser":
                Tables_1.GetTablesByUserName(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            default:
                break;
        }
    };
    AppDb.prototype.HandleBranches = function (data, sendCallback) {
        switch (data.type) {
            case "set":
                branch_1.SetOffLineBranchesList(data, knex, function (callback) {
                    sendCallback(callback);
                });
                break;
            case "get":
                branch_1.GetOffLineBranchesList(knex, function (callback) {
                    sendCallback(callback);
                });
                break;
            case "edit":
                branch_1.EditBranch(data, knex, function (callback) {
                    sendCallback(callback);
                });
                break;
            case "delete":
                branch_1.DeleteBranch(data, knex, function (callback) {
                    sendCallback(callback);
                });
                break;
            default:
                break;
        }
    };
    AppDb.prototype.HandleDepartments = function (props, sendCallback) {
        // console.log(props);
        if (props.type === "check") {
            departments_1.CheckDepartments("", function (callback) {
                sendCallback(callback);
            });
        }
        else if (props.type === "set") {
            config_1.ConfigFile({ type: "set", dataType: "new", data: props }, knex, function (callback) {
                sendCallback(callback);
            });
        }
        else if (props.type === "create") {
            departments_1.SetDepartments(props.data, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props.type === "get") {
            departments_1.GetDepartment(props.data, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props.type === "getAll") {
            departments_1.GetDepartmentsList(props.data, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props.type === "setSelected") {
            config_1.ConfigFile({ type: "set", dataType: "selecte", props: props }, knex, function (callback) {
                sendCallback(callback);
            });
        }
        else if (props.type === "edit") {
            config_1.UpdateDepartment(props, knex, function (callback) {
                sendCallback(callback);
            });
            // EditDepartment(props, (reciveCallback) => {
            //   sendCallback(reciveCallback);
            // });
        }
        else if (props._type === "EditLocal") {
        }
    };
    // Handel Users
    AppDb.prototype.HandleLogIn = function (props, callback) {
        User_1.UserLogIn(props, knex, function (reciveCallback) {
            if (reciveCallback) {
                if (reciveCallback.isLoggedIn) {
                    var userData = {
                        dep: store_1.default.getState().Dep,
                        config: reciveCallback.config,
                    };
                    if (store_1.default.getState().SocketConn.isConn) {
                        store_1.default
                            .getState()
                            .SocketConn.socket.emit("USER_CONNECTED", userData);
                        appDb.HandleDep(function (callback) {
                            var data = {
                                id: callback.config[0].id,
                                dep_name: callback.config[0].dep_name,
                            };
                            store_1.default
                                .getState()
                                .SocketConn.socket.emit("UserConnected", data);
                        });
                    }
                }
                callback(reciveCallback);
            }
        });
    };
    // Handel Users
    AppDb.prototype.HandleLogOut = function (props, callback) {
        User_1.UserLogIn(props, knex, function (reciveCallback) {
            if (reciveCallback) {
                if (reciveCallback.isLoggedIn)
                    if (store_1.default.getState().SocketConn.isConn)
                        store_1.default
                            .getState()
                            .SocketConn.socket.emit("USER_DISCONNECTED", reciveCallback.config);
                callback(reciveCallback);
            }
        });
    };
    AppDb.prototype.HandleNewUser = function (props, sendCallback) {
        User_1.NewUser(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleGetUser = function (sendCallback) {
        User_1.GetUsers(knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleDeleteUser = function (props, sendCallback) {
        User_1.DeleteUser(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleEidtUser = function (props, sendCallback) {
        User_1.EditUser(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    // Handel WorkPeriods
    AppDb.prototype.HandleWorkperiods = function (props, callback) {
        if (props._type === "start") {
            workPeriod_1.StartWorkPeriod(props, knex, function (reciveCallback) {
                if (store_1.default.getState().SocketConn.isConn)
                    store_1.default
                        .getState()
                        .SocketConn.socket.emit("STARTWORKPEROID", props);
                callback(reciveCallback);
            });
        }
        else if (props._type === "end") {
            workPeriod_1.EndWorkPeriod(props, knex, function (reciveCallback) {
                if (store_1.default.getState().SocketConn.isConn)
                    store_1.default
                        .getState()
                        .SocketConn.socket.emit("ENDWORKPEROID", props);
                callback(reciveCallback);
            });
        }
        else if (props._type === "check") {
            workPeriod_1.CheckWorkPeriod(knex, function (reciveCallback) {
                callback(reciveCallback);
            });
        }
        else if (props._type === "loadList") {
            workPeriod_1.WorkPeriodList(knex, function (reciveCallback) {
                callback(reciveCallback);
            });
        }
    };
    /**
     * HandleDepConn
     */
    AppDb.prototype.HandleDep = function (sendCallback) {
        config_1.ConfigFile({ type: "checkConfig", id: "mainApp" }, knex, function (callback) {
            sendCallback(callback);
        });
    };
    // HandleProducts
    AppDb.prototype.HandelProducts = function (props, sendCallback) {
        if (props._type === "getServerProducts") {
            if (!Called) {
                Called = true;
                if (store_1.default.getState().SocketConn.isConn) {
                    store_1.default.getState().SocketConn.socket.emit("GETALLPRODUCTS");
                    store_1.default.getState().SocketConn.socket.emit("GETGROUPS", props);
                    store_1.default
                        .getState()
                        .SocketConn.socket.on("GROUPSLIST", function (List) {
                        List.data.map(function (items) {
                            var data = {
                                group: items.group,
                                recipes: [],
                                colors: items.colors,
                            };
                            group_1.SetGroups(data, knex, function (getCallback) { });
                        });
                    });
                    store_1.default
                        .getState()
                        .SocketConn.socket.on("ALLPRODUCTSLIST", function (List) {
                        Products_1.HandelNewProducts({ _type: "addServerProducts", AllProducts: List }, knex, function (receiveCallback) {
                            if (receiveCallback) {
                                sendCallback(receiveCallback);
                                if (receiveCallback.isSet) {
                                    store_1.default.dispatch({
                                        type: "LOADTABEL",
                                    });
                                }
                                setTimeout(function () {
                                    Called = false;
                                }, 10000);
                            }
                        });
                    });
                }
            }
        }
        else {
            Products_1.HandelNewProducts(props, knex, function (receiveCallback) {
                if (receiveCallback) {
                    if (receiveCallback.type === "add") {
                        var data = { id: receiveCallback.productKey, props: props };
                        updater_1.default._UpdateProducts(data, function (receiveBackUpCallback) { });
                    }
                    else if (receiveCallback.type === "add_to_store") {
                        updater_1.default._UpdateInventory(props, function (receiveBackUpCallback) { });
                    }
                    else if (receiveCallback.type === "Add_filter") {
                        updater_1.default._UpdateInventory(props, function (receiveBackUpCallback) { });
                    }
                    else if (receiveCallback.type === "remove_filter") {
                        updater_1.default._UpdateInventory(props, function (receiveBackUpCallback) { });
                    }
                    sendCallback(receiveCallback);
                    if (receiveCallback.isSet) {
                        store_1.default.dispatch({
                            type: "LOADTABEL",
                        });
                    }
                }
            });
        }
        // this.UpdateToServer(props, (callback) => {});
    };
    // HandleProducts
    AppDb.prototype.HandleTaxUpdate = function (props, sendCallback) {
        config_1.UpdateTax(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    // HandleInventory
    AppDb.prototype.HandleInventory = function (props, sendCallback) {
        Inventoery_1.Purchases(props, knex, function (reciveCallbak) {
            sendCallback(reciveCallbak);
        });
    };
    // HandleGroup
    AppDb.prototype.HandelGroup = function (props, sendCallback) {
        if (props._type === "set") {
            if (store_1.default.getState().SocketConn.isConn) {
                store_1.default.getState().SocketConn.socket.emit("SETGROUP", props);
            }
            group_1.SetGroups(props, knex, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props._type === "get") {
            group_1.GetGroups(props, knex, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else if (props._type === "deleteGroup") {
            if (store_1.default.getState().SocketConn.isConn) {
                store_1.default.getState().SocketConn.socket.emit("DELETEGROUP", props);
            }
            group_1.DeleteGroups(props, knex, function (callback) {
                sendCallback(callback);
            });
        }
        else if (props._type === "editGroup") {
            group_1.EditGroup(props, knex, function (callbackData) {
                sendCallback(callbackData);
            });
        }
    };
    // HandleGroup
    AppDb.prototype.HandelReports = function (props, sendCallback) {
        Reports_1.HandleReports(props, knex, function (recivedCallback) {
            sendCallback(recivedCallback);
        });
        // this.UpdateToServer(props, (callback) => {
        //   // console.log(callback);
        // });
    };
    // HandleGroup
    AppDb.prototype.HandleCustomers = function (props, sendCallback) {
        customers_1.CustomersConfig(props, knex, function (recivedCallback) {
            sendCallback(recivedCallback);
        });
    };
    // HandleGroup
    AppDb.prototype.HandleInventoryTransfer = function (sendCallback) {
        InventoryTransfer_1.InventoryTransfer(knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleTheme = function (props, sendCallback) {
        config_1.UpdateTheme(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    // Invoice Number
    AppDb.prototype.HandleinvNumber = function (props, sendCallback) {
        switch (props._type) {
            case "invo":
                Invoice_1.InvoiceNumber(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "quot":
                Invoice_1.quotationNumber(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            default:
                break;
        }
    };
    AppDb.prototype.HandlefinancialNumber = function (props, sendCallback) {
        financialReport_1.financialNumber(props, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandleSuppliers = function (props, sendCallback) {
        switch (props.type) {
            case "set":
                Suppliers_1.SetSuppliers(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "get":
                Suppliers_1.GetSuppliers(knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "edit":
                Suppliers_1.EditSupppliers(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            case "delete":
                Suppliers_1.DeleteSupplier(props, knex, function (reciveCallback) {
                    sendCallback(reciveCallback);
                });
                break;
            default:
                break;
        }
    };
    // Server BackUp
    AppDb.prototype.HandleServerBackUp = function (props, sendCallback) {
        if (props.tiketsIsDone) {
            Products_1.GetData({
                table: "sales_reports_totals",
                id: "isBackedUp",
                value: false,
            }, knex, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
        else {
            Products_1.GetData({
                table: "sales_reports_tikets",
                id: "isBackedUp",
                value: false,
            }, knex, function (reciveCallback) {
                sendCallback(reciveCallback);
            });
        }
    };
    AppDb.prototype.HandleCompInventory = function (props, sendCallback) {
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
    };
    AppDb.prototype.GetTabelData = function (props, sendCallback) {
        // console.log(props);
        Products_1.GetData({
            table: props.table,
            id: props.id,
            value: props.value,
        }, knex, function (reciveCallback) {
            sendCallback(reciveCallback);
        });
    };
    AppDb.prototype.HandelDamages = function (props, sendCallback) {
        var ProductFun = this.HandelProducts;
        switch (props.type) {
            case "set":
                props.list.map(function (items) {
                    ProductFun({ _type: "invReduction", items: items, isExpired: false }, function (callback) {
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
                    });
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
                    config.map(function (items) {
                        if (expiryDate(items.expiryDate) <= 0) {
                            if (!items.isExpired)
                                ProductFun({ _type: "invReduction", items: items, isExpired: true }, function (callback) {
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
                                });
                        }
                    });
                });
                break;
            default:
                break;
        }
    };
    AppDb.prototype.PaymentMode = function (props, sendCallback) {
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
    };
    AppDb.prototype.HandleCurrency = function (props, sendCallback) {
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
                    }
                    else {
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
                    }
                    else {
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
    };
    AppDb.prototype.HandleExtra = function (props, sendCallback) {
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
                props.state.data.map(function (list) {
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
    };
    AppDb.prototype.HandlePrinterGroups = function (props, sendCallback) {
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
                    props.right.map(function (list) {
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
    };
    return AppDb;
}());
var expiryDate = function (date_string) {
    var expiration = moment(date_string).format("YYYY-MM-DD");
    var current_date = moment().format("YYYY-MM-DD");
    var days = moment(expiration).diff(current_date, "days");
    return days;
};
var appDb = new AppDb();
exports.default = appDb;
//# sourceMappingURL=index.js.map