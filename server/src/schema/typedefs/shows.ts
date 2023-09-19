import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const ShowType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
  }),
});

export default ShowType;
