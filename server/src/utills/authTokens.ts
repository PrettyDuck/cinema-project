import { sign } from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
  const payload = {
    id: user.id,
  };
  const s: string = process.env.ACCESS_TOKEN_SECRET!;
  // Generate token
  return sign(payload, s, { expiresIn: 36000 });
};

export const generateRefreshToken = (user: any) => {
  const payload = {
    id: user.id,
  };
  const rs: string = process.env.REFRESH_TOKEN_SECRET!;
  // Generate Refresh Token
  return sign(payload, rs, { expiresIn: "7d" });
};
