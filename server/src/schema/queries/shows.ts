import { GraphQLList, GraphQLString } from "graphql";
import UserType from "../typedefs/user";
import { Shows } from "../../entities";

const GET_MOVIES_BY_CATEGORY = {
  type: new GraphQLList(UserType),
  args: {
    category: { type: GraphQLString },
  },
  resolve() {
    return Shows.find();
  },
};

export default GET_MOVIES_BY_CATEGORY;
