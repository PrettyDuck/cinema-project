const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/database");

class Category extends Model {}
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "film_category",
    timestamps: false
  }
);

module.exports = Category;
