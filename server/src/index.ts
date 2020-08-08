import "reflect-metadata";
import express from "express";
import sequelize from "../db/database";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { FilmResolver } from "./resolvers/FilmResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { ReviewResolver } from "./resolvers/ReviewResovler";
import { ActorResolver } from "./resolvers/ActorResolver";
import { UserResolver } from "./resolvers/UserResolver";
import initRelations from "../db/relations";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import User from "../db/models/userModel";
import { generateRefreshToken, generateAccessToken } from "./utills/authTokens";

(async () => {
  const app = express();
  dotenv.config();
  const PORT: number = 5000;
  app.use(cookieParser());
  // route for token refreshing
  app.post("/refresh_token", (req, res) => {
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
    const user = User.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    // Generate new refresh token also
    res.cookie("id", generateRefreshToken(user), {
      httpOnly: true,
    });

    return res.send({ ok: true, accessToken: generateAccessToken(user) });
  });

  app.use(cors());
  app.use("/uploads", express.static("uploads"));
  app.use("/films/uploads", express.static("uploads"));
  app.use("/actors/uploads", express.static("uploads"));

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        FilmResolver,
        CategoryResolver,
        ReviewResolver,
        ActorResolver,
        UserResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
    uploads: false,
  });
  appoloServer.applyMiddleware({ app, cors: false });
  initRelations();

  let attempts: number = 20;
  while (attempts) {
    try {
      await sequelize.sync().then(() => {
        app.listen(PORT, () => {
          console.log(`Server started on port ${PORT}`);
        });
      });
      break;
    } catch (error) {
      console.log(error);
      console.log(`Attempts remain: ${attempts}`);
      attempts -= 1;
      await new Promise((resolve) => setTimeout(resolve, 60000));
    }
  }
})();
