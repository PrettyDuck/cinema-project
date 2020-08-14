import { Query, Mutation, Arg, Resolver, Int, UseMiddleware } from "type-graphql";
import CategoryType from "../types/CategoryType";
import Category from "../../db/models/categoryModel";
import Film from "../../db/models/filmModel";
import { isAuth } from "../utills/isAuthMiddleware";
import { isAdmin } from "../utills/isAdminMiddleware";

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
  @UseMiddleware(isAuth,isAdmin)
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
      return `Relation between film with id:${filmId} and category with id:${categoryId} formed successfully`;
    } catch (err) {
      console.log(err);
    }
  }
}
