import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
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
    seasons = !seasons ? 0 : seasons;
    episodes = !episodes ? 0 : episodes;

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

export const DELETE_MOVIE = {
  type: ShowType,
  args: {
    content: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { content } = args;
    await Shows.delete({ content });
  },
};
