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
    birthYear: {
      type: DataTypes.INTEGER,
    },
    actorBio: {
      type: DataTypes.TEXT,
    },
    profilePhoto: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "actor",
    timestamps: false,
  }
);

export default Actor;
