const Film = require("./filmModel");
const Category = require("./categoryModel");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");

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
            const res = await Category.findAll({
              where: { id: parseInt(element) },
            });
            console.log(res);
            resultArray.push(res[0]);
          }
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
        // One way
        const newFilm = Film.build(film);
        try {
          await newFilm.save();
          console.log(newFilm);
          return newFilm;
        } catch (err) {
          console.log(err);
        }
        // The other way
        /*
        Film.create(film)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
        */
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
          categoryId: args.categoryId.join(),
          year: args.year,
          filmDescription: args.filmDescription,
          averageRating: args.averageRating,
          coverImage: args.coverImage,
        };
        try {
          let target = await Film.findByPk(args.id);
          target.name = UpdatedFilm.name;
          target.categoryId = UpdatedFilm.categoryId;
          target.year = UpdatedFilm.year;
          target.filmDescription = UpdatedFilm.filmDescription;
          target.averageRating = UpdatedFilm.averageRating;
          target.coverImage = UpdatedFilm.coverImage;
          const res = await target.save();
          return res;
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
          const res = await Film.destroy({ where: { id: args.id } });
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
          const res = await Film.findByPk(args.id);
          return res;
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
          const res = await Film.findAll();
          return res;
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
