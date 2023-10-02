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
import { DELETE_MOVIE, SAVE_MOVIES } from "./mutations/shows";
import {
  GET_LATEST_ALL,
  GET_LATEST_MOVIES_BY_CATEGORY,
  GET_SPECIFIC_MOVIE,
} from "./queries/shows";

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getLatestMoviesByCategory: GET_LATEST_MOVIES_BY_CATEGORY,
    getLatestAll: GET_LATEST_ALL,
    getSpecificMovie: GET_SPECIFIC_MOVIE,
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
    saveShow: SAVE_MOVIES,
    deleteMovie: DELETE_MOVIE,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation,
});

export default schema;
