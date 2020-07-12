import Review from "./models/reviewModel";
import Film from "./models/filmModel";
import Category from "./models/categoryModel";
import Actor from "./models/actorModel";
import ActorItem from "./models/actorItem";

export default () => {
  Category;
  Review.belongsTo(Film, { constraints: true, onDelete: "CASCADE" });
  Film.hasMany(Review);
  Actor.belongsToMany(Film, { through: ActorItem });
  Film.belongsToMany(Actor, { through: ActorItem });
};
