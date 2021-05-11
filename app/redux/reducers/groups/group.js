"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
function CreateId() {
    return uuidv4();
}
var GetData = function (props, hook, callback) {
    hook
        .select()
        .from(props.table)
        .where(props.id, props.value)
        .then(function (data) {
        callback({
            data: data,
        });
    });
};
exports.SetGroups = function (props, dbhook, sendCallback) {
    GetData({ table: "group", id: "group", value: props.group }, dbhook, function (callback) {
        if (callback.data.length === 0) {
            dbhook("group")
                .insert({
                id: CreateId(),
                group: props.group,
                recipes: { data: [{ recipe: props.group }] },
                colors: props.colors,
                typeId: "not_set",
            })
                .then(function () {
                sendCallback({ isSet: true });
            });
        }
        else {
            sendCallback({ isSet: false });
        }
    });
};
exports.GetGroups = function (props, dbhook, sendCallback) {
    dbhook
        .select()
        .from("group")
        .then(function (data) {
        sendCallback({
            data: data,
        });
    });
};
exports.DeleteGroups = function (props, dbhook, sendCallback) {
    dbhook
        .select()
        .from("openTables")
        .then(function (data) {
        if (data.length != 0) {
            sendCallback({
                isDeleted: false,
                isOpenTabel: true
            });
        }
        else {
            dbhook("group")
                .where({ group: props.group.group })
                .del()
                .then(function (data) {
                dbhook("products")
                    .where({ category: props.group.group })
                    .del()
                    .then(function () {
                    dbhook("Tabs")
                        .where({ tabname: props.group.group })
                        .del()
                        .then(function () {
                        sendCallback({
                            isDeleted: true,
                            isOpenTabel: false
                        });
                    });
                });
            });
        }
    });
};
exports.EditGroup = function (props, dbhook, sendCallback) {
    dbhook
        .select()
        .from("openTables")
        .then(function (data) {
        if (data.length != 0) {
            sendCallback({ done: false, isOpenTabel: true });
        }
        else {
            dbhook("group")
                .where({ group: props.group.groupName })
                .update({
                group: props.value,
            })
                .then(function () {
                dbhook("products")
                    .where({ category: props.group.groupName })
                    .update({
                    category: props.value
                })
                    .then(function () {
                    dbhook("Tabs")
                        .where({ tabname: props.group.groupName })
                        .update({
                        tabname: props.value
                    })
                        .then(function () {
                        sendCallback({ done: true, isOpenTabel: false });
                    });
                });
            });
        }
    });
};
//# sourceMappingURL=group.js.map