import { Query, Mutation, Arg, Resolver, Int } from "type-graphql";
import { FilmInput, FilmUpdateInput } from "../input-types/FilmInputs";
import FilmType from "../types/FilmType";
import GetFilmsResponseType from "../types/GetFilmsResponseType";
import Film from "../../db/models/filmModel";
import Actor from "../../db/models/actorModel";
import storeFile from "../utills/storeFile";
import Category from "../../db/models/categoryModel";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

@Resolver()
export class FilmResolver {
  @Mutation(() => FilmType)
  async addFilm(@Arg("input", () => FilmInput) input: FilmInput) {
    try {
      const {
        name,
        year,
        filmDirector,
        filmDescription,
        averageRating,
        coverImage,
      } = input;
      const fileLocation = await storeFile(coverImage);
      const createdFilm = await Film.create({
        name,
        year,
        filmDirector,
        filmDescription,
        averageRating,
        coverImage: fileLocation,
      });
      return createdFilm;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => FilmType)
  async updateFilm(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => FilmUpdateInput) input: FilmUpdateInput
  ) {
    try {
      if ("coverImage" in input) {
        const fileLocation = await storeFile(input.coverImage);
        input.coverImage = fileLocation;
      }

      await Film.update(input, { where: { id: id } });
      const updatedFilm = await Film.findByPk(id);
      return updatedFilm;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => String)
  async deleteFilm(@Arg("id", () => Int) id: number) {
    try {
      await Film.destroy({ where: { id: id } });
      console.log("Film Deleted");
      return `Film with id: ${id} deleted successfully!`;
    } catch (err) {
      console.log(err);
    }
  }

  @Query(() => FilmType)
  async film(@Arg("id", () => Int) id: number) {
    try {
      const res = await Film.findOne({
        where: { id: id },
        include: [Actor, Category],
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  @Query(() => GetFilmsResponseType)
  async films(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string
  ) {
    try {
      const options: any = {
        include: Category,
        limit: limit,
        order: [["createdAt", "DESC"]],
      };
      let hasMore = true;
      if (cursor) {
        options.where = {
          createdAt: {
            [Op.lt]: cursor,
          },
        };
      }
      const res = await Film.findAll(options);
      console.log(res.length);
      if (res.length < limit) {
        hasMore = false;
      }
      return { filmsData: res, hasMore: hasMore };
    } catch (err) {
      console.log(err);
    }
  }
  @Query(() => [FilmType])
  async adminFilms(@Arg("page", () => Int, { nullable: true }) page: number) {
    try {
      const res = await Film.findAll({
        include: Category,
        order: [["createdAt", "DESC"]],
      });
      if (page) {
        // Start index = pageIndex - 1 * limit
        const startIndex = (page - 1) * 12;
        // End index == pageIndex * limit
        const endIndex = page * 12;
        return res.splice(startIndex, endIndex);
      }
      return res;
      
    } catch (err) {
      console.log(err);
    }
  }
}
