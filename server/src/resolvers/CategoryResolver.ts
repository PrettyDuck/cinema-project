import { Query, Mutation, Arg, Resolver, Int } from "type-graphql";
import CategoryType from "../types/CategoryType";
import Category from "../../db/models/categoryModel";
import Film from "../../db/models/filmModel";

@Resolver()
export class CategoryResolver {
  @Query(() => [CategoryType])
  async categories() {
    try {
      const res = await Category.findAll();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => String)
  async addFilmCategory(
    @Arg("categoryId", () => Int) categoryId: number,
    @Arg("filmId", () => Int) filmId: number
  ) {
    try {
      const targetFilm: any = await Film.findByPk(filmId);
      const targetCategory: any = await Category.findByPk(categoryId);
      await targetFilm.addCategory(targetCategory);
      const res: any = await Film.findOne({
        where: { id: filmId },
        include: Category,
      });
      console.log(res.toJSON());
      return `Relation between film with id:${filmId} and actor whith id:${categoryId} formed successfully`;
    } catch (err) {
      console.log(err);
    }
  }
}