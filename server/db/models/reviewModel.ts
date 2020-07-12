import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Review extends Model {}
Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ownerName: {
      type: DataTypes.STRING,
    },
    ratingPoint: {
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

export default Review;
