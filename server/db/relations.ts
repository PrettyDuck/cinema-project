import Review from "./models/reviewModel";
import Film from "./models/filmModel";
import Category from "./models/categoryModel";
import Actor from "./models/actorModel";
import ActorItem from "./models/actorItem";
import CategoryItem from "./models/categoryItem";

export default () => {
  Category;
  Review.belongsTo(Film, { constraints: true, onDelete: "CASCADE" });
  Film.hasMany(Review);
  Film.belongsToMany(Category, { through: CategoryItem });
  Actor.belongsToMany(Film, { through: ActorItem });
  Film.belongsToMany(Actor, { through: ActorItem });
};
