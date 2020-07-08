const Sequelize = require("sequelize");

const sequelize = new Sequelize("filmsdb", "root", "Redoctopus353", {
  host:"mysqlHOST",
  dialect: "mysql"
});

module.exports = sequelize;
