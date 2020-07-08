const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/database");

class Review extends Model {}
Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    reviewOwnerName: {
      type: DataTypes.STRING,
    },
    reviewPoints: {
      type: DataTypes.INTEGER,
    },
    reviewText: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "film_review",
    timestamps: false,
  }
);

module.exports = Review;
