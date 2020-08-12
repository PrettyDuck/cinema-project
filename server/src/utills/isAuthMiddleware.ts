import { MiddlewareFn } from "type-graphql";
import { ContextType } from "../types/ContextType";
import { verify } from "jsonwebtoken";

// format = bearer [token it'self]

export const isAuth: MiddlewareFn<ContextType> = ({ context }, next) => {
  const auth = context.req.headers["authorization"];
  if (!auth) {
    throw new Error("Permission denied. Not authenticated user");
  }
  try {
    const token = auth.split(" ")[1];
    const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = { userId: payload.userId };
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated user");
  }
  return next();
};
