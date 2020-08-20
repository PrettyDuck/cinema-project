import { Query, Resolver } from "type-graphql";
import CategoryType from "../types/CategoryType";
import Category from "../../db/models/categoryModel";

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
}
