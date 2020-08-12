import { MiddlewareFn } from "type-graphql";
import { ContextType } from "../types/ContextType";
import User from "../../db/models/userModel";

export const isAdmin: MiddlewareFn<ContextType> = async ({ context }, next) => {
  const user: any = await User.findOne({
    where: { id: context.payload?.userId },
  });
  if (user) {
    if (user.role !== "ADMIN_ROLE") {
      throw Error("Invalid Premission");
    }
  } else {
    throw Error("Premission Error");
  }

  return next();
};
