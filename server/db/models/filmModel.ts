import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Film extends Model {}
Film.init(
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
    year: {
      type: DataTypes.INTEGER,
    },
    filmDirector: {
      type: DataTypes.STRING,
    },
    filmDescription: {
      type: DataTypes.STRING,
    },
    averageRating: {
      type: DataTypes.FLOAT,
    },
    coverImage: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    indexes: [{ unique: false, fields: ["createdAt"] }],
    modelName: "film",
  }
);

export default Film;
