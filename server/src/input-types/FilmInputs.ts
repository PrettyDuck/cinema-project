import { Int, Float, InputType, Field } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";

@InputType()
class FilmInput {
  @Field(() => String)
  name!: string;
  @Field(() => Int)
  year!: number;
  @Field(() => String)
  filmDirector!: string;
  @Field(() => String)
  filmDescription!: string;
  @Field(() => Float)
  averageRating!: number;
  @Field(() => GraphQLUpload)
  coverImage!: FileUpload;
  @Field(() => [Int])
  filmCategories!: [number];
  @Field(() => [Int])
  filmActors!: [number];
}

@InputType()
class FilmUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  year?: number;
  @Field(() => String, { nullable: true })
  filmDirector?: string;
  @Field(() => String, { nullable: true })
  filmDescription?: string;
  @Field(() => Float, { nullable: true })
  averageRating?: number;
  @Field(() => GraphQLUpload, { nullable: true })
  coverImage?: FileUpload;
  @Field(() => [Int], { nullable: true })
  filmCategories!: [number];
  @Field(() => [Int], { nullable: true })
  filmActors!: [number];
}

export { FilmInput, FilmUpdateInput };
