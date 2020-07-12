import { Query, Arg, Resolver } from "type-graphql";
import CategoryType from "../types/CategoryType";
import Category from "../../db/models/categoryModel";

@Resolver()
export class CategoryResolver {
  @Query(() => [CategoryType])
  async getFilmCategories(
    @Arg("filmCategoriesId", () => String) filmCategoriesId: string
  ) {
    try {
      let resultArray = [];
      for await (let element of filmCategoriesId.split(",")) {
        const res = await Category.findAll({
          where: { id: parseInt(element) },
        });
        console.log(res);
        resultArray.push(res[0]);
      }
      return resultArray;
    } catch (error) {}
  }
}
