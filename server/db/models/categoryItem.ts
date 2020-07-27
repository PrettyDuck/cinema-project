import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class CategoryItem extends Model {}
CategoryItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "film_category_item",
    timestamps: false,
  }
);

export default CategoryItem;
