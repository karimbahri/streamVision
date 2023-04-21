import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    fullName: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    birthday: { type: GraphQLString },
  }),
});

export default UserType;
