// Update with your config settings.
const db = require("electron-db");

db.getAll("config", (succ, data) => {
  module.exports = {
    development: {
      client: "pg",
      connection: {
        user: data[0].user,
        host: data[0].host,
        password: data[0].password,
        port: data[0].port,
        database: data[0].database,
        ssl: false,
      },
    },
  };
});
