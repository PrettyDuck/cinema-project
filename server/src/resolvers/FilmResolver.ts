import { Query, Mutation, Arg, Resolver, Int } from "type-graphql";
import { FilmInput, FilmUpdateInput } from "../input-types/FilmInputs";
import FilmType from "../types/FilmType";
import Film from "../../db/models/filmModel";
import Actor from "../../db/models/actorModel";
import storeFS from "../utills/storeFile";

@Resolver()
export class FilmResolver {
  @Mutation(() => FilmType)
  async addFilm(@Arg("input", () => FilmInput) input: FilmInput) {
    try {
      const {
        name,
        categoriesId,
        year,
        filmDirector,
        filmDescription,
        averageRating,
        coverImage,
      } = input;
      const { filename, createReadStream } = await coverImage;
      const stream = createReadStream();
      const pathObj: any = await storeFS({ stream, filename });
      let fileLocation = pathObj.path;
      // Path String Refactoring
      console.log(fileLocation);
      const pathExecutorPattern = new RegExp("../(?=uploads/)");
      fileLocation = fileLocation.split(pathExecutorPattern)[1];
      fileLocation = fileLocation.replace(/\//g, "\\");
      console.log(fileLocation);
      const createdFilm = await Film.create({
        name,
        categoriesId,
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
        include: Actor,
      });
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  @Query(() => [FilmType])
  async films() {
    try {
      const res = await Film.findAll();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
