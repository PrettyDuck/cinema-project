const express = require("express");

const app = express();

const expressGraphQL = require("express-graphql");

const PORT = 5000;

const cors = require("cors");

const schema = require("./schema");

const sequelize = require("./db/database");

const Film = require("./models/filmModel");
const Category = require("./models/categoryModel");
const Review = require("./models/reviewModel");


app.use("/uploads", express.static("uploads"));
app.use("/films/uploads", express.static("uploads"));

app.use(cors());
app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema: schema,
  })
);

Review.belongsTo(Film, { constraints: true, onDelete: "CASCADE" });
Film.hasMany(Review);
(async () => {
  let retries = 20;
  while (retries) {
    try {
      await sequelize.sync().then(() => {
        app.listen(PORT, () => {
          console.log(`Server Running on port ${PORT}`);
        });
      });
      break;
    } catch (error) {
      console.log(error);
      console.log(`Retries ${retries}`);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 60000));
    }
  }
})();
