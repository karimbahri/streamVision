import { GraphQLObjectType, GraphQLSchema } from "graphql";
import CREATE_USER from "./mutations/user";
import GET_ALL_USERS from "./queries/user";

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation,
});

export default schema;
