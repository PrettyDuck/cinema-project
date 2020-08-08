import {
  Resolver,
  Mutation,
  Query,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { genSalt, hash, compare } from "bcryptjs";
import { RegisterUserInput, LoginUserInput } from "../input-types/UserInputs";
import User from "../../db/models/userModel";
import { ContextType } from "../types/ContextType";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utills/authTokens";
import { isAuth } from "../utills/isAuthMiddleware";

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async register(@Arg("input") input: RegisterUserInput) {
    try {
      const { name, email, password } = input;
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      console.log(hashedPassword);
      const role = "USER_ROLE";
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      return "New User Registered Successfully!";
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => String)
  async login(@Arg("input") input: LoginUserInput, @Ctx() ctx: ContextType) {
    const { req, res } = ctx;
    const { email, password } = input;
    try {
      const user: any = await User.findOne({
        where: { email: email },
      });
      if (!user) {
        return "User is not exist";
      }
      const valid = await compare(password, user.password);
      if (!valid) {
        return "Password is not valid";
      }
      // Access token
      const token = generateAccessToken(user);

      // Refresh token
      res.cookie("id", generateRefreshToken(user), {
        httpOnly: true,
      });

      return token;
    } catch (err) {
      console.log(err);
    }
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  sayHi(@Ctx() { payload }: ContextType) {
    return `Hi, dude your id is ${payload!.id}`;
  }
}
