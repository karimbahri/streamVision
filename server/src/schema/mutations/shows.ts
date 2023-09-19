import { GraphQLInt, GraphQLString } from "graphql";
import { Shows } from "../../entities";
import ShowType from "../typedefs/shows";

export const SAVE_MOVIES = {
  type: ShowType,
  args: {
    content: { type: GraphQLString },
    title: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    category: { type: GraphQLString },
    seasons: { type: GraphQLInt },
    episodes: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any) {
    let { content, title, thumbnail, category, seasons, episodes } = args;

    title = title[0].toUpperCase() + title.slice(1).toLowerCase();

    await Shows.insert({
      content,
      title,
      thumbnail,
      category,
      seasons,
      episodes,
    });
    return args;
  },
};
