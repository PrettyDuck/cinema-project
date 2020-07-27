import { Int, Float, InputType, Field } from "type-graphql";
import { GraphQLUpload, FileUpload} from "graphql-upload";

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
}

@InputType()
class FilmUpdateInput {
  @Field(() => String)
  name?: string;
  @Field(() => Int)
  year?: number;
  @Field(() => String)
  filmDirector?: string;
  @Field(() => String)
  filmDescription?: string;
  @Field(() => Float)
  averageRating?: number;
  @Field(() => GraphQLUpload)
  coverImage?: FileUpload;
}

export { FilmInput, FilmUpdateInput };
