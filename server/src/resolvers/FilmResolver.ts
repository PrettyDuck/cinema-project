import {
  Query,
  Mutation,
  Arg,
  Resolver,
  Int,
  UseMiddleware,
} from "type-graphql";
import { FilmInput, FilmUpdateInput } from "../input-types/FilmInputs";
import FilmType from "../types/FilmType";
import GetFilmsResponseType from "../types/GetFilmsResponseType";
import Film from "../../db/models/filmModel";
import Actor from "../../db/models/actorModel";
import storeFile from "../utills/storeFile";
import Category from "../../db/models/categoryModel";
import { isAuth } from "../utills/isAuthMiddleware";
import { isAdmin } from "../utills/isAdminMiddleware";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

@Resolver()
export class FilmResolver {
  @Mutation(() => FilmType)
  @UseMiddleware(isAuth, isAdmin)
  async addFilm(@Arg("input", () => FilmInput) input: FilmInput) {
    try {
      const {
        name,
        year,
        filmDirector,
        filmDescription,
        averageRating,
        coverImage,
        filmCategories,
        filmActors,
      } = input;
      const fileLocation = await storeFile(coverImage);
      const createdFilm: any = await Film.create({
        name,
        year,
        filmDirector,
        filmDescription,
        averageRating,
        coverImage: fileLocation,
      });
      console.log(createdFilm);
      for await (const id of filmCategories) {
        const targetCategory = await Category.findByPk(id);
        await createdFilm.addCategory(targetCategory);
        console.log(
          `Relation between film with id:${createdFilm.id} and category with id:${id} formed successfully`
        );
      }

      for await (const id of filmActors) {
        const targetActor = await Actor.findByPk(id);
        await createdFilm.addActor(targetActor);
        console.log(
          `Relation between film with id:${createdFilm.id} and actor with id:${id} formed successfully`
        );
      }

      return createdFilm;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => FilmType)
  @UseMiddleware(isAuth, isAdmin)
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
      const updatedFilm: any = await Film.findByPk(id);
      return updatedFilm;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => String)
  @UseMiddleware(isAuth, isAdmin)
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
    @Arg("limit", () => Int, { nullable: true }) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string,
    @Arg("nameSearch", () => String, { nullable: true }) nameSearch: string,
    @Arg("categoryFilter", () => Int, { nullable: true })
    categoryFilter: number,
    @Arg("yearFilter", () => Int, { nullable: true }) yearFilter: number
  ) {
    try {
      const options: any = {
        order: [["createdAt", "DESC"]],
        where: {},
      };

      if (categoryFilter && categoryFilter !== 0) {
        options.include = [
          {
            model: Category,
            where: { id: categoryFilter },
          },
        ];
      } else {
        options.include = Category;
      }
      if (nameSearch) options.where.name = { [Op.substring]: nameSearch };
      if (yearFilter && yearFilter !== 0)
        options.where.year = {
          [Op.and]: [{ [Op.lt]: yearFilter + 9 }, { [Op.gte]: yearFilter }],
        };
      if (cursor) options.where.createdAt = { [Op.lt]: cursor };
      if (limit) options.limit = limit;
      const res = await Film.findAll(options);
      if (limit) {
        let hasMore = true;
        if (res.length < limit) {
          hasMore = false;
        }
        return { filmsData: res, hasMore: hasMore };
      }
      return { filmsData: res };
    } catch (err) {
      console.log(err);
    }
  }
  @Query(() => [FilmType])
  @UseMiddleware(isAuth, isAdmin)
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
