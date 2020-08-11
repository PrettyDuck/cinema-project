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
} from "../utills/authTokensGenerators";
import { isAuth } from "../utills/isAuthMiddleware";
import UserType from "../types/UserType";
import { verify } from "jsonwebtoken";
import { sendRefreshToken } from "../utills/sendRefreshToken";
import LoginResponseType from "../types/LoginResponseType";

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
  @Mutation(() => LoginResponseType)
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
      sendRefreshToken(res, generateRefreshToken(user));

      return {
        accessToken: token,
        user: user,
      };
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() context: ContextType) {
    sendRefreshToken(context.res, "");
    return true;
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  sayHi(@Ctx() { payload }: ContextType) {
    return `Hi, dude your id is ${payload!.id}`;
  }

  @Query(() => UserType, { nullable: true })
  getCurrentUser(@Ctx() context: ContextType) {
    const auth = context.req.headers["authorization"];
    if (!auth) {
      return null;
    }
    try {
      const token = auth.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      context.payload = payload as any;
      return User.findOne(payload.id);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
