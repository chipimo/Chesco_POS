const uuidv4 = require("uuid/v1");

export const GetOffLineBranchesList = (dbhook, callback) => {
  dbhook
    .select()
    .from("branches")
    .then(function (config) {
      callback(config);
    });
};

export const SetOffLineBranchesList = (props, dbhook, callback) => {
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

export const EditBranch = (props, dbhook, callback) => {
  dbhook("branches")
    .where({ branche: props.oldBranchName })
    .update({
      branche: props.newBranchName,
    })
    .then(function () {
      callback({ done: true });
    });
};

export const DeleteBranch = (props, dbhook, callback) => {
  dbhook("branches")
    .where({ branche: props.newBranchName })
    .del()
    .then(function (data) {
      callback({
        isDeleted: true,
      });
    });
};
