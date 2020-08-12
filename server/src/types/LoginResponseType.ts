import { ObjectType, Field } from "type-graphql";
import UserType from "./UserType";

@ObjectType()
class LoginResponseType {
  @Field(() => String)
  accessToken?: string;
  @Field(() => UserType)
  user?: UserType;
}
export default LoginResponseType;
