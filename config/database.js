const Sequelize = require("sequelize");
module.exports = new Sequelize("exampledb", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false
});
