import { Query, Mutation, Arg, Resolver, Int } from "type-graphql";
import ActorType from "../types/ActorType";
import ActorInput from "../input-types/ActorInputs";
import Actor from "../../db/models/actorModel";
import Film from "../../db/models/filmModel";
import storeFile from "../utills/storeFile";

@Resolver()
export class ActorResolver {
  @Mutation(() => String)
  async addActor(@Arg("input", () => ActorInput) input: ActorInput) {
    try {
      const { name, birthYear, actorBio, profilePhoto } = input;
      const fileLocation = await storeFile(profilePhoto);
      await Actor.create({
        name,
        birthYear,
        actorBio,
        profilePhoto: fileLocation,
      });
      return "New Actor Added";
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
  async actor(@Arg("id", () => Int) id: number) {
    try {
      const res = await Actor.findByPk(id);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  @Query(() => [ActorType])
  async actors() {
    try {
      const res = await Actor.findAll();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
