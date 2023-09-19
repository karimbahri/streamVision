import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const ShowsType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    title: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
  }),
});

export default ShowsType;
