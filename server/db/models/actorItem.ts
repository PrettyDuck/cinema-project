import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class ActorItem extends Model {}
ActorItem.init(
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
    modelName: "actor_item",
    timestamps: false,
  }
);

export default ActorItem;
