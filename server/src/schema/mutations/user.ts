import { GraphQLID, GraphQLString } from "graphql";
import UserType from "../typedefs/user";
import { Users } from "../../entities";

export const CREATE_USER = {
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

export const DELETE_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    try {
      const { id } = args;
      await Users.delete(id);
    } catch (err) {
      console.log("ERROR : ", err);
    }
  },
};

export const UPDATE_USER_PASSWORD = {
  type: UserType,
  args: {
    userName: GraphQLString,
    oldPassword: GraphQLString,
    newPassword: GraphQLString,
  },
  async resolve(parent: any, args: any) {
    try {
      const { userName, oldPassword, newPassword } = args;

      const user = await Users.findOne({ where: { userName: userName } });
      const userPassword = user?.password;
      if (oldPassword === userPassword) {
        await Users.update({ userName: userName }, { password: newPassword });
      } else {
        throw new Error("Password doesn't match");
      }
    } catch (err) {
      console.log("ERROR : ", err);
    }
  },
};
