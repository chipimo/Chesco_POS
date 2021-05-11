"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v1");
exports.GetOffLineBranchesList = function (dbhook, callback) {
    dbhook
        .select()
        .from("branches")
        .then(function (config) {
        callback(config);
    });
};
exports.SetOffLineBranchesList = function (props, dbhook, callback) {
    dbhook("branches")
        .insert({
        brancheId: uuidv4(),
        company: props.company,
        branche: props.branche,
    })
        .then(function () {
        callback({ isSet: true });
    });
};
exports.EditBranch = function (props, dbhook, callback) {
    dbhook("branches")
        .where({ branche: props.oldBranchName })
        .update({
        branche: props.newBranchName,
    })
        .then(function () {
        callback({ done: true });
    });
};
exports.DeleteBranch = function (props, dbhook, callback) {
    dbhook("branches")
        .where({ branche: props.newBranchName })
        .del()
        .then(function (data) {
        callback({
            isDeleted: true,
        });
    });
};
//# sourceMappingURL=branch.js.map