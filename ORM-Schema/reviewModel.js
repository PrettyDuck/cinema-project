const { Model, DataTypes } = require("sequelize");
const sequelize = require("./database");

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
    reviewText: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "ORM_film_review",
    timestamps: false,
  }
);

module.exports = Review;
