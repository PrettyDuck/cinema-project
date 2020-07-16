import { ObjectType, Int, Field } from "type-graphql";

@ObjectType({ description: "Actor Type" })
class ActorType {
  @Field(() => Int)
  id!: number;
  @Field(()=>String)
  name!: string
  @Field(()=>Int)
  birthYear!: number
  @Field(()=> String)
  profilePhoto!: string
}

export default ActorType;
