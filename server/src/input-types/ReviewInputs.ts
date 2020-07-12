import { Int, InputType, Field } from "type-graphql";

@InputType()
class ReviewInput {
  @Field(() => String)
  ownerName!: string;
  @Field(() => Int)
  ratingPoint!: number;
  @Field(() => String)
  reviewText!: string;
}

export { ReviewInput };
