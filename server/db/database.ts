import { Sequelize } from "sequelize";

const sequelize = new Sequelize("filmsdb", "root", "Redoctopus353", {
  host: "localhost",
  // host: "mysqlHost",
  dialect: "mysql",
});

export default sequelize;
