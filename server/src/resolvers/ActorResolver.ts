import { Query, Mutation, Arg, Resolver, Int, ObjectType } from "type-graphql";
import ActorType from "../types/ActorType";
import ActorInput from "../input-types/ActorInputs";
import Actor from "../../db/models/actorModel";
import Film from "../../db/models/filmModel";
import fs from "fs";
import { dirname } from "path";

const storeFS = ({ stream, filename }: any) => {
  const uploadDir = __dirname + '/../../uploads';
  const path = `${uploadDir}/${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", (error: any) => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on("error", (error: any) => reject(error))
      .on("finish", () => resolve({ path }))
  );
};

@Resolver()
export class ActorResolver {
  @Mutation(() => ActorType)
  async addActor(@Arg("input", () => ActorInput) input: ActorInput) {
    try {
      const { name, birthYear, profilePhoto } = input;
      const { filename, createReadStream } = await profilePhoto;
      const stream = createReadStream();
      const pathObj: any = await storeFS({ stream, filename });
      let fileLocation = pathObj.path;
      // Path String Refactoring
      console.log(fileLocation)
      const pathExecutorPattern = new RegExp('\.\.\/(?=uploads\/)')
      fileLocation = fileLocation.split(pathExecutorPattern)[1]
      fileLocation = fileLocation.replace(/\//g, "\\")
      console.log(fileLocation)
      const createdActor = await Actor.create({
        name,
        birthYear,
        profilePhoto:fileLocation,
      });
      return createdActor;
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation(() => String)
  async addFilmActor(
    @Arg("actorId", () => Int) actorId: number,
    @Arg("filmId", () => Int) filmId: number
  ) {
    try {
      const targetActor: any = await Actor.findByPk(actorId);
      const targetFilm: any = await Film.findByPk(filmId);
      await targetFilm.addActor(targetActor);
      const res: any = await Film.findOne({
        where: { id: filmId },
        include: Actor,
      });
      console.log(res.toJSON());
      return `Relation between film with id:${filmId} and actor whith id:${actorId} formed successfully`;
    } catch (err) {
      console.log(err);
    }
  }

  @Query(() => ActorType)
  async author(@Arg("id", () => Int) id: number) {
    try {
      const res = await Actor.findByPk(id);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
