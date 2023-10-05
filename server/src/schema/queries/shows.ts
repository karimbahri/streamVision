import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { Shows } from "../../entities";
import { getRepository, ILike } from "typeorm";
import ShowType from "../typedefs/shows";

export const GET_LATEST_ALL = {
  type: new GraphQLList(ShowType),
  resolve() {
    return Shows.find({
      order: {
        id: "DESC",
      },
      take: 15,
    });
  },
};

export const GET_LATEST_MOVIES_BY_CATEGORY = {
  type: new GraphQLList(ShowType),
  args: {
    category: { type: GraphQLString },
    size: { type: GraphQLInt },
  },
  resolve(parent: any, args: any) {
    const { category, size } = args;
    return Shows.find({
      where: {
        category: category,
      },
      order: {
        id: "DESC",
      },
      take: size,
    });
  },
};

export const GET_SPECIFIC_MOVIE = {
  type: ShowType,
  args: {
    thumbnail: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    const { thumbnail } = args;

    return Shows.findOne({
      where: {
        thumbnail: `${thumbnail}.png`,
      },
    });
  },
};

export const GET_SEARCHED_MOVIES = {
  type: new GraphQLList(ShowType),
  args: {
    searchTerm: { type: GraphQLString },
  },
  resolve(parent: any, args: any) {
    const { searchTerm } = args;
    const showRepository = getRepository(Shows);

    return showRepository.find({
      where: {
        title: ILike(`%${searchTerm}%`),
      },
    });
  },
};
