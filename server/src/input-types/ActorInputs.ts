import { Int, InputType, Field } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";

@InputType()
class ActorInput {
  @Field(() => String)
  name!: string;
  @Field(() => Int)
  birthYear!: number;
  @Field(() => String)
  actorBio!: string;
  @Field(() => GraphQLUpload)
  profilePhoto!: FileUpload;
}

export default ActorInput;
