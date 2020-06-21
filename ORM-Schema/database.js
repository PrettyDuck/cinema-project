const Sequelize = require("sequelize");



const sequelize = new Sequelize("filmsdb", "root", "Redoctopus353", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
