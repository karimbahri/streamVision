import { GraphQLList, GraphQLString } from "graphql";
import { Shows } from "../../entities";
import ShowType from "../typedefs/shows";

export const GET_LATEST_MOVIES = {
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
  },
  resolve(parent: any, args: any) {
    const { category } = args;
    return Shows.find({
      where: {
        category: category,
      },
      order: {
        id: "DESC",
      },
      take: 15,
    });
  },
};

// export default GET_LATEST_MOVIES_BY_CATEGORY;
