"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
function CreateId() {
    return uuidv4();
}
exports.GetSuppliers = function (dbhook, sendCallback) {
    dbhook
        .select()
        .from("suppliers")
        .then(function (config) {
        sendCallback(config);
    });
};
exports.EditSupppliers = function (props, dbhook, sendCallback) {
    dbhook("suppliers")
        .where({ supplierKey: props.newData.supplierKey })
        .update({
        SupplierName: props.newData.SupplierName,
        address: props.newData.address,
        contact: props.newData.contact,
    })
        .then(function () {
        sendCallback({ done: true });
    });
};
exports.SetSuppliers = function (props, dbhook, sendCallback) {
    dbhook("suppliers")
        .insert({
        supplierKey: CreateId(),
        SupplierName: props.SupplierName,
        address: props.SupplierAddress,
        contact: props.SupplierContact,
    })
        .then(function () {
        sendCallback({ isSet: true });
    });
};
exports.DeleteSupplier = function (props, dbhook, sendCallback) {
    dbhook("suppliers")
        .where({ supplierKey: props.oldData.supplierKey })
        .del()
        .then(function (data) {
        sendCallback({
            isDeleted: true,
        });
    });
};
//# sourceMappingURL=Suppliers.js.map