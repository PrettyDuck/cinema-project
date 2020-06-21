const db = require("./database");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

// Function for selecting data after mutations

const getInfoFunct = async (id) => {
  const getter = await db.execute("SELECT * FROM films WHERE ID = ?", [id]);
  console.log(getter);
  const [res] = getter[0];
  return res;
};

const CategoryType = new GraphQLObjectType({
  name: "Category",
  description: "Category Description",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    categoryName: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const FilmType = new GraphQLObjectType({
  name: "Film",
  description: "Film Description",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLNonNull(GraphQLString) },
    categoryId: { type: GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    filmDescription: { type: GraphQLNonNull(GraphQLString) },
    averageRating: { type: GraphQLNonNull(GraphQLFloat) },
    coverImage: { type: GraphQLNonNull(GraphQLString) },
    category: {
      type: GraphQLNonNull(GraphQLList(CategoryType)),
      // Resolve have two parameters a parent and args, parent in this case is a film
      resolve: async (film) => {
        try {
          let resultArray = [];
          for await (let element of film.categoryId.split(",")) {
            const data = await db.execute(
              "SELECT * FROM film_categories WHERE ID = ?",
              [parseInt(element)]
            );
            const [res] = data[0];
            console.log(res);
            console.log("Category fetched");
            resultArray.push(res);
          }

          /*
          film.categoryId.split(",").map(async (element) => {
            const data = await db.execute(
              "SELECT * FROM film_categories WHERE ID = ?",
              [parseInt(element)]
            );
            const [res] = data[0];
            console.log(res);
            console.log("Category fetched");
            resultArray.push(res);
          });
          */

          // console.log(resultArray);
          return resultArray;
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addFilm: {
      type: FilmType,
      description: "Add a film",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        categoryId: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) },
        year: { type: GraphQLNonNull(GraphQLInt) },
        filmDescription: { type: GraphQLNonNull(GraphQLString) },
        averageRating: { type: GraphQLNonNull(GraphQLFloat) },
        coverImage: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const film = {
          name: args.name,
          categoryId: args.categoryId.join(), // Passing array as string
          year: args.year,
          filmDescription: args.filmDescription,
          averageRating: args.averageRating,
          coverImage: args.coverImage,
        };
        try {
          const data = await db.execute(
            "INSERT INTO films (name,categoryId,year,filmDescription,averageRating,coverImage) VALUES (?,?,?,?,?,?)",
            [
              film.name,
              film.categoryId,
              film.year,
              film.filmDescription,
              film.averageRating,
              film.coverImage,
            ]
          );
          console.log(data);
          console.log("New Film added");
          return getInfoFunct(data[0].insertId);
        } catch (err) {
          console.log(err);
        }
      },
    },
    updateFilm: {
      type: FilmType,
      description: "Update a film",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        categoryId: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) },
        year: { type: GraphQLNonNull(GraphQLInt) },
        filmDescription: { type: GraphQLNonNull(GraphQLString) },
        averageRating: { type: GraphQLNonNull(GraphQLFloat) },
        coverImage: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const UpdatedFilm = {
          name: args.name,
          categoryId: args.categoryId,
          year: args.year,
          filmDescription: args.filmDescription,
          averageRating: args.averageRating,
          coverImage: args.coverImage,
        };
        try {
          const data = await db.execute(
            "UPDATE films SET name = ?, categoryId = ?, year = ?, filmDescription = ?, averageRating = ?, coverImage = ? WHERE ID = ?",
            [
              UpdatedFilm.name,
              UpdatedFilm.categoryId.join(),
              UpdatedFilm.year,
              UpdatedFilm.filmDescription,
              UpdatedFilm.averageRating,
              UpdatedFilm.coverImage,
              args.id,
            ]
          );
          console.log(data);
          console.log("Film Updated");
          return getInfoFunct(args.id);
        } catch (err) {
          console.log(err);
        }
      },
    },
    deleteFilm: {
      type: FilmType,
      description: "Delete a film",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        try {
          const data = await db.execute("DELETE FROM films WHERE ID = ?", [
            args.id,
          ]);
          console.log(data);
          return console.log("Film Deleted");
        } catch (err) {
          console.log(err);
        }
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    film: {
      type: FilmType,
      description: "Single Film",
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        try {
          console.log("Film Fetched");
          return getInfoFunct(args.id);
        } catch (err) {
          console.log(err);
        }
      },
    },
    films: {
      type: new GraphQLList(FilmType),
      description: "List of all Films",
      resolve: async () => {
        try {
          const data = await db.execute("SELECT * FROM films");
          console.log(data);
          console.log("Films Fetched");
          return data[0];
        } catch (err) {
          console.log(err);
        }

        // Another way

        /*
        const data = db
          .execute("SELECT * FROM films")
          .then(([firstPart]) => {
            return firstPart;
          })
          .catch((err) => console.log(err));
        return data;
        */
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
