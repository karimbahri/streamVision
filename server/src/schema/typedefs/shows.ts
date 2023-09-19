import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from "graphql";

const ShowType = new GraphQLObjectType({
  name: "Shows",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    category: { type: GraphQLString },
    seasons: { type: GraphQLInt },
    episodes: { type: GraphQLInt },
  }),
});

export default ShowType;
