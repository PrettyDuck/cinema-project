const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/database");

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
    categoryId: {
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
    modelName: "film",
    timestamps: false,
  }
);

module.exports = Film;
