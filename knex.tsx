const environment = "development";
const config = require("./knexfile");
const environmentConfig = config[environment];
const knex = require("knex");
const { Model } = require("objection");
const connection = knex(environmentConfig);

try {
  Model.knex(connection);

  module.exports = connection;
} catch (error) {
  console.log(error);
}
