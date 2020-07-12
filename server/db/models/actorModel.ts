import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Actor extends Model {}
Actor.init(
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
    age: {
      type: DataTypes.INTEGER,
    },
    profilePhoto: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "actor",
    timestamps: false,
  }
);

export default Actor;
