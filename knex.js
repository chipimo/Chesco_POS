var environment = "development";
var config = require("./knexfile");
var environmentConfig = config[environment];
var knex = require("knex");
var Model = require("objection").Model;
var connection = knex(environmentConfig);
try {
    Model.knex(connection);
    module.exports = connection;
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=knex.js.map