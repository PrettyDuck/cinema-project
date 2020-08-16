import {
  Query,
  Mutation,
  Arg,
  Resolver,
  Int,
  UseMiddleware,
} from "type-graphql";
import { ReviewInput } from "../input-types/ReviewInputs";
import ReviewType from "../types/ReviewType";
import Film from "../../db/models/filmModel";
import { isAuth } from "../utills/isAuthMiddleware";
import Review from "../../db/models/reviewModel";

@Resolver()
export class ReviewResolver {
  @Mutation(() => ReviewType)
  @UseMiddleware(isAuth)
  async addReview(
    @Arg("filmId", () => Int) filmId: number,
    @Arg("userId", () => Int) userId: number,
    @Arg("input", () => ReviewInput) input: ReviewInput
  ) {
    try {
      const targetFilm: any = await Film.findByPk(filmId);
      const res = await targetFilm.createFilm_review({
        userId,
        ...input,
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  async deleteReview(@Arg("id", () => Int) id: number) {
    try {
      await Review.destroy({ where: { id: id } });
      console.log("Review Deleted");
      return `Review with id: ${id} deleted successfully!`;
    } catch (err) {
      console.log(err);
    }
  }
  @Query(() => [ReviewType])
  async reviews(@Arg("filmId", () => Int) filmId: number) {
    try {
      const targetFilm: any = await Film.findByPk(filmId);
      const res = await targetFilm.getFilm_reviews();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
