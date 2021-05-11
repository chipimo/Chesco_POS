// import Backup from "../../dataBase/updater";
// import configureStore from "../../store";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const uuidv4 = require("uuid/v4");

function CreateId() {
  return uuidv4();
}

function int(dbhook, sendCallback) {
  const Password = "1234";

  bcrypt.hash(Password, saltRounds, function (err, hash) {
    dbhook
      .select()
      .from("users")
      .then(function (config) {
        if (config.length === 0)
          dbhook("users")
            .insert({
              id: CreateId(),
              userName: "Admin",
              pin: hash,
              department: "all",
              prevarges: "1",
              notifications: JSON.stringify({ id: CreateId(), list: [] }),
            })
            .then(function () {
              sendCallback({ done: true });
            });
        else sendCallback({ done: true });
      });
  });
}

export const UserLogIn = (props, dbhook, sendCallback) => {
  // console.log(props);
  int(dbhook, (callback) => {
    // console.log(props);
    if (callback.done) {
      dbhook
        .select()
        // .where("userName", props.name)
        .from("users")
        .leftJoin("branches", "users.department", "branches.brancheId")
        .then(async function (config) {
          if (config.length !== 0) {
            const asyncRes = await Promise.all(
              config.map(async (i) => {
                const match = await bcrypt.compare(props.pin, i.pin);
                return match;
              })
            );

            const index = asyncRes.findIndex((x) => x === true);

            if (index !== -1) {
              return sendCallback({
                isLoggedIn: true,
                config: config[index],
              });
            } else return sendCallback({ isLoggedIn: false });
          } else sendCallback({ isLoggedIn: false });
        });
    }
  });
};

export const GetUsers = (dbhook, sendCallback) => {
  dbhook
    .select()
    .from("users")
    .leftJoin("branches", "users.department", "branches.brancheId")
    .then(function (config) {
      sendCallback(config);
    });
};

export const NewUser = (props, dbhook, sendCallback) => {
  // console.log(props);

  bcrypt.hash(props.pin, saltRounds, function (err, hash) {
    var data = {
      id: CreateId(),
      userName: props.userName,
      pin: hash,
      department: props.department,
      prevarges: props.prevarges,
      notifications: JSON.stringify({ id: CreateId(), list: [] }),
    };

    dbhook("users")
      .insert(data)
      .then(function () {
        sendCallback({ done: true });
      });
  });
  // Backup._UpdateUsers(data, (reciveCallback) => {});
};

export const EditUser = (props, dbhook, sendCallback) => {
  bcrypt.hash(props.pin, saltRounds, function (err, hash) {
    dbhook("users")
      .where({ id: props.id })
      .update({
        userName: props.userName,
        pin: hash,
        department: props.department,
        prevarges: props.prevarges,
      })
      .then(function () {
        sendCallback({ done: true });
      });
  });
};

export const DeleteUser = (props, dbhook, sendCallback) => {
  // console.log(props);
  dbhook("users")
    .where({ id: props.id })
    .del()
    .then(function () {
      sendCallback({ done: true });
    });
};
