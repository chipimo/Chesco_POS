const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
}

const GetData = (props, hook, callback) => {
  hook
    .select()
    .from(props.table)
    .where(props.id, props.value)
    .then(function (data) {
      callback({
        data,
      });
    });
};

export const SetGroups = (props, dbhook, sendCallback) => {
  GetData(
    { table: "group", id: "group", value: props.group },
    dbhook,
    (callback) => {
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
      } else {
        sendCallback({ isSet: false });
      }
    }
  );
};

export const GetGroups = (props, dbhook, sendCallback) => {
  dbhook
    .select()
    .from("group")
    .then(function (data) {
      sendCallback({
        data,
      });
    });
};

export const DeleteGroups = (props, dbhook, sendCallback) => {
  dbhook
    .select()
    .from("openTables")
    .then(data => {
      if (data.length != 0) {
        sendCallback({
          isDeleted: false,
          isOpenTabel: true
        });
      } else {

        dbhook("group")
          .where({ group: props.group.group })
          .del()
          .then(function (data) {
            
            dbhook("products")
              .where({ category: props.group.group })
              .del()
              .then(() => {

                dbhook("Tabs")
                  .where({ tabname: props.group.group })
                  .del()
                  .then(() => {
                    sendCallback({
                      isDeleted: true,
                      isOpenTabel: false
                    });
                  })

              })

          });
      }
    })

};

export const EditGroup = (props, dbhook, sendCallback) => {
  dbhook
    .select()
    .from("openTables")
    .then(data => {
      if (data.length != 0) {
        sendCallback({ done: false, isOpenTabel: true });
      } else {

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
              .then(() => {
                dbhook("Tabs")
                  .where({ tabname: props.group.groupName })
                  .update({
                    tabname: props.value
                  })
                  .then(() => {
                    sendCallback({ done: true, isOpenTabel: false });
                  })
              })
          });
      }
    })

};
