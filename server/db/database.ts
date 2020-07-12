import { Sequelize } from "sequelize";

const sequelize = new Sequelize("filmsdb", "root", "Redoctopus353", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
