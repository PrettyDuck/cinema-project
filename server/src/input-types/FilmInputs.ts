import { Int, Float, InputType, Field } from "type-graphql";

@InputType()
class FilmInput {
  @Field(() => String)
  name!: string;
  @Field(() => String)
  categoriesId!: string;
  @Field(() => Int)
  year!: number;
  @Field(() => String)
  filmDirector!: string;
  @Field(() => String)
  filmDescription!: string;
  @Field(() => Float)
  averageRating!: number;
  @Field(() => String)
  coverImage!: string;
}

@InputType()
class FilmUpdateInput {
  @Field(() => String)
  name?: string;
  @Field(() => String)
  categoriesId?: string;
  @Field(() => Int)
  year?: number;
  @Field(() => String)
  filmDirector?: string;
  @Field(() => String)
  filmDescription?: string;
  @Field(() => Float)
  averageRating?: number;
  @Field(() => String)
  coverImage?: string;
}

export { FilmInput, FilmUpdateInput };
