import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { Shows } from "../../entities";
import ShowType from "../typedefs/shows";

export const SAVE_MOVIEs = {
  type: ShowType,
  args: {
    content: { type: GraphQLString },
    title: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    let { content, title, thumbnail } = args;

    await Shows.insert({
      content,
      title,
      thumbnail,
    });
    return args;
  },
};
