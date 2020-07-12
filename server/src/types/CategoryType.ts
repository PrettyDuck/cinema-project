import { ObjectType, Int, Field } from "type-graphql";

@ObjectType({ description: "Category Type" })
class CategotyType {
  @Field(() => Int)
  id!: number;
  @Field(() => String)
  name!: string;
}
export default CategotyType;
