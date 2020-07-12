import { ObjectType, Int, Float, Field } from "type-graphql";
import CategoryType from "../types/CategoryType";

@ObjectType({ description: "Film Type" })
class FilmType {
  @Field(() => Int)
  id!: number;
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
export default FilmType;
