import { Sequelize } from "sequelize";

const sequelize = new Sequelize("filmsdb", "root", "Redoctopus353", {
  host: "mysqlHost",
  dialect: "mysql",
});

export default sequelize;
