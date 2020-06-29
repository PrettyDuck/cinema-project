const express = require("express");

const app = express();

const expressGraphQL = require("express-graphql");

const PORT = 5000;

const cors = require("cors");

// SQL SCHEMA
// const schema = require("./SQL-Schema/schema");

// ORM SCHEMA
const schema = require("./ORM-Schema/schema");

const sequelize = require("./ORM-Schema/database");

const FimModel = require("./ORM-Schema/filmModel");
const CategoryModel = require("./ORM-Schema/categoryModel");

app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema: schema,
  })
);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
