import { Sequelize } from "sequelize";
import "dotenv/config"

const sequelize = new Sequelize("filmsdb", process.env.DB_USER!, process.env.DB_PASS, {
  // host: "localhost",
  host: "mysqlHost",
  dialect: "mysql",
});

export default sequelize;
