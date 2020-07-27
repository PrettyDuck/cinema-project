import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Category extends Model {}
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "category",
    timestamps: false,
  }
);

export default Category;
