import { ObjectType, Int, Field } from "type-graphql";
import FilmType from "./FilmType";

@ObjectType({ description: "Actor Type" })
class ActorType {
  @Field(() => Int)
  id!: number;
  @Field(() => String)
  name!: string;
  @Field(() => Int)
  birthYear!: number;
  @Field(() => String)
  actorBio!: string;
  @Field(() => String)
  profilePhoto!: string;
  @Field(() => [FilmType])
  films?: [FilmType];
}

export default ActorType;
