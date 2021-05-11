import { toast } from "react-toastify";
import configureStore from "../../store";
const uuidv4 = require("uuid/v4");

const moment = require("moment");

function CreateId() {
  return uuidv4();
}

var isSent = false;

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

export const HandleReports = (props, dbhook, sendCallback) => {
  switch (props._type) {
    case "sales":
      // if (configureStore.getState().SocketConn.isConn) {
      //   if (!isSent) {
      //     isSent = true;
      //     configureStore
      //       .getState()
      //       .SocketConn.socket.emit("SALESREPORT", props);

      //     setTimeout(() => {
      //       isSent = false;
      //     }, 500);
      //   }
      // }

      dbhook("sales_reports_tikets")
        .insert({
          id: props.data.id,
          Year: props.data.year,
          Day: props.data.day,
          Month: props.data.month,
          InvoiceNumber: props.data.invoiceNumber,
          tableId: "1",
          TicketList: JSON.stringify({ list: props.data.ticketList }),
          Customer: props.data.Customer ? props.data.Customer : "",
          GrandTotal: props.data.GrandTotal,
          AmountPaid: props.data.AmountPaid,
          ChangeDue: props.data.ChangeDue,
          Balance: props.data.Balance,
          RtxGrandTotal: props.isTaxInvoice
            ? props.data.GrandTotal
            : props.paymentType === "Credit Card"
              ? props.data.GrandTotal
              : props.data.RtxGrandTotal,
          RtxAmountPaid: props.isTaxInvoice
            ? props.data.AmountPaid
            : props.paymentType === "Credit Card"
              ? props.data.AmountPaid
              : props.data.RtxAmountPaid,
          RtxChangeDue: props.isTaxInvoice
            ? props.data.ChangeDue
            : props.paymentType === "Credit Card"
              ? props.data.ChangeDue
              : props.data.RtxChangeDue,
          RtxBalance: props.isTaxInvoice
            ? props.data.Balance
            : props.paymentType === "Credit Card"
              ? props.data.Balance
              : props.data.RtxBalance,
          Discount: props.data.Discount,
          Card_slipt: props.data.Card_slipt,
          Cash_slipt: props.data.Cash_slipt,
          Date: props.data.Date,
          Datetrack: props.data.Datetrack,
          dateRange: parseInt(DateNumInput),
          Department: props.data.department,
          TotalQt: props.data.totalQt,
          User: props.data.user,
          PaymentType: props.data.paymentType,
          isTaxInvoice: props.data.isTaxInvoice,
          isActive: true,
          Note: props.data.note,
          totalTaxFinal: props.data.totalTaxFinal,
          totalTax: props.data.totalTax,
          time: props.data.time,
          timeRange: props.data.timeRange,
          isBackedUp: configureStore.getState().SocketConn.isConn
            ? true
            : false,
        })
        .then(function () {
          // console.log(props.data.ticketList);

          props.data.ticketList.map((listIngr) => {
            // dbhook
            //   .select()
            //   .from("balancesReports")
            //   .where("name", listIngr.ItemName)
            //   .then(function (Data) {
            //     dbhook("balancesReports")
            //       .where({ name: listIngr.ItemName })
            //       .update({
            //         CloseBalance: Data[0].OpenBalance - listIngr.qnt,
            //         QuantitySold: Data[0].QuantitySold + listIngr.qnt,
            //       })
            //       .then(() => {});
            //   });

            dbhook
              .select()
              .from("ingredients")
              .where("idKey", listIngr.ingredient)
              .then(function (Data) {
                // console.log(Data);

                if (Data.length !== 0)
                  Data[0].ingredients.data.map((list) => {
                    dbhook
                      .select()
                      .from("materials")
                      .where("idKey", list.material.idKey)
                      .then(function (DataResult) {
                        // console.log(DataResult);
                        const ingrInt = listIngr.qnt * parseInt(list.Qty);

                        if (DataResult.length !== 0)
                          dbhook("materials")
                            .where({ idKey: DataResult[0].idKey })
                            .update({
                              quantity: DataResult[0].quantity - ingrInt,
                            })
                            .then(() => {
                              dbhook("materialsReport")
                                .where({ idKey: DataResult[0].idKey })
                                .update({
                                  quantityClosing:
                                    DataResult[0].quantity - ingrInt,
                                  DateUpdated: moment().format("MM/DD/YYYY"),
                                })
                                .then(() => { });
                              // resolve(true);
                            });
                      });
                  });
              });
          });

          dbhook
            .select()
            .from("sales_reports_totals")
            .where("Department", props.data.department)
            .then(function (MainData) {
              if (MainData.length === 0) {
                dbhook("sales_reports_totals")
                  .insert({
                    id: props.data.id,
                    Year: props.data.year,
                    Day: props.data.day,
                    Month: props.data.month,
                    SrNo: 1,
                    GrandTotal: props.data.GrandTotal,
                    AmountPaid: props.data.AmountPaid,
                    ChangeDue: props.data.ChangeDue,
                    Balance: props.data.Balance,
                    RtxGrandTotal: props.isTaxInvoice
                      ? props.data.GrandTotal
                      : props.paymentType === "Credit Card"
                        ? props.data.GrandTotal
                        : props.data.RtxGrandTotal,
                    RtxAmountPaid: props.isTaxInvoice
                      ? props.data.AmountPaid
                      : props.paymentType === "Credit Card"
                        ? props.data.AmountPaid
                        : props.data.RtxAmountPaid,
                    RtxChangeDue: props.isTaxInvoice
                      ? props.data.ChangeDue
                      : props.paymentType === "Credit Card"
                        ? props.data.ChangeDue
                        : props.data.RtxChangeDue,
                    RtxBalance: props.isTaxInvoice
                      ? props.data.Balance
                      : props.paymentType === "Credit Card"
                        ? props.data.Balance
                        : props.data.RtxBalance,
                    Discount: props.data.Discount,
                    Date: props.data.Date,
                    Datetrack: props.data.Datetrack,
                    DateTrackNumber: props.data.DateTrackNumber,
                    Department: props.data.department,
                    totalTaxFinal: props.data.totalTaxFinal,
                    totalTax: props.data.totalTax,
                    time: props.data.time,
                    timeRange: props.data.timeRange,
                    isBackedUp: configureStore.getState().SocketConn.isConn
                      ? true
                      : false,
                  })
                  .then(function () { });
              } else {
                dbhook
                  .select()
                  .from("sales_reports_totals")
                  .where("Date", props.data.Date)
                  .then(function (data) {
                    if (data.length !== 0) {
                      // console.log(data);
                      // console.log(props.data);

                      dbhook("sales_reports_totals")
                        .where("Date", props.data.Date)
                        .update({
                          GrandTotal:
                            props.data.GrandTotal + data[0].GrandTotal,
                          AmountPaid:
                            props.data.AmountPaid + data[0].AmountPaid,
                          ChangeDue: props.data.ChangeDue + data[0].ChangeDue,
                          Balance: props.data.Balance + data[0].Balance,
                          RtxGrandTotal: props.isTaxInvoice
                            ? props.data.GrandTotal + data[0].GrandTotal
                            : props.paymentType === "Credit Card"
                              ? props.data.GrandTotal + data[0].GrandTotal
                              : props.data.RtxGrandTotal + data[0].RtxGrandTotal,
                          RtxAmountPaid: props.isTaxInvoice
                            ? props.data.AmountPaid + data[0].AmountPaid
                            : props.paymentType === "Credit Card"
                              ? props.data.AmountPaid + data[0].AmountPaid
                              : props.data.RtxAmountPaid + data[0].RtxAmountPaid,
                          RtxChangeDue: props.isTaxInvoice
                            ? props.data.ChangeDue + data[0].ChangeDue
                            : props.paymentType === "Credit Card"
                              ? props.data.ChangeDue + data[0].ChangeDue
                              : props.data.RtxChangeDue + data[0].RtxChangeDue,
                          RtxBalance: props.isTaxInvoice
                            ? props.data.Balance + data[0].Balance
                            : props.paymentType === "Credit Card"
                              ? props.data.Balance + data[0].Balance
                              : props.data.RtxBalance + data[0].RtxBalance,
                          Discount: props.data.Discount + data[0].Discount,
                          totalTaxFinal:
                            props.data.totalTaxFinal +
                            Number(data[0].totalTaxFinal),
                          totalTax:
                            props.data.totalTax + Number(data[0].totalTax),
                        })
                        .then(function () { });
                    } else {
                      dbhook("sales_reports_totals")
                        .insert({
                          id: props.data.id,
                          Year: props.data.year,
                          Day: props.data.day,
                          Month: props.data.month,
                          SrNo: MainData.length + 1,
                          GrandTotal: props.data.GrandTotal,
                          AmountPaid: props.data.AmountPaid,
                          ChangeDue: props.data.ChangeDue,
                          Balance: props.data.Balance,
                          RtxGrandTotal: props.isTaxInvoice
                            ? props.data.GrandTotal
                            : props.paymentType === "Credit Card"
                              ? props.data.GrandTotal
                              : props.data.RtxGrandTotal,
                          RtxAmountPaid: props.isTaxInvoice
                            ? props.data.AmountPaid
                            : props.paymentType === "Credit Card"
                              ? props.data.AmountPaid
                              : props.data.RtxAmountPaid,
                          RtxChangeDue: props.isTaxInvoice
                            ? props.data.ChangeDue
                            : props.paymentType === "Credit Card"
                              ? props.data.ChangeDue
                              : props.data.RtxChangeDue,
                          RtxBalance: props.isTaxInvoice
                            ? props.data.Balance
                            : props.paymentType === "Credit Card"
                              ? props.data.Balance
                              : props.data.RtxBalance,
                          Discount: props.data.Discount,
                          Date: props.data.Date,
                          Datetrack: props.data.Datetrack,
                          DateTrackNumber: props.data.DateTrackNumber,
                          Department: props.data.department,
                          totalTaxFinal: props.data.totalTaxFinal,
                          totalTax: props.data.totalTax,
                          time: props.data.time,
                          timeRange: props.data.timeRange,
                          isBackedUp: configureStore.getState().SocketConn
                            .isConn
                            ? true
                            : false,
                        })
                        .then(function () { });
                    }
                  });
              }
            });
        });

      break;
    case "get_sales":
      // console.log(props);

      // if (configureStore.getState().SocketConn.isConn) {
      //   configureStore
      //     .getState()
      //     .SocketConn.socket.emit("GETSALESREPORT", props);
      //   configureStore
      //     .getState()
      //     .SocketConn.socket.on("SALESREPORTSALET", (recivedCallback) => {
      //       var data = recivedCallback;
      //       sendCallback({
      //         data,
      //       });
      //     });
      // } else {
      if (props.startTime === 0)
        dbhook
          .select()
          .from("sales_reports_totals")
          .leftJoin(
            "branches",
            "sales_reports_totals.Department",
            "branches.brancheId"
          )
          .whereBetween("DateTrackNumber", [props.startDate, props.endDate])
          .then(function (data) {
            // console.log(data);

            sendCallback({
              data,
            });
          });
      else
        dbhook
          .select()
          .from("sales_reports_totals")
          .leftJoin(
            "branches",
            "sales_reports_totals.Department",
            "branches.brancheId"
          )
          .whereBetween("DateTrackNumber", [props.startDate, props.endDate])
          .andWhere(function () {
            this.whereBetween("timeRange", [props.startTime, props.endTime]);
          })
          .then(function (data) {
            // console.log(data);
            sendCallback({
              data,
            });
          });
      // }

      break;
    case "getAll":
      dbhook
        .select()
        .from("sales_reports_totals")
        .then(function (data) {
          sendCallback({
            data,
          });
        });
      break;
    case "get_sales_byCustmore":
      // console.log(props);

      if (props.customer !== "")
        dbhook
          .select()
          .from("sales_reports_tikets")
          .where("Customer", props.customer)
          .whereBetween("dateRange", [props.startDate, props.endDate])
          .then(function (data) {
            // console.log(data);
            sendCallback({
              data,
            });
          });
      break;
    case "get_sales_tickets":
      dbhook
        .select()
        .from("sales_reports_tikets")
        .leftJoin(
          "branches",
          "sales_reports_tikets.Department",
          "branches.brancheId"
        )
        .leftJoin("users", "sales_reports_tikets.User", "users.id")
        .whereBetween("dateRange", [props.startDate, props.endDate])
        .then(function (data) {
          sendCallback({
            data,
          });
        });
      break;
    case "get_sales_tickets_byDate":
      dbhook
        .select()
        .from("sales_reports_tikets")
        .leftJoin(
          "branches",
          "sales_reports_tikets.Department",
          "branches.brancheId"
        )
        .leftJoin("users", "sales_reports_tikets.User", "users.id")
        .where({ Datetrack: props.date })
        .then(function (data) {
          sendCallback({
            data,
          });
        });
      break;
    case "get_sales_tickets_byDateRange":
      if (props.startTime === 0)
        dbhook
          .select()
          .from("sales_reports_tikets")
          .leftJoin(
            "branches",
            "sales_reports_tikets.Department",
            "branches.brancheId"
          )
          .leftJoin("users", "sales_reports_tikets.User", "users.id")
          .whereBetween("dateRange", [props.startDate, props.endDate])
          .then(function (data) {
            sendCallback({
              data,
            });
          });
      else
        dbhook
          .select()
          .from("sales_reports_tikets")
          .leftJoin(
            "branches",
            "sales_reports_tikets.Department",
            "branches.brancheId"
          )
          .leftJoin("users", "sales_reports_tikets.User", "users.id")
          .whereBetween("dateRange", [props.startDate, props.endDate])
          .andWhere(function () {
            this.whereBetween("timeRange", [props.startTime, props.endTime]);
          })
          .then(function (data) {
            // console.log(data);

            sendCallback({
              data,
            });
          });

      break;

    case "cancel_ticket":
      let arr = props.invoiceNumber.list.list;
      let amountToDeduct = 0;
      let totals = 0;
      let Totalsells = 0;

      const item = props.invoiceNumber.selectedItem;
      const totalToRemove =
        parseInt(props.invoiceNumber.amount) * props.invoiceNumber.selling;
      Totalsells = props.invoiceNumber.total - totalToRemove;

      const index = arr.findIndex((x) => x.productKey === item.productKey);

      if (arr[index].qnt === 1) {
        amountToDeduct = arr[index].sallingprice;
        arr.splice(index, 1);
      } else {
        if (parseInt(props.invoiceNumber.amount) === 1) {
          totals = arr[index].sallingprice * arr[index].qnt;

          arr[index].qnt =
            arr[index].qnt - parseInt(props.invoiceNumber.amount);
          amountToDeduct = arr[index].sallingprice;

          // console.log(totals);
        } else {
          totals = arr[index].sallingprice * arr[index].qnt;

          arr[index].qnt =
            arr[index].qnt - parseInt(props.invoiceNumber.amount);
          amountToDeduct =
            parseInt(props.invoiceNumber.amount) * arr[index].sallingprice;
        }
      }

      // console.log(props);

      // console.log(totals - arr[index].sallingprice);
      // console.log(arr);

      if (props.invoiceNumber.amount < 1)
        toast(`Amount to reduce is less then amount of product`, {
          position: "top-right",
          autoClose: 5000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      else
        dbhook("sales_reports_tikets")
          .where({ InvoiceNumber: props.invoiceNumber.invoiceNumber })
          .update({
            // isActive: false,
            TicketList: { list: arr },
            GrandTotal: Totalsells,
          })
          .then(function (data) {
            dbhook("returns")
              .insert({
                id: CreateId(),
                description: props.invoiceNumber.reason,
                productName: props.invoiceNumber.selectedItem.ItemName,
                qnt: props.invoiceNumber.amount,
                date: moment().format("LLLL"),
                time: moment().format("LT"),
                sallingprice: props.invoiceNumber.selectedItem.initalPrice,
                customer:
                  props.invoiceNumber.customer === ""
                    ? "Walking Customer"
                    : props.invoiceNumber.customer === null
                      ? "Walking Customer"
                      : props.invoiceNumber.customer,
                invoiceNumber: props.invoiceNumber.invoiceNumber,
              })
              .then((data) => {
                dbhook
                  .select()
                  .from("sales_reports_totals")
                  .where({ Day: props.invoiceNumber.Day })
                  .then(function (data) {
                    dbhook("sales_reports_totals")
                      .where({ Day: props.invoiceNumber.Day })
                      .update({
                        GrandTotal: data[0].GrandTotal - totalToRemove,
                      })
                      .then(function (data) {
                        sendCallback(true);
                      });
                  });
              });
          });

      break;

    case "all_get_sales_tickets":
      dbhook
        .select()
        .from("sales_reports_tikets")
        .leftJoin("customers", "sales_reports_tikets.Customer", "customers.id")
        .then(function (data) {
          sendCallback({
            data,
          });
        });
      break;

    case "get_sales_tickets_byCasher":
      // console.log(props);
      dbhook
        .select()
        .from("sales_reports_tikets")
        .where({ User: props.user.id })
        .whereBetween("dateRange", [props.startDate, props.endDate])
        .leftJoin("users", "sales_reports_tikets.User", "users.id")
        .then(function (data) {
          sendCallback({
            data,
          });
        });
      break;

    case "ServerBackup":
      if (props.tabelId === "tikets")
        dbhook("sales_reports_tikets")
          .where({ id: props.id })
          .update({
            isBackedUp: true,
          })
          .then(function (data) { });

    case "purchases":
      // console.log(props);

      props.purchaseSelected.map((nodes) => {
        dbhook("purchases")
          .insert({
            purchasesKey: CreateId(),
            productName: nodes.ItemName,
            group: nodes.id,
            sellingPrice: nodes.sellingPriceNew ? nodes.sellingPriceNew : nodes.sallingprice,
            sellingPriceOld: nodes.sallingprice,
            buyingPrice: nodes.costPrice ? nodes.costPrice : nodes.buyingPrice,
            buyingPriceOld: nodes.buyingPrice,
            supplier: nodes.supplierKey ? nodes.supplierKey : '',
            quantity: nodes.quantity,
            invoiceNumber: props.invoiceNumber,
            EventDate: props.EventDate,
            dateRange: props.dateRange,
            time: props.time,
          })
          .then(function () { });
      });

      sendCallback({});
      break;

    // case "get_returns":
    //   dbhook
    //     .select()
    //     .from("purchases")
    //     .whereBetween("dateRange", [props.startDate, props.endDate])
    //     .then(function (data) {
    //       sendCallback({
    //         data,
    //       });
    //     });
    //   break;

    case "get_returns":
      dbhook
        .select()
        .from("returns")
        // .whereBetween("dateRange", [props.startDate, props.endDate])
        .leftJoin("customers", "returns.customer", "customers.id")
        .then(function (data) {
          sendCallback({
            data,
          });
        });
      break;

    case "get_expenses":
      dbhook
        .select()
        .from("expenses")
        .whereBetween("dateRange", [props.startDate, props.endDate])
        .then(function (data) {
          sendCallback({
            data,
          });
        });
      break;
    case "expenses":
      dbhook("expenses")
        .insert({
          idKey: CreateId(),
          description: props.des,
          cost: props.amount,
          date: moment().format("LLLL"),
          time: moment().format("LT"),
          user: props.user,
          branch: props.branch,
          dateRange: props.dateRange,
        })
        .then(function () {
          sendCallback(true);
        });
      break;
    case "edit_expenses":
      dbhook("expenses")
        .where({ idKey: props.id })
        .update({
          description: props.des,
          cost: props.amount,
        })
        .then(function () {
          sendCallback(true);
        });
      break;
    case "delete_expenses":
      // console.log(list);
      dbhook("expenses")
        .where({ idKey: props.id })
        .del()
        .then(function () {
          sendCallback(true);
        });

      break;

    default:
      break;
  }
};
