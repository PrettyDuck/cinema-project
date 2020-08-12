import express from "express";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../utills/authTokensGenerators";
import { verify } from "jsonwebtoken";
import User from "../../db/models/userModel";
import { sendRefreshToken } from "../utills/sendRefreshToken";

const router = express.Router();

// route for token refreshing
router.post("/", async (req, res) => {
  // console.log(req.headers);
  const token = req.cookies.id;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }
  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    console.log(error);
    return res.send({ ok: false, accessToken: "" });
  }
  // Token is valid
  const user = await User.findOne({
    where: {
      id: payload.userId,
    },
  });
  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  // Generate new refresh token also
  sendRefreshToken(res, generateRefreshToken(user));

  return res.send({ ok: true, accessToken: generateAccessToken(user) });
});

export default router;
