import { InputType, Field } from "type-graphql";

@InputType()
class RegisterUserInput {
  @Field(() => String)
  name!: string;
  @Field(() => String)
  email!: string;
  @Field(() => String)
  password!: string;
}

@InputType()
class LoginUserInput {
  @Field(() => String)
  email!: string;
  @Field(() => String)
  password!: string;
}

export { RegisterUserInput, LoginUserInput };
