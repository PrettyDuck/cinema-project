import { Query, Mutation, Arg, Resolver, Int, UseMiddleware } from "type-graphql";
import ActorType from "../types/ActorType";
import ActorInput from "../input-types/ActorInputs";
import Actor from "../../db/models/actorModel";
import Film from "../../db/models/filmModel";
import storeFile from "../utills/storeFile";
import { isAuth } from "../utills/isAuthMiddleware";
import { isAdmin } from "../utills/isAdminMiddleware";

@Resolver()
export class ActorResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth,isAdmin)
  async addActor(@Arg("input", () => ActorInput) input: ActorInput) {
    try {
      const { name, birthYear, actorBio, profilePhoto } = input;
      const fileLocation = await storeFile(profilePhoto);
      const createdActor: any = await Actor.create({
        name,
        birthYear,
        actorBio,
        profilePhoto: fileLocation,
      });
      return `New actor with name ${createdActor.name} added successfully`;
    } catch (err) {
      console.log(err);
    }
  }

  @Query(() => ActorType)
  async actor(@Arg("id", () => Int) id: number) {
    try {
      const res = await Actor.findOne({
        where: { id: id },
        include: Film,
      });
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
