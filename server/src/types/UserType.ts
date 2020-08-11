import { ObjectType, Int, Field } from "type-graphql";

@ObjectType({ description: "User Type" })
class UserType {
  @Field(() => Int)
  id!: number;
  @Field(() => String)
  name!: string;
  @Field(() => String)
  email!: string;
}

export default UserType;
