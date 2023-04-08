import { GraphQLList } from "graphql";
import UserType from "../typedefs/user";
import { Users } from "../../entities";

const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return Users.find();
  },
};

export default GET_ALL_USERS;
