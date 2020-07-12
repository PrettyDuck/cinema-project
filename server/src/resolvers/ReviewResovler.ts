import { Query, Mutation, Arg, Resolver, Int } from "type-graphql";
import { ReviewInput } from "../input-types/ReviewInputs";
import ReviewType from "../types/ReviewType";
import Review from "../../db/models/reviewModel";
import Film from "../../db/models/filmModel";

@Resolver()
export class ReviewResolver {
  @Mutation(() => ReviewType)
  async addReview(
    @Arg("filmId", () => Int) filmId: number,
    @Arg("input", () => ReviewInput) input: ReviewInput
  ) {
    try {
      const targetFilm: any = await Film.findByPk(filmId);
      const res = await targetFilm.createFilm_review(input);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  @Query(() => [ReviewType])
  async getFilmReviews(@Arg("filmId", () => Int) filmId: number) {
    try {
      const targetFilm: any = await Film.findByPk(filmId);
      const res = await targetFilm.getFilm_reviews();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
