"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
var licenseKey = require("license-key-gen");
function CreateId() {
    return uuidv4();
}
exports.ConfigFile = function (props, dbhook, callback) {
    if (props.type === "checkConfig") {
        dbhook
            .select()
            .from("department_config")
            .then(function (config) {
            callback({
                config: config,
            });
        });
    }
    else if (props.type === "set") {
        // var data = null;
        // if (props.dataType === "selecte") data = props.props.DepSelected.data;
        // else data = props.data.result.departments[0];
        dbhook("department_config")
            .insert({
            id: CreateId(),
            dep_name: props.data.compInfo.brancheName,
            theme: "light",
            phone: props.data.compInfo.phone,
            shopNo: "not set",
            road: props.data.compInfo.street,
            city: props.data.compInfo.city,
            province: props.data.compInfo.province,
            appId: props.data.compInfo.appId,
            tpin: "not set",
            taxType: "not set",
            taxRat: 16,
            notifications: JSON.stringify({}),
        })
            .then(function () {
            dbhook
                .select()
                .from("department_config")
                .then(function (department) {
                callback({
                    isSet: true,
                    department: department,
                });
            });
        });
    }
};
exports.UpdateTax = function (props, dbhook, SendCallback) {
    dbhook("department_config")
        .update({
        taxType: props.ProductName,
        taxRat: props.tax,
        tpin: props.tpin,
    })
        .then(function () {
        dbhook
            .select()
            .from("department_config")
            .then(function (config) {
            SendCallback({ isSet: true, config: config });
        });
    });
};
exports.UpdateDepartment = function (props, dbhook, SendCallback) {
    // console.log(props);
    // dbhook("department_config")
    //   .update({
    //     dep_name: props.data.newData.dep_name,
    dbhook("department_config")
        .update({
        dep_name: props.data.newData.dep_name,
        phone: props.data.newData.phone,
        shopNo: props.data.newData.shopNo,
        road: props.data.newData.road,
        tpin: props.data.newData.tpin,
        taxType: props.data.newData.taxType,
        taxRat: props.data.newData.taxRat,
    })
        .then(function () {
        dbhook
            .select()
            .from("department_config")
            .then(function (config) {
            SendCallback({ isSet: true, config: config });
        });
    });
};
exports.UpdateTheme = function (props, dbhook, SendCallback) {
    switch (props._type) {
        case "setTheme":
            dbhook("department_config")
                .update({
                theme: props.theme,
            })
                .then(function () { });
            break;
        case "getTheme":
            dbhook
                .select()
                .from("department_config")
                .then(function (config) {
                SendCallback({ isSet: true, config: config });
            });
            break;
        default:
            break;
    }
};
exports.SetProductKey = function (props, dbhook, SendCallback) {
    var dateNow = new Date(); // Creating a new date object with the current date and time
    var year = dateNow.getFullYear();
    var userInfo = {
        company: props.company,
        road: props.street,
        city: props.city,
        province: props.province,
        appId: props.appId,
        phone: props.phone,
        year: year,
    };
    var userLicense = {
        info: userInfo,
        prodCode: props.appId,
        osType: "WIN10",
    };
    try {
        var license = licenseKey.validateLicense(userLicense, props.license);
        // console.log(license);
        dbhook("licenseKey").insert({
            key: props.license,
        });
    }
    catch (err) {
        console.log(err);
    }
};
//# sourceMappingURL=index.js.map