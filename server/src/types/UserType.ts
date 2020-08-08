import { ObjectType, Int, Field } from "type-graphql";

@ObjectType({ description: "Actor Type" })
class UserType {
  @Field(() => Int)
  id!: number;
  @Field(() => String)
  name!: string;
  @Field(() => String)
  email!: string;
  @Field(() => String)
  password!: string;
}

export default UserType;
