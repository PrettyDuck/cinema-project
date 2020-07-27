import { ObjectType, Int, Float, Field } from "type-graphql";
import ActorType from "./ActorType";
import CategoryType from "./CategoryType";

@ObjectType({ description: "Film Type" })
class FilmType {
  @Field(() => Int)
  id!: number;
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
  @Field(() => String)
  coverImage!: string;
  @Field(() => [ActorType])
  actors?: [ActorType];
  @Field(() => [CategoryType])
  categories?: [CategoryType];
}
export default FilmType;
