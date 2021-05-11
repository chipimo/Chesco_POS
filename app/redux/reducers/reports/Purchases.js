"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv1 = require("uuid/v1");
function CreateId() {
    return uuidv1();
}
exports.Purchases = function (dbhook, props, sendCallback) {
    console.log(props);
    if (props.type === "new")
        dbhook("purchases")
            .insert({
            purchasesKey: CreateId(),
            productName: props.productName,
            group: props.group,
            sellingPrice: props.sellingPrice,
            sellingPriceOld: props.sellingPriceOld,
            buyingPrice: props.buyingPrice,
            buyingPriceOld: props.buyingPriceOld,
            supplier: props.supplier,
            quantity: props.quantity,
            invoiceNumber: props.invoiceNumber,
            EventDate: props.EventDate,
            dateRange: props.dateRange,
            time: props.time,
        })
            .then(function () {
            sendCallback(true);
        });
};
exports.GetPurchases = function (dbhook, props, sendCallback) {
    dbhook("purchases")
        .select()
        .leftJoin("suppliers", "purchases.supplier", "suppliers.supplierKey")
        .leftJoin("group", "purchases.group", "group.id")
        .whereBetween("dateRange", [props.startDate, props.endDate])
        .then(function (data) {
        console.log(data);
        sendCallback(data);
    });
};
//# sourceMappingURL=Purchases.js.map