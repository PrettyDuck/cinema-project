import { ObjectType, Int, Field } from "type-graphql";

@ObjectType({ description: "Review Type" })
class ReviewType {
  @Field(() => Int)
  id!: number;
  @Field()
  ownerName!: string;
  @Field(() => Int)
  ratingPoint!: number;
  @Field(() => String)
  reviewText!: string;
}
export default ReviewType;
