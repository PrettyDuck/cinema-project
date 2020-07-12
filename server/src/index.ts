import "reflect-metadata";
import express from "express";
import sequelize from "../db/database";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { FilmResolver } from "./resolvers/FilmResolver";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { ReviewResolver } from "./resolvers/ReviewResovler";
import initRelations from "../db/relations";
import cors  from "cors";

(async () => {
  const app = express();
  const PORT: number = 5000;
  
  app.use(cors());
  app.use("/uploads", express.static("uploads"));
  app.use("/films/uploads", express.static("uploads"));
  
  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [FilmResolver, CategoryResolver, ReviewResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
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
