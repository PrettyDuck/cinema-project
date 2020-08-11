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
import refreshTokenRoute from "./routes/refreshTokenRoute";

(async () => {
  const app = express();
  dotenv.config();
  const PORT: number = 5000;
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());

  // route for token refreshing
  app.use("/refresh_token", refreshTokenRoute);

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
