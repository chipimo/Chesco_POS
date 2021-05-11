const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
}

export const GetSuppliers = (dbhook, sendCallback) => {
  dbhook
    .select()
    .from("suppliers")
    .then(function (config) {
      sendCallback(config);
    });
};

export const EditSupppliers = (props, dbhook, sendCallback) => {
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

export const SetSuppliers = (props, dbhook, sendCallback) => {
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

export const DeleteSupplier = (props, dbhook, sendCallback) => {
  dbhook("suppliers")
    .where({ supplierKey: props.oldData.supplierKey })
    .del()
    .then(function (data) {
      sendCallback({
        isDeleted: true, 
      });
    });
};
