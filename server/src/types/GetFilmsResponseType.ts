import { ObjectType, Field } from "type-graphql";
import FilmType from "./FilmType";

@ObjectType()
class GetFilmsResponseType {
  @Field(() => [FilmType])
  filmsData!: [FilmType];
  @Field(() => Boolean)
  hasMore?: boolean;
}
export default GetFilmsResponseType;
