import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  CREATE_USER,
  DELETE_USER,
  LOGIN,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
  RESET_USER,
  CHECK_VERIFICATION_CODE,
} from "./mutations/user";
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
    login: LOGIN,
    deleteUser: DELETE_USER,
    updateUserPassword: UPDATE_USER_PASSWORD,
    updateUser: UPDATE_USER,
    resetUser: RESET_USER,
    chaeckVerificationUser: CHECK_VERIFICATION_CODE,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation,
});

export default schema;
