import { sign } from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
  return sign({ userId: `${user.id}` }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user: any) => {
  return sign({ userId: `${user.id}` }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
