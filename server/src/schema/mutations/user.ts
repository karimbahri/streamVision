import { GraphQLString } from "graphql";
import UserType from "../typedefs/user";
import { Users } from "../../entities";

const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    try {
      const { name, userName, password } = args;
      await Users.insert({ name, userName, password });
      return args;
    } catch (err) {
      console.log("ERROR : ", err);
    }
  },
};

export default CREATE_USER;
