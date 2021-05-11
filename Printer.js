"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatCurrency = require("format-currency");
var moment = require("moment");
var escpos = require("escpos");
escpos.USB = require("escpos-usb");
escpos.Network = require("escpos-network");
var Alert = require("electron-alert");
var alert = new Alert();
function Printer(type, data) {
    // console.log(data);
    try {
        var options = { encoding: "GB18030" /* default */ };
        var check = moment(new Date());
        var time = check.format("LT");
        var opts_1 = { format: "%s%v %c", code: "", symbol: data.currency };
        var swalOptions_1 = {
            title: "The CSV file was written successfully",
            text: "Written successfully!",
            type: "error",
            showCancelButton: false,
        };
        if (type === "network") {
            // console.log(data);
            var networkDevice = new escpos.Network("192.168.1.87");
            var printer_1 = new escpos.Printer(networkDevice, options);
            networkDevice.open(function (error) {
                printer_1
                    .font("a")
                    .align("ct")
                    .style("bu")
                    .size(1.5, 1.5)
                    // .text(data.compInfo.departmentInfo.dep_name)
                    // .text(data.compInfo.departmentInfo.road)
                    // .text(data.compInfo.departmentInfo.shopNo)
                    // .text(" ")
                    // .text(`Tel: ${data.compInfo.departmentInfo.phone}`)
                    .text("ORDER")
                    .text("---------------------------------------------")
                    .text("Date " + data.date)
                    .text("Time " + data.time)
                    .text("---------------------------------------------")
                    .text("Table " + data.name)
                    .text("Sales Person " + data.user)
                    .text(" ")
                    .text("---------------------------------------------");
                data.list.forEach(function (list) {
                    printer_1.size(1, 1).tableCustom([
                        { text: list.ItemName, align: "LEFT", width: 0.44 },
                        {
                            text: "",
                            align: "RIGHT",
                            width: 0.22,
                        },
                        {
                            text: list.qnt,
                            align: "RIGHT",
                            width: 0.33,
                        },
                    ]);
                    if (list.extraMsg)
                        printer_1.text("Massage: " + list.extraMsg);
                    printer_1.text("---------------------------------------------");
                });
                printer_1
                    .text("================================================")
                    .cut()
                    .close();
            });
            // if (data.mainKitchen.length !== 0) {
            //   const networkDevice = new escpos.Network("192.168.1.87");
            //   const printer = new escpos.Printer(networkDevice, options);
            //   networkDevice.open(function (error) {
            //     printer
            //       .font("a")
            //       .align("ct")
            //       .style("bu")
            //       .size(1.5, 1.5)
            //       // .text(data.compInfo.departmentInfo.dep_name)
            //       // .text(data.compInfo.departmentInfo.road)
            //       // .text(data.compInfo.departmentInfo.shopNo)
            //       // .text(" ")
            //       // .text(`Tel: ${data.compInfo.departmentInfo.phone}`)
            //       .text(`BAR ORDER`)
            //       .text("---------------------------------------------")
            //       .text(`Date ${data.date}`)
            //       .text(`Time ${data.time}`)
            //       .text("---------------------------------------------")
            //       .text(`Table ${data.name}`)
            //       .text(`Sales Person ${data.user}`)
            //       .text(" ")
            //       .text("---------------------------------------------");
            //     data.mainKitchen.forEach((list) => {
            //       printer.size(1, 1).tableCustom([
            //         { text: list.ItemName, align: "LEFT", width: 0.44 },
            //         {
            //           text: "",
            //           align: "RIGHT",
            //           width: 0.22,
            //         },
            //         {
            //           text: list.qnt,
            //           align: "RIGHT",
            //           width: 0.33,
            //         },
            //       ]);
            //       if (list.extraMsg) printer.text(`Massage: ${list.extraMsg}`);
            //       printer.text("---------------------------------------------");
            //     });
            //     printer
            //       .text("================================================")
            //       .cut()
            //       .close();
            //   });
            // }
            // if (data.secondaryKitchen.length !== 0) {
            //   const networkDevice = new escpos.Network("192.168.1.88");
            //   const printer = new escpos.Printer(networkDevice, options);
            //   networkDevice.open(function (error) {
            //     printer
            //       .font("a")
            //       .align("ct")
            //       .style("bu")
            //       .size(1.5, 1.5)
            //       // .text(data.compInfo.departmentInfo.dep_name)
            //       // .text(data.compInfo.departmentInfo.road)
            //       // .text(data.compInfo.departmentInfo.shopNo)
            //       // .text(" ")
            //       // .text(`Tel: ${data.compInfo.departmentInfo.phone}`)
            //       .text(`KITCHEN ORDER`)
            //       .text(`Date ${data.date}`)
            //       .text(`Time ${data.time}`)
            //       .text(`Table ${data.name}`)
            //       .text(`Sales Person ${data.user}`)
            //       .text(" ")
            //       .text("---------------------------------------------");
            //     data.secondaryKitchen.forEach((list) => {
            //       printer.size(1, 1).tableCustom([
            //         { text: list.ItemName, align: "LEFT", width: 0.44 },
            //         {
            //           text: "",
            //           align: "RIGHT",
            //           width: 0.22,
            //         },
            //         {
            //           text: list.qnt,
            //           align: "RIGHT",
            //           width: 0.33,
            //         },
            //       ]);
            //       if (list.extraMsg) printer.text(`Massage: ${list.extraMsg}`);
            //       printer.text("---------------------------------------------");
            //     });
            //     printer
            //       .text("================================================")
            //       .cut()
            //       .close();
            //   });
            // }
            // if (data.pastryKitchen.length !== 0) {
            //   const networkDevice = new escpos.Network("192.168.1.89");
            //   const printer = new escpos.Printer(networkDevice, options);
            //   networkDevice.open(function (error) {
            //     printer
            //       .font("a")
            //       .align("ct")
            //       .style("bu")
            //       .size(1.5, 1.5)
            //       .text(`Le Petit Paris Pastry`)
            //       .text(`Date ${data.date}`)
            //       .text(`Time ${data.time}`)
            //       .text(`Table ${data.name}`)
            //       .text(`Sales Person ${data.user}`)
            //       .text(" ")
            //       .text("---------------------------------------------");
            //     data.pastryKitchen.forEach((list) => {
            //       printer.size(1, 1).tableCustom([
            //         { text: list.ItemName, align: "LEFT", width: 0.44 },
            //         {
            //           text: "",
            //           align: "RIGHT",
            //           width: 0.22,
            //         },
            //         {
            //           text: list.qnt,
            //           align: "RIGHT",
            //           width: 0.33,
            //         },
            //       ]);
            //       if (list.extraMsg) printer.text(`Massage: ${list.extraMsg}`);
            //       printer.text("---------------------------------------------");
            //     });
            //     printer
            //       .text("================================================")
            //       .cut()
            //       .close();
            //   });
            // }
        }
        else {
            var device_1 = new escpos.USB();
            var printer_2 = new escpos.Printer(device_1, options);
            if (type === "receipt") {
                var times = [1];
                times.map(function (list) {
                    device_1.open(function (error) {
                        if (error)
                            alert.fireWithFrame(swalOptions_1, "Printer Error", null, false);
                        printer_2
                            .font("a")
                            .align("ct")
                            // .style("bu")
                            .size(1, 1)
                            .text(data.company)
                            .text(data.road)
                            .text(data.shop)
                            .text(" ")
                            .text("Tel: " + data.state.phone)
                            .text(data.ticketHeader + ":" + data.invoiceNumber)
                            .text(data.ticketstate)
                            .tableCustom([
                            { text: " ", align: "LEFT", width: 0.4 },
                            { text: " ", align: "CENTER", width: 0.19 },
                            {
                                text: "TPIN: " + data.state.tpin,
                                align: "RIGHT",
                                width: 0.44,
                            },
                        ])
                            .tableCustom([
                            {
                                text: "Date: " + data.date,
                                align: "LEFT",
                                width: 0.44,
                            },
                            { text: " ", align: "CENTER", width: 0.2 },
                            { text: "Time: " + data.time, align: "RIGHT", width: 0.4 },
                        ])
                            .tableCustom([
                            { text: "Casher : " + data.user, align: "LEFT", width: 1 },
                        ])
                            .text("---------------------------------------------");
                        var total = 0;
                        data.items.forEach(function (element) {
                            total = parseInt(element.initalPrice) * parseInt(element.Qty) + total;
                            printer_2.tableCustom([
                                {
                                    text: element.ItemName + " x " + element.Qty,
                                    align: "LEFT",
                                    width: 0.49,
                                },
                                {
                                    text: formatCurrency(element.initalPrice),
                                    align: "CENTER",
                                    width: 0.16,
                                },
                                {
                                    text: formatCurrency(element.initalPrice * element.Qty, opts_1),
                                    align: "RIGHT",
                                    width: 0.35,
                                },
                            ]);
                        });
                        printer_2
                            .text("================================================")
                            .tableCustom([
                            { text: "Total:", align: "LEFT", width: 0.44 },
                            { text: " ", align: "CENTER", width: 0.22 },
                            {
                                text: formatCurrency(total),
                                align: "RIGHT",
                                width: 0.33,
                            },
                        ]);
                        data.ticketHeader !== "Quotation"
                            ? printer_2
                                .tableCustom([
                                { text: "Change:", align: "LEFT", width: 0.44 },
                                { text: " ", align: "CENTER", width: 0.22 },
                                {
                                    text: formatCurrency(data.ChangeDue),
                                    align: "RIGHT",
                                    width: 0.33,
                                },
                            ])
                                .tableCustom([
                                { text: "Balance:", align: "LEFT", width: 0.44 },
                                { text: " ", align: "CENTER", width: 0.22 },
                                {
                                    text: formatCurrency(data.Balance),
                                    align: "RIGHT",
                                    width: 0.33,
                                },
                            ])
                            : null;
                        if (data.Discount !== 0)
                            printer_2.tableCustom([
                                { text: "Discount", align: "LEFT", width: 0.44 },
                                { text: " ", align: "CENTER", width: 0.22 },
                                {
                                    text: formatCurrency(data.Discount),
                                    align: "RIGHT",
                                    width: 0.33,
                                },
                            ]);
                        printer_2
                            .tableCustom([
                            { text: "" + data.paymentType, align: "LEFT", width: 0.44 },
                            {
                                text: "",
                                align: "CENTER",
                                width: 0.22,
                            },
                            {
                                text: formatCurrency(data.GrandTotal),
                                align: "RIGHT",
                                width: 0.33,
                            },
                        ])
                            .text("================================================")
                            .size(2, 2)
                            .text("THANK YOU & VISIT AGAIN")
                            .cut()
                            .cashdraw(2)
                            .close();
                    });
                });
            }
            else if (type === "sale")
                device_1.open(function (error) {
                    // console.log(data.productsList);
                    var DataTypes = [];
                    var CashGrandTotal = 0;
                    var CasDiscount = 0;
                    var CashBalance = 0;
                    var CashTotalCash = 0;
                    var TranType = "Cash";
                    var CardGrandTotal = 0;
                    var CardDiscount = 0;
                    var CardBalance = 0;
                    var CardTranType = "Card";
                    var allTotal = 0;
                    var GrandallTotal = 0;
                    printer_2
                        .font("a")
                        .align("lt")
                        .style("bu")
                        .size(1, 1)
                        .text(data.productInfo.compInfo.dep)
                        // .text(data.productInfo.compInfo.departmentInfo.road)
                        // .text(data.productInfo.compInfo.departmentInfo.shopNo)
                        .text(" ")
                        .text("Tel: " + data.productInfo.compInfo.departmentInfo.phone)
                        .text("Sales Person " + data.productInfo.cashier)
                        .text("" + data.productInfo.date)
                        .text(" ")
                        .text("================================================");
                    if (data.data.cash !== 0) {
                        data.data.cash.map(function (list) {
                            CashGrandTotal = list.GrandTotal + CashGrandTotal;
                            CasDiscount = list.Discount + CasDiscount;
                            CashBalance = list.Balance + CashBalance;
                        });
                        data.data.split.map(function (split) {
                            CashGrandTotal = split.Cash_slipt + CashGrandTotal;
                        });
                        DataTypes.push({
                            paymentType: "Cash",
                            total: CashGrandTotal - CashBalance,
                        });
                    }
                    if (data.data.card !== 0) {
                        data.data.card.map(function (list) {
                            CardGrandTotal = list.GrandTotal + CardGrandTotal;
                            CardDiscount = list.Discount + CardDiscount;
                            CardBalance = list.Balance + CardBalance;
                        });
                        data.data.split.map(function (split) {
                            CardGrandTotal = split.Card_slipt + CardGrandTotal;
                        });
                        DataTypes.push({
                            paymentType: "Card",
                            total: CardGrandTotal - CardBalance,
                        });
                    }
                    if (data.data.others.length !== 0) {
                        data.data.others.map(function (others) {
                            DataTypes.push({
                                paymentType: others.PaymentType,
                                total: others.GrandTotal - others.Balance,
                            });
                        });
                    }
                    data.productsList.data.forEach(function (list) {
                        GrandallTotal = list.initalPrice * list.qnt + GrandallTotal;
                        printer_2.text(" " + list.ItemName + " -- @ " + list.initalPrice + " --  *  " + list.qnt + " = " + formatCurrency(list.initalPrice * list.qnt));
                    });
                    printer_2.text("");
                    printer_2.text("--------------------------------");
                    printer_2.text("Grand Sales : " + formatCurrency(GrandallTotal, opts_1));
                    printer_2.text("--------------------------------");
                    printer_2.text("");
                    printer_2.text("Mode Of Payment");
                    printer_2.text("--------------------------------");
                    DataTypes.map(function (lists) {
                        allTotal = lists.total + allTotal;
                        printer_2.text(lists.paymentType + " : " + formatCurrency(lists.total, opts_1));
                    });
                    printer_2
                        .text("---------------------------------------------")
                        .text("")
                        .text("Discounts")
                        .text("Cash Discount : " + formatCurrency(CasDiscount, opts_1))
                        .text("Card Discount : " + formatCurrency(CardDiscount, opts_1))
                        .text("")
                        .text("Net Total : " + formatCurrency(allTotal, opts_1))
                        .text("---------------------------------------------");
                    printer_2
                        .text("================================================")
                        .cut()
                        .close();
                });
            else if (type === "order")
                device_1.open(function (error) {
                    printer_2
                        .font("a")
                        .align("ct")
                        .style("bu")
                        .size(1, 1)
                        // .text(data.company)
                        // .text(data.road)
                        // .text(data.shop)
                        // .text(" ")
                        // .text(`Tel: ${data.state.phone}`)
                        .text("KICHEN ORDER")
                        .text("Sales Person " + data.user)
                        .text(" ")
                        .text("---------------------------------------------");
                    data.data.forEach(function (list) {
                        printer_2.tableCustom([
                            { text: list.ItemName, align: "LEFT", width: 0.44 },
                            {
                                text: formatCurrency(list.initalPrice),
                                align: "RIGHT",
                                width: 0.33,
                            },
                        ]);
                    });
                    printer_2
                        .text("================================================")
                        .cut()
                        .close();
                });
            else if (type === "bill")
                device_1.open(function (error) {
                    // console.log(data);
                    var total = 0;
                    printer_2
                        .font("a")
                        .align("ct")
                        .style("bu")
                        .size(1, 1)
                        // .text(data.compInfo.departmentInfo.dep_name)
                        // .text(data.compInfo.departmentInfo.road)
                        // .text(data.compInfo.departmentInfo.shopNo)
                        // .text(" ")
                        // .text(`Tel: ${data.compInfo.departmentInfo.phone}`)
                        .text("Bill")
                        .text("Date " + data.date)
                        .text("Time " + data.time)
                        .text("Table " + data.name)
                        .text("Sales Person " + data.user)
                        .text(" ")
                        .text("---------------------------------------------");
                    data.list.data.forEach(function (list) {
                        total = list.initalPrice * list.qnt + total;
                        printer_2.tableCustom([
                            { text: list.ItemName, align: "LEFT", width: 0.44 },
                            {
                                text: list.qnt,
                                align: "RIGHT",
                                width: 0.22,
                            },
                            {
                                text: formatCurrency(list.initalPrice * list.qnt),
                                align: "RIGHT",
                                width: 0.33,
                            },
                        ]);
                    });
                    printer_2.text("================================================");
                    printer_2.tableCustom([
                        { text: "Total", aline: "LEFT", width: 0.44 },
                        { text: "==", aline: "RIGHT", width: 0.22 },
                        {
                            text: formatCurrency(total),
                            aline: "RIGHT",
                            width: 0.33,
                        },
                    ]);
                    printer_2
                        .text("================================================")
                        .cut()
                        .close();
                });
        }
    }
    catch (e) {
        alert.fireWithFrame({
            title: "Faild to print",
            text: "" + e,
            type: "error",
            showCancelButton: false,
        }, "Printer Error", null, false);
    }
}
exports.default = Printer;
//# sourceMappingURL=Printer.js.map